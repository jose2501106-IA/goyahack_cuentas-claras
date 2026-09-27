#![no_std]
// `events().publish((topics), data)` está deprecado en soroban-sdk 28 a favor de `#[contractevent]`,
// pero produce exactamente el esquema de tópicos que exige la spec v2, §7: `("cclaras", <nombre>)`,
// legible en el explorador durante la demo. Migrar a `#[contractevent]` queda en la hoja de ruta.
#![allow(deprecated)]
// Rangos de monto tal como los fija la spec v2, §3 (B0_1k, B1k_5k, …): nombres intencionales.
#![allow(non_camel_case_types)]
//! Cuentas Claras — bitácora de fiado co-firmada de la Central de Abasto (MVP, Stellar testnet).
//!
//! Principio (spec v2, §3): en la cadena no hay nombres, teléfonos ni montos exactos, solo un
//! seudónimo por cliente (`subject_id` = HMAC del teléfono, calculado fuera de cadena), rangos de
//! monto, fechas, estados y contadores. Lo que sí queda en la cadena es público (spec v2, §3b): el
//! consentimiento controla la CONSULTA OFICIAL (`read_stats`) y deja constancia, no vuelve secreto
//! el estado. Sin función de actualización del contrato (spec v2, §5): "nadie puede cambiar lo que
//! firmaron los dos, ni nosotros".

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, Address, BytesN, Env, Symbol,
};

// ---------------------------------------------------------------------------
// Tipos (spec v2, §3)
// ---------------------------------------------------------------------------

#[contracttype]
#[derive(Clone, PartialEq, Debug)]
pub enum Status {
    Created,
    Accepted,
    PaidClaimed,
    Paid,
    Overdue,
    Defaulted,
    Disputed,
    Cancelled,
}

#[contracttype]
#[derive(Clone, PartialEq, Debug)]
pub enum AmountBucket {
    B0_1k,
    B1k_5k,
    B5k_20k,
    B20k_50k,
    B50kPlus,
}

impl AmountBucket {
    /// Orden de magnitud, para `max_bucket` (spec v2, §3: `SubjectStats.max_bucket`).
    fn rank(&self) -> u32 {
        match self {
            AmountBucket::B0_1k => 0,
            AmountBucket::B1k_5k => 1,
            AmountBucket::B5k_20k => 2,
            AmountBucket::B20k_50k => 3,
            AmountBucket::B50kPlus => 4,
        }
    }
}

#[contracttype]
#[derive(Clone)]
pub struct Note {
    pub note_id: BytesN<32>,
    pub issuer: Address,
    pub subject_id: BytesN<32>,
    pub amount_bucket: AmountBucket,
    pub created_ts: u64,
    pub due_ts: u64,
    pub status: Status,
    pub paid_ts: Option<u64>,
    pub evidence_commit: Option<BytesN<32>>,
    pub prev: Option<BytesN<32>>,
    /// Cuándo quedó incumplida (C6): la ventana de disputa de una incumplida corre desde aquí.
    pub defaulted_ts: Option<u64>,
    /// Una nota entra a `Disputed` una sola vez (C3, parcial; decisión #55).
    pub disputed_once: bool,
}

#[contracttype]
#[derive(Clone, PartialEq, Debug)]
pub struct SubjectStats {
    pub accepted: u32,
    pub paid_on_time: u32,
    pub paid_late: u32,
    pub overdue_open: u32,
    pub defaulted: u32,
    pub disputes_open: u32,
    pub disputes_resolved: u32,
    pub issuers_count: u32,
    pub first_ts: u64,
    pub last_ts: u64,
    pub max_bucket: AmountBucket,
}

#[contracttype]
#[derive(Clone)]
pub struct Consent {
    pub subject_id: BytesN<32>,
    pub reader: Address,
    pub scope: u32, // 0 = agregado (único en el MVP)
    pub exp_ts: u64,
    pub nonce: u64,
}

/// Ventanas del sistema en SEGUNDOS (spec v2, §4). El plazo (`due_ts`) NO va aquí: lo fija la
/// bodega por nota. En la demo: accept 72 h, gracia 30 d, disputa 15 d, consentimiento 30 d.
#[contracttype]
#[derive(Clone)]
pub struct Params {
    pub accept_window: u64,
    pub grace_period: u64,
    pub dispute_window: u64,
    pub consent_ttl: u64,
}

