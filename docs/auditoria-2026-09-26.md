# Auditoría de seguridad e ingeniería — sábado 26-sep-2026

**Estado:** hallazgos verificados. La corrección del contrato (decisión #55) espera la aprobación de José porque implica redesplegar.

**Método:** tres revisores independientes que no participaron en la construcción, en solo lectura:
1. **Contrato Soroban:** `cargo test` 13/13; 8 pruebas de concepto en una copia aparte reproducen los hallazgos.
2. **App local:** servidor levantado con un Stellar simulado; ataques de CSRF, rebinding y recorrido de rutas probados.
3. **Sitio público y repositorio:** historial completo de 69 commits revisado en busca de secretos.

Claude (chat) verificó el hallazgo crítico contra el código (`lib.rs`, `create_note`, `accept_note` y `bind_subject`).

## 1. Contrato

| # | Sev. | Hallazgo | Qué rompe | Propuesta |
|---|---|---|---|---|
| C1 | **Crítica** | El seudónimo del cliente queda ligado a la **primera** dirección que acepta una nota. `create_note` no dice quién debe aceptarla. | (a) Alguien que vea el evento `note_created` puede aceptar antes que Doña Mary y quedarse con su seudónimo para siempre. (b) **Una bodega puede aceptar su propia nota** y fabricar historial. Se rompe «ninguna bodega escribe sola una deuda». | **Vínculo previo y explícito:** nueva función `bind_subject(admin, subject_id, subject)` que firman **la plataforma y el cliente**, una sola vez. `create_note` exige un seudónimo ya vinculado y rechaza que la bodega sea el cliente. `accept_note` exige que firme la dirección vinculada. |
| C2 | Alta | Una dirección con dos seudónimos sobrescribe el vínculo inverso. | Un permiso puede quedar irrevocable. | Lo resuelve C1: un seudónimo, una dirección, y el vínculo no se sobrescribe. |
| C3 | Alta | Una disputa no tiene fin: el deudor disputa una nota vencida y el incumplimiento desaparece del resumen. | El semáforo se puede maquillar. | **Hoy:** documentarlo y que el semáforo trate una aclaración abierta de más de 15 días como vencida (fuera de cadena). **Después:** plazo de resolución en el contrato. |
| C4 | Media | Una nota en «el cliente avisó que pagó» nunca llega a vencer. | El cliente evita el vencimiento con solo avisar. | `touch` también la pasa a vencida después del plazo más la gracia. |
| C5 | Media | Después de marcarse vencida, un pago tardío ya no se puede confirmar. | «Pagada tarde» casi nunca se registra. | `confirm_paid` acepta vencida → pagada tarde. |
| C6 | Media | La ventana de disputa se cuenta desde el vencimiento, no desde que se marca incumplida. | La bodega puede esperar para que ya no se pueda disputar. | Limitar `mark_default` a vencimiento + gracia + ventana de disputa. |
| C7 | Media | Cancelar y resolver comparten una propuesta que nunca caduca. | Una propuesta vieja puede cerrar una disputa nueva. | Claves separadas, borradas en cada cambio de estado. |
| C8 | Baja | `init` no pide firma. | Alguien podría adelantarse a inicializar. | `admin.require_auth()` en `init`. |
| C9 | Baja | `due_ts` sin tope. | Una nota que nunca vence. | Tope de 365 días. |
| C10 | Baja | Cancelar una nota aceptada no descuenta «aceptadas». TTL solo se extiende al escribir. `prev` sin implementar. | Detalles del agregado y de mantenimiento. | Documentar y dejar para después de entregar. |
| Info | — | El agregado se puede reconstruir leyendo la cadena directamente. | Coherente con la spec v2 §3b (privacidad honesta). | Nada; no decir lo contrario en el pitch. |

**Bien hecho:**
- `require_auth` en cada cambio de estado.
- Sin función de actualización; el admin solo maneja el padrón.
- Sin doble conteo.
- La incumplida solo existe después de la gracia.
- `read_stats` exige permiso a cualquier bodega y deja evento.
- Aritmética con comprobación de desbordamiento.
- Nada personal en la cadena.

## 2. App local (`backend/`, `frontend/`)

| # | Sev. | Hallazgo | Propuesta |
|---|---|---|---|
| B1 | Media | **CSRF:** una página cualquiera abierta en el navegador puede mandar `POST` a `127.0.0.1:8080` y hacer que la app firme (crear nota, dar permiso). Verificado. | Rechazar `POST`/`DELETE` si `Origin` no coincide con el `Host`, y exigir `Content-Type: application/json`. |
| B2 | Media | **DNS rebinding:** no se revisa el `Host`. | Lista blanca: `127.0.0.1:8080`, `localhost:8080` y el dominio de Codespaces (`*.app.github.dev`). |
| B3 | Media | **Éxito sin comprobante:** si el CLI no devuelve hash, la API responde éxito con `tx_hash: null`. | Responder 502 «No pudimos confirmar el comprobante». |
| B4 | Baja | Un tiempo de espera puede dejar una nota en cadena sin su registro fuera de cadena. | Guardar la nota como «pendiente» antes de enviar. |
| B5 | Info | «No se envió ninguna consulta»: sí se simula; lo que no se envía es una transacción. | Cambiar a «no se envió ninguna transacción». |

**Bien hecho:**
- Solo `execFile` con listas cerradas; sin inyección de comandos.
- Recorrido de rutas bloqueado.
- La llave HMAC nunca sale y los logs redactan cualquier `S…`.
- Límite de 10 KB en el cuerpo de las peticiones.
- Escucha solo en 127.0.0.1.
- Cabeceras de seguridad presentes.
- Sin `innerHTML`.
- 27/27 pruebas.

## 3. Sitio público (`web/`) y repositorio

| # | Sev. | Hallazgo | Propuesta |
|---|---|---|---|
| W1 | Media | Sin cabeceras de seguridad en Vercel (CSP, `nosniff`, `frame-ancestors`). | `web/vercel.json` con esas cabeceras. El script de tema en línea pasa a un archivo aparte, para no depender de un hash. |
| W2 | Baja | Se publican también `pruebas/` y `herramientas/`. | `web/.vercelignore`. |
| W3 | Baja | `plano/README.md` dice que la carpeta está vacía. Una fila de riesgos en `docs/campana-marketing.md` ya no aplica. | Actualizar ambos (Claude, chat). |

**Bien hecho:**
- **Secretos:** ningún secreto en los 69 commits de todas las ramas (búsqueda de `S…`, `ghp_`, `sk-`, `AKIA` y PEM).
- **Seguridad del código:** sin `innerHTML`, `eval` ni `fetch`.
- **Contenido:** sin nombres de negocios. Los hashes coinciden con la corrida real. Vocabulario limpio y avisos presentes.
- **Pruebas:** 53/53.

## 4. Agentes de IA

Los agentes del «Pasillo vivo» funcionan: 20 bodegas y 40 clientes con reglas iguales a las del contrato. Al día 90 hay 28 verdes, 8 amarillos, 1 rojo y 3 insuficientes.

**Agentes con un modelo de lenguaje real: no antes de entregar.**
- Exigirían un servidor y una llave de API en Vercel, lo que contradice la decisión #50 (sitio sin llaves ni servidor).
- Agregarían costo y respuestas impredecibles en vivo.

**Para el pitch:** «Hoy los agentes están simulados con las mismas reglas del contrato; el siguiente paso son agentes con IA que explican el semáforo y ayudan a cobrar, sin firmar nunca por nadie.»

## 5. Plan de corrección propuesto

**Claude Code en la web (sin llaves; puede empezar ya):**
- **B.** B1, B2, B3 y B5 en `backend/`, con pruebas nuevas para `Origin`, `Host`, `Content-Type` y la respuesta sin hash.
- **W.** W1 y W2 en `web/`.

**Codespace (necesita las llaves; requiere aprobar la #55):**
- **K1.** Contrato v4 con C1, C4, C5, C6, C7, C8 y C9. Las 8 pruebas de concepto del auditor entran como pruebas de regresión. `cargo test` en verde.
- **K2.** Redesplegar, registrar las bodegas A-17, B-40 y A-73, y vincular a Doña Mary con `bind_subject`. Correr `demo.sh` y `sembrar.sh`, y adaptar la app local al vínculo previo.
- **K3.** Regenerar la repetición del sitio con la nueva corrida real. Cambiar el Contract ID en todos los documentos (Claude, chat).
- **C3 (disputa sin fin):** va al semáforo, fuera de cadena, más una nota en la spec §3b y una pregunta del jurado.

**Tiempo estimado:** B y W, unos 45 minutos. K1 a K3, de 2 a 3 horas con el Codespace activo. Cabe antes de congelar el código el domingo a las 15:00.
