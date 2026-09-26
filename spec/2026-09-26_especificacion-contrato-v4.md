# Especificación del contrato v4 — cierre de los hallazgos de la auditoría

**Estado:** vigente. Aprobada por José el sábado 26-sep-2026 a las 17:40 (decisión #55).
**Para:** Claude Code en el **Codespace original**, que es donde están las llaves de testnet.
**Base:** `docs/auditoria-2026-09-26.md`, hallazgos C1 a C9. Cambia la spec v2 §5 solo en lo que dice aquí. Lo demás sigue igual: interfaz, eventos, `read_stats` con permiso (#46) y ninguna función de actualización (#30).

**Tiempo:** K1, 90 minutos; K2, 45; K3, 30. Si a las 13:00 del domingo no está desplegado, se detiene y se presenta el contrato v3 con los huecos documentados (auditoría §1).

## 0. Por qué

- **C1, crítico.** Hoy el seudónimo queda ligado a la primera dirección que acepta una nota. Una bodega puede aceptar su propia nota y fabricar historial, y un tercero puede ganarle la aceptación al cliente.
- Esto rompe la promesa central: «ninguna bodega escribe sola una deuda».
- Mientras siga abierto, **no se puede decir en el pitch**.

## 1. K1 · Cambios en `contracts/cuentas_claras/src/lib.rs`

### 1.1 Vínculo previo y explícito del cliente (C1, C2)

El vínculo se hace **en dos pasos, cada uno con una sola firma**. Así funciona con el mismo camino del Stellar CLI que ya usa la app, sin firmas múltiples en una transacción.

| Función | Quién firma | Qué hace |
|---|---|---|
| `invite_subject(admin, subject_id, subject)` | plataforma (`require_admin`) | Guarda `PendingBind(subject_id) = subject`. Falla con `AlreadyBound` si el `subject_id` ya tiene dirección o si la dirección ya tiene seudónimo. Mientras siga pendiente, la plataforma puede reemplazar la invitación. Evento `subject_invited(subject_id)`. |
| `bind_subject(subject, subject_id)` | el cliente (`subject.require_auth()`) | Exige `PendingBind(subject_id) == subject`; si no, `NotParty`. Vuelve a revisar `AlreadyBound`. Escribe `SubjectAddr` y `AddrSubject`, borra `PendingBind` y emite `subject_bound(subject_id)`. **El vínculo nunca se sobrescribe.** |
| `subject_of(subject_id) -> Option<Address>` | nadie (consulta) | Devuelve la dirección vinculada. Lo usan `demo.sh` y `sembrar.sh` para vincular solo si falta. |

**Cambios en las funciones que ya existen:**
- **Se borra** el ayudante privado `bind_subject` y su llamada en `accept_note`.
- **`create_note`:**
  - si el `subject_id` no tiene dirección vinculada, falla con `NotBound`;
  - si la dirección vinculada es la del emisor, falla con `SelfNote`.
- **`accept_note`:** exige `Self::require_subject(&env, &note, &subject)` (firma la dirección vinculada); si no, `NotParty`.

**Errores nuevos**, al final del `enum`, sin renumerar los existentes: `AlreadyBound = 13`, `NotBound = 14`, `SelfNote = 15`.

### 1.2 Estados y ventanas

| # | Cambio |
|---|---|
| C4 | `touch`: una nota en `PaidClaimed` pasa a `Overdue` cuando `now > due_ts + grace_period` (y `overdue_open += 1`). Emite `overdue`. |
| C5 | `confirm_paid` acepta también `Overdue` → `Paid`: `paid_late += 1` y `overdue_open -= 1` (con `saturating_sub`). |
| C6 | `Note` gana el campo `defaulted_ts: Option<u64>`, que `mark_default` y `apply_resolution` (desenlace `Defaulted`) llenan con `now`. **La ventana de disputa de una nota incumplida corre desde `defaulted_ts`:** el cliente puede disputar hasta `defaulted_ts + dispute_window`. En una nota `Overdue` sigue igual: hasta `due_ts + grace_period + dispute_window`. |
| C7 | `DataKey::Resolve` se parte en `CancelProp(note_id)` (solo para `cancel_note` desde `Accepted`) y `ResolveProp(note_id)` (solo para `resolve_mutual` desde `Disputed`). Un ayudante `clear_props(env, note_id)` borra las dos, y **toda función que cambie `note.status` lo llama**. |
| C3, parcial | `Note` gana el campo `disputed_once: bool`. Una nota entra a `Disputed` **una sola vez**; la segunda vez, `InvalidTransition`. La aclaración que nunca se resuelve se atiende fuera de la cadena, en el semáforo (decisión #56). |
| C8 | `init` llama `admin.require_auth()`. |
| C9 | `create_note` rechaza `due_ts > now + 365 días` con `BadParams`. |

**No cambia:** `read_stats` (permiso para cualquier bodega; `aggregate_read` en cada éxito), consentimientos, `issuers_count`, TTL ni tópico `cclaras`. **No se agrega** `upgrade` ni `update_current_contract_wasm`.

### 1.3 Pruebas (`src/test.rs`)

- **Pruebas existentes:** agrega el ayudante `vincular(&client, &admin, &subject_id, &addr)` (`invite_subject` + `bind_subject`) y llámalo antes de la primera nota de cada cliente. **No debilites ni borres ninguna aserción.** Si una prueba ya no aplica, explica por qué en el commit.
- **Regresión.** Las 8 pruebas de concepto del auditor (apéndice A) entran **invertidas**: cada una comprueba que el ataque ya no funciona.

| Prueba | Debe comprobar |
|---|---|
| `r1_nadie_se_queda_el_seudonimo` | `create_note` sobre un seudónimo sin vincular → `NotBound`. Con Doña Mary vinculada, `accept_note` firmado por otra dirección → `NotParty`. |
| `r2_bodega_no_acepta_su_nota` | Con el seudónimo vinculado a la dirección del emisor, `create_note` → `SelfNote`. Con Doña Mary vinculada, `accept_note` firmado por el emisor → `NotParty`. |
| `r3_un_seudonimo_una_direccion` | `invite_subject` con una dirección ya vinculada a otro seudónimo → `AlreadyBound`. Volver a vincular el mismo seudónimo → `AlreadyBound`. |
| `r4_pago_tardio_se_confirma` | Nota vencida (`touch` después de `due_ts`), luego `confirm_paid` → `Paid`, con `paid_late == 1` y `overdue_open == 0`. |
| `r5_disputa_una_sola_vez` | Disputa, resolución mutua a `Defaulted` y nueva disputa → `InvalidTransition`. Documenta en un comentario que la disputa sin resolver sigue abierta en la cadena y cómo la trata el semáforo (#56). |
| `r6_incumplida_tardia_se_puede_disputar` | `mark_default` a `due + 46 días`: la disputa del cliente funciona el mismo día y falla con `WindowClosed` en `defaulted_ts + dispute_window + 1`. |
| `r7_propuesta_vieja_no_cierra` | Propuesta de cancelar en `Accepted`, `touch` a `Overdue`, disputa y una sola `resolve_mutual(Cancelled)` → la nota sigue en `Disputed`. |
| `r8_aviso_de_pago_no_evita_vencer` | `claim_paid` y `touch` en `due + grace + 1` → `Overdue`, con `overdue_open == 1`. |
| `r9_init_exige_firma` | Con `env.auths()`, `init` pidió la firma del admin. |
| `r10_plazo_con_tope` | `due_ts = now + 366 días` → `BadParams`. |

**Criterio K1:** `cargo test` en verde con todas las pruebas, `stellar contract build` sin advertencias nuevas y `grep -n "upgrade\|update_current_contract_wasm" src/lib.rs` vacío. Un commit: «Contrato v4: vínculo previo del cliente y cierre de C1–C9 (decisión #55)».

## 2. K2 · Despliegue y datos de demo

1. **Despliega** con `plataforma` e inicializa con los mismos parámetros de `demo/deploy.json`.
2. **Registra** `bodega_a` (A-17), `bodega_b` (B-40) y `bodega_c` (A-73) con `add_issuer`.
3. **`demo/deploy.json`:**
   - pasa el contrato `CDPFZNYZ…BDTW` a `contratos_anteriores`, con el motivo «C1: el seudónimo se ligaba a quien aceptara primero (#55)»;
   - anota el nuevo Contract ID y la hora.
4. **`demo/sembrar.sh` y `demo/demo.sh`:** antes de la primera nota, si `subject_of` devuelve vacío, `invite_subject` (firma `plataforma`) y luego `bind_subject` (firma `dona_mary`). Lo demás no cambia.
5. **Backend:** agrega mensajes en español para los errores 13 a 15 donde se traducen los demás (sin la palabra «blockchain»):
   - 13: «Este cliente ya está vinculado.»
   - 14: «Primero hay que registrar a este cliente.»
   - 15: «Una bodega no puede firmar como su propio cliente.»

   No cambies nada más del backend. Las correcciones B1–B6 las hace Claude Code en la web; haz `git pull --rebase` antes de empezar.
6. **Corre** `./demo/sembrar.sh` y después `./demo/demo.sh` completo. Antes de sobrescribir `demo/salida-demo.txt`, cópialo como `demo/salida-demo_contrato-v3.txt`: es el registro de la corrida anterior y se queda. Después guarda la corrida nueva en `demo/salida-demo.txt`.
7. **Prueba la app local:**
   - `node backend/server.js`;
   - un recorrido completo en el navegador;
   - `node --test backend/test/*.test.js` en verde.

**Criterio K2:** la corrida nueva tiene los 5 hashes (crear, aceptar, confirmar, dar permiso, consultar) y el rechazo sin permiso sin hash. `demo/deploy.json` es JSON válido y sin llaves.

## 3. K3 · Todo apunta al contrato nuevo

1. `node web/herramientas/generar-repeticion.js` y `node --test web/pruebas/` en verde.
2. **Cambia el Contract ID y los hashes de la corrida anterior por los nuevos** en todo lo que describe el estado actual.
   - Encuentra los archivos con `grep -rln "CDPFZNYZ" --exclude-dir=research --exclude-dir=privado --exclude-dir=.git .`. Los hashes viejos se buscan igual, uno por uno, desde `demo/salida-demo_contrato-v3.txt`.
   - **No los cambies en** `docs/decisiones.md` (historia), `docs/auditoria-2026-09-26.md`, `contratos_anteriores` ni `demo/salida-demo_contrato-v3.txt`.
3. En `docs/decisiones.md`, fila #55: agrega el nuevo Contract ID y la hora del despliegue.
4. En `docs/relevo-claude-code.md` §1: contrato nuevo, número de pruebas y la regla del vínculo previo.
5. En `spec/2026-09-25_especificacion-tecnica-v2.md`, **solo** al final de la §3b, agrega este renglón: «v4 (decisión #55): el cliente se vincula a su seudónimo antes de su primera nota, con la firma de la plataforma y la suya; ninguna bodega puede aceptar su propia nota.»

**Criterio K3:** el grep del punto 2 solo encuentra el ID viejo en los archivos excluidos. Un commit por paso (K2 y K3), con push después de `git pull --rebase`.

## 4. Paradas obligatorias

- Algo falla dos veces seguidas.
- Hay que tocar `research/`, `privado/` o las llaves.
- Algo pide mainnet.
- Son más de las 13:00 del domingo y no está desplegado.

En cualquiera de esos casos, escribe el error exacto en `docs/cola-de-trabajo.md`, bajo una tarea «[!] Contrato v4», y detente.

## 5. Qué se dice después (pitch y jurado)

- **Ya se puede decir:** «Ninguna bodega escribe sola una deuda: el cliente se vincula una vez, con su firma, y solo esa firma acepta sus notas».
- **Límite honesto:** una bodega y un cómplice pueden inventar un cliente. Eso lo frena la plataforma al vincular (verifica el teléfono) y el semáforo, que exige dos bodegas distintas.
- **La aclaración sin resolver:** sigue abierta en la cadena. El semáforo la cuenta como vencida (#56), y el plazo de resolución dentro del contrato va en la hoja de ruta.

## Apéndice A · Pruebas de concepto del auditor (código de referencia)

Estas pruebas **pasan con el contrato v3**, es decir, reproducen el ataque. En la v4 se escriben al revés, según la tabla 1.3. Usan `setup()`, `set_time()` e `id()` de `src/test.rs`, más este ayudante:

```rust
fn base() -> (Env, CuentasClarasClient<'static>, Address, Address) {
    let (env, client, admin) = setup();
    let issuer = Address::generate(&env);
    client.add_issuer(&admin, &issuer);
    (env, client, admin, issuer)
}

#[test]
fn poc_hijack_subject() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let atacante = Address::generate(&env);
    let subj = id(&env, 100);
    let n = id(&env, 1);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&atacante, &n); // cualquiera acepta y se queda el seudónimo
    client.confirm_paid(&issuer, &n);
    let n2 = id(&env, 2);
    client.create_note(&issuer, &n2, &subj, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    assert_eq!(client.try_accept_note(&mary, &n2), Err(Ok(Error::NotParty)));
}

#[test]
fn poc_emisor_autoacepta() {
    let (env, client, _a, issuer) = base();
    let subj = id(&env, 100);
    let n = id(&env, 1);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B50kPlus, &(T0 + 7 * DAY));
    client.accept_note(&issuer, &n);
    client.confirm_paid(&issuer, &n);
    assert_eq!(client.read_stats(&issuer, &subj).paid_on_time, 1);
}

#[test]
fn poc_consent_irrevocable_multi_subject() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let banco = Address::generate(&env);
    let (x, y) = (id(&env, 100), id(&env, 101));
    let n1 = id(&env, 1);
    client.create_note(&issuer, &n1, &x, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &n1);
    client.grant_consent(&mary, &banco, &(T0 + 20 * DAY), &1);
    let n2 = id(&env, 2);
    client.create_note(&issuer, &n2, &y, &AmountBucket::B1k_5k, &(T0 + 7 * DAY));
    client.accept_note(&mary, &n2); // misma Address, otro seudónimo: sobrescribe AddrSubject
    client.revoke_consent(&mary, &banco); // revoca sobre Y, no sobre X
    assert_eq!(client.read_stats(&banco, &x).accepted, 1); // X sigue abierto
}

#[test]
fn poc_touch_bloquea_confirm_paid() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    set_time(&env, due + 1);
    client.touch(&n);
    assert_eq!(client.try_confirm_paid(&issuer, &n), Err(Ok(Error::InvalidTransition)));
}

#[test]
fn poc_deudor_borra_incumplida() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    set_time(&env, due + 1);
    client.touch(&n);
    client.dispute(&mary, &n, &0);
    set_time(&env, due + 400 * DAY);
    assert_eq!(client.try_mark_default(&issuer, &n), Err(Ok(Error::InvalidTransition)));
    let s = client.read_stats(&mary, &subj);
    assert_eq!((s.overdue_open, s.defaulted, s.disputes_open), (0, 0, 1));
}

#[test]
fn poc_default_tardio_no_disputable() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    set_time(&env, due + 46 * DAY);
    client.touch(&n);
    client.mark_default(&issuer, &n);
    assert_eq!(client.try_dispute(&mary, &n, &0), Err(Ok(Error::WindowClosed)));
}

#[test]
fn poc_propuesta_rancia_cierra_disputa() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    client.cancel_note(&issuer, &n); // propuesta de cancelar; Mary no la firma
    set_time(&env, due + 1);
    client.touch(&n);
    client.dispute(&mary, &n, &0);
    client.resolve_mutual(&mary, &n, &Status::Cancelled); // una sola llamada cierra
    assert_eq!(client.get_note(&n).unwrap().status, Status::Cancelled);
}

#[test]
fn poc_claim_paid_evita_vencimiento() {
    let (env, client, _a, issuer) = base();
    let mary = Address::generate(&env);
    let (subj, n, due) = (id(&env, 100), id(&env, 1), T0 + 7 * DAY);
    client.create_note(&issuer, &n, &subj, &AmountBucket::B1k_5k, &due);
    client.accept_note(&mary, &n);
    client.claim_paid(&mary, &n, &None);
    set_time(&env, due + 400 * DAY);
    assert_eq!(client.try_touch(&n), Err(Ok(Error::InvalidTransition)));
}
```