/// Propuesta de resolución mutua pendiente (spec v2, §5, `resolve_mutual`).
#[contracttype]
#[derive(Clone)]
pub struct ResolveProposal {
    pub proposer: Address,
    pub outcome: Status,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Params,
    Issuer(Address),                    // bool: emisor autorizado
    Note(BytesN<32>),                   // Note
    Stats(BytesN<32>),                  // SubjectStats
    SubjectIssuer(BytesN<32>, Address), // bool: este emisor ya cuenta para issuers_count
    SubjectAddr(BytesN<32>),            // Address vinculada al seudónimo (spec v2, §5.1)
    AddrSubject(Address),               // BytesN<32>: seudónimo de una Address (inverso, para consent)
    Consent(BytesN<32>, Address),       // Consent
    CancelProp(BytesN<32>),             // ResolveProposal: cancelar una nota Accepted (C7)
    ResolveProp(BytesN<32>),            // ResolveProposal: cerrar una nota Disputed (C7)
    PendingBind(BytesN<32>),            // Address invitada por la plataforma, aún sin firmar (C1)
}

// ---------------------------------------------------------------------------
// Errores (spec v2, §5.2)
// ---------------------------------------------------------------------------

#[contracterror]
#[derive(Clone, Copy, PartialEq, Eq, Debug)]
#[repr(u32)]
pub enum Error {
    AlreadyInit = 1,
    NotInit = 2,
    NotIssuer = 3,
    NoteExists = 4,
    NoteNotFound = 5,
    InvalidTransition = 6,
    NotParty = 7,
    TooEarly = 8,     // gracia o ventana no cumplida
    WindowClosed = 9, // ventana de aceptación / disputa vencida
    NoConsent = 10,
    ConsentExpired = 11,
    BadParams = 12,
    // Contrato v4 (decisión #55): al final, sin renumerar los anteriores.
    AlreadyBound = 13, // el seudónimo o la dirección ya están vinculados
    NotBound = 14,     // el seudónimo no tiene dirección vinculada
    SelfNote = 15,     // la dirección vinculada es la del propio emisor
}

// ---------------------------------------------------------------------------
// TTL: mantener vivo el storage persistente (spec v2, §3).
// Valores en ledgers (~5 s/ledger). Cómodos para la demo y por debajo del máximo de red.
// ---------------------------------------------------------------------------

const LEDGERS_PER_DAY: u32 = 17_280;
/// Tope del plazo de una nota (C9): 365 días, en segundos.
const MAX_PLAZO: u64 = 365 * 86_400;
const TTL_THRESHOLD: u32 = 30 * LEDGERS_PER_DAY;
const TTL_EXTEND_TO: u32 = 90 * LEDGERS_PER_DAY;

fn bump(env: &Env, key: &DataKey) {
    env.storage()
        .persistent()
        .extend_ttl(key, TTL_THRESHOLD, TTL_EXTEND_TO);
}

// ---------------------------------------------------------------------------
// Contrato
// ---------------------------------------------------------------------------

#[contract]
pub struct CuentasClaras;

#[contractimpl]
impl CuentasClaras {
    // --- Administración ---

    pub fn init(env: Env, admin: Address, params: Params) -> Result<(), Error> {
        if env.storage().persistent().has(&DataKey::Admin) {
            return Err(Error::AlreadyInit);
        }
        // C8: nadie se adelanta a inicializar con otro admin.
        admin.require_auth();
        if params.accept_window == 0
            || params.grace_period == 0
            || params.dispute_window == 0
            || params.consent_ttl == 0
        {
            return Err(Error::BadParams);
        }
        env.storage().persistent().set(&DataKey::Admin, &admin);
        env.storage().persistent().set(&DataKey::Params, &params);
        bump(&env, &DataKey::Admin);
        bump(&env, &DataKey::Params);
        Ok(())
    }

    pub fn add_issuer(env: Env, admin: Address, issuer: Address) -> Result<(), Error> {
        Self::require_admin(&env, &admin)?;
        let key = DataKey::Issuer(issuer.clone());
        env.storage().persistent().set(&key, &true);
        bump(&env, &key);
        env.events()
            .publish((cclaras(), name(&env, "issuer_added")), issuer);
        Ok(())
    }

