# Especificación técnica v2 — Cuentas Claras (MVP en Stellar testnet)

**Estado: v2, vigente para construcción (25-sep-2026, 11:50; nombre actualizado a las 12:30).** Sustituye a la v1. Corrige un error de la v1 sobre privacidad (sección 3b), prohíbe la función de actualización del contrato, fija el nombre (proyecto **Cuentas Claras**, contrato `cuentas_claras`; equipo **Palabra**) y cambia los datos de demo a nombres claramente ficticios. Cambios completos al final (secciones 15 y 16). Los valores marcados *(propuesta)* son parámetros que José puede cambiar.

**Hechos de operación que fija esta spec (experiencia de José, 25-sep):** no existe ningún registro ni custodio compartido del crédito en la CEDA; las bodegas no se pasan referencias; cada bodega fía solo a clientes específicos (alto volumen y años de relación) y evalúa "de forma muy empírica"; cada cliente tiene un plazo propio, de 1 a 15 días típicamente y en casos muy seleccionados más de un mes; la bodega ancla fía cientos de miles de pesos al día (colocación diaria) y es persona moral.

Destinatario: Claude Code en GitHub Codespaces. Lee primero `CLAUDE.md` en la raíz. Proyecto: **Cuentas Claras**. Equipo: **Palabra**. Nombre técnico del contrato, del crate y de la carpeta: `cuentas_claras`; repositorio: `goyahack_cuentas-claras`. Entrega: hoy antes de las 20:00 (orden de construcción y recorte de alcance en `docs/guia-codespaces.md`, sección 3).

---

## 0. Qué se construye y qué no

**Se construye hoy (en este orden de riesgo):**

1. Un contrato Soroban `cuentas_claras` que hace cumplir: lista de emisores, máquina de estados de la nota de crédito, contadores agregados por sujeto y por emisor, consentimientos de lectura, eventos por transición.
2. Pruebas `cargo test` de las invariantes (sección 6) **antes** de compilar a Wasm.
3. Despliegue a testnet; Contract ID y hashes guardados en `demo/deploy.json`.
4. Un backend mínimo (Node/TypeScript o Python; el que ya tenga el Codespace) que: deriva `subject_id`, guarda los datos personales fuera de cadena, arma y firma transacciones con las cuentas custodiadas de la demo, calcula el semáforo a partir de los contadores del contrato.
5. Un frontend mínimo (Vite + bindings TypeScript del contrato) con **un solo flujo feliz** y una vista de lector.
6. `demo/demo.sh`: los mismos pasos por Stellar CLI (plan B).

**No se construye hoy (hoja de ruta, diapositiva de siguientes pasos):** passkeys / cuentas inteligentes, relayer (OpenZeppelin Channels), árbitro de disputas, pruebas ZK, MXNe o cualquier movimiento de dinero, token, integración con ERP o con MEGA, rotación de `subject_id`, cron de TTL, mainnet.

## 1. Versiones y toolchain (fijas)

| Componente | Versión | Nota |
|---|---|---|
| Rust | ≥ 1.84 | target `wasm32v1-none` (`rustup target add wasm32v1-none`) |
| soroban-sdk | 27.0.6 | tabla oficial de versiones; **no mezclar con 28.x** |
| Stellar CLI | 27.1.0 | instalar por binario (`install.sh`), **no** `cargo install` (tarda mucho) |
| JS SDK | 16.2.0 | `@stellar/stellar-sdk` |
| Red | testnet | RPC `https://soroban-testnet.stellar.org`, passphrase `Test SDF Network ; September 2015` |
| Fondeo | Friendbot | 10,000 XLM por cuenta; tiene límite de tasa: fondear todas las cuentas al inicio y guardarlas |

Regla: si `stellar contract init` genera otra versión de `soroban-sdk`, se fija **esa** y se documenta en `docs/decisiones.md`; nunca se mezclan versiones mayores entre SDK y CLI. **Cero crates fuera de `soroban-sdk`** (riesgo de cadena de suministro: ataques en crates.io en sep-2025 y ago-2026 dirigidos a llaves cripto). `Cargo.lock` va en el repo. Sin llaves reales en el Codespace: solo cuentas de testnet.

