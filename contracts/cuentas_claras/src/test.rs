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

// --- Camino feliz completo (invariantes 1, 7) -------------------------------

#[test]
fn camino_feliz() {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    let mary = Address::generate(&env);
    client.add_issuer(&admin, &issuer);

    let note = id(&env, 1);
    let subj = id(&env, 100);
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
    let due = T0 + 7 * DAY;
    client.create_note(&issuer, &note, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &note);
    set_time(&env, due + 1);
    client.touch(&note);
    set_time(&env, due + 31 * DAY);
    client.mark_default(&issuer, &note);

    // Ventana de disputa: due + gracia(30d) + disputa(15d). Más allá: cerrada.
    set_time(&env, due + 30 * DAY + 16 * DAY);
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