    pub fn remove_issuer(env: Env, admin: Address, issuer: Address) -> Result<(), Error> {
        Self::require_admin(&env, &admin)?;
        env.storage()
            .persistent()
            .remove(&DataKey::Issuer(issuer.clone()));
        env.events()
            .publish((cclaras(), name(&env, "issuer_removed")), issuer);
        Ok(())
    }

    // --- Vínculo previo y explícito del cliente (C1, C2; decisión #55) ---
    //
    // Dos pasos, una firma cada uno: la plataforma invita y el cliente firma. El vínculo
    // seudónimo <-> dirección se fija una sola vez y nunca se sobrescribe.

    /// Paso 1 (plataforma): invita a `subject` a quedarse con `subject_id`. Mientras la
    /// invitación siga pendiente, la plataforma puede reemplazarla.
    pub fn invite_subject(
        env: Env,
        admin: Address,
        subject_id: BytesN<32>,
        subject: Address,
    ) -> Result<(), Error> {
        Self::require_admin(&env, &admin)?;
        Self::require_unbound(&env, &subject_id, &subject)?;
        let key = DataKey::PendingBind(subject_id.clone());
        env.storage().persistent().set(&key, &subject);
        bump(&env, &key);
        env.events()
            .publish((cclaras(), name(&env, "subject_invited")), subject_id);
        Ok(())
    }

    /// Paso 2 (cliente): acepta la invitación con su firma. Sin invitación a su nombre, `NotParty`.
    pub fn bind_subject(env: Env, subject: Address, subject_id: BytesN<32>) -> Result<(), Error> {
        subject.require_auth();
        let key = DataKey::PendingBind(subject_id.clone());
        let invitado: Option<Address> = env.storage().persistent().get(&key);
        if invitado != Some(subject.clone()) {
            return Err(Error::NotParty);
        }
        Self::require_unbound(&env, &subject_id, &subject)?;
        let fwd = DataKey::SubjectAddr(subject_id.clone());
        env.storage().persistent().set(&fwd, &subject);
        bump(&env, &fwd);
        let rev = DataKey::AddrSubject(subject.clone());
        env.storage().persistent().set(&rev, &subject_id);
        bump(&env, &rev);
        env.storage().persistent().remove(&key);
        env.events()
            .publish((cclaras(), name(&env, "subject_bound")), subject_id);
        Ok(())
    }

    /// Dirección vinculada a un seudónimo, si la hay (la usan `demo.sh` y `sembrar.sh`).
    pub fn subject_of(env: Env, subject_id: BytesN<32>) -> Option<Address> {
        env.storage()
            .persistent()
            .get(&DataKey::SubjectAddr(subject_id))
    }

    // --- Ciclo de vida de la nota ---

    pub fn create_note(
        env: Env,
        issuer: Address,
        note_id: BytesN<32>,
        subject_id: BytesN<32>,
        amount_bucket: AmountBucket,
        due_ts: u64,
    ) -> Result<(), Error> {
        issuer.require_auth();
        if !Self::is_issuer(env.clone(), issuer.clone()) {
            return Err(Error::NotIssuer);
        }
        if env
            .storage()
            .persistent()
            .has(&DataKey::Note(note_id.clone()))
        {
            return Err(Error::NoteExists);
        }
        let now = env.ledger().timestamp();
        // C9: plazo en el futuro y con tope de 365 días.
        if due_ts <= now || due_ts > now + MAX_PLAZO {
            return Err(Error::BadParams);
        }
        // C1: el seudónimo ya debe estar vinculado, y no a la bodega que emite.
        let vinculado: Address = env
            .storage()
            .persistent()
            .get(&DataKey::SubjectAddr(subject_id.clone()))
            .ok_or(Error::NotBound)?;
        if vinculado == issuer {
            return Err(Error::SelfNote);
        }
        let note = Note {
            note_id: note_id.clone(),
            issuer: issuer.clone(),
            subject_id: subject_id.clone(),
            amount_bucket: amount_bucket.clone(),
            created_ts: now,
            due_ts,
            status: Status::Created,
            paid_ts: None,
            evidence_commit: None,
            prev: None,
            defaulted_ts: None,
            disputed_once: false,
        };
        Self::save_note(&env, &note);
        env.events().publish(
            (cclaras(), name(&env, "note_created")),
            (note_id, issuer, subject_id, amount_bucket, due_ts),
        );
        Ok(())
    }