Próximo reset de testnet: 16-dic-2026 (no afecta la entrega).

## 2. Estructura del repositorio

```
contracts/cuentas_claras/      # contrato Soroban (Rust)
  src/lib.rs
  src/test.rs
  Cargo.toml
backend/                   # API mínima + base de datos local (SQLite)
frontend/                  # Vite + bindings TS generados con `stellar contract bindings typescript`
demo/
  demo.sh                  # plan B por CLI
  deploy.json              # Contract ID, cuentas de demo (públicas), hashes de transacciones
  capturas/                # capturas del explorador de testnet
docs/ research/ spec/ pitch/ plano/   # ya existen
```

## 3. Modelo de datos en cadena

Principio: **en la cadena no hay nombres, teléfonos ni montos exactos: solo un seudónimo por cliente, rangos de monto, fechas y estados.** Lo que sí queda en la cadena es público (ver sección 3b).

```rust
#[contracttype]
pub enum Status { Created, Accepted, PaidClaimed, Paid, Overdue, Defaulted, Disputed, Cancelled }

#[contracttype]
pub enum AmountBucket { B0_1k, B1k_5k, B5k_20k, B20k_50k, B50kPlus }   // MXN (propuesta)

#[contracttype]
pub struct Note {
    pub note_id: BytesN<32>,       // hash del documento canónico + aleatoriedad (calculado fuera de cadena)
    pub issuer: Address,           // bodega
    pub subject_id: BytesN<32>,    // HMAC-SHA256(teléfono normalizado, llave del backend)
    pub amount_bucket: AmountBucket,
    pub created_ts: u64,
    pub due_ts: u64,
    pub status: Status,
    pub paid_ts: Option<u64>,
    pub evidence_commit: Option<BytesN<32>>,  // hash del comprobante, opcional
    pub prev: Option<BytesN<32>>,             // nota a la que corrige/referencia, si aplica
}

#[contracttype]
pub struct SubjectStats {
    pub accepted: u32, pub paid_on_time: u32, pub paid_late: u32,
    pub overdue_open: u32, pub defaulted: u32,
    pub disputes_open: u32, pub disputes_resolved: u32,
    pub issuers_count: u32,        // emisores distintos que han emitido notas aceptadas
    pub first_ts: u64, pub last_ts: u64,
    pub max_bucket: AmountBucket,
}

#[contracttype]
pub struct Consent {
    pub subject_id: BytesN<32>,
    pub reader: Address,
    pub scope: u32,                // 0 = agregado (único en el MVP)
    pub exp_ts: u64,
    pub nonce: u64,
}

#[contracttype]
pub enum DataKey {
    Admin,
    Issuer(Address),                       // bool
    Note(BytesN<32>),                      // Note
    Stats(BytesN<32>),                     // SubjectStats
    IssuerStats(Address),                  // contadores del emisor (notas emitidas, disputas recibidas)
    SubjectIssuer(BytesN<32>, Address),    // bool: este emisor ya cuenta para issuers_count
    Consent(BytesN<32>, Address),          // Consent
    Params,                                // ventanas (sección 4)
}
```

Almacenamiento: todo en storage **`Persistent`**, con `extend_ttl` en cada escritura (`Temporary` se borra al vencer y no sirve para historial). Los datos personales (nombre, teléfono, RFC, local, monto exacto, productos, foto o PDF de la nota, comprobante, aleatoriedad del documento y la llave HMAC) viven **solo** en el backend, cifrados y borrables.

## 3b. Qué garantiza el diseño y qué no (privacidad en una cadena pública)

