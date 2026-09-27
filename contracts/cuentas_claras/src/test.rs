#![cfg(test)]
//! Invariantes de la spec v2, §6. Cada prueba nombra el invariante que sostiene.

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Events as _, Ledger as _},
    Address, BytesN, Env,
};

const HOUR: u64 = 3_600;
const DAY: u64 = 86_400;
const T0: u64 = 1_000_000;

fn default_params() -> Params {
    Params {
        accept_window: 72 * HOUR,
        grace_period: 30 * DAY,
        dispute_window: 15 * DAY,
        consent_ttl: 30 * DAY,
    }
}

/// Env con contrato inicializado, auth simulada y un ledger con TTL máximo holgado.
fn setup() -> (Env, CuentasClarasClient<'static>, Address) {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().with_mut(|li| {
        li.timestamp = T0;
        li.sequence_number = 10;
        li.min_temp_entry_ttl = 16;
        li.min_persistent_entry_ttl = 4_096;
        li.max_entry_ttl = 3_110_400;
    });
    let contract_id = env.register(CuentasClaras, ());
    let client = CuentasClarasClient::new(&env, &contract_id);
    let admin = Address::generate(&env);
    client.init(&admin, &default_params());
    (env, client, admin)
}

fn set_time(env: &Env, t: u64) {
    env.ledger().with_mut(|li| li.timestamp = t);
}

fn id(env: &Env, tag: u8) -> BytesN<32> {
    let mut a = [0u8; 32];
    a[0] = tag;
    BytesN::from_array(env, &a)
}

/// Vínculo previo del cliente (contrato v4, C1): la plataforma invita y el cliente firma.
fn vincular(client: &CuentasClarasClient, admin: &Address, subject_id: &BytesN<32>, addr: &Address) {
    client.invite_subject(admin, subject_id, addr);
    client.bind_subject(addr, subject_id);
}

// --- Camino feliz completo (invariantes 1, 7) -------------------------------

#[test]
fn camino_feliz() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    let due = T0 + 7 * DAY;

    client.create_note(&issuer, &note, &subj, &AmountBucket::B5k_20k, &due);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Created);

    // Accepted exige la firma del sujeto en una transacción aparte (invariante 1).
    client.accept_note(&mary, &note);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Accepted);

    client.claim_paid(&mary, &note, &None);
    client.confirm_paid(&issuer, &note);

    let n = client.get_note(&note).unwrap();
    assert_eq!(n.status, Status::Paid);
    assert!(n.paid_ts.is_some());

    // Contadores actualizados solo por el contrato (invariante 7).
    let s = client.read_stats(&mary, &subj);
    assert_eq!(s.accepted, 1);
    assert_eq!(s.paid_on_time, 1);
    assert_eq!(s.paid_late, 0);
    assert_eq!(s.issuers_count, 1);
    assert_eq!(s.max_bucket, AmountBucket::B5k_20k);
}

// --- issuers_count cuenta emisores distintos una sola vez (invariante 9) ----

#[test]
fn dos_emisores_issuers_count_2() {
    let (env, client, admin) = setup();
    let a = Address::generate(&env);
    let b = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &a);
    client.add_issuer(&admin, &b);

    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);

    let n1 = id(&env, 1);
    client.create_note(&a, &n1, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &n1);

    let n2 = id(&env, 2);
    client.create_note(&b, &n2, &subj, &AmountBucket::B5k_20k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &n2);

    // Una tercera nota del MISMO emisor A no vuelve a sumar.
    let n3 = id(&env, 3);
    client.create_note(&a, &n3, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &n3);

    let s = client.read_stats(&mary, &subj);
    assert_eq!(s.issuers_count, 2);
    assert_eq!(s.accepted, 3);
}

// --- Un emisor fuera de la lista no crea notas (invariante 8) ---------------

#[test]
fn emisor_ajeno_no_crea() {
    let (env, client, _admin) = setup();
    let ajeno = Address::generate(&env);
    let subj = id(&env, 100);
    let note = id(&env, 1);
    assert_eq!(
        client.try_create_note(&ajeno, &note, &subj, &AmountBucket::B1k_5k, &(T0 + DAY)),
        Err(Ok(Error::NotIssuer))
    );
}

// --- Aceptación fuera de ventana falla (spec §5, accept_window) -------------