    pub fn accept_note(env: Env, subject: Address, note_id: BytesN<32>) -> Result<(), Error> {
        subject.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        // C1: solo la dirección vinculada al seudónimo acepta (nunca la bodega ni un tercero).
        Self::require_subject(&env, &note, &subject)?;
        if note.status != Status::Created {
            return Err(Error::InvalidTransition);
        }
        let now = env.ledger().timestamp();
        // Fuera de la ventana de aceptación: no se acepta (y `touch` la cancela).
        if now > note.created_ts + Self::params(&env).accept_window {
            return Err(Error::WindowClosed);
        }
        note.status = Status::Accepted;
        Self::clear_props(&env, &note_id);
        Self::save_note(&env, &note);

        // Contadores del sujeto.
        let mut stats = Self::load_stats(&env, &note.subject_id);
        stats.accepted += 1;
        if stats.first_ts == 0 {
            stats.first_ts = now;
        }
        stats.last_ts = now;
        if note.amount_bucket.rank() > stats.max_bucket.rank() {
            stats.max_bucket = note.amount_bucket.clone();
        }
        // issuers_count: emisores distintos, una sola vez por (sujeto, emisor) (invariante 9).
        let si_key = DataKey::SubjectIssuer(note.subject_id.clone(), note.issuer.clone());
        if !env.storage().persistent().has(&si_key) {
            env.storage().persistent().set(&si_key, &true);
            bump(&env, &si_key);
            stats.issuers_count += 1;
        }
        Self::save_stats(&env, &note.subject_id, &stats);

        env.events()
            .publish((cclaras(), name(&env, "note_accepted")), note_id);
        Ok(())
    }

    pub fn cancel_note(env: Env, who: Address, note_id: BytesN<32>) -> Result<(), Error> {
        who.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        match note.status {
            // El emisor puede cancelar una nota que el cliente aún no acepta.
            Status::Created => {
                if who != note.issuer {
                    return Err(Error::NotParty);
                }
                note.status = Status::Cancelled;
                Self::clear_props(&env, &note_id);
                Self::save_note(&env, &note);
            }
            // Cancelación mutua de una nota aceptada: dos llamadas coincidentes (issuer y subject).
            Status::Accepted => {
                Self::require_party(&env, &note, &who)?;
                let key = DataKey::CancelProp(note_id.clone());
                let pending: Option<ResolveProposal> = env.storage().persistent().get(&key);
                match pending {
                    Some(p) if p.proposer != who && p.outcome == Status::Cancelled => {
                        note.status = Status::Cancelled;
                        Self::clear_props(&env, &note_id);
                        Self::save_note(&env, &note);
                    }
                    _ => {
                        // Registrar (o refrescar) la propuesta; falta la contraparte.
                        let prop = ResolveProposal {
                            proposer: who,
                            outcome: Status::Cancelled,
                        };
                        env.storage().persistent().set(&key, &prop);
                        bump(&env, &key);
                        return Ok(()); // aún no se cancela; sin evento hasta que cierre
                    }
                }
            }
            _ => return Err(Error::InvalidTransition),
        }
        env.events()
            .publish((cclaras(), name(&env, "cancelled")), note_id);
        Ok(())
    }

    pub fn claim_paid(
        env: Env,
        subject: Address,
        note_id: BytesN<32>,
        evidence_commit: Option<BytesN<32>>,
    ) -> Result<(), Error> {
        subject.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        Self::require_subject(&env, &note, &subject)?;
        if note.status != Status::Accepted {
            return Err(Error::InvalidTransition);
        }
        note.status = Status::PaidClaimed;
        note.evidence_commit = evidence_commit;
        Self::clear_props(&env, &note_id);
        Self::save_note(&env, &note);
        env.events()
            .publish((cclaras(), name(&env, "paid_claimed")), note_id);
        Ok(())
    }