**Corrección de la v1.** La v1 describía el permiso como si hiciera confidencial el historial. No es así. Stellar es una cadena pública: cualquiera puede leer el estado del contrato (las `Note`, los `SubjectStats`, los `Consent`) y todos sus eventos sin llamar a ninguna función. El permiso controla **la consulta oficial** (`read_stats`), que es la que usa una bodega o un banco para decidir y la que deja constancia; **no** controla que el dato sea secreto.

Consecuencias que hay que asumir y decir:

1. Una bodega que ya emitió una nota a un cliente conoce su `subject_id` (aparece en `note_created`). Con él puede seguir leyendo su actividad en la cadena aunque el permiso haya vencido.
2. El evento `aggregate_read(subject_id, reader)` revela qué bodega consultó a qué seudónimo; la bodega de origen podría enterarse de que "su" cliente pidió crédito en otra.
3. El rango de monto es visible: se sabe el orden de magnitud de cada nota, no el monto exacto.
4. Lo que el diseño **sí** garantiza: ninguna bodega crea una deuda sin la firma del cliente; nadie edita ni borra una nota; "incumplida" solo existe tras vencer más la gracia; la consulta oficial exige permiso vigente y deja constancia; en la cadena no hay nombre, teléfono ni monto exacto; quien no conoce el seudónimo no puede ligarlo a una persona sin la llave HMAC del backend.

**Mitigaciones en el MVP (hoy):**
- Mensajes honestos en interfaz, README y pitch: "en la cadena no va tu nombre, tu teléfono ni el monto exacto; el permiso decide quién puede pedir tu resumen y deja constancia". Nunca "solo lo ve quien tú autorices", "anónimo" ni "nadie puede ver nada".
- El paso negativo de la demo (consulta sin permiso) se presenta como "el contrato no entrega el resumen sin permiso y así queda registrado", no como "nadie puede verlo".

**Mitigaciones en la hoja de ruta (antes de abrir consultas entre bodegas en el piloto, fase 2):**
- Seudónimos por emisor: `subject_id_emisor = HMAC(k, teléfono || emisor)`, para que dos bodegas no puedan ligar al mismo cliente leyendo la cadena; el agregado entre bodegas se sirve con una prueba (Merkle o ZK) que el lector verifica.
- Rotación del seudónimo por época y evento de consulta con el lector cifrado o comprometido, para evitar represalias.
- Pruebas de conocimiento cero de rango ("≥ N notas pagadas, 0 incumplidas") con el verificador Groth16 disponible en Soroban (ver `research/00_sintesis-estrategica.md`, hoja de ruta).

## 4. Parámetros

El plazo de cada nota (`due_ts`) **lo fija la bodega por cliente al crear la nota**, porque en la operación real cada cliente tiene un plazo propio (experiencia de José). El contrato no impone un plazo estándar; solo exige `due_ts > now`. En la demo se usan tres perfiles de cliente: 1 día, 7 días y 15 días. Lo demás son ventanas de sistema *(propuesta; José puede cambiarlas)*:

| Parámetro | Valor propuesto | Qué gobierna |
|---|---|---|
| `accept_window` | 72 h | Si el cliente no acepta en la ventana, la nota pasa a `Cancelled` al tocarla |
| `grace_period` | 30 días | Días después de `due_ts` antes de que la bodega pueda marcar `Defaulted` |
| `dispute_window` | 15 días | Días después de `Defaulted` en que el cliente puede disputar |
| `consent_ttl` | 30 días | Vigencia máxima de un consentimiento |
| `amount_buckets` | <1k, 1k–5k, 5k–20k, 20k–50k, >50k MXN | Rangos de monto |

## 5. Interfaz del contrato

Todas las funciones que cambian estado emiten un evento (sección 7). `who` siempre es la `Address` que llama y debe pasar `require_auth()`.

**Sin función de actualización.** El contrato del MVP **no** expone `upgrade` ni ninguna llamada a `update_current_contract_wasm`. El administrador solo puede agregar o quitar emisores; no puede editar notas, contadores ni permisos. Así la frase "nadie puede cambiar lo que firmaron los dos, ni nosotros" es verdadera. Si en el futuro se agrega actualización, se hace con múltiples firmas y se cambia esa frase en todos los materiales. Para corregir un error en testnet se despliega un contrato nuevo y se documenta en `demo/deploy.json`.