#[test]
fn aceptar_fuera_de_ventana_falla() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &(T0 + 100 * DAY));

    set_time(&env, T0 + 73 * HOUR); // ventana de aceptación: 72 h
    assert_eq!(
        client.try_accept_note(&mary, &note),
        Err(Ok(Error::WindowClosed))
    );

    // Y `touch` la cancela mecánicamente.
    client.touch(&note);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Cancelled);
}

// --- Overdue mecánica y mark_default antes de la gracia falla (inv. 3, 4) ---

#[test]
fn mark_default_antes_de_gracia_falla() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    let due = T0 + 7 * DAY;
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &note);

    // Overdue es mecánica: now > due_ts (invariante 4).
    set_time(&env, due + 1);
    client.touch(&note);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Overdue);
    assert_eq!(client.read_stats(&mary, &subj).overdue_open, 1);

    // Antes de la gracia: TooEarly (invariante 3).
    set_time(&env, due + 10 * DAY); // gracia = 30 d
    assert_eq!(
        client.try_mark_default(&issuer, &note),
        Err(Ok(Error::TooEarly))
    );

    // Pasada la gracia: se marca Defaulted.
    set_time(&env, due + 31 * DAY);
    client.mark_default(&issuer, &note);
    let s = client.read_stats(&mary, &subj);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Defaulted);
    assert_eq!(s.overdue_open, 0);
    assert_eq!(s.defaulted, 1);
}

// --- Disputa fuera de ventana falla (spec §5, dispute_window) ---------------

#[test]
fn disputa_fuera_de_ventana_falla() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    let due = T0 + 7 * DAY;
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &note);
    set_time(&env, due + 1);
    client.touch(&note);
    set_time(&env, due + 31 * DAY);
    client.mark_default(&issuer, &note);

    // Ventana de disputa de una incumplida (v4, C6): defaulted_ts + disputa(15d). Se marcó en
    // due + 31d, así que cierra en due + 46d; un segundo después: cerrada.
    set_time(&env, due + 31 * DAY + 15 * DAY + 1);
    assert_eq!(
        client.try_dispute(&mary, &note, &7u32),
        Err(Ok(Error::WindowClosed))
    );
}

// --- Disputa dentro de ventana y cierre mutuo (spec §5, resolve_mutual) -----

#[test]
fn disputa_y_resolucion_mutua() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    let due = T0 + 7 * DAY;
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &note);
    set_time(&env, due + 1);
    client.touch(&note);
    set_time(&env, due + 31 * DAY);
    client.mark_default(&issuer, &note);

    // Dentro de ventana: el sujeto disputa.
    set_time(&env, due + 31 * DAY);
    client.dispute(&mary, &note, &7u32);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Disputed);
    let s = client.read_stats(&mary, &subj);
    assert_eq!(s.disputes_open, 1);
    assert_eq!(s.defaulted, 0); // se movió a disputa

    // Cierre mutuo: dos llamadas coincidentes.
    client.resolve_mutual(&issuer, &note, &Status::Cancelled);
    assert_eq!(client.get_note(&note).unwrap().status, Status::Disputed); // aún falta la contraparte
    client.resolve_mutual(&mary, &note, &Status::Cancelled);

    assert_eq!(client.get_note(&note).unwrap().status, Status::Cancelled);
    let s = client.read_stats(&mary, &subj);
    assert_eq!(s.disputes_open, 0);
    assert_eq!(s.disputes_resolved, 1);
}

// --- Lectura sin consentimiento falla; con consentimiento funciona;
//     solo el propio sujeto lee sin consentimiento (invariantes 6, 11) -----

#[test]
fn lectura_sin_consentimiento_falla() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    let tercero = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B5k_20k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &note);

    // Tercero sin consentimiento: NoConsent (invariante 11).
    assert_eq!(
        client.try_read_stats(&tercero, &subj),
        Err(Ok(Error::NoConsent))
    );

    // El propio sujeto lee su agregado sin consentimiento.
    let evs_antes = env.events().all().events().len();
    let s = client.read_stats(&mary, &subj);
    assert_eq!(s.accepted, 1);
    // read_stats deja constancia: emite evento en cada éxito (invariante 6).
    assert!(env.events().all().events().len() > evs_antes);
}