    pub fn confirm_paid(env: Env, issuer: Address, note_id: BytesN<32>) -> Result<(), Error> {
        issuer.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        if issuer != note.issuer {
            return Err(Error::NotParty);
        }
        // C5: también una nota vencida se confirma como pagada (tarde).
        let estaba_vencida = note.status == Status::Overdue;
        if note.status != Status::Accepted && note.status != Status::PaidClaimed && !estaba_vencida {
            return Err(Error::InvalidTransition);
        }
        let now = env.ledger().timestamp();
        let on_time = !estaba_vencida && now <= note.due_ts;
        note.status = Status::Paid;
        note.paid_ts = Some(now);
        Self::clear_props(&env, &note_id);
        Self::save_note(&env, &note);

        let mut stats = Self::load_stats(&env, &note.subject_id);
        if estaba_vencida {
            stats.overdue_open = stats.overdue_open.saturating_sub(1);
        }
        if on_time {
            stats.paid_on_time += 1;
        } else {
            stats.paid_late += 1;
        }
        stats.last_ts = now;
        Self::save_stats(&env, &note.subject_id, &stats);

        env.events().publish(
            (cclaras(), name(&env, "paid_confirmed")),
            (note_id, on_time),
        );
        Ok(())
    }

    /// Sin firma: cualquiera puede empujar transiciones mecánicas del tiempo (invariante 4).
    pub fn touch(env: Env, note_id: BytesN<32>) -> Result<(), Error> {
        let mut note = Self::load_note(&env, &note_id)?;
        let now = env.ledger().timestamp();
        let params = Self::params(&env);
        match note.status {
            Status::Accepted if now > note.due_ts => {
                Self::marcar_vencida(&env, &mut note, &note_id);
            }
            // C4: el aviso de pago no evita vencer; pasada la gracia sin confirmación, vence.
            Status::PaidClaimed if now > note.due_ts + params.grace_period => {
                Self::marcar_vencida(&env, &mut note, &note_id);
            }
            Status::Created if now > note.created_ts + params.accept_window => {
                note.status = Status::Cancelled;
                Self::clear_props(&env, &note_id);
                Self::save_note(&env, &note);
                env.events()
                    .publish((cclaras(), name(&env, "cancelled")), note_id);
            }
            _ => return Err(Error::InvalidTransition),
        }
        Ok(())
    }

    pub fn mark_default(env: Env, issuer: Address, note_id: BytesN<32>) -> Result<(), Error> {
        issuer.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        if issuer != note.issuer {
            return Err(Error::NotParty);
        }
        if note.status != Status::Overdue {
            return Err(Error::InvalidTransition);
        }
        let now = env.ledger().timestamp();
        // "Incumplida" solo tras vencer MÁS la gracia (invariante 3).
        if now <= note.due_ts + Self::params(&env).grace_period {
            return Err(Error::TooEarly);
        }
        note.status = Status::Defaulted;
        note.defaulted_ts = Some(now); // C6: la ventana de disputa corre desde aquí
        Self::clear_props(&env, &note_id);
        Self::save_note(&env, &note);

        let mut stats = Self::load_stats(&env, &note.subject_id);
        stats.overdue_open = stats.overdue_open.saturating_sub(1);
        stats.defaulted += 1;
        Self::save_stats(&env, &note.subject_id, &stats);

        env.events()
            .publish((cclaras(), name(&env, "defaulted")), note_id);
        Ok(())
    }