```rust
// Administración
fn init(env, admin: Address, params: Params)
fn add_issuer(env, admin: Address, issuer: Address)        // require_auth(admin)
fn remove_issuer(env, admin: Address, issuer: Address)

// Ciclo de vida de la nota
fn create_note(env, issuer: Address, note_id: BytesN<32>, subject_id: BytesN<32>,
               amount_bucket: AmountBucket, due_ts: u64) -> Result<(), Error>
    // require_auth(issuer); issuer en lista; note_id no existe; due_ts > now
fn accept_note(env, subject: Address, note_id: BytesN<32>) -> Result<(), Error>
    // require_auth(subject); Created → Accepted; dentro de accept_window
    // (ver nota sobre identidad del sujeto en 5.1)
fn cancel_note(env, who: Address, note_id) -> Result<(), Error>
    // issuer: Created → Cancelled. Mutuo (dos llamadas, una por parte): Accepted → Cancelled
fn claim_paid(env, subject: Address, note_id, evidence_commit: Option<BytesN<32>>)
    // Accepted → PaidClaimed
fn confirm_paid(env, issuer: Address, note_id)
    // Accepted | PaidClaimed → Paid; paid_ts = now; on_time = paid_ts <= due_ts
fn touch(env, note_id)
    // Sin firma. Accepted → Overdue si now > due_ts. Created → Cancelled si now > created_ts + accept_window
fn mark_default(env, issuer: Address, note_id)
    // Overdue → Defaulted solo si now > due_ts + grace_period
fn dispute(env, who: Address, note_id, reason_code: u32)
    // issuer: PaidClaimed → Disputed. subject: Overdue | Defaulted → Disputed (dentro de dispute_window)
fn resolve_mutual(env, who: Address, note_id, outcome: Status)
    // MVP: Disputed → Paid | Defaulted | Cancelled cuando AMBAS partes han llamado con el mismo outcome
    // (guardar la primera propuesta; la segunda llamada coincidente cierra). Árbitro: hoja de ruta.

// Consentimiento y lectura
fn grant_consent(env, subject: Address, reader: Address, exp_ts: u64, nonce: u64)
    // require_auth(subject); exp_ts <= now + consent_ttl
fn revoke_consent(env, subject: Address, reader: Address)
fn read_stats(env, reader: Address, subject_id: BytesN<32>) -> Result<SubjectStats, Error>
    // require_auth(reader); Consent vigente para (subject_id, reader); emite aggregate_read
    // Solo el propio sujeto lee sin consentimiento; el emisor también necesita permiso y ve sus notas con get_note (decisión #46, opción c).

// Consultas sin firma (para el explorador / demo)
fn get_note(env, note_id) -> Option<Note>
fn is_issuer(env, addr: Address) -> bool
fn get_params(env) -> Params
```

### 5.1 Identidad del sujeto en el MVP

El cliente firma con una cuenta G de testnet custodiada por la demo (el backend guarda la llave secreta de las cuentas ficticias). El vínculo `subject_id ↔ Address` se registra en el contrato la primera vez que el sujeto acepta una nota (`DataKey::SubjectAddr(subject_id) → Address`), y `accept_note`, `claim_paid`, `dispute`, `grant_consent` exigen que `subject` coincida. En producción esa `Address` será una cuenta inteligente con passkey: **el contrato no cambia**, porque solo ve `Address`.

### 5.2 Errores

`#[contracterror]`: `NotIssuer`, `NoteExists`, `NoteNotFound`, `InvalidTransition`, `NotParty`, `TooEarly` (gracia o ventana no cumplida), `WindowClosed`, `NoConsent`, `ConsentExpired`, `BadParams`.

## 6. Invariantes (van en `src/test.rs` y se mencionan en el pitch)