#[test]
fn emisor_con_notas_necesita_permiso() {
    // Decisión #46 (c): tener notas aceptadas del sujeto no abre su agregado.
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B5k_20k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &note);

    // Sin permiso: NoConsent, aunque sea emisor de una nota aceptada.
    assert_eq!(
        client.try_read_stats(&issuer, &subj),
        Err(Ok(Error::NoConsent))
    );
    // Su propia nota sí la ve con get_note.
    assert_eq!(client.get_note(&note).unwrap().status, Status::Accepted);

    // Con permiso del sujeto, lee.
    client.grant_consent(&mary, &issuer, &(T0 + 10 * DAY), &1u64);
    assert_eq!(client.read_stats(&issuer, &subj).accepted, 1);
}

#[test]
fn lectura_con_consentimiento_y_vencido() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    let banco = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B5k_20k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &note);

    // El sujeto autoriza al banco por 10 días.
    let exp = T0 + 10 * DAY;
    client.grant_consent(&mary, &banco, &exp, &1u64);

    // Dentro de vigencia: lee.
    let s = client.read_stats(&banco, &subj);
    assert_eq!(s.accepted, 1);

    // Vencido: ConsentExpired.
    set_time(&env, exp + 1);
    assert_eq!(
        client.try_read_stats(&banco, &subj),
        Err(Ok(Error::ConsentExpired))
    );

    // Revocado: NoConsent.
    set_time(&env, T0);
    client.revoke_consent(&mary, &banco);
    assert_eq!(
        client.try_read_stats(&banco, &subj),
        Err(Ok(Error::NoConsent))
    );
}

// --- Consentimiento fuera del tope de vigencia falla (spec §4, consent_ttl) -

#[test]
fn consentimiento_excede_ttl_falla() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    let banco = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &note);

    // consent_ttl = 30 d; pedir 40 d excede el tope.
    assert_eq!(
        client.try_grant_consent(&mary, &banco, &(T0 + 40 * DAY), &1u64),
        Err(Ok(Error::BadParams))
    );
}

// --- No se puede reinicializar; params inválidos fallan ----------------------

#[test]
fn no_reinicializa_y_params_invalidos() {
    let (env, client, admin) = setup();
    assert_eq!(
        client.try_init(&admin, &default_params()),
        Err(Ok(Error::AlreadyInit))
    );

    // Contrato nuevo: params en cero -> BadParams.
    let contract_id = env.register(CuentasClaras, ());
    let c2 = CuentasClarasClient::new(&env, &contract_id);
    let bad = Params {
        accept_window: 0,
        grace_period: 30 * DAY,
        dispute_window: 15 * DAY,
        consent_ttl: 30 * DAY,
    };
    assert_eq!(c2.try_init(&admin, &bad), Err(Ok(Error::BadParams)));
}

// --- El agregado solo sale por read_stats (decisión #42, invariante 11) -----

#[test]
fn no_hay_get_stats_publico() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    let tercero = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &note, &subj, &AmountBucket::B5k_20k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &note);

    // `get_stats` ya no existe: invocarla por nombre falla (antes entregaba el agregado
    // a cualquiera, sin consentimiento ni constancia).
    let args: soroban_sdk::Vec<soroban_sdk::Val> = soroban_sdk::vec![&env, subj.to_val()];
    let r = env.try_invoke_contract::<SubjectStats, Error>(
        &client.address,
        &soroban_sdk::Symbol::new(&env, "get_stats"),
        args,
    );
    assert!(r.is_err());

    // La única vía pública al agregado sigue exigiendo permiso a un tercero.
    assert_eq!(
        client.try_read_stats(&tercero, &subj),
        Err(Ok(Error::NoConsent))
    );
}

// ===========================================================================
// Regresión del contrato v4 (decisión #55; spec v4 §1.3). Cada prueba es una prueba de
// concepto del auditor (apéndice A) al revés: comprueba que el ataque ya no funciona.
// ===========================================================================

fn base() -> (Env, CuentasClarasClient<'static>, Address, Address) {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    client.add_issuer(&admin, &issuer);
    (env, client, admin, issuer)
}

