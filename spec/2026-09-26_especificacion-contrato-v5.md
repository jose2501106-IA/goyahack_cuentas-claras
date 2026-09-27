# Especificación v5: lectura pública, sin «dar permiso» (decisión #57)

**Estado:** vigente. Aprobada por José el sábado 26-sep-2026 a las 21:20, por recomendación del mentor.
**Base:** contrato v4 (`CB3TLO33…5Q7AJ`, spec `2026-09-26_especificacion-contrato-v4.md`). Todo lo de la v4 se queda: vínculo previo del cliente, C1–C9 y 23 pruebas. Lo único que cambia es la lectura.
**Límite duro:** si la v5 no está desplegada y fusionada a `main` el **domingo a las 11:00**, se abandona y se presenta la v4, que ya funciona completa. Hasta la fusión, `main` no se toca.

## 0. La idea en una frase

La cadena es pública y eso es lo bueno. Cualquier bodega puede consultar el historial de un cliente si tiene su **código** (el seudónimo). El cliente decide a qué bodega le enseña su código. La consulta formal sigue dejando constancia en la cadena, para que el cliente sepa quién preguntó.

**Nuevo guion de la demo, 5 pasos y 4 transacciones:**

| # | Paso | ¿Transacción? |
|---|---|---|
| 1 | Bodega A-17 crea la nota | sí |
| 2 | Doña Mary la acepta | sí |
| 3 | Bodega A-17 confirma el pago | sí |
| 4 | Doña Mary le muestra su código a Bodega B-40 | **no** (sucede en el mostrador) |
| 5 | Bodega B-40 consulta con ese código: ve el historial y el semáforo, y la consulta queda registrada (`aggregate_read`) | sí |

## P1 · Claude Code en la web, rama `contrato-v5` (sin llaves)

Crea la rama desde `main`. Nada de esto va a `main` hasta P2.

### P1.1 Contrato (`contracts/cuentas_claras/src/lib.rs`)

- **`read_stats(reader, subject_id)`:**
  - sigue exigiendo `reader.require_auth()` y emitiendo `aggregate_read(subject_id, reader)`;
  - **se quita la revisión de permiso**: cualquier dirección lee.
- **Se borran** `grant_consent`, `revoke_consent`, el `struct Consent` y `DataKey::Consent`.
- **Sin renumerar:**
  - `NoConsent = 10` y `ConsentExpired = 11` se quedan en el `enum` con el comentario «sin uso desde la v5».
  - `Params.consent_ttl` se queda, con el mismo comentario, para no cambiar `init` ni los scripts.
- **No cambia nada más.** Sin `upgrade`.

### P1.2 Pruebas (`src/test.rs`)

- Las pruebas de permiso (sin permiso → `NoConsent`, vencido → `ConsentExpired`, revocar) se **reemplazan**. Explica cada una en el commit.
- **Pruebas nuevas:**
  - `v5_cualquier_bodega_lee_y_queda_constancia`: una dirección sin notas del cliente lee el agregado correcto, y se emite `aggregate_read` con su dirección;
  - `v5_leer_no_cambia_nada`: el agregado y las notas quedan igual después de leer;
  - `v5_codigo_desconocido`: leer un seudónimo sin notas devuelve el agregado en ceros, sin error.
- **Las pruebas r1–r10 de la v4 se quedan intactas.** `cargo test` en verde.

### P1.3 Scripts (`demo/demo.sh`, `demo/sembrar.sh`)

- Quita los pasos de consulta sin permiso, de dar permiso y de revocar. `EXP_TS` ya no se usa.
- Numera los pasos como en la tabla de la sección 0:
  - el paso 4 imprime «Doña Mary le muestra su código a Bodega B-40 (en el mostrador; no es una transacción)» y el código abreviado;
  - el paso 5 es la consulta, con su enlace.
- Conserva el formato de salida `N) texto` + `↳ enlace`, porque `web/herramientas/generar-repeticion.js` lo lee.
- El texto final dice: «La cadena es pública: cualquiera con el código de Doña Mary ve su historial, sin su nombre ni el monto exacto. Cada consulta formal queda registrada.»

### P1.4 App local (`backend/`, `frontend/`)

- **Backend:**
  - quita `GET`, `POST` y `DELETE /api/permisos`;
  - nuevo `GET /api/cliente/codigo`, que devuelve el código de Doña Mary completo y abreviado;
  - la consulta de Bodega B-40 recibe `{ "codigo": "<64 hex>" }`: valida el formato (400 si no) y llama a `read_stats`;
  - las defensas de la #56 (Origin, Host, JSON y 502 sin comprobante) se quedan;
  - pruebas en verde con `node --test backend/test/*.test.js`.