    pub fn dispute(
        env: Env,
        who: Address,
        note_id: BytesN<32>,
        reason_code: u32,
    ) -> Result<(), Error> {
        who.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        let now = env.ledger().timestamp();
        let mut stats = Self::load_stats(&env, &note.subject_id);

        if who != note.issuer && !Self::is_subject(&env, &note, &who) {
            return Err(Error::NotParty);
        }
        // C3 (parcial): una nota entra a Disputed una sola vez. Una aclaración que nunca se
        // resuelve se queda abierta en la cadena; el semáforo la pesa como vencida (#56).
        if note.disputed_once {
            return Err(Error::InvalidTransition);
        }

        if who == note.issuer {
            // El emisor disputa un pago reclamado.
            if note.status != Status::PaidClaimed {
                return Err(Error::InvalidTransition);
            }
        } else if Self::is_subject(&env, &note, &who) {
            // El cliente disputa una nota vencida o incumplida, dentro de ventana (C6):
            // - incumplida: hasta defaulted_ts + dispute_window (la bodega ya no puede esperar
            //   a marcarla para dejarla fuera de la ventana);
            // - vencida: hasta due_ts + gracia + dispute_window, como en la v3.
            let params = Self::params(&env);
            let window_end = match (&note.status, note.defaulted_ts) {
                (Status::Defaulted, Some(t)) => t + params.dispute_window,
                _ => note.due_ts + params.grace_period + params.dispute_window,
            };
            if now > window_end {
                return Err(Error::WindowClosed);
            }
            match note.status {
                Status::Overdue => {
                    stats.overdue_open = stats.overdue_open.saturating_sub(1);
                }
                Status::Defaulted => {
                    stats.defaulted = stats.defaulted.saturating_sub(1);
                }
                _ => return Err(Error::InvalidTransition),
            }
        } else {
            return Err(Error::NotParty);
        }

        note.status = Status::Disputed;
        note.disputed_once = true;
        Self::clear_props(&env, &note_id);
        Self::save_note(&env, &note);
        stats.disputes_open += 1;
        Self::save_stats(&env, &note.subject_id, &stats);

        env.events().publish(
            (cclaras(), name(&env, "disputed")),
            (note_id, who, reason_code),
        );
        Ok(())
    }

    /// MVP: cierre por acuerdo de AMBAS partes (dos llamadas con el mismo `outcome`).
    pub fn resolve_mutual(
        env: Env,
        who: Address,
        note_id: BytesN<32>,
        outcome: Status,
    ) -> Result<(), Error> {
        who.require_auth();
        let mut note = Self::load_note(&env, &note_id)?;
        Self::require_party(&env, &note, &who)?;
        if note.status != Status::Disputed {
            return Err(Error::InvalidTransition);
        }
        // Sólo cierres válidos del MVP.
        match outcome {
            Status::Paid | Status::Defaulted | Status::Cancelled => {}
            _ => return Err(Error::BadParams),
        }

        let key = DataKey::ResolveProp(note_id.clone());
        let pending: Option<ResolveProposal> = env.storage().persistent().get(&key);
        match pending {
            Some(p) if p.proposer != who && p.outcome == outcome => {
                // La contraparte coincide: se cierra.
                Self::apply_resolution(&env, &mut note, &outcome);
                Self::clear_props(&env, &note_id);
                Self::save_note(&env, &note);

                let mut stats = Self::load_stats(&env, &note.subject_id);
                stats.disputes_open = stats.disputes_open.saturating_sub(1);
                stats.disputes_resolved += 1;
                Self::apply_resolution_stats(&env, &note, &outcome, &mut stats);
                Self::save_stats(&env, &note.subject_id, &stats);

                env.events()
                    .publish((cclaras(), name(&env, "resolved")), (note_id, outcome));
                Ok(())
            }
            _ => {
                // Primera propuesta (o cambio de propuesta): se guarda y se espera a la contraparte.
                let prop = ResolveProposal {
                    proposer: who,
                    outcome,
                };
                env.storage().persistent().set(&key, &prop);
                bump(&env, &key);
                Ok(())
            }
        }
    }

    // --- Consentimiento y lectura ---

    pub fn grant_consent(
        env: Env,
        subject: Address,
        reader: Address,
        exp_ts: u64,
        nonce: u64,
    ) -> Result<(), Error> {
        subject.require_auth();
        let subject_id = Self::subject_id_of(&env, &subject)?;
        let now = env.ledger().timestamp();
        let params = Self::params(&env);
        if exp_ts <= now || exp_ts > now + params.consent_ttl {
            return Err(Error::BadParams);
        }
        let consent = Consent {
            subject_id: subject_id.clone(),
            reader: reader.clone(),
            scope: 0,
            exp_ts,
            nonce,
        };
        let key = DataKey::Consent(subject_id.clone(), reader.clone());
        env.storage().persistent().set(&key, &consent);
        bump(&env, &key);
        env.events().publish(
            (cclaras(), name(&env, "consent_granted")),
            (subject_id, reader, exp_ts),
        );
        Ok(())
    }