#[test]
fn r1_nadie_se_queda_el_seudonimo() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let atacante = Address::generate(&env);
    let subj = id(&env, 100);
    let n = id(&env, 1);

    // Sin vínculo previo no hay nota: nadie puede adelantarse a aceptarla.
    assert_eq!(client.subject_of(&subj), None);
    assert_eq!(
        client.try_create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY)),
        Err(Ok(Error::NotBound))
    );

    vincular(&client, &admin, &subj, &mary);
    assert_eq!(client.subject_of(&subj), Some(mary.clone()));
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    // Otra dirección no acepta la nota de Doña Mary.
    assert_eq!(client.try_accept_note(&atacante, &n), Err(Ok(Error::NotParty)));
    assert_eq!(client.get_note(&n).unwrap().status, Status::Created);
    // Doña Mary sí.
    client.accept_note(&mary, &n);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Accepted);
}

#[test]
fn r2_bodega_no_acepta_su_nota() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);

    // Seudónimo vinculado a la dirección de la propia bodega: no puede fiarse a sí misma.
    let propio = id(&env, 100);
    vincular(&client, &admin, &propio, &issuer);
    assert_eq!(
        client.try_create_note(&issuer, &id(&env, 1), &propio, &AmountBucket::B50kPlus, &(T0 + 7 * DAY)),
        Err(Ok(Error::SelfNote))
    );

    // Con Doña Mary vinculada, la bodega no firma por ella.
    let subj = id(&env, 101);
    vincular(&client, &admin, &subj, &mary);
    let n = id(&env, 2);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B50kPlus, &(T0 + 7 * DAY));
    assert_eq!(client.try_accept_note(&issuer, &n), Err(Ok(Error::NotParty)));
    assert_eq!(client.read_stats(&mary, &subj).accepted, 0);
}

#[test]
fn r3_un_seudonimo_una_direccion() {
    let (env, client, admin, _issuer) = base();
    let mary = Address::generate(&env);
    let otra = Address::generate(&env);
    let (x, y) = (id(&env, 100), id(&env, 101));

    // Mientras la invitación está pendiente, la plataforma la puede reemplazar; solo firma
    // la dirección invitada.
    client.invite_subject(&admin, &x, &otra);
    client.invite_subject(&admin, &x, &mary);
    assert_eq!(client.try_bind_subject(&otra, &x), Err(Ok(Error::NotParty)));
    client.bind_subject(&mary, &x);

    // Una dirección ya vinculada no recibe otro seudónimo (C2: el permiso no queda huérfano).
    assert_eq!(client.try_invite_subject(&admin, &y, &mary), Err(Ok(Error::AlreadyBound)));
    // Volver a vincular el mismo seudónimo: tampoco. El vínculo nunca se sobrescribe.
    assert_eq!(client.try_invite_subject(&admin, &x, &otra), Err(Ok(Error::AlreadyBound)));
    assert_eq!(client.try_invite_subject(&admin, &x, &mary), Err(Ok(Error::AlreadyBound)));
    assert_eq!(client.try_bind_subject(&mary, &x), Err(Ok(Error::NotParty))); // sin invitación
    assert_eq!(client.subject_of(&x), Some(mary.clone()));

    // Solo la plataforma invita.
    let intruso = Address::generate(&env);
    assert_eq!(client.try_invite_subject(&intruso, &y, &otra), Err(Ok(Error::NotParty)));
}

#[test]
fn r4_pago_tardio_se_confirma() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    set_time(&env, due + 1);
    client.touch(&n);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Overdue);

    client.confirm_paid(&issuer, &n);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Paid);
    let s = client.read_stats(&mary, &subj);
    assert_eq!((s.paid_late, s.paid_on_time, s.overdue_open), (1, 0, 0));
}

#[test]
fn r5_disputa_una_sola_vez() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    set_time(&env, due + 1);
    client.touch(&n);
    set_time(&env, due + 31 * DAY);
    client.mark_default(&issuer, &n);

    client.dispute(&mary, &n, &0u32);
    client.resolve_mutual(&issuer, &n, &Status::Defaulted);
    client.resolve_mutual(&mary, &n, &Status::Defaulted);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Defaulted);

    // La segunda disputa ya no entra, aunque la ventana siga abierta.
    assert_eq!(client.try_dispute(&mary, &n, &0u32), Err(Ok(Error::InvalidTransition)));
    let s = client.read_stats(&mary, &subj);
    assert_eq!((s.defaulted, s.disputes_open, s.disputes_resolved), (1, 0, 1));

    // Nota: una disputa que nunca se resuelve sigue abierta en la cadena (disputes_open = 1 y la
    // nota fuera de overdue_open/defaulted). El contrato no la cierra sola; el semáforo, fuera de
    // la cadena, pesa cada aclaración abierta como una vencida (decisión #56), así que abrir una
    // aclaración no mejora el color.
}