- **Vista del cliente:**
  - sale la sección de permisos;
  - entra la tarjeta **«Mi código»**: el código en letra monoespaciada grande y el texto «Enséñalo en la bodega que tú quieras. Con él ven tu historial, sin tu nombre ni tus montos exactos.»
- **Vista de Bodega B-40:**
  - campo «Código del cliente» con el botón «Doña Mary me enseñó su código» (lo llena, porque es la demo) y el botón «Consultar historial»;
  - muestra el semáforo con «historial insuficiente» y sus condiciones, y el enlace a la transacción;
  - el mensaje «Esta consulta queda registrada en la cadena, con la bodega que preguntó.»
- **Vista «Para el jurado» y portada del pasillo:** quita toda mención al permiso y ajusta los pasos a la tabla de la sección 0.
- **Nunca** «anónimo», «nadie puede verlo», «buró», «score» ni «calificación».

**Criterio de P1:**
- `cargo test` y las pruebas del backend en verde;
- `grep -rn "permiso\|consent" backend frontend demo/*.sh` solo encuentra comentarios que explican el cambio;
- commit y push de la rama `contrato-v5`, nunca a `main` y nunca con force.

## P2 · Codespace original (con llaves): desplegar y fusionar

1. `git fetch`, `git checkout contrato-v5`, `cargo test` y `stellar contract build`.
2. **Despliega e inicializa** con los mismos parámetros. Registra a A-17, B-40 y A-73 como emisores. Invita y vincula a Doña Mary.
3. **`demo/deploy.json`:** la v4 pasa a `contratos_anteriores` con el motivo «#57: lectura pública sin permiso, por recomendación del mentor»; `version_contrato` queda en 5.
4. **Guarda la corrida anterior:** copia `demo/salida-demo.txt` a `demo/salida-demo_contrato-v4.txt`.
5. **Corre** `sembrar.sh` y `demo.sh`. Criterio: 4 hashes y el paso 4 sin transacción.
6. **Prueba** la app local con `node backend/server.js` y un recorrido completo.
7. **Fusiona** `contrato-v5` a `main` sin force, luego `git pull --rebase` y push.

## P3 · Claude Code en la web, en `main` (después de P2)

1. **Generador:** `web/herramientas/generar-repeticion.js` se adapta a los 5 pasos (el paso 4 sin hash). Luego regenera `repeticion.json` y `repeticion.js`.
2. **«La demo real» y «La app en tu mano»:** 5 pantallas del cliente (el paso 4 es «Enseñaste tu código a Bodega B-40») y 5 de Bodega B-40. «Ver como registro» con 5 renglones.
3. **`web/app.html`:** la pestaña «Permisos» se vuelve **«Mi código»**. En el flujo de Bodega B-40, «Pedir su resumen sin permiso» y «Dar permiso» se sustituyen por «Doña Mary me enseñó su código» → «Consultar historial».
4. **«Cómo funciona»:** la regla 3 dice «Tu historial es tuyo: es público y verificable, sin tu nombre ni el monto exacto, y tú decides a qué bodega le enseñas tu código.»
5. **Pasillo vivo:**
   - la probabilidad de dar permiso de cada perfil se vuelve la probabilidad de **enseñar su código** cuando una bodega nueva le pide historial;
   - los textos del feed cambian igual;
   - el motor y el semáforo no cambian;
   - la prueba de equivalencia debe seguir en verde.
6. **Contrato y hashes de la v4:** cambia `CB3TLO33` y los hashes de la corrida v4, también en sus formas abreviadas, en README, sitio, pitch, guion, prompts de Claude Design y relevo. No los cambies en `docs/decisiones.md`, `docs/auditoria-2026-09-26.md`, las specs v4 y v5, `contratos_anteriores` ni `demo/salida-demo_contrato-*.txt`.
7. **Capturas** `demo/capturas/web-*` regeneradas.

**Criterio de P3:**
- `node --test web/pruebas/` en verde, con las pruebas actualizadas a 5 pasos y 4 hashes;
- `grep -rn "permiso" web --include=*.html --include=*.js | grep -v pruebas` vacío;
- cero violaciones de CSP en Chromium;
- cada hash coincide con `demo/salida-demo.txt`.

## Paradas (valen en P1, P2 y P3)

Detente y escribe el error exacto en `docs/cola-de-trabajo.md` si pasa cualquiera de estas cosas:
- algo falla dos veces;
- hay que tocar `research/`, `privado/` o llaves;
- algo pide mainnet;
- son más de las 11:00 del domingo y P2 no terminó.

**Nunca** se fusiona a `main` un contrato que no esté desplegado.
