# Entrega GOYA HACK — ruta crítica y textos para copiar y pegar

**Preparado:** domingo 27-sep-2026, 00:40, por Claude (chat), a partir de los correos oficiales de CriptoUNAM (Luma).
**Hora límite oficial:** **domingo 27-sep, 23:59 (hora de la CDMX).** Después de esa hora no se aceptan envíos ni commits nuevos (correo «EXTENDIMOS EL TIEMPO DE ENTREGA», 25-sep).

## 1. Qué pide el organizador (según los correos)

| Dónde | Qué va | Fuente |
|---|---|---|
| **Panel de CriptoUNAM:** criptounam.xyz/hackathon | Repositorio público, **video demo de máximo 3 minutos** y descripción del proyecto | Correo del 25-sep |
| **Stellar Apex:** stellarapex.org/hackathons/cda98947-439c-428f-9641-8703059d6a08 | El proyecto, solo si aplica al track de Stellar (nosotros sí aplicamos). **Stellar elige a los ganadores desde ahí.** Primero se crea el proyecto en Apex y luego se sube al hackathon (hay un video instructivo en el correo «SUBE TU PROYECTO EN APEX», 26-sep) | Correos del 25 y 26-sep |
| Discord y WhatsApp del evento | Dudas con la entrega o con Apex hasta el domingo a las 23:00 | Correo del 25-sep |

## 2. Ruta crítica (unos 45 minutos, en este orden)

1. **Subir el video (10 min).**
   - Archivo: `demo/video/2026-09-27_cuentas-claras-video-demo.mp4`. Dura 2:18: tarjetas con la historia, la corrida real de 5 pasos en el sitio y el cierre. Es un video sin voz.
   - Súbelo a YouTube como **«No listado»** (o a Google Drive con «Cualquier persona con el enlace»).
   - Título: `Cuentas Claras — GOYA HACK 2026 (Equipo Palabra)`.
   - Ábrelo en una ventana de incógnito para comprobar que se ve.
2. **Panel de CriptoUNAM (10 min).** Entra a criptounam.xyz/hackathon. Si falta, registra el equipo. Pega los campos de la sección 3, elige el track **Blockchain** y envía.
3. **Stellar Apex (15–20 min).**
   - Mira el video instructivo del correo.
   - Crea el proyecto con los campos de la sección 4.
   - Adjunta el deck (PDF o enlace de Gamma).
   - Súbelo al hackathon GOYA HACK desde la página del evento.
4. **Comprobación final (5 min).**
   - Abre el repositorio, el sitio y el video en incógnito.
   - Toma captura de las dos confirmaciones de envío.
5. **Apaga el Codespace**, para que no consuma horas.

## 3. Textos para el panel de CriptoUNAM

**Nombre del proyecto:** Cuentas Claras

**Equipo:** Palabra

**Track:** Blockchain (Stellar testnet)

**Frase corta (una línea):**
> La libreta de fiado de la Central de Abasto, firmada por los dos en Stellar.

**Descripción:**
> En la Central de Abasto de la CDMX, el fiado se da de palabra: más de 2,300 bodegas (FICEDA) fían a fondas, tienditas y locatarios, y ninguna se pasa referencias. Quien paga puntual no lo puede demostrar en la bodega de enfrente, y al que nadie conoce no se le fía. En el crédito formal, 18.4 % de los rechazos a empresas son por falta de historial (ENAFIN 2024, INEGI).
>
> Cuentas Claras es la libreta de fiado firmada por los dos. La hace cumplir un contrato en Stellar (Soroban) con tres reglas:
> 1. Ninguna bodega escribe sola una deuda: la nota existe solo cuando la bodega la crea y el cliente la acepta con su firma.
> 2. Nadie borra ni maquilla una nota, ni nosotros: el contrato no tiene función de actualización.
> 3. El historial es del cliente: es público y verificable, sin nombre, teléfono ni monto exacto (solo un código seudónimo y un rango), y el cliente decide a qué bodega le enseña su código. Cada consulta formal queda registrada en la cadena.
>
> ¿Por qué blockchain y no una base de datos? Porque bodegas que compiten no le confían sus cuentas a la base de datos de otra. Una cadena pública es el registro que ninguna controla.
>
> **Qué funciona hoy:**
> - contrato v5 desplegado en Stellar testnet, con 22 pruebas;
> - app local que firma en testnet, con 36 pruebas;
> - sitio público con la corrida real verificable (cada paso enlaza a su transacción), un gemelo digital del Pasillo A-B y una simulación de agentes, con 69 pruebas.
>
> **Algo que nos distingue:** auditamos nuestro propio contrato y encontramos un hueco (una bodega podía aceptar su propia nota). Lo cerramos. Un mentor nos hizo ver que pedir permiso para consultar sobraba, porque la cadena es pública, y lo quitamos. Cada cambio fue un contrato nuevo, a la vista de todos.
>
> **Siguiente paso:** un piloto con una bodega de abarrotes y sus clientes, un dictamen legal antes de la segunda bodega y mainnet solo después de una auditoría. La bodega paga por su herramienta de cobranza; el cliente, nunca.