#[test]
fn r6_incumplida_tardia_se_puede_disputar() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, due) = (id(&env, 100), T0 + 7 * DAY);
    vincular(&client, &admin, &subj, &mary);
    let (n1, n2) = (id(&env, 1), id(&env, 2));
    for n in [&n1, &n2] {
        client.create_note(&issuer, n, &subj, &AmountBucket::B1k_5k, &due);
        client.accept_note(&mary, n);
    }

    // La bodega espera a marcarla incumplida hasta due + 46 días (después de la ventana v3).
    let marcado = due + 46 * DAY;
    set_time(&env, marcado);
    for n in [&n1, &n2] {
        client.touch(n);
        client.mark_default(&issuer, n);
        assert_eq!(client.get_note(n).unwrap().defaulted_ts, Some(marcado));
    }

    // El mismo día, el cliente todavía puede disputar.
    client.dispute(&mary, &n1, &0u32);
    assert_eq!(client.get_note(&n1).unwrap().status, Status::Disputed);

    // Pasada la ventana contada desde defaulted_ts, ya no.
    set_time(&env, marcado + 15 * DAY + 1);
    assert_eq!(client.try_dispute(&mary, &n2, &0u32), Err(Ok(Error::WindowClosed)));
}

#[test]
fn r7_propuesta_vieja_no_cierra() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    client.cancel_note(&issuer, &n); // propuesta de cancelar; Mary no la firma
    set_time(&env, due + 1);
    client.touch(&n);
    client.dispute(&mary, &n, &0u32);

    // Una sola llamada ya no cierra la disputa con la propuesta vieja.
    client.resolve_mutual(&mary, &n, &Status::Cancelled);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Disputed);
    // Hace falta la contraparte, ahora sí.
    client.resolve_mutual(&issuer, &n, &Status::Cancelled);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Cancelled);
}

#[test]
fn r8_aviso_de_pago_no_evita_vencer() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    vincular(&client, &admin, &subj, &mary);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    client.claim_paid(&mary, &n, &None);

    // Dentro de la gracia, el aviso de pago sigue esperando la confirmación.
    set_time(&env, due + 30 * DAY);
    assert_eq!(client.try_touch(&n), Err(Ok(Error::InvalidTransition)));
    // Pasados plazo y gracia sin confirmación, vence.
    set_time(&env, due + 30 * DAY + 1);
    client.touch(&n);
    assert_eq!(client.get_note(&n).unwrap().status, Status::Overdue);
    assert_eq!(client.read_stats(&mary, &subj).overdue_open, 1);
}

#[test]
fn r9_init_exige_firma() {
    let (env, _client, admin) = setup();
    let contract_id = env.register(CuentasClaras, ());
    let c2 = CuentasClarasClient::new(&env, &contract_id);
    c2.init(&admin, &default_params());
    let pidio_firma = env.auths().iter().any(|(quien, inv)| {
        *quien == admin
            && matches!(
                &inv.function,
                soroban_sdk::testutils::AuthorizedFunction::Contract((c, f, _))
                    if *c == contract_id && *f == soroban_sdk::Symbol::new(&env, "init")
            )
    });
    assert!(pidio_firma, "init debe pedir la firma del admin");
}

#[test]
fn r10_plazo_con_tope() {
    let (env, client, admin, issuer) = base();
    let mary = Address::generate(&env);
    let subj = id(&env, 100);
    vincular(&client, &admin, &subj, &mary);
    assert_eq!(
        client.try_create_note(&issuer, &id(&env, 1), &subj, &AmountBucket::B1k_5k, &(T0 + 366 * DAY)),
        Err(Ok(Error::BadParams))
    );
    // En el tope exacto (365 días) sí se crea.
    client.create_note(&issuer, &id(&env, 2), &subj, &AmountBucket::B1k_5k, &(T0 + 365 * DAY));
}
