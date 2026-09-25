# Talleres y patrocinadores de GOYA HACK 2026: qué se enseñó, qué valoran los evaluadores y cómo responde Palabra

**Nota de método**
- Todas las fuentes se consultaron el **25-sep-2026**. Cuando se conoce la fecha de publicación, se indica con "pub.".
- Esta versión reemplaza e integra la nota del mismo nombre de las 10:57. El respaldo está en el scratchpad de la sesión (`talleres_patrocinadores_v1057_backup.md`). Lo que viene de esa nota y no volví a verificar hoy lleva la marca "(nota 10:57)".
- Etiquetas:
  - **[INFERENCIA]**: razonamiento propio.
  - **[NO VERIFICADO]**: dato que solo aparece en un título de búsqueda, o que el extractor automático resumió sin cita literal.
- Las citas entre comillas vienen del extractor automático de cada página y pueden diferir un poco del texto original.
- No abrí criptounam.xyz (está bloqueado). No revisé X, Instagram ni LinkedIn (piden sesión). No encontré grabaciones, láminas ni repositorios de ningún taller.
- Consultas web usadas: 26.
- Versión pública: se omitieron nombres de personas anfitrionas y el enlace de referido de Tangem.

---

## 1. Cada taller y main stage: quién lo dio, qué se enseñó, con qué herramientas

### Takeaway
Luma confirma la agenda, las sedes y los anfitriones. Ninguna página de taller nombra ponentes ni publica temario, materiales o grabación. Lo "enseñado" solo se puede reconstruir con lo que cada empresa publica para ese formato:
- **Stellar:** tutorial oficial Getting Started (Stellar CLI → testnet → frontend con Freighter o Stellar Wallets Kit).
- **Pollar:** quickstart de 5 pasos con `@pollar/react`.
- **Avalanche/Team1:** cursos de la Academy sobre L1 con Builder Console.

De Modelo de negocio, APEX, GrantFox × CriptoUNAM, Tangem y los dos main stages BAF–Stellar no hay contenido publicado.

### Hallazgos citados
**Evento (página principal en Luma)**
- Descripción: "Construye con AI y Web3 en ~76 horas. Mentorías, talleres, jurado en vivo y entrega en plataforma. Mismos tracks y premios en campus o remoto." Tracks: "AI · Blockchain · Contenido". — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- Agenda publicada (texto del extractor). — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
  - **Mié 23:**
    - "11:00–12:30 Stellar · Contratos, wallets y Testnet · Edificio M · PC PUMA"
    - "13:00–14:00 POLLAR · Smart Wallets · Edificio M · PC PUMA"
    - "14:00–15:00 Modelo de negocio · Edificio M · PC PUMA"
    - "15:00–16:30 Despliega tu L1 en Avalanche · Div. Ing. Mecánica e Industrial"
    - "14:00–15:00 Main stage · Tangem"
  - **Jue 24:**
    - "11:00–12:00 SUBE TU PROYECTO · APEX · Edificio M · PC PUMA"
    - "11:00–12:00 Office Hours Avalanche · Edificio M · PC PUMA"
    - "12:00–13:30 GrantFox × CriptoUNAM · Edificio M · PC PUMA"
    - "14:00–16:00 Mentorías abiertas · CIA"
    - "15:00–16:00 SUBE TU PROYECTO · APEX (2.ª) · Edificio M · PC PUMA"
    - "14:00–15:00 Main stage · Stellar × BAF"
  - **Vie 25:**
    - "14:00 Deadline (plataforma)"
    - "14:00–15:00 Main stage · BAF × Stellar"
    - "18:00–20:00 Clausura y ganadores"