1. Una nota solo llega a `Accepted` con `require_auth` del emisor (al crear) **y** del sujeto (al aceptar), en transacciones separadas.
2. `Paid`, `Defaulted` y `Cancelled` son terminales, salvo `Disputed` dentro de ventana.
3. `Defaulted` solo existe después de `Overdue` **y** de `grace_period`.
4. `Overdue` es mecánica: `now > due_ts`; nadie la "decide".
5. Ninguna nota se sobrescribe; una corrección es una nota nueva con `prev`.
6. `read_stats` por un tercero falla sin consentimiento vigente y **emite evento** cuando tiene éxito.
7. Los contadores de `SubjectStats` los actualiza solo el contrato en cada transición; no existe función que los escriba directamente.
8. Un emisor ajeno a la lista no puede crear notas.
9. `issuers_count` cuenta emisores distintos, una sola vez por (sujeto, emisor).
10. No existe función de actualización del código ni función de administrador que modifique notas, contadores o permisos.
11. `read_stats` sin permiso vigente falla con `NoConsent`: esto controla la consulta oficial, no la visibilidad del estado en la cadena (sección 3b).

Pruebas mínimas: camino feliz completo; aceptación fuera de ventana; `mark_default` antes de la gracia (falla); disputa fuera de ventana (falla); lectura sin consentimiento (falla) y con consentimiento vencido (falla); lector es la propia parte (pasa); dos emisores → `issuers_count == 2`.

## 7. Eventos

Un evento por transición, con `topics = ("cclaras", <nombre>)` y datos mínimos. Ojo: `symbol_short!` admite máximo 9 caracteres. El prefijo `cclaras` cabe; varios nombres de evento no (`note_created`, `aggregate_read`, `consent_granted`…): créalos con `Symbol::new(&env, "note_created")` o con el mecanismo de eventos tipados que ofrezca la versión fijada del SDK, sin acortarlos (se leen en el explorador durante la demo).

- `note_created(note_id, issuer, subject_id, bucket, due_ts)`
- `note_accepted(note_id)`
- `paid_claimed(note_id)`, `paid_confirmed(note_id, on_time: bool)`
- `overdue(note_id)`, `defaulted(note_id)`, `disputed(note_id, by: Address, reason_code)`, `resolved(note_id, outcome)`
- `cancelled(note_id)`
- `consent_granted(subject_id, reader, exp_ts)`, `consent_revoked(subject_id, reader)`
- `aggregate_read(subject_id, reader)`
- `issuer_added(issuer)`, `issuer_removed(issuer)`

Los eventos son lo que se muestra en el explorador de testnet durante la demo.

## 8. Backend mínimo

- `subject_id = HMAC-SHA256(key, normalizar(teléfono E.164))`; `key` de 256 bits en variable de entorno del Codespace (solo demo). Nunca `sha256(teléfono)` sin llave: un teléfono mexicano tiene 10^10 valores y es enumerable.
- `note_id = SHA-256(documento canónico JSON ordenado || aleatoriedad de 32 bytes)`; la aleatoriedad se guarda fuera de cadena.
- Base SQLite con tablas `subjects` (subject_id, nombre, teléfono, address_testnet, secret_cifrado_demo), `notes_offchain` (note_id, monto exacto, productos, archivo, aleatoriedad), `issuers`.
- Cuenta "plataforma" que paga las comisiones: en el MVP la plataforma arma la transacción y la firma la cuenta de la parte; las cuentas de demo tienen XLM de Friendbot. (Fee-bump y relayer: hoja de ruta.)
- Semáforo *(propuesta)*: reputación beta con olvido, `score = (r+1)/(r+s+2)`, `r` = pagos a tiempo × 1 + pagos tarde × 0.5, `s` = incumplidas × 1 + vencidas abiertas × 0.5, ponderación `2^(−días/180)`, multiplicado por `min(1, issuers_count/3)`. **"Historial insuficiente"** si `< 3` notas cerradas, `< 2` emisores o `< 60` días. Se muestra como verde / amarillo / rojo / insuficiente; **nunca** se llama score ni calificación en la interfaz.

