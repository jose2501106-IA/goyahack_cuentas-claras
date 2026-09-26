# Especificación del frontend — Cuentas Claras (fin de semana)

**Estado:** vigente para el sábado 26 y el domingo 27 de septiembre (decisión #43). Las secciones 1 y 4 dependen de las decisiones #44 y #45, que están en estado **propuesta**: José las aprueba antes de pegar el prompt de la sección 9. Complementa la spec v2 (§8 backend, §9 frontend) y la sustituye donde se contradicen.

## 0. Qué se construye

Una app web local, en el Codespace, que hace en el navegador el mismo flujo de `demo.sh` contra el contrato vigente de testnet (`demo/deploy.json`). Tiene cuatro vistas: **Bodega A**, **Teléfono de Doña Mary**, **Bodega B** y **Para el jurado**. Sirve para el video, para la demo en vivo y para que un juez la entienda en 30 segundos.

No se construye: registro ni inicio de sesión, passkeys, relayer, un despliegue público, WhatsApp ni el mapa de sectores. Tampoco se toca el contrato.

## 1. Restricciones (decisión #45)

1. **Cero paquetes npm.** El servidor usa solo módulos nativos de Node (`node:http`, `node:crypto`, `node:fs`, `node:child_process`, `node:test`). Si hay `package.json`, lleva solo scripts y ninguna dependencia. El frontend es HTML, CSS y JavaScript sin framework ni paso de compilación.
2. **La cadena se toca solo a través del Stellar CLI** (`stellar contract invoke`), con las mismas identidades y los mismos argumentos que ya usa `demo.sh`. Las llaves secretas se quedan en el CLI del Codespace. El servidor nunca las lee, nunca las devuelve y nunca las registra en la consola.
3. **Sin shell:** se usa `execFile` con los argumentos en arreglo, nunca `exec` ni una cadena de comando armada a mano. Toda entrada se valida contra una lista cerrada:
   - identidades: `bodega_a`, `bodega_b`, `dona_mary`;
   - `note_id`: 64 caracteres hexadecimales;
   - monto: entero de 1 a 10,000,000;
   - plazo: 7, 15 o 30 días.
4. **Una transacción a la vez:** las llamadas al CLI que envían transacciones van en una cola. Dos transacciones simultáneas de la misma cuenta chocan por número de secuencia.
5. **Datos fuera de cadena** (monto exacto, aleatoriedad del documento): archivo JSON local en `backend/datos/`, que se agrega a `.gitignore`. Nunca van al repo.
6. **`subject_id`:** HMAC-SHA256 con `DEMO_HMAC_KEY` de `.env`, con la misma normalización y el mismo teléfono ficticio que `demo.sh`, para que el historial de Doña Mary sea uno solo.
7. **Puerto:** el servidor escucha en `127.0.0.1:8080`. En Codespaces el puerto reenviado se queda **privado**; no se cambia su visibilidad.
8. El contrato, `Cargo.toml`, `research/` y `privado/` no se tocan.

## 2. Estructura

```
backend/
  server.js        HTTP: sirve frontend/ y la API de la sección 3
  stellar.js       envoltura de execFile sobre el CLI + cola de transacciones
  semaforo.js      función pura de la sección 4 (sin E/S)
  datos.js         lectura y escritura de backend/datos/notas.json
  test/*.test.js   node:test
  datos/           ignorado por git
frontend/
  index.html  estilos.css  app.js
  vistas/bodega-a.js  vistas/cliente.js  vistas/bodega-b.js  vistas/jurado.js
demo/sembrar.sh    segundo emisor (sección 6)
```

## 3. API (JSON; si falla una transacción responde con `{ error, mensaje }` en español)

| Método y ruta | Qué hace | Firma |
|---|---|---|
| `GET /api/config` | Red, Contract ID, URL base del explorador y claves **públicas** de `deploy.json` | — |
| `POST /api/notas` `{monto_mxn, plazo_dias}` | Calcula el rango, el `note_id` (spec v2 §8) y el `due_ts`; guarda fuera de cadena monto y aleatoriedad; llama a `create_note` | bodega_a |
| `GET /api/notas` | Notas del archivo local con su estado leído de la cadena (`get_note`, sin enviar transacción) | — |
| `POST /api/notas/:id/aceptar` | `accept_note` | dona_mary |
| `POST /api/notas/:id/pago` | La misma secuencia de pago que el paso 3 de `demo.sh` | la de `demo.sh` |
| `POST /api/permisos` `{dias: 30}` | `grant_consent` a bodega_b | dona_mary |
| `DELETE /api/permisos` | `revoke_consent` a bodega_b | dona_mary |
| `POST /api/consultas` | `read_stats` de bodega_b sobre Doña Mary. Sin permiso: `{permitido: false, motivo}` y **ninguna transacción enviada**. Con permiso: `{permitido: true, stats, semaforo, tx_hash, url}` | bodega_b |
| `GET /api/semaforo/ejemplo` | Resultado de la sección 4 con los datos ficticios del ejemplo | — |

Cada respuesta que envía una transacción incluye `tx_hash` y `url` (explorador de testnet). **Rangos:** `B0_1k` < 1,000 ≤ `B1k_5k` < 5,000 ≤ `B5k_20k` < 20,000 ≤ `B20k_50k` < 50,000 ≤ `B50kPlus`. En pantalla se muestran como «$5,000–$20,000».

## 4. Semáforo (decisión #44; fórmula de la spec v2 §8)

Entrada: `SubjectStats` y la hora actual. Salida: `{ color, palabra, forma, condiciones[] }`. **El número calculado nunca se muestra en la interfaz.**

1. `cerradas = paid_on_time + paid_late + defaulted`; `dias = (ahora − first_ts) / 86400`.
2. **Historial insuficiente** si no se cumple alguna de estas condiciones: `cerradas ≥ 3`, `issuers_count ≥ 2`, `dias ≥ 60`. Se devuelve cada condición con su valor, por ejemplo «3 notas cerradas (tiene 2)».
3. Si se cumplen las tres: `r = paid_on_time + 0.5 × paid_late`; `s = defaulted + 0.5 × overdue_open`; `p = (r + 1) / (r + s + 2) × min(1, issuers_count / 3)`.
4. **Verde** si p ≥ 0.80; **Amarillo** si 0.50 ≤ p < 0.80; **Rojo** si p < 0.50. Los umbrales son una *propuesta* y van como constantes en un solo lugar.
5. Las disputas abiertas no suman a `s` (una aclaración no es un impago). Se muestran aparte: «N aclaraciones abiertas».
6. El olvido `2^(−días/180)` de la spec v2 no se aplica en el MVP porque el agregado no trae fechas por nota. Queda en la hoja de ruta, anotado en el código.
7. **Forma y palabra, siempre:** ● Verde, ▲ Amarillo, ■ Rojo, ○ Historial insuficiente (Gris `#5F5F5F`).
8. **Datos del ejemplo ficticio:** accepted 6, paid_on_time 5, paid_late 1, overdue_open 0, defaulted 0, issuers_count 3, first_ts = hace 120 días. Debe dar Verde.

Pruebas mínimas con `node:test`:
- el ejemplo da Verde;
- los datos reales de hoy (2 aceptadas, 1 bodega, 0 días) dan «Historial insuficiente» con las tres condiciones marcadas;
- un caso Amarillo y un caso Rojo;
- una disputa abierta no cambia el color;
- con 2 bodegas nunca sale Verde (por el factor `min(1, n/3)`; es intencional y se documenta);
- validación de rangos y de entradas.

## 5. Vistas

Encabezado común: «Cuentas Claras» y una pestaña por vista. Cada vista lleva el rótulo «Demo · datos ficticios». Mientras el CLI trabaja, el botón queda deshabilitado y dice «Registrando…» (cada firma tarda unos segundos). Cada acción muestra «Ver comprobante» con el enlace al explorador.

**Bodega A.** Título: «Nueva nota de fiado». Campos: cliente «Doña Mary» (fijo), monto en MXN y plazo (7, 15 o 30 días). Botón: «Crear nota». Debajo, la lista de notas con estas etiquetas de estado:

| Estado en el contrato | Etiqueta en pantalla |
|---|---|
| Created | Esperando firma del cliente |
| Accepted | Firmada por los dos |
| PaidClaimed | El cliente avisó que pagó |
| Paid | Cumplida (con el sello CUMPLIDA) |
| Overdue | Vencida |
| Disputed | En aclaración |
| Defaulted | Incumplida |
| Cancelled | Cancelada |

En las notas firmadas aparece el botón «Confirmar pago». Texto de apoyo: «El monto exacto se queda en tu registro; en la nota firmada solo va el rango.»

**Teléfono de Doña Mary** (marco de teléfono, 390 px de ancho). Encabezado: «Tu palabra vale.»
- Nota pendiente: «Bodega A te registró una nota: $5,000–$20,000, vence el [fecha]. ¿Estás de acuerdo?», con el botón «Acepto».
- Cuando la nota se paga: el sello CUMPLIDA y «Cumpliste tu palabra: queda firmado a tu favor.»
- Permisos: «Dar permiso a Bodega B por 30 días». Ya dado: «Bodega B puede pedir tu resumen hasta el [fecha]», con el botón «Quitar permiso».
- **Texto obligatorio (spec v2 §9):** «En la cadena no va tu nombre, tu teléfono ni el monto exacto. Tú decides a qué bodega le das permiso de pedir tu resumen; cada consulta queda registrada.»

**Bodega B.** Título: «Consultar el historial de un cliente», con el botón «Consultar a Doña Mary».
- **Sin permiso:** «Doña Mary no te ha dado permiso. Sin permiso no se entrega su resumen. Pídeselo en el mostrador.» Aclaración: «No se envió ninguna consulta.»
- **Con permiso:** el semáforo real (hoy, ○ «Historial insuficiente» con la lista de condiciones ✓/✗), los contadores (notas firmadas, cumplidas a tiempo, tarde, vencidas, incumplidas, bodegas distintas, rango más alto), «Esta consulta quedó registrada · Ver comprobante» y «La decisión de fiar es tuya; el semáforo solo resume lo firmado.»
- **Aparte**, una tarjeta con borde punteado: «Ejemplo con datos ficticios · no es una consulta». Muestra el semáforo del ejemplo (● Verde) y una línea: «Así se vería con 4 meses de historial en 3 bodegas.»

**Para el jurado.** Es la única vista donde puede aparecer la palabra «blockchain».
- Título: «Fiado de palabra, firmado por los dos.»
- Contract ID con su enlace, red «Stellar testnet · Soroban» y las transacciones de esta sesión con sus enlaces.
- Tabla «En la cadena / Fuera de la cadena»: en la cadena van el seudónimo, el rango, las fechas, los estados, los contadores, los permisos y las bodegas; fuera van el nombre, el teléfono, el monto exacto y los documentos.
- Frase de la spec v2 §3b: «La cadena es pública: el permiso controla la consulta oficial y deja constancia; no hace secreto el estado.»
- «No mueve dinero ni emite token.»

**Identidad visual** (`docs/identidad-visual.md`):
- colores: Papel `#F5F0E6` de fondo, Tinta `#1E3A8A` para titulares y botones primarios, Carbón `#262626` para el texto; Sello `#B3261E` solo para el sello CUMPLIDA, una vez por pantalla;
- fuentes: Archivo para titulares, Atkinson Hyperlegible para texto e IBM Plex Mono para hashes y fechas, desde Google Fonts y con fuentes de respaldo del sistema;
- legibilidad: texto de 16 px o más y botones de 44 px de alto o más;
- los colores del semáforo solo aparecen en el semáforo.

## 6. Segundo emisor (`demo/sembrar.sh`)

Script de una sola ejecución: Bodega B crea una nota para Doña Mary, ella la acepta y Bodega B confirma el pago. Resultado: `issuers_count = 2` y la condición «2 bodegas» en ✓. Reutiliza las utilidades de `demo.sh`, imprime los enlaces y no altera `demo.sh`. Se corre una vez, antes de grabar.

## 7. Criterios de aceptación

1. `node backend/server.js` arranca sin `npm install` y sin dependencias.
2. `node --test backend/` en verde con los casos de la sección 4.
3. `cargo test` sigue en verde; el contrato no cambió (`git diff --stat contracts/` vacío).
4. En el navegador, en menos de 3 minutos, se completa este flujo:
   1. crear la nota;
   2. aceptarla;
   3. confirmar el pago;
   4. consultar sin permiso (mensaje, sin transacción);
   5. dar permiso;
   6. consultar con permiso (semáforo y comprobante).

   Cada enlace abre la transacción correcta en el explorador.
5. `grep -rniE "buró|score|calificaci|pagaré|anónim|solo lo ve|nadie puede ver|100 ?% seguro" frontend/` no devuelve nada, y `grep -rni blockchain frontend/` solo encuentra `vistas/jurado.js`.
6. `grep -rE "S[A-Z2-7]{55}" frontend backend` no devuelve nada (ninguna llave secreta de Stellar), y ninguna ruta de la API devuelve secretos.
7. `backend/datos/` está en `.gitignore` y no hay datos locales en el commit.
8. Capturas de las cuatro vistas en `demo/capturas/` (datos ficticios).
9. README: sección «Cómo correr la app», con un comando y el aviso de que el puerto se queda privado.

## 8. Puntos de control (Claude Code avisa en 5 renglones)

- **10:00:** API en verde contra testnet desde `curl` y pruebas del semáforo en verde.
- **11:30:** las cuatro vistas conectadas.
- **13:00:** criterios 1 a 9 en verde, commit y push.

## 9. Prompt para Claude Code

```
Sesión de trabajo del sábado. Primero: git pull --rebase origin main; lee CLAUDE.md,
docs/decisiones.md (#43, #44, #45) y spec/2026-09-26_especificacion-frontend.md completa.
Esa spec manda; donde contradiga a la spec v2, gana ella.

Tarea: construye la app local de 4 vistas de esa spec (secciones 1 a 7), sin instalar
ningún paquete npm ni crate. Toca solo backend/, frontend/, demo/sembrar.sh, demo/capturas/,
.gitignore, README.md y docs/ (índice y decisiones si hace falta). No toques contracts/,
research/ ni privado/. No cambies la visibilidad de puertos ni la configuración del Codespace.

Puedes usar dos agentes en paralelo: uno para backend/ (API, cola del CLI, semáforo y
pruebas) y otro para frontend/ contra la API de la sección 3. Solo tú haces commits.

Avísame en los puntos de control de la sección 8 (10:00, 11:30, 13:00) con 5 renglones:
qué quedó, qué falta y si algo cambió respecto a la spec.

Detente y pregúntame antes de: instalar cualquier cosa, tocar el contrato o redesplegar,
enviar transacciones fuera del flujo de la spec, o si algo falla dos veces seguidas
(explica el error exacto y propone la corrección más pequeña).

Al terminar: criterios de la sección 7 en verde, un commit por bloque en español,
git pull --rebase y push. Pásame el hash del commit y cómo abrir la app.
```

## 10. Después (no es de hoy)

- Relayer y fee-bump para que el cliente no necesite saldo.
- Firma del cliente con passkey desde su teléfono.
- Olvido por nota en el semáforo.
- Migración de eventos a `#[contractevent]`.
- Mapa de sectores.