    pub fn revoke_consent(env: Env, subject: Address, reader: Address) -> Result<(), Error> {
        subject.require_auth();
        let subject_id = Self::subject_id_of(&env, &subject)?;
        env.storage()
            .persistent()
            .remove(&DataKey::Consent(subject_id.clone(), reader.clone()));
        env.events().publish(
            (cclaras(), name(&env, "consent_revoked")),
            (subject_id, reader),
        );
        Ok(())
    }

    /// Consulta oficial del agregado. Falla sin consentimiento vigente (invariantes 6 y 11); solo el
    /// propio sujeto lee sin consentimiento. Un emisor con notas del sujeto también necesita permiso:
    /// sus propias notas las ve con `get_note` (decisión #46, opción c).
    /// Emite `aggregate_read` en cada éxito: deja constancia (spec v2, §3b).
    pub fn read_stats(
        env: Env,
        reader: Address,
        subject_id: BytesN<32>,
    ) -> Result<SubjectStats, Error> {
        reader.require_auth();

        let is_self = env
            .storage()
            .persistent()
            .get::<DataKey, BytesN<32>>(&DataKey::AddrSubject(reader.clone()))
            .map(|s| s == subject_id)
            .unwrap_or(false);

        if !is_self {
            // Tercero: exige consentimiento vigente.
            let key = DataKey::Consent(subject_id.clone(), reader.clone());
            let consent: Consent = env
                .storage()
                .persistent()
                .get(&key)
                .ok_or(Error::NoConsent)?;
            if consent.exp_ts <= env.ledger().timestamp() {
                return Err(Error::ConsentExpired);
            }
        }

        let stats = Self::load_stats(&env, &subject_id);
        env.events().publish(
            (cclaras(), name(&env, "aggregate_read")),
            (subject_id, reader),
        );
        Ok(stats)
    }

    // --- Consultas sin firma ---

    pub fn get_note(env: Env, note_id: BytesN<32>) -> Option<Note> {
        env.storage().persistent().get(&DataKey::Note(note_id))
    }

    pub fn is_issuer(env: Env, addr: Address) -> bool {
        env.storage()
            .persistent()
            .get(&DataKey::Issuer(addr))
            .unwrap_or(false)
    }

    pub fn get_params(env: Env) -> Params {
        Self::params(&env)
    }

    // Sin `get_stats`: el agregado (`SubjectStats`) solo sale por `read_stats`, que exige
    // permiso vigente o ser parte y deja constancia (decisión #42; spec v2, §3b e invariante 11).

    // -----------------------------------------------------------------------
    // Ayudantes internos
    // -----------------------------------------------------------------------

    fn require_admin(env: &Env, admin: &Address) -> Result<(), Error> {
        let stored: Address = env
            .storage()
            .persistent()
            .get(&DataKey::Admin)
            .ok_or(Error::NotInit)?;
        if stored != *admin {
            return Err(Error::NotParty);
        }
        admin.require_auth();
        Ok(())
    }

    fn params(env: &Env) -> Params {
        env.storage()
            .persistent()
            .get(&DataKey::Params)
            .expect("contrato sin init")
    }

    fn load_note(env: &Env, note_id: &BytesN<32>) -> Result<Note, Error> {
        env.storage()
            .persistent()
            .get(&DataKey::Note(note_id.clone()))
            .ok_or(Error::NoteNotFound)
    }

    fn save_note(env: &Env, note: &Note) {
        let key = DataKey::Note(note.note_id.clone());
        env.storage().persistent().set(&key, note);
        bump(env, &key);
    }

    fn load_stats(env: &Env, subject_id: &BytesN<32>) -> SubjectStats {
        env.storage()
            .persistent()
            .get(&DataKey::Stats(subject_id.clone()))
            .unwrap_or(SubjectStats {
                accepted: 0,
                paid_on_time: 0,
                paid_late: 0,
                overdue_open: 0,
                defaulted: 0,
                disputes_open: 0,
                disputes_resolved: 0,
                issuers_count: 0,
                first_ts: 0,
                last_ts: 0,
                max_bucket: AmountBucket::B0_1k,
            })
    }