## 9. Frontend mínimo (un solo flujo)

Nombre visible del producto: **Cuentas Claras**; del equipo: **Palabra** (decisiones #26 y #36). Línea de apoyo en la pantalla de inicio: "Tu palabra vale." (ver `docs/campana-marketing.md`). En la vista del jurado: "Fiado de palabra, firmado por los dos." Microcopy de privacidad obligatorio en la vista del cliente: "En la cadena no va tu nombre, tu teléfono ni el monto exacto. Tú decides a qué bodega le das permiso de pedir tu resumen; cada consulta queda registrada." La primera firma del cliente ocurre **en persona, en el mostrador de la bodega que conoce**; el enlace por WhatsApp se usa para las siguientes (hay una ola de fraudes por enlaces: ver `research/06_barreras-de-adopcion.md`).

Tres vistas, sin registro ni login (cuentas de demo preseleccionadas):

1. **Bodega A**: crear nota (cliente ficticio, monto exacto → el backend lo convierte a rango, vencimiento) → estado `Created`; botón "confirmar pago".
2. **Cliente** (simula el teléfono): ver nota → "Aceptar"; después "Autorizar a Bodega B por 30 días".
3. **Bodega B**: consultar historial del cliente → sin consentimiento: error visible; con consentimiento: semáforo, contadores y `issuers_count`; enlace al evento `aggregate_read` en el explorador.

Cada acción muestra el hash de la transacción con enlace al explorador de testnet. Idioma: español de México. Nada de la palabra "blockchain" en la interfaz del bodeguero o del cliente (solo en la vista del jurado / README).

## 10. Guion de la demo (camino feliz) y plan B

1. Bodega A crea la nota (evento `note_created`).
2. Cliente acepta (evento `note_accepted`).
3. Bodega A confirma el pago (evento `paid_confirmed`, `on_time = true`).
4. Cliente autoriza a Bodega B por 30 días (evento `consent_granted`).
5. Bodega B consulta: semáforo + contadores (evento `aggregate_read`).
6. Si el tiempo alcanza (recomendado antes del paso 4): la misma consulta **sin** permiso falla (`NoConsent`). Se dice: "sin permiso, el contrato no entrega el resumen, y el intento queda registrado". No se dice "nadie puede verlo" (sección 3b).

`demo/demo.sh` ejecuta 1–5 con `stellar contract invoke` y las cuentas de `deploy.json`, e imprime los enlaces al explorador. Cuentas fondeadas y explorador abierto **antes** de presentar. Video grabado como respaldo y entregable.

## 11. Criterios de aceptación

- `cargo test` verde con las pruebas de la sección 6.
- Contrato desplegado en testnet; `demo/deploy.json` con Contract ID, cuentas públicas y hashes.
- `demo.sh` corre de principio a fin en un Codespace limpio en menos de 3 minutos.
- Frontend muestra el flujo 1–5 con enlaces al explorador.
- README de la raíz con: qué es, problema con fuentes, enlaces (video, app, contratos), por qué blockchain y por qué Stellar, diagrama "vive en cadena / vive fuera", cómo correrlo en cinco comandos, alcance y limitaciones, equipo, licencia.
- Ningún dato personal real, ninguna llave real, ningún dato de la CEDA sin etiqueta de fuente.

## 12. Datos de la demo (ficticios) y guion de negocio

El guion de negocio es literal a lo que José describe: un cliente bueno de la Bodega A, con años de relación y 15 días de plazo, llega a la Bodega B, donde nadie lo conoce y donde hoy le dirían que no. Con la bitácora, el cliente autoriza a la Bodega B a leer su agregado y la Bodega B ve tres notas pagadas a tiempo, un emisor distinto, y decide.

Datos ficticios mínimos (nombres elegidos para que no coincidan con ningún negocio real): **Bodega A (demo)** (emisor verificado), **Bodega B (demo)** (emisor verificado, lector), **Doña Mary (personaje ficticio, perfil 15 días)**, **Cliente 2 — fonda (demo, perfil 7 días)**, **Cliente 3 — sin historial (demo)** (→ "historial insuficiente"). Teléfonos ficticios con prefijo reservado para pruebas. Montos en MXN dentro de los rangos 1k–5k y 5k–20k. Nada real: ni nombres, ni teléfonos, ni el plano sin aprobación.

## 13. Pendientes que no bloquean la construcción

- Instrumento exacto que documenta el fiado en la bodega ancla (registro del ERP, nota de remisión): define el documento canónico de `note_id` para el piloto; la demo usa una nota con folio, cliente, monto, fecha y vencimiento.
- Morosidad observada, número de clientes con crédito y uso de WhatsApp: dimensionan el piloto, no el MVP.
- Consignación en frutas y legumbres: segundo caso de uso, fuera del MVP.
- **Pollar (opcional, fuera de la ruta crítica).** Su SDK puede firmar una `SorobanAuthorizationEntry` con cuentas G custodiadas por Pollar si el contrato y cada función están autorizados en su panel; no funciona con passkeys y el SDK es joven (ver `research/03_talleres-y-evaluadores.md`). Solo se prueba en una rama aparte cuando la demo custodial, el video y la entrega estén listos. Ojo: el vínculo `subject_id ↔ Address` se fija en la primera aceptación (sección 5.1), así que la prueba usa un sujeto nuevo.

## 14. Cambios respecto a v0

1. Estado: de borrador a v1 aprobada para construcción (plan y reencuadre aprobados el 25-sep a las 08:35).
2. Sección 4: `due_ts` se fija por nota según el plazo que la bodega asigna a cada cliente (1 a 15 días típicos; algunos más de un mes). La demo usa perfiles de 1, 7 y 15 días.
3. Sección 0 y 12: hechos de operación de José incorporados como base del guion de negocio; datos ficticios de la demo definidos.
4. Sección 13: pendientes reclasificados como no bloqueantes.
5. Sin cambios en la interfaz del contrato, invariantes, eventos ni criterios de aceptación.

## 15. Cambios respecto a v1 (25-sep-2026, 11:50)

1. **Privacidad (corrección de un error de la v1):** nueva sección 3b; el permiso controla la consulta oficial y deja constancia, no hace secreto el estado de una cadena pública. Principio de la sección 3 reescrito; microcopy obligatorio en la vista del cliente; paso negativo de la demo reformulado; mitigaciones de hoja de ruta (seudónimos por emisor, rotación, ZK).
2. **Sin función de actualización** del contrato (sección 5) e invariantes 10 y 11 (sección 6).
3. **Nombre:** proyecto y equipo **Palabra**; contrato, crate, carpeta y tópico de eventos `palabra` (antes `credi_ceda`).
4. **Datos de demo** con nombres claramente ficticios (sección 12).
5. **Primera firma en persona** en el mostrador; los enlaces por WhatsApp solo después (sección 9).
6. **Pollar** documentado como opción fuera de la ruta crítica (sección 13).
7. Sin cambios en la máquina de estados, los parámetros, el backend ni los criterios de aceptación.

## 16. Cambios del 25-sep-2026, 12:30 (sin cambios funcionales)

1. **Nombre:** proyecto **Cuentas Claras**; equipo **Palabra** (decisión #36). Contrato, crate y carpeta `cuentas_claras`; repositorio `cuentas-claras`; tópico de eventos `cclaras` (sección 7), con la nota sobre el límite de 9 caracteres de `symbol_short!`.
2. **Plazo:** entrega hoy antes de las 20:00 (decisión #37). El orden de construcción y el recorte de alcance están en `docs/guia-codespaces.md`, sección 3.
3. Sin cambios en la interfaz del contrato, la máquina de estados, los parámetros, el backend ni los criterios de aceptación.