**Enlaces:**
- Repositorio: https://github.com/jose2501106-IA/goyahack_cuentas-claras
- Sitio (demo verificable): https://cuentas-claras-lemon.vercel.app
- Contrato v5 en el explorador: https://stellar.expert/explorer/testnet/contract/CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL
- Deck (Gamma): https://gamma.app/docs/xo6lgd07eii2eea
- Video: *(el enlace de YouTube o Drive del paso 1)*

## 4. Textos para Stellar Apex

Usa los mismos textos de la sección 3. Si Apex pide campos técnicos, agrega estos:

- **Red:** Stellar testnet (Soroban). **Contract ID:** `CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL`.
- **Stack:**
  - soroban-sdk 28.0.0 (Rust), Stellar CLI 28.0.0 y target `wasm32v1-none`;
  - backend Node sin dependencias sobre el Stellar CLI;
  - frontend en HTML, CSS y JS, sin framework;
  - sitio estático en Vercel, sin llaves.
- **Funciones del contrato:**
  - `create_note`, `accept_note`, `claim_paid`, `confirm_paid`, `touch`, `mark_default`, `dispute`, `resolve_mutual`, `cancel_note`;
  - `invite_subject` y `bind_subject` (vínculo previo del cliente);
  - `read_stats` (consulta con constancia en el evento `aggregate_read`).
- **Transacciones reales de la demo:**
  - https://stellar.expert/explorer/testnet/tx/176b37e5fba26bc0993e1bfe758468d54f7423a74e88c8aea12aaa0d394f68f8 (crear)
  - https://stellar.expert/explorer/testnet/tx/8c01e4bcaef1965ded6ed07404d542128c6d13267e860c58c26834ad4ae98b75 (aceptar)
  - https://stellar.expert/explorer/testnet/tx/9b87f36a4d3d2f283ebcc930ac4ac587a1ae10116e98615f8b1b43c123d43c44 (pago confirmado)
  - https://stellar.expert/explorer/testnet/tx/d86bc35f5e49dad92d095ab502bf3db3887f15ce59fbc2c5453eae47dfb1c833 (consulta)

**Versión en inglés, por si Apex la pide:**
> Cuentas Claras is a co-signed credit ledger for Mexico City's Central de Abasto, the largest wholesale market in Latin America, built on Stellar (Soroban, testnet). Over 2,300 warehouses sell on informal credit ("fiado") based on word of mouth, and a customer's good payment record never leaves the warehouse that holds it. With Cuentas Claras:
> - every credit note is signed by both the warehouse and the customer, and nobody can edit or delete it;
> - the customer's history is public and verifiable without names, phone numbers or exact amounts (only a pseudonymous code and an amount range), and the customer chooses which warehouse to show the code to;
> - every formal lookup is recorded on-chain.
>
> Why a blockchain and not a database? Competing warehouses won't trust a database run by one of them. We audited our own contract, closed a flaw that let a warehouse accept its own note, and removed a redundant permission step after mentor feedback. Each change was a new, non-upgradeable contract.
>
> Live on testnet: 22 contract tests, a local app that signs real transactions, and a public site with a verifiable replay of the real run.
>
> Next: a pilot with one warehouse and its customers, a legal opinion, then mainnet after an audit.

## 5. Si algo falla

- **El panel o Apex no cargan:** pregunta en Discord (https://discord.gg/3gp3SptWu) o en el WhatsApp del evento, antes de las 23:00 del domingo.
- **No hay tiempo para Apex:** el panel de CriptoUNAM es la entrega obligatoria. Apex es donde Stellar elige a sus ganadores, así que vale la pena subirlo también.