- Anfitriones listados: CriptoUNAM Eventos, Blockchain Acceleration Foundation (BAF), Team1 y personas coordinadoras (nombres omitidos en la versión pública). — [Luma](https://luma.com/0oogs8ym)
- Otros datos de la página: "Registro gratis · 1–5 por equipo · deadline vie 25 · 14:00 CDMX"; "Lo único 100 % presencial: los stands en Facultad"; 227 registrados [NO VERIFICADO: cifra que leyó el extractor]. — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- El organizador amplió el plazo "hasta el fin de semana" (correo del 24-sep, 23:59). La hora exacta estaba pendiente al cierre. — `research/02_que-busca-el-organizador.md` (25-sep-2026)

**Stellar · Contratos, wallets y Testnet (mié 23, 11:00–12:30)**
- Título en Luma: "Stellar - Contratos Inteligentes, Wallets y despliegue en Testnet". Sede: "Edificio M, PC PUMA- Anexo de la Facultad de Ingeniería UNAM". Anfitriones: GOYA HACK (presenta), CriptoUNAM Eventos, Blockchain Acceleration Foundation y una persona ([persona omitida]). La página no lista ponentes ni herramientas. — [Luma 72nqilub](https://luma.com/72nqilub)
- La descripción habla del formato, no del temario:
  - "La velocidad de ejecución es clave".
  - Habrá "sesiones de mentoría bajo demanda y *office hours* con expertos del ecosistema".
  - Promete "acceso directo a especialistas y líderes de la industria" para el debugging de contratos, la lógica de agentes de IA y la validación de modelos de negocio.

  — [Luma 72nqilub](https://luma.com/72nqilub)
- Lo que Stellar enseña oficialmente en este formato (tutorial Getting Started). — [Stellar Docs, Getting Started](https://developers.stellar.org/docs/build/smart-contracts/getting-started)
  - Páginas: "Setup", "1. Hello World", "2. Deploy to Testnet", "3. Storing Data", "4. Deploy the Increment Contract" y "5. Build a Hello World Frontend".
  - Comandos: `stellar keys generate`, `stellar contract build` y `stellar contract deploy`.
  - Herramientas: Friendbot, Freighter, Stellar Lab, Scaffold Stellar, Stellar Wallets Kit y Stellar Expert.
  - Los contratos se escriben en Rust.
- En su programa Stellar de 2025, BAF usó su propio bloque de formación, "Stellar Lab": 3 días sobre contratos Soroban, wallet links, liquidez y rampas. — [BAF, Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025) (nota 10:57)

**POLLAR · Smart Wallets (mié 23, 13:00–14:00)**
- Título en Luma: "POLLAR - Smart Wallets". Sede: Edificio M. Anfitrión: CriptoUNAM Eventos. No lista ponentes, herramientas ni premios. La descripción es genérica: "el hackathón estará respaldado por una serie de talleres técnicos intensivos", con "enfoque cien por ciento práctico, guiando a los participantes desde los conceptos base hasta la implementación de código funcional". — [Luma bz2uatth](https://luma.com/bz2uatth)
- El correo del organizador del 23-sep lo presentó como el taller de Pollar – Smart Wallets (wallets embebidas con login de Google). — `research/02_que-busca-el-organizador.md` (25-sep-2026)
- El quickstart oficial de Pollar tiene 5 pasos. — [Pollar Quickstart](https://docs.pollar.xyz/docs/getting-started/quickstart) (nota 10:57)
  1. `npm install @pollar/react`.
  2. `PollarProvider` con `apiKey`.
  3. Login y creación de la wallet con `usePollar()`.
  4. Envío de USDC con `runTx()`.
  5. Historial con `fetchTxHistory()`.

**Modelo de negocio (mié 23, 14:00–15:00)**
- No hay página ni ponente publicados. — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- Correo del 22-sep: las mentorías presenciales del jueves darían retroalimentación sobre pitch y modelo de negocio, y "los mentores asignarán un puntaje que será considerado en la selección de los proyectos ganadores". — `research/02_que-busca-el-organizador.md`
- En su hackathon "LatAm Institucional" en México (mayo 2026), Avalanche evaluó viabilidad, arquitectura, MVP funcional, uso inteligente del stack y modelo de negocio. — [Avalanche Builder Hub](https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407) (citado en el doc 02)
- La única rúbrica con pesos verificada de un hackathon de Stellar (otro evento) da 30 % a impacto real, 25 % a ejecución técnica en Stellar, 20 % a UX, 15 % a innovación y 10 % a viabilidad. — [Rise In](https://www.risein.com/programs/build-on-stellar-philippines-hackathon) (citado en el doc 02)

**Despliega tu L1 en Avalanche (mié 23, 15:00–16:30) y Office Hours Avalanche (jue 24, 11:00–12:00)**
- Sedes: "Div. Ing. Mecánica e Industrial" para el taller y Edificio M para las office hours. No se publicaron ponentes. Team1 y "[persona omitida]" aparecen entre los anfitriones del evento. — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- Qué es Team1 (pub. 27-may-2026). — [Avalanche blog, Team1](https://www.avalanche.com/about/blog/avalanche-team1-applications-are-now-open)
  - "Avalanche Team1 is a global community program dedicated to growing the Avalanche ecosystem through education, events, content, and direct support for builders and newcomers".
  - Alcance: "40+ countries" y "six official chapters".
  - Sus miembros tienen "event funding pathways, content bounty opportunities, creative support, onboarding resources".
  - Recursos para construir: Builder Console, Academy y Grants.
- La Avalanche Academy tiene 9 cursos sobre L1. — [Avalanche Academy](https://build.avax.network/academy)
  - Cursos: Avalanche Fundamentals; Customizing the EVM; Interchain Messaging; ERC20 Bridge; Permissioned L1s ("Proof of Authority"); L1 Native Tokenomics; Permissionless L1s ("Proof of Stake"); Native Token Bridge; Access Restriction ("transaction and contract deployer allowlists").
  - Herramientas: Builder Console, Remix IDE, Validator Manager y L1 Toolbox.
  - Accesos directos: "Create an L1" y "Build your own blockchain using the Builder Console".
- Existen la cuenta "Team1 LatAm" en X y un taller "Team 1 Japan Workshop: Avalanche L1 Hands-On Online". — [X @team1latam](https://x.com/team1latam); [KuCoin News](https://www.kucoin.com/news/community/AVAX/6aae2abd62cf370007431a40) [NO VERIFICADO: solo títulos]

**SUBE TU PROYECTO · APEX (jue 24, 11:00–12:00 y 15:00–16:00)**: ver la pregunta 5.

**GrantFox × CriptoUNAM (jue 24, 12:00–13:30)**: ver la pregunta 4. No hay página ni contenido publicado. La búsqueda "GrantFox CriptoUNAM" (25-sep-2026) no devolvió ninguna relación publicada.

**Mentorías abiertas (jue 24, 14:00–16:00, CIA)**
- Hubo mentores técnicos, de modelo de negocio y de pitch, y su puntaje cuenta para elegir a los ganadores. El 25-sep es la última jornada presencial (CIA, 10:00–17:00) y también hay mentoría por Discord, equipo por equipo. — `research/02_que-busca-el-organizador.md`

**Main stage Tangem (mié 23, 14:00–15:00)**: ver la pregunta 3. Contenido no publicado. Tangem tuvo stands el 22 y 23 con rifas a las 13:00 y 16:00 (dato de la agenda de Luma recogido en el contexto común; no lo volví a verificar en esta lectura).

**Main stages Stellar × BAF (jue 24, 14:00–15:00) y BAF × Stellar (vie 25, 14:00–15:00)**: ver la pregunta 6. Contenido no publicado.

### Inferencias
- [INFERENCIA] El taller de Stellar probablemente siguió la ruta del Getting Started: CLI → Friendbot → despliegue a testnet → frontend con Freighter o Stellar Wallets Kit. Su título coincide con esos pasos, y BAF, coanfitrión, usa ese mismo bloque ("Stellar Lab") en su programa.
- [INFERENCIA] El taller de Avalanche probablemente lo dio Team1 con Builder Console: es el recurso que Team1 promueve y el que la Academy usa para "Create an L1".
- [INFERENCIA] Según su descripción, los expertos del taller de Stellar también ayudan a "validar modelos de negocio". Los mentores técnicos no evaluarán solo el código.
- [INFERENCIA] El orden de los tres bloques del miércoles (contratos → wallets → modelo de negocio) sugiere una rúbrica implícita: un contrato que funciona, un usuario que firma sin fricción y alguien que paga.

### Huecos
- Ponentes, láminas, repositorios y grabaciones de todos los talleres: no publicados o no encontrados.
- Temario real de Modelo de negocio, APEX, GrantFox × CriptoUNAM, Tangem, Stellar × BAF y BAF × Stellar.
- Publicaciones de CriptoUNAM o de las empresas en X, Instagram o LinkedIn: no revisadas.

---

## 2. Pollar: qué es, cómo se integra y si el cliente puede co-firmar con su login

### Takeaway
Pollar es un SDK de onboarding y wallets para apps de consumo en Stellar (`@pollar/core` y `@pollar/react`, v0.11.3; primer paquete en npm el 27-feb-2026).
- **Tipos de wallet:** el login con Google, GitHub o email OTP crea cuentas G custodiadas (llaves en AWS KMS, firma del lado del servidor). También ofrece smart wallets C con passkey.
- **Requisitos:** cuenta en el dashboard y una API key publicable. La red por defecto es testnet.
- **Co-firma:** `signAuthEntry` firma una `SorobanAuthorizationEntry`.
  - Con cuentas G custodiadas, solo firma si cada contrato y cada función del árbol de invocación están en la allowlist "Treasury → Auth Policy".
  - Con smart wallets C de passkey **no está soportado** (regresa `{ status: 'error' }`).
  - `buildTx` no trae ayudas para invocar contratos.

Conclusión: un cliente con cuenta G de Pollar sí podría co-firmar `accept_note` (y `grant_consent`), siempre que nuestro backend arme y simule la transacción y le adjunte la entrada firmada. El esfuerzo es **desconocido**: no hay ejemplo con un contrato propio.

### Hallazgos citados
**Qué es y quién está detrás**
- "Pollar is the onboarding-to-payment infrastructure layer for consumer apps on Stellar. The full stack from social login to USDC payments — without exposing users to blockchain complexity." — [Pollar Docs](https://docs.pollar.xyz/docs) (nota 10:57)
- El repo oficial se describe como "Stellar-native onboarding and wallet activation SDK for consumer apps". El README dice además "authentication and transaction infrastructure for Stellar and Solana applications". — [GitHub pollar-xyz/pollar](https://github.com/pollar-xyz/pollar) (nota 10:57)
- Hay un perfil de LinkedIn de una persona vinculada a Pollar (omitido en la versión pública).
- La organización `pollar-xyz` aparece en GrantFox. — [GrantFox](https://contribute.grantfox.xyz/org/pollar-xyz) (nota 10:57) [NO VERIFICADO: solo título]

**Paquetes y documentación**
- Paquetes: `@pollar/core` y `@pollar/react` (v0.11.3), y los adaptadores `@pollar/privy-adapter`, `@pollar/privy-server-adapter`, `@pollar/accesly-adapter`, `@pollar/stellar-wallets-kit-adapter` y `@pollar/solana-wallet-standard-adapter` (v0.11.2). — [GitHub pollar-xyz/pollar](https://github.com/pollar-xyz/pollar) (nota 10:57)
- Secciones de la documentación: Quickstart, Example App, API Keys, Architecture, Security Model, @pollar/react, @pollar/core, Pollar Server API, Webhooks y MCP Gateway. — [Pollar Docs](https://docs.pollar.xyz/docs) (nota 10:57)

**Redes, API key y tipos de wallet (verificado hoy)**
- La `apiKey` (publishable key) es obligatoria en `PollarClientConfig`. `getNetwork()` y `setNetwork(network)` aceptan `'testnet'` y `'mainnet'`; testnet es el valor por defecto. — [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core)
- Tipos de dirección y proveedores de login. — [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core)
  - Las direcciones G son wallets custodiales (login social o por email).
  - Las direcciones C son smart wallets de Soroban con passkey, vía `createSmartWallet()` y `loginSmartWallet()`.
  - Proveedores integrados: Google OAuth, GitHub OAuth, email OTP y wallets externas (Freighter y Albedo). Se agregan más con `walletAdapters`.
- Prerrequisitos del quickstart: "Node.js 20+ · React 18+ · A publishable key from dashboard.pollar.xyz". Comisiones: "Transaction fees are paid from your app's sponsorship wallet". — [Quickstart](https://docs.pollar.xyz/docs/getting-started/quickstart) (nota 10:57)
- Custodia: "All private keys — user wallets and your app's sponsorship wallets (funding, gas, distribution) — are managed through AWS KMS using envelope encryption". Passkeys/WebAuthn, BYOK y MPC aparecen como "Coming Soon". — [Security Model](https://docs.pollar.xyz/docs/core-concepts/security-model) (nota 10:57)

**Firma de invocaciones Soroban (verificado hoy)**
- `pollar.signAuthEntry(entryXdr, { validUntilLedger })` firma una sola entrada de autorización de Soroban, sin sobre de transacción. — [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core) [paráfrasis del extractor]
  - Con wallets externas, firma el adaptador.
  - Con wallets custodiales, Pollar firma del lado del servidor solo si cada contrato y función del árbol de invocación está en la allowlist "Treasury → Auth Policy" del dashboard. Así se evita que el firmante custodial funcione como "signing oracle".
  - `validUntilLedger` es el ledger absoluto en el que vence la firma.
- Las smart accounts con passkey (sesiones de dirección C) "are currently unsupported by this method and resolve to `{ status: 'error' }`". — [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core) [paráfrasis del extractor]
- `buildTx` y `signAndSubmitTx`. — [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core) [paráfrasis del extractor]
  - `pollar.buildTx(operation, params, options?)` arma del lado del servidor transacciones sin firmar para operaciones estándar (por ejemplo, `payment`). El extractor no encontró ayudas para invocar contratos Soroban.
  - `pollar.signAndSubmitTx(unsignedXdr)` firma y envía. La documentación no dice si acepta un XDR armado fuera de `buildTx`.

**Madurez**
- GitHub: 10 estrellas, 4 forks, 402 commits y licencia Apache-2.0. Última versión: 0.11.3 ("session resilience"). — [GitHub pollar-xyz/pollar](https://github.com/pollar-xyz/pollar) (nota 10:57)
- npm: `@pollar/core` se creó el 27-feb-2026 y se modificó por última vez el 24-ago-2026, con 50 versiones (`latest` 0.11.3, `next` 0.11.3-rc.1). `@pollar/react` tiene las mismas fechas. — [npm @pollar/core](https://registry.npmjs.org/@pollar%2Fcore); [npm @pollar/react](https://registry.npmjs.org/@pollar%2Freact) (nota 10:57)
- Hay una demo pública y una página de app de ejemplo. — [demo.pollar.xyz](https://demo.pollar.xyz/); [Example App](https://docs.pollar.xyz/docs/getting-started/example-app) (nota 10:57) [NO VERIFICADO: no revisé su contenido]
- Inconsistencias: el overview marca OAuth y email OTP como "upcoming", y el Security Model marca las passkeys como "Coming Soon". En cambio, la referencia de `@pollar/core` los documenta como disponibles. — [Pollar Docs](https://docs.pollar.xyz/docs); [Security Model](https://docs.pollar.xyz/docs/core-concepts/security-model); [Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core) (nota 10:57)
- Un competidor en GOYA HACK (PumaTrade) usa wallets de Pollar con login de Google. — [GitHub zums-stuff/Goya-Hack](https://github.com/zums-stuff/Goya-Hack) (citado en el doc 02)

### Inferencias
- [INFERENCIA] Flujo posible, sin probar:
  1. La bodega firma la nota "propuesta".
  2. El backend arma `accept_note(subject, note_id)` con la cuenta plataforma como fuente y la simula para obtener la `SorobanAuthorizationEntry` del cliente. Las firmas del cliente en la spec v1 (sección 5) son `accept_note`, `claim_paid`, `dispute`, `grant_consent` y `revoke_consent`; en el flujo de la demo firma `accept_note` y `grant_consent`.
  3. El cliente abre el enlace, hace login con Pollar y su teléfono llama `signAuthEntry(entryXdr, { validUntilLedger })`.
  4. El backend adjunta la entrada firmada y envía la transacción.

  Es el patrón estándar de Soroban para autorizar a una dirección que no es la cuenta fuente. La documentación de Pollar no trae un ejemplo con un contrato propio.
- [INFERENCIA] Antes de intentarlo hay requisitos que no son código: crear la app en el dashboard, obtener la publishable key de testnet y dar de alta en "Treasury → Auth Policy" el Contract ID y cada función que firme el cliente (`accept_note` y `grant_consent` como mínimo). Cada redespliegue cambia el Contract ID y obliga a repetir el alta.
- [INFERENCIA] Migración: la spec v1 (sección 5.1) fija el vínculo `subject_id ↔ Address` en la primera aceptación y exige que `subject` coincida.
  - Para probar Pollar hay que usar un sujeto nuevo.
  - Pasar a un sujeto existente a otra dirección requeriría una función de revinculación que la spec no tiene.
  - La spec prevé passkeys en producción ("el contrato no cambia, porque solo ve `Address`"), pero `signAuthEntry` de Pollar no soporta passkeys. Con Pollar, el camino sería la cuenta G custodiada.
- [INFERENCIA] Modelo de confianza: con cuentas G de Pollar, la llave la custodia un tercero (Pollar, en AWS KMS), que firma después de que el cliente se autentica.
  - Frente a la demo actual, donde el backend de Palabra custodia la llave del cliente ficticio (spec v1), mejora algo importante: ni la bodega ni el operador de Palabra podrían fabricar la aceptación del cliente.
  - Pero no es autocustodia: en el pitch no se puede decir "el cliente controla su llave".
- [INFERENCIA] Hoy las passkeys de Pollar (dirección C) no sirven para co-firmar, porque `signAuthEntry` no las soporta.
- [INFERENCIA][NO VERIFICADO] Riesgo con el login de Google dentro del navegador interno de WhatsApp: Google suele bloquear OAuth en webviews. El email OTP evitaría ese problema.
- [INFERENCIA] `@pollar/react` pide React 18+. Si el frontend Vite de Palabra no usa React, habría que usar `@pollar/core`.
- Esfuerzo de la co-firma con nuestro contrato: **desconocido**.

### Huecos
- Empresa, equipo, ubicación y financiamiento de Pollar.
- Si crear la app y la API key de testnet en el dashboard es inmediato y gratuito, y qué límites de uso tiene.
- Si `signAndSubmitTx` acepta un XDR armado fuera de Pollar, y si hay alguna ayuda para `invokeHostFunction`.
- Cómo se comporta dentro del navegador interno de WhatsApp y qué callbacks de OAuth hay que configurar.
- Si Pollar ofrecía premio o bounty en GOYA HACK (Luma no lo dice).

---

## 3. Tangem y "TangemPay + verificación"

### Takeaway
- **Tangem** es una hardware wallet autocustodial en forma de tarjeta NFC, con app móvil. Sus páginas anuncian soporte para Stellar (XLM).
- **Tangem Pay** es otra cosa: una cuenta de pago Visa virtual que se fondea con USDC en Polygon (acepta USDC y USDT en Polygon, Base, Arbitrum y BNB Smart Chain), con KYC vía Sumsub. No usa Stellar.
- **Por qué el requisito:** nadie publicó por qué GOYA HACK exigió crear la wallet y activar Tangem Pay con verificación. Lo más probable (inferencia) es un objetivo de adquisición de usuarios del patrocinador.
- **SDK:** son móviles nativos; el de React Native está archivado desde el 23-jul-2025.

Para Palabra no aporta.

### Hallazgos citados
- Requisito previo del evento: "Descarga solo desde: https://join.tangem.com/MsTz/7h5fwkzf?af_qr=true Crea tu wallet Activa TangemPay + verificación". — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- Tangem Pay (artículo pub. 26-mar-2026). — [Tangem Blog, How to Set Up and Use Tangem Pay](https://tangem.com/en/blog/post/tangem-pay-setup/)
  - Se describe como "a secure, self-custodial payment experience that works anywhere Visa is accepted" y "a virtual Visa payment account".
  - Está "ready to receive USDC on Polygon". Se pueden copiar direcciones de USDC o USDT en "Polygon, Base, Arbitrum, or BNB Smart Chain".
  - Pasos: actualizar la app y tocar "Get card" → escanear la Tangem Wallet → confirmar el país de residencia → KYC con Sumsub (~2 minutos) → nombre, correo y fecha de nacimiento → emisión.
  - El artículo no lista países ni comisiones.
- Hay cobertura en español del lanzamiento de la tarjeta de USDC y de su llegada a Argentina. — [CriptoNoticias](https://www.criptonoticias.com/comunidad/adopcion/tangem-lanza-tarjeta-usdc-wallet-sin-custodia/); [iProUP](https://www.iproup.com/economia-digital/61757-nueva-tarjeta-de-usdc-sin-custodia-para-pagar-con-cripto-en-comercios) [NO VERIFICADO: solo títulos]. La página oficial del producto existe, pero no la revisé. — [Tangem Pay](https://tangem.com/en/tangem-pay/)
- La tarjeta y su SDK de React Native. — [GitHub tangem/tangem-sdk-react-native](https://github.com/tangem/tangem-sdk-react-native) (nota 10:57)
  - "The Tangem card is a self-custodial hardware wallet that works via NFC."
  - El SDK (npm `tangem-sdk-react-native`, licencia MIT) es nativo para iOS y Android; no corre en Expo Go ni en el navegador.
  - Estado: "archived by the owner on Jul 23, 2025".
- Otros SDK: plugin para Cordova/Capacitor, `tangem_sdk` para Flutter y el paquete npm `tangem-sdk`. — [GitHub Tangem/tangem-sdk-cordova](https://github.com/Tangem/tangem-sdk-cordova); [pub.dev](https://pub.dev/documentation/tangem_sdk/latest/); [npm](https://www.npmjs.com/package/tangem-sdk) (nota 10:57) [NO VERIFICADO]
- Soporte de Stellar: página "Stellar cold wallet from Tangem". — [tangem.com](https://tangem.com/en/wallet-for/stellar/) (nota 10:57) [NO VERIFICADO: solo título]
- En julio de 2026 se publicó "Laser Attack Resets Tangem Wallet Passwords on Cards That Can't Be Patched". — [The Hacker News](https://thehackernews.com/2026/07/laser-attack-resets-tangem-wallet.html) (nota 10:57) [NO VERIFICADO: solo título]
- Las búsquedas "Tangem CriptoUNAM México hackathon" (nota 10:57) y "GOYA HACK APEX OR GrantFox OR Tangem hackathon UNAM" (25-sep-2026) no mostraron ninguna relación publicada.

### Inferencias
- [INFERENCIA] El enlace de descarga lleva parámetros de atribución (`af_qr`) y el requisito pide activar Tangem Pay con KYC. Es el patrón de una campaña de adquisición del patrocinador (descargas atribuidas y cuentas verificadas), reforzada con stands y rifas. No está confirmado.
- [INFERENCIA] Tangem Pay no toca Stellar y Palabra no mueve dinero: no tiene ninguna relación con el flujo.
- [INFERENCIA] Firmar con Tangem exige una app nativa con NFC y la tarjeta física. Un cliente de la CEDA no la tiene, y un enlace web no puede usarla.
- [INFERENCIA] Posible relevancia administrativa: si los premios se pagan en USDC a wallets Tangem o Tangem Pay, el requisito podría importar para cobrarlos. No está confirmado; hay que preguntar.

### Huecos
- Si el requisito de Tangem condiciona la elegibilidad o el pago de premios.
- Si la app de Tangem permite crear una wallet sin tarjeta: el requisito sugiere que sí, pero el artículo de Tangem Pay pide escanear la tarjeta.
- Si Tangem Pay opera en México (el artículo no lista países).
- Si Tangem firma entradas de autorización de Soroban o se conecta a dApps de Stellar.

---

## 4. GrantFox: qué es, qué ofreció y si Palabra puede postular

### Takeaway
GrantFox es una plataforma de contribuciones open source exclusiva para Stellar, que se presenta como el reemplazo de OnlyDust:
- Los proyectos publican issues; los contribuidores aplican y cobran en USDC.
- Los pagos son no custodiales, vía el escrow de Trustless Work.
- La hizo un equipo de Costa Rica y ganó un Build Award del SCF (#40, US$60,000).

No es una fuente de grants para proyectos: es un canal para conseguir contribuidores, que además ofrece "bounties" de prueba de producto. El contenido de "GrantFox × CriptoUNAM" no está publicado.

### Hallazgos citados
- Sitio oficial. — [grantfox.xyz](https://grantfox.xyz/)
  - "GrantFox is a contribution ecosystem that connects users with real opportunities, helps them build professional experience, and helps projects grow with the right talent."
  - Tiene dos mecanismos:
    - "Open-Source Platform: Browse active repositories, discover open issues, and make meaningful contributions to open-source projects".
    - "Bounties: Help projects validate their products with real user feedback before launch. Test features, report findings, and get paid fairly".
  - Total distribuido: "$201,324 USDC" (instantánea de la página).
  - El sitio lista a siete integrantes.
- Ficha en el Stellar Community Fund. — [SCF, ficha GrantFox](https://communityfund.stellar.org/project/grantfox-4zq)
  - "GrantFox is the new 'OnlyDust' collaboration platform built exclusively for the Stellar ecosystem. It connects projects with technical contributors to accelerate ecosystem growth through transparent, high-quality contributions."
  - Permite a los proyectos "publish open issues, and manage requests from a same place. Builders can explore projects, apply to issues, and build verified on-chain reputation". Se sincroniza "seamlessly" con GitHub.
  - Categoría Applications. Premio: SCF #40, US$60.0K.
  - Historial: 2 de 3 postulaciones premiadas (SCF #37–#40). La de SCF #38, "New era of payouts via smart escrows" (US$70K), no se premió.
  - La ficha registra un equipo de 3 personas.
- Artículo de Trustless Work (pub. 24-dic-2025). — [Trustless Work, Escrow Times](https://www.trustlesswork.com/escrow-times/new-grantfox-scf-grant)
  - Describe a GrantFox como "the platform for open-source collaboration on Stellar", que llena el hueco que dejó OnlyDust.
  - Pagos "non-custodial, trustless payouts" con "on-chain auditability of rewards", vía Trustless Work.
  - "built by a Costa Rican team"; un cofundador de Trustless Work es parte del equipo.
  - Menciona "open-source waves".
- Subsitios: contribuidor, "Maintainer" (bounties para mantenedores), lista de espera "Beta Campaign" y dapp. — [contribute.grantfox.xyz](https://contribute.grantfox.xyz/); [maintainer-bounties.grantfox.xyz](https://maintainer-bounties.grantfox.xyz/); [waitlist.grantfox.xyz](https://waitlist.grantfox.xyz/); [dapp.grantfox.xyz](https://dapp.grantfox.xyz/) [NO VERIFICADO: solo títulos; contribute.grantfox.xyz devolvió 403 el 25-sep-2026]
- La búsqueda "GrantFox CriptoUNAM" (25-sep-2026) no encontró publicaciones sobre la sesión.

### Inferencias
- [INFERENCIA] En "GrantFox × CriptoUNAM" probablemente invitaron a los estudiantes a contribuir en issues pagados de proyectos Stellar, y a los equipos a publicar sus repos como proyectos. Señal para los evaluadores: repos abiertos, issues claros y continuidad.
- [INFERENCIA] GrantFox es un ejemplo de la ruta que Palabra quiere recorrer: proyecto del ecosistema → Build Award del SCF.
- [INFERENCIA] Para Palabra, después de entregar: publicar el repo en GrantFox con issues etiquetados (frontend, pruebas, documentación) podría atraer contribuidores pagados. No trae dinero al proyecto, y las recompensas de los issues probablemente las fondea el propio proyecto (no confirmado).

### Huecos
- Qué se ofreció exactamente en la sesión (campaña, "wave" para estudiantes, bounties).
- Cómo se da de alta un proyecto como mantenedor y quién fondea las recompensas.
- Si hay una campaña para los proyectos de GOYA HACK.

---

## 5. APEX ("SUBE TU PROYECTO · APEX")

### Takeaway
No pude identificar qué es "APEX". La única "Apex" Web3 de 2026 que encontré es el Hedera Hello Future Apex Hackathon 2026 (AngelHack + Hedera; virtual; 17-feb al 23-mar-2026; US$250,000). No coincide en fechas ni en red, y ya cerró. Por el título, "SUBE TU PROYECTO · APEX" parece una sesión práctica para registrar el proyecto en alguna plataforma (inferencia). Hay que preguntar hoy.

### Hallazgos citados
- Hubo dos sesiones: jue 24 de 11:00 a 12:00 y de 15:00 a 16:00, en Edificio M · PC PUMA. Sin descripción ni ponente. — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- Hedera Hello Future Apex Hackathon 2026. No menciona CriptoUNAM, la UNAM, México, Stellar ni BAF. — [StackUp](https://hackathon.stackup.dev/web/events/hedera-hello-future-apex-hackathon-2026)
  - Lo organizaron AngelHack y Hashgraph/Hedera, en formato "Virtual".
  - Fechas: "17 February – 23 March"; entrega el "23 March, 11:59PM ET".
  - Bolsa: "$250,000USD".
  - Tracks: "AI & Agents", "DeFi & Tokenization", "Sustainability", "Open Track" y "Legacy Builders".
  - La entrega pedía repo de GitHub, detalles del proyecto, "Pitch Deck (in pdf)", un video de demo de "Maximum length: 5 minutes" y el enlace a la demo.
- Otros resultados sin relación: "Apex - Hack Club" y "Hackathon APEX América Latina 2020" (del sector seguros). — [apex.hackclub.com](https://apex.hackclub.com/); [insuminsider.com](https://www.insuminsider.com/apexhack20)
- Búsquedas sin resultado (25-sep-2026): "APEX Stellar builders program 2026"; "\"APEX\" CriptoUNAM OR \"Blockchain Acceleration Foundation\" plataforma proyectos"; "\"APEX\" web3 hackathon plataforma \"sube tu proyecto\"". Los correos del organizador (carpeta `privado/`) tampoco mencionan APEX.

### Inferencias
- [INFERENCIA] Hipótesis A: APEX es el nombre de la plataforma de entrega o de una vitrina de proyectos. La sesión se repitió dos veces el día de mentorías, lo que encaja con "cómo subir tu proyecto". Si es así, es parte obligatoria de la entrega.
- [INFERENCIA] Hipótesis B: es una plataforma externa de algún patrocinador (aceleradora o directorio). En ese caso, es opcional.
- [INFERENCIA] El paquete de entrega de Hedera Apex (repo, deck en PDF, video de 5 minutos o menos y demo en vivo) es el estándar de la industria y coincide con lo que Palabra ya planea.

### Huecos
- Qué es APEX, quién lo opera y si subir el proyecto ahí es requisito de la entrega.

---

## 6. Blockchain Acceleration Foundation (BAF)

### Takeaway
BAF es una organización sin fines de lucro 501(c)(3) de EE. UU. dedicada a la educación en blockchain: giras universitarias, residencias, activaciones en conferencias y un programa de embajadores. Es coanfitriona de GOYA HACK y del taller de Stellar. En LatAm ya operó programas con marca Stellar:
- **Stellar Week 2025**, en Buenos Aires, que premió "real integrations", "production grade use", "composability" y "real-world systems".
- **"Código Alebrije by Stellar"**, en la CDMX (2026), con días de hackathon "Genesis y Scale".

No encontré un acuerdo formal publicado con la SDF.

### Hallazgos citados
- En GitHub: "The Blockchain Acceleration Foundation (BAF) is a 501(c)(3) nonprofit organization focused on accelerating the development and adoption of a user-owned internet". Repos: `web3ttt`, `Blockchain-Club-Toolkit`, `AlgoBuilders`, `baf-wallet` y `baf-badges`. — [GitHub bafnetwork](https://github.com/bafnetwork) (nota 10:57)
- En su sitio: "We are a 501(c)(3) nonprofit accelerating global blockchain adoption through education, community, and impact-driven programs." Programas: University Tours, Builder Residence, Conference Activations (Consensus, Devcon) y Ambassador Program. — [blockchainacceleration.org](https://www.blockchainacceleration.org/) (nota 10:57). Hay también una página de programas que no revisé. — [Programs](https://www.blockchainacceleration.org/programs)
- Stellar Week 2025 (Buenos Aires, 16–24-nov-2025). — [BAF, Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025) (nota 10:57)
  - Componentes: Stellar Lab (3 días), Stellar Hack+ (US$15,000) y Casa Stellar (110 builders).
  - Categorías y premios:
    - Stellar Scale: US$5,000 en USDC al 1.er lugar, para productos en funcionamiento que integran Soroban.
    - Stellar Genesis: US$5,000 en USDC al 1.er lugar, para DeFi experimental y finanzas del mundo real.
    - Integrator Award: US$500, por composabilidad.
    - Innovation Award: US$500.
  - Priorizó "real integrations", "production grade use", "composability" y "real-world systems".
- Código Alebrije by Stellar. — [Luma waxc3081](https://luma.com/waxc3081?locale=es); [Luma 69y1s91u](https://luma.com/69y1s91u) (del segundo, solo el título)
  - En Luma aparecen "Código Alebrije by Stellar | Hackathon Day 1 (Genesis y Scale)" y un "Day 2".
  - Los organiza Blockchain Acceleration Foundation y los presenta "Código Alebrije CDMX 2026".
  - Sede: "PÚBLICO Coworking, Av. P.º de la Reforma 333, Cuauhtémoc, 06500 Ciudad de México", piso 7.
  - Es un evento pasado; la fecha no aparece en la extracción. Se pedía INE para entrar.
- Otros calendarios del ecosistema en Luma: "StarMaker LATAM | Stellar Ambassador Program", "Lumen Loop - Stellar Events" y "The Open Deal Room by Stellar". — [Luma StarMakerLATAM](https://luma.com/StarMakerLATAM?locale=es); [Luma lumenloop](https://luma.com/lumenloop); [Luma axkzug51](https://luma.com/axkzug51) [NO VERIFICADO: solo títulos]
- BAF fue patrocinador en Consensus 2025. — [Consensus 2025](https://consensus2025.coindesk.com/agenda/sponsor/-blockchain-acceleration-foundation-3) [NO VERIFICADO: solo título]
- Programa Stellar Next-Gen de la SDF (página sin fecha). — [Stellar Next-Gen](https://stellar.org/foundation/next-gen)
  - La SDF "hosts workshops, provides speakers for events, and/or sponsors hackathons" y ofrece "guest lectures, helping students create projects on Stellar".
  - Socios listados:
    - Universidades: University of London, Columbia, University of Nicosia, UC Berkeley y NUS.
    - Organizaciones: Blockchain Academy Chile, Technica, Lumos Labs, Encode Club, Eidos Global, Minority Programmers Association e ITS Rio.
  - No menciona a BAF, a México ni a la UNAM.

### Inferencias
- [INFERENCIA] BAF funciona como operador de eventos educativos con marca Stellar en LatAm ("by Stellar", "Stellar Week"). GOYA HACK encaja en su modelo de giras universitarias.
- [INFERENCIA] Los main stages "Stellar × BAF" y "BAF × Stellar" probablemente presentaron los siguientes programas del ecosistema (hackathons Genesis/Scale, residencias, SCF). No está confirmado.
- [INFERENCIA] Por el precedente de Stellar Week 2025, un juez de BAF probablemente valorará integración real con Soroban, calidad de producción, composabilidad con herramientas del ecosistema y sistemas del mundo real. Palabra encaja en "Scale" (un producto que funciona con Soroban) y en "real-world systems".

### Huecos
- Liderazgo y financiamiento de BAF; acuerdo con la SDF.
- Criterios de evaluación de BAF para GOYA HACK y quiénes son los jueces.
- Fecha y resultados de Código Alebrije CDMX 2026, y si habrá una siguiente edición a la que Palabra pueda llevar el proyecto.

---

## 7. Avalanche ("Despliega tu L1")

### Takeaway
La presencia de Avalanche la operó Team1, su programa comunitario global. En ese formato, Avalanche enseña a crear una L1 propia, ya sea permisionada (Proof of Authority) o sin permisos (Proof of Stake), con Builder Console, Validator Manager y L1 Toolbox. No cambia la red de Palabra, pero anticipa una pregunta de los jueces: "¿por qué no una L1 propia, permisionada y con allowlists?".

### Hallazgos citados
- Definición, alcance y recursos de Team1. — [Avalanche blog](https://www.avalanche.com/about/blog/avalanche-team1-applications-are-now-open) (pub. 27-may-2026)
- Cursos y herramientas de L1. — [Avalanche Academy](https://build.avax.network/academy)
- Team1 figura entre los anfitriones del evento; Avalanche tuvo stand el 24-sep (contexto común). — [Luma 0oogs8ym](https://luma.com/0oogs8ym)
- "Hackathon: LatAm Institucional" (México, mayo 2026): retos de crédito descentralizado e inclusión financiera; criterios de viabilidad, arquitectura, MVP funcional, uso inteligente del stack y modelo de negocio. — [Avalanche Builder Hub](https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407) (citado en el doc 02)

### Inferencias
- [INFERENCIA] Una L1 permisionada de Avalanche con allowlists es la alternativa técnica más parecida a un "registro compartido entre bodegas". La respuesta de Palabra:
  - Alguien tendría que operar los validadores.
  - Si lo hace una bodega o la administración, regresa el custodio que hoy nadie acepta (experiencia de José: no existe nada que centralice el crédito en la CEDA).
  - Si lo hacen todas, el costo de operación no lo puede cargar un sector que en frutas y legumbres opera mayormente en papel (experiencia de José).
  - Stellar ofrece una red pública ya operada y verificable por terceros, y Soroban da `require_auth` de varias partes sin infraestructura propia.
- [INFERENCIA] Que Avalanche ya haya premiado retos de crédito e inclusión en México confirma que el tema atrae a los patrocinadores. No cambia la red.

### Huecos
- Quién dio el taller y las office hours; si Avalanche tuvo premio o bounty en GOYA HACK.

---

## 8. Implicaciones y recomendación

### Takeaway
Señales combinadas de los talleres y patrocinadores:
1. Un contrato Soroban funcionando en testnet y verificable.
2. Usuarios que firman sin frase semilla, con claridad sobre quién custodia la llave.
3. Modelo de negocio (lo puntúan los mentores).
4. Un problema del mundo real.
5. Composabilidad con herramientas del ecosistema.
6. Continuidad y código abierto.
7. Velocidad y entrega completa.

Recomendaciones:
- **Pollar: quizá**, fuera de la ruta crítica.
- **Tangem: no.**
- **APEX: verificar hoy** (sí, si es parte de la entrega).
- **GrantFox: no antes de entregar; quizá después.**

### Hallazgos citados
- Criterio del SCF: "Stellar must be used to meaningfully improve core features, not as a superficial integration, or for data storage". — [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria) (contexto común)
- El organizador: "No buscamos un producto perfecto ni los mejores resultados técnicos; queremos que se animen a utilizar la tecnología e integrarla en su proyecto." — correo del 24-sep (doc 02)
- Spec v1: "El cliente firma con una cuenta G de testnet custodiada por la demo (el backend guarda la llave secreta de las cuentas ficticias)." — `spec/2026-09-25_especificacion-tecnica-v1.md`
- README: "Testnet únicamente; cuentas de demo custodiadas; datos ficticios." Al corte de las 09:30 del 25-sep, el código, la demo, el video y el deck estaban "en construcción". — `README.md`
- En el repo no hay una sección de modelo de negocio (búsqueda de "modelo de negocio", "quién paga", "suscrip", "ingreso" y "monetiz" en `docs/`, `spec/` y `pitch/`, 25-sep-2026). `docs/plan-maestro.md` sí tiene la fase P3 (SCF: Instawards → Build Award).

### Inferencias
**Pollar: QUIZÁ, y por defecto no [INFERENCIA]**
- A favor:
  - Resuelve "el cliente firma desde su teléfono" sin frase semilla y sin que Palabra ni la bodega tengan la llave del cliente.
  - `signAuthEntry` es exactamente el mecanismo que pide `require_auth` cuando la dirección no paga la transacción.
  - Usa testnet por defecto.
  - Los jueces lo vieron en un taller: es una señal de composabilidad, que BAF premió en 2025 con el Integrator Award.
- En contra:
  - No hay ejemplo con un contrato propio, así que el esfuerzo es desconocido.
  - Dependencias fuera del código: dashboard, API key y una allowlist por contrato y función, que hay que repetir en cada redespliegue.
  - `buildTx` no invoca contratos: el backend tendría que armar y simular la transacción.
  - `signAuthEntry` no soporta las passkeys C.
  - SDK 0.x de 7 meses, con documentación inconsistente.
  - Posible falla del OAuth de Google en el navegador interno de WhatsApp [NO VERIFICADO].
  - Un competidor ya lo usa, así que no nos diferencia.
- Condiciones para intentarlo (todas):
  1. La demo custodial completa está en testnet, el video está grabado y la entrega está lista.
  2. La hora final de entrega está confirmada y deja margen.
  3. Se trabaja en una rama aislada, con interruptor, y la ruta custodial queda como respaldo.
  4. Un solo objetivo: que `accept_note` se autorice en testnet con `signAuthEntry` desde una cuenta G de Pollar, usando un sujeto nuevo.
  5. Tope de tiempo fijo que decide José. Si se atora cualquier paso (API key, allowlist, OAuth), se abandona.
- Siempre, sin código:
  - El contrato ya recibe `subject: Address` (spec v1, sección 5), que acepta G o C.
  - En el pitch: "hoy, cuentas de demo custodiadas; siguiente paso, login social o passkey, sin frase semilla; el contrato no cambia".
  - No decir "el cliente controla su llave" si se usa una cuenta custodiada por Pollar.

**Tangem: NO [INFERENCIA]**
- Tangem Pay es Visa + USDC en redes EVM, no Stellar.
- Firmar con Tangem exige NFC nativo y la tarjeta física, y su SDK de React Native está archivado.
- Palabra no mueve dinero.
- Única acción: preguntar si el requisito afecta la elegibilidad o el pago de premios.

**APEX: VERIFICAR HOY [INFERENCIA]**
- Si es la plataforma de entrega o forma parte de ella: sí, con prioridad.
- Si es externa: después de entregar.

**GrantFox: NO antes de entregar; QUIZÁ después [INFERENCIA]**
- Sirve para atraer contribuidores con issues pagados; no es un grant para el proyecto.
- La ruta de financiamiento sigue siendo el SCF (plan maestro, fase P3).
- Costo bajo si ya hay issues etiquetados.

### Huecos
- Criterios oficiales con pesos, premios por patrocinador y hora final de entrega.
- Una prueba real de `signAuthEntry` con nuestro contrato en testnet.