    fn save_stats(env: &Env, subject_id: &BytesN<32>, stats: &SubjectStats) {
        let key = DataKey::Stats(subject_id.clone());
        env.storage().persistent().set(&key, stats);
        bump(env, &key);
    }

    /// C1/C2: un seudónimo, una dirección. Falla si el seudónimo ya tiene dirección o si la
    /// dirección ya tiene seudónimo.
    fn require_unbound(env: &Env, subject_id: &BytesN<32>, subject: &Address) -> Result<(), Error> {
        let st = env.storage().persistent();
        if st.has(&DataKey::SubjectAddr(subject_id.clone()))
            || st.has(&DataKey::AddrSubject(subject.clone()))
        {
            return Err(Error::AlreadyBound);
        }
        Ok(())
    }

    /// C7: borra las propuestas pendientes (cancelar y resolver). Toda función que cambia
    /// `note.status` la llama, para que una propuesta vieja no cierre un estado nuevo.
    fn clear_props(env: &Env, note_id: &BytesN<32>) {
        let st = env.storage().persistent();
        st.remove(&DataKey::CancelProp(note_id.clone()));
        st.remove(&DataKey::ResolveProp(note_id.clone()));
    }

    /// Pasa una nota a `Overdue` y suma `overdue_open` (desde `Accepted` o, C4, `PaidClaimed`).
    fn marcar_vencida(env: &Env, note: &mut Note, note_id: &BytesN<32>) {
        note.status = Status::Overdue;
        Self::clear_props(env, note_id);
        Self::save_note(env, note);
        let mut stats = Self::load_stats(env, &note.subject_id);
        stats.overdue_open += 1;
        Self::save_stats(env, &note.subject_id, &stats);
        env.events()
            .publish((cclaras(), name(env, "overdue")), note_id.clone());
    }

    fn subject_id_of(env: &Env, subject: &Address) -> Result<BytesN<32>, Error> {
        env.storage()
            .persistent()
            .get(&DataKey::AddrSubject(subject.clone()))
            .ok_or(Error::NotParty)
    }

    fn is_subject(env: &Env, note: &Note, who: &Address) -> bool {
        env.storage()
            .persistent()
            .get::<DataKey, Address>(&DataKey::SubjectAddr(note.subject_id.clone()))
            .map(|a| a == *who)
            .unwrap_or(false)
    }

    fn require_subject(env: &Env, note: &Note, who: &Address) -> Result<(), Error> {
        if Self::is_subject(env, note, who) {
            Ok(())
        } else {
            Err(Error::NotParty)
        }
    }

    fn require_party(env: &Env, note: &Note, who: &Address) -> Result<(), Error> {
        if *who == note.issuer || Self::is_subject(env, note, who) {
            Ok(())
        } else {
            Err(Error::NotParty)
        }
    }

    fn apply_resolution(env: &Env, note: &mut Note, outcome: &Status) {
        note.status = outcome.clone();
        match outcome {
            Status::Paid => note.paid_ts = Some(env.ledger().timestamp()),
            Status::Defaulted => note.defaulted_ts = Some(env.ledger().timestamp()), // C6
            _ => {}
        }
    }

    fn apply_resolution_stats(
        env: &Env,
        note: &Note,
        outcome: &Status,
        stats: &mut SubjectStats,
    ) {
        match outcome {
            Status::Paid => {
                let on_time = env.ledger().timestamp() <= note.due_ts;
                if on_time {
                    stats.paid_on_time += 1;
                } else {
                    stats.paid_late += 1;
                }
            }
            Status::Defaulted => {
                stats.defaulted += 1;
            }
            _ => {}
        }
    }
}

/// Prefijo de tópico de eventos (spec v2, §7). `symbol_short!` admite máximo 9 caracteres;
/// `cclaras` cabe (7).
fn cclaras() -> Symbol {
    symbol_short!("cclaras")
}

/// Nombre de evento sin acortar (spec v2, §7): varios superan 9 caracteres, así que se crean con
/// `Symbol::new` para que se lean completos en el explorador durante la demo.
fn name(env: &Env, n: &str) -> Symbol {
    Symbol::new(env, n)
}

mod test;
