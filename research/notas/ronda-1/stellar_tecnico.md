# Bloques técnicos Stellar/Soroban para un registro de historial crediticio con doble firma (demo de 4 h + ruta a producción)

Estado verificado al 25 sep 2026 (unas 20 búsquedas y lecturas). Todo lo que no se verificó en esta sesión va en "Gaps".

## 1. Soroban: versiones, autorización multiparte, almacenamiento/TTL, eventos y límites

### Takeaway
La red está en **Protocolo 27** (testnet desde el 18 jun 2026, mainnet desde el 8 jul 2026). Estas son las versiones estables publicadas en la tabla oficial: soroban-sdk 27.0.6, Stellar CLI 27.1.0, JS SDK v16.2.0 y RPC v27.1.1. Hay indicios de soroban-sdk 28.0.0 y CLI 28.0.0 recién salidos. Los registros de crédito deben ir en storage **Persistent** con `extend_ttl`. Desde el Protocolo 23, las entradas archivadas se restauran solas si la transacción pasa por simulación. La doble firma sale natural con dos llamadas `require_auth()` en la misma función o en pasos separados.

### Cited Findings
- **Versiones.** Mainnet y testnet están en Protocolo 27 (testnet desde el 18 jun 2026, mainnet desde el 8 jul 2026). Versiones publicadas para P27: Soroban Rust SDK 27.0.6, Stellar CLI 27.1.0, JS Stellar SDK v16.2.0 y Stellar RPC v27.1.1 — [Stellar Docs, Software Versions](https://developers.stellar.org/docs/networks/software-versions)
- **Posible conflicto de versión.** La página de setup dice "Current stable release: v28.0.0" para la CLI (`cargo install --locked stellar-cli@28.0.0`) — [Stellar Docs, Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup). Además hay PRs de dependabot que suben soroban-sdk 27.0.6 → 28.0.0 — [PR ejemplo](https://github.com/georgegoldman/Soroban-ZK-Std/pull/418). Contradice la tabla de Software Versions (CLI 27.1.0). **Recomendación:** fijar soroban-sdk 27.0.6 o la versión que genere `stellar contract init`, y no mezclar versiones mayores entre el SDK y la CLI.
- **Historial de protocolos:**
  - P22 (dic 2024): constructores y funciones host BLS12-381.
  - P23 "Whisk" (sep 2025): sistema de eventos unificado y cambios en state archival.
  - P24 (oct 2025): estabilidad del archival.
  - P25 "X-Ray" (ene 2026): BN254 y permutaciones Poseidon/Poseidon2.
  - P26 "Yardstick" (may 2026): congelamiento de entradas, extensiones de TTL limitadas, operaciones ZK en BN254 y aritmética de 256 bits verificada.
  - Fuente: [Software Versions](https://developers.stellar.org/docs/networks/software-versions)
- **`require_auth` y `require_auth_for_args`.** `user.require_auth()` exige que `user` haya autorizado esa llamada con todos sus argumentos; el host se encarga de firmas, anti-replay y políticas. Para pruebas, `env.mock_all_auths()` hace que toda auth pase. La doc remite al ejemplo **Atomic Swap** para la autorización multiparte, donde varios usuarios firman su parte de una misma invocación — [Stellar Docs, Auth example](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth)
- **Contratos-cuenta.** Un `Address` puede ser una cuenta G, un contrato o un contrato-cuenta con `__check_auth` (ver el ejemplo "Simple Account"). Por eso un usuario con passkey (contrato-cuenta) puede llamar `require_auth()` igual que una cuenta G — [Auth example](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth)
- **Tipos de storage** — [State Archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival):
  - **Temporary:** el más barato; se **borra para siempre** al vencer el TTL. No sirve para historial.
  - **Instance:** comparte el TTL con la instancia del contrato y tiene espacio limitado; úsalo para admin o config.
  - **Persistent:** TTL independiente por entrada y espacio ilimitado; al vencer se **archiva, no se borra**.
- **TTL.** `extend_ttl(N)` garantiza que queden al menos N ledgers de vida y nunca reduce el TTL. El TTL máximo se calcula desde el ledger actual, no desde la fecha de creación (el ejemplo de la doc usa un tope de 1 año). Desde P23, las entradas Persistent o Instance archivadas se restauran solas **si la transacción se simula** (`simulateTransaction` llena la lista de restauración); una transacción armada a mano sin simular no restaura. Los valores exactos están en [lab.stellar.org/network-limits](https://lab.stellar.org/network-limits) — [State Archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival)
- **Límites y fees.** La doc no publica cifras fijas; remite a [Stellar Lab Network Limits](https://lab.stellar.org/network-limits) y al comando `stellar network settings` — [Resource Limits & Fees](https://developers.stellar.org/docs/networks/resource-limits-fees)
- **Testnet** admite hasta 200 operaciones y 2,000 transacciones de contrato por ledger — [Networks](https://developers.stellar.org/docs/networks)

### Inferences
- **Diseño recomendado para la demo.** `DataKey::Note(u64)` en Persistent para cada nota y `DataKey::CustomerStats(BytesN<32>)` en Persistent con contadores agregados (total, pagadas, vencidas, disputadas). Así "consultar historial" es una sola lectura y no hace falta iterar. En cada escritura, `extend_ttl` de la nota y del agregado.
- **Flujo de firmas:**
  - `create_note(warehouse, customer_addr, ...)` con `warehouse.require_auth()`.
  - `accept_note(customer)` con `customer.require_auth()`.
  - `mark_paid(warehouse)` y luego `confirm_paid(customer)`.
  - `dispute(customer)` y `mark_overdue` (cualquiera, si `ledger.timestamp() > due`).
  - Hacer dos pasos separados es más fácil de demostrar que la multifirma en una sola transacción (patrón atomic swap) y deja un evento por paso.
- **Eventos.** Emitir un evento en cada transición de estado (`env.events().publish(...)`, o `#[contractevent]` si el SDK de la versión fijada lo soporta; en esta sesión no se verificó cuál es la macro vigente en el SDK 27). Los eventos son la "bitácora" visible en stellar.expert.
- **Riesgo de producción.** Un registro que tiene que vivir años necesita una política de renovación de TTL: la plataforma paga la renta con un cron que llama `extend_ttl`. Si no, las notas se archivan. Desde P23 se restauran al simular, pero la restauración cuesta.

### Gaps
- No se obtuvieron cifras exactas de límites (tamaño máximo de wasm, instrucciones, bytes de eventos, TTL mínimo y máximo en ledgers). Consultar `stellar network settings --network testnet` en el Codespace.
- No se confirmó si soroban-sdk 28.0.0 es estable ni qué rompe. Tampoco la sintaxis exacta de eventos en el SDK 27 (`#[contractevent]` frente a `events().publish`).

## 2. Smart wallets con passkey y relays (Launchtube → OpenZeppelin Channels)

### Takeaway
**Launchtube está descontinuado**; su reemplazo oficial es **OpenZeppelin Stellar Channels** (relayer administrado). Hay dos SDKs de passkey mantenidos bajo la org `stellar`: **passkey-kit** (contrato de wallet propio y relay vía Channels) y **smart-account-kit** (usa el contrato smart-account de **OpenZeppelin stellar-contracts**, alineado con P27). La página de "Smart wallets" de developers.stellar.org **está desactualizada**: todavía muestra Launchtube como activo y el repo de kalepail.

### Cited Findings
- "SDF discontinued the Launchtube service and points developers to OpenZeppelin's managed Stellar Channels service as the replacement." Datos de Channels en testnet — [Stellar Docs, OpenZeppelin Relayer](https://developers.stellar.org/docs/tools/openzeppelin-relayer):
  - Endpoint: `https://channels.openzeppelin.com/testnet`
  - API key: `https://channels.openzeppelin.com/testnet/gen`
  - Paquete JS `@openzeppelin/relayer-plugin-channels` (clase `ChannelsClient`, método `submitSorobanTransaction()`). Recibe el XDR de `func` y `auth` después de simular, y Channels resuelve fees y secuencias con un pool de channel accounts.
  - El Relayer es open source (AGPL-3.0).
- Repo de Channels: [OpenZeppelin/relayer-plugin-channels](https://github.com/OpenZeppelin/relayer-plugin-channels) (existe el release v0.21.0: [Release v0.21.0](https://github.com/OpenZeppelin/relayer-plugin-channels/releases/tag/v0.21.0)). Guía: [OZ Stellar Channels Guide](https://docs.openzeppelin.com/relayer/1.3.x/guides/stellar-channels-guide)
- **passkey-kit** — [github.com/stellar/passkey-kit](https://github.com/stellar/passkey-kit):
  - Paquete npm `passkey-kit`, con peer dependency `@stellar/stellar-sdk >=16.0.0`.
  - Envía por **OpenZeppelin Relayer Channels**, con un Cloudflare Worker (`relayer-proxy/`) que emite API keys "keyless" por IP del cliente.
  - Contrato de wallet propio con firmantes secp256r1 (WebAuthn), Ed25519 y políticas.
  - Tuvo una reescritura v1 reciente (hay CHANGELOG y guía de migración).
  - Uso: `new PasskeyKit({rpcUrl, networkPassphrase, walletWasmHash})`, luego `createWallet()` o `connectWallet()`, y en el servidor `PasskeyServer`.
- **Advertencias de passkey-kit** — [stellar/passkey-kit](https://github.com/stellar/passkey-kit):
  - El deployer por defecto es un keypair público compartido cuyo secreto se puede derivar, así que el front-running del deploy es posible.
  - WebAuthn exige User Presence, pero no User Verification.
  - Los firmantes temporales se pierden cuando vence su TTL.
- **smart-account-kit** — [github.com/stellar/smart-account-kit](https://github.com/stellar/smart-account-kit):
  - SDK TypeScript (`pnpm add smart-account-kit`) para los smart accounts de **OpenZeppelin stellar-contracts** (P27).
  - Soporta passkeys, múltiples firmantes y políticas de autorización.
  - Relay opcional vía `relayerUrl`: le hace POST de `{func, auth}`.
  - Los IDs y hashes de testnet están en `docs/deployments-protocol-27-2026-07-09.md` y los valores por defecto en `demo/.env.example`.
  - Usa Mercury como indexador por defecto.
  - Advierte no meter tokens privilegiados en el bundle del navegador, y que el deployer por defecto no debe fondearse en mainnet.
- Contratos base de OZ: [OpenZeppelin/stellar-contracts/packages/accounts](https://github.com/OpenZeppelin/stellar-contracts/tree/main/packages/accounts). Hubo auditoría de la RC v0.7.0: [OZ audit](https://www.openzeppelin.com/news/stellar-contracts-rc-v0.7.0-audit)
- **Página desactualizada.** La página oficial "Smart wallets" todavía lista `github.com/kalepail/passkey-kit` y Launchtube como "active": [Smart wallets](https://developers.stellar.org/docs/build/guides/contract-accounts/smart-wallets). Contradice la [página de OZ Relayer](https://developers.stellar.org/docs/tools/openzeppelin-relayer). Hay que dar prioridad a la segunda.
- Hay verificación nativa de secp256r1 desde el Protocolo 21, que es lo que permite validar firmas WebAuthn on-chain — [Smart wallets](https://developers.stellar.org/docs/build/guides/contract-accounts/smart-wallets)
- El tutorial "guestbook" (passkeys) se actualizó hace poco, con prerrequisitos en [Passkeys Prerequisites](https://developers.stellar.org/docs/build/apps/guestbook/passkeys-prerequisites) y el PR [stellar-docs#2837](https://github.com/stellar/stellar-docs/pull/2837)

### Inferences
- **Para la demo de 4 h, las passkeys son el riesgo principal**: dominio y RP ID, HTTPS, el deploy de la wallet y el relay. **Plan A realista:** firmar con cuentas G de testnet generadas en el backend (un custodial de demo, o Freighter) y mostrar las passkeys como "siguiente paso". **Plan A+:** si el demo de passkey-kit o smart-account-kit funciona desde `demo/.env.example` en menos de 45 min, se integra.
- El contrato del registro no cambia entre cuentas G y smart accounts, porque ambas son `Address` con `require_auth()`. Así el backend custodial de la demo se puede reemplazar después sin tocar el contrato.
- **Advertencias de navegador y dispositivo.** WebAuthn necesita contexto seguro (HTTPS o localhost) y un RP ID que coincida con el dominio. En Codespaces, la URL de reenvío de puertos cambia y puede romper las credenciales ya creadas. Esto es inferencia a partir de cómo funciona WebAuthn, no está en las fuentes leídas.

### Gaps
- No se confirmó la fecha exacta en que se descontinuó Launchtube, ni la versión npm actual de `passkey-kit` o `smart-account-kit`.
- No hay una recomendación oficial explícita de passkey-kit frente a smart-account-kit.
- No se verificaron límites ni cuotas de las API keys de Channels en testnet.

## 3. Patrocinio de fees

### Takeaway
Hay tres mecanismos: **fee-bump transactions** (la plataforma paga el fee de una transacción que firmó el usuario), **sponsored reserves** (la plataforma paga las reservas mínimas de cuentas y trustlines) y **relayers** (OZ Channels, que resuelve fee y secuencia para invocaciones Soroban mandando solo `func` y `auth`). Con smart accounts, el relayer es el camino natural.

### Cited Findings
- Channels patrocina fees con un pool de channel accounts y hace fee bump de forma automática; el cliente solo manda el XDR de `func` y `auth` ya simulado — [OZ Relayer en Stellar Docs](https://developers.stellar.org/docs/tools/openzeppelin-relayer)
- Hay un issue abierto en stellar-docs que pide una "fee-sponsorship decision guide" que conecte fee-bumps, sponsored reserves y la página del Relayer, lo que confirma que son las tres opciones canónicas — [stellar-docs#2871](https://github.com/stellar/stellar-docs/issues/2871)
- Friendbot entrega 10,000 XLM de prueba por solicitud y puede fondear cuentas G **y contratos C**, con límite de tasa — [Networks](https://developers.stellar.org/docs/networks)

### Inferences
- En la demo no hace falta patrocinar nada: una cuenta "plataforma" fondeada con Friendbot puede ser la fuente de las transacciones. Si los usuarios son cuentas G generadas, se fondean con Friendbot. El pitch puede decir "el comerciante nunca ve XLM ni fees".
- En producción, con cuentas G, la plataforma usaría fee-bump. Con smart accounts usaría un relayer (Channels administrado, o un OZ Relayer propio porque es AGPL).

### Gaps
- En esta sesión no se leyeron las páginas de fee-bump ni de sponsored reserves; los detalles de operaciones como `BeginSponsoringFutureReserves` vienen del conocimiento previo, no de una verificación de hoy.

## 4. Herramientas de frontend y de desarrollo

### Takeaway
La ruta más corta es **Scaffold Stellar** (contrato en Rust, React+Vite, bindings TS autogenerados y Wallet Kit) o, si no, un frontend mínimo con `@stellar/stellar-sdk` más bindings generados con `stellar contract bindings typescript`. Para depurar sirven Stellar Lab y stellar.expert (testnet).

### Cited Findings
- **Scaffold Stellar** — [Stellar Docs, Scaffold Stellar](https://developers.stellar.org/docs/tools/scaffold-stellar):
  - Instalación: `cargo install --locked stellar-scaffold-cli` y `cargo install --locked stellar-registry-cli`.
  - `stellar scaffold init my-project` genera contratos Rust, frontend React+Vite, clientes TypeScript autogenerados e integración con Wallet Kit.
  - Comandos: `stellar scaffold build`, `stellar scaffold watch` (hot reload) y `stellar registry`.
  - Requiere Rust, Node, Stellar CLI y **Docker** (para la red local).
- **Stellar Wallets Kit** (Creit-Tech) existe en v2.7.0 — [Release v2.7.0](https://github.com/Creit-Tech/Stellar-Wallets-Kit/releases/tag/v2.7.0). Se publica en JSR como `@creit-tech/stellar-wallets-kit` — [JSR](https://jsr.io/@creit-tech/stellar-wallets-kit)
- **Testnet:**
  - RPC `https://soroban-testnet.stellar.org`
  - Horizon `https://horizon-testnet.stellar.org`
  - Friendbot `https://friendbot.stellar.org`
  - Passphrase `Test SDF Network ; September 2015`
  - SDF no opera un RPC público de mainnet; para producción hay que usar proveedores externos.
  - Fuente: [Networks](https://developers.stellar.org/docs/networks)
- **Setup de Rust:** Rust ≥ 1.84.0 y `rustup target add wasm32v1-none`. Hay que reinstalar el target cada vez que se actualiza el toolchain. En Linux, si se compila desde el código fuente, hace falta `build-essential`. La CLI se instala con `curl -fsSL https://github.com/stellar/stellar-cli/raw/main/install.sh | sh`, con `brew install stellar-cli` o con cargo — [Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
- Stellar Lab tiene una página de límites de red en vivo: [lab.stellar.org/network-limits](https://lab.stellar.org/network-limits) — [Resource Limits](https://developers.stellar.org/docs/networks/resource-limits-fees)

### Inferences
- En Codespaces, **usar el install.sh (binario precompilado) y no `cargo install` de la CLI**, porque compilarla desde el código fuente tarda muchos minutos. Scaffold Stellar también se instala con cargo, así que agrega tiempo de compilación, y Docker solo hace falta para la red local (en testnet no se necesita). Si el tiempo aprieta, usar `stellar contract init` + `stellar contract build` + `stellar contract deploy --network testnet` + `stellar contract bindings typescript` y un Vite simple.
- Comandos típicos de la CLI: `stellar keys generate --global alice --network testnet --fund` y `stellar contract invoke --id C... --source alice --network testnet -- create_note ...`. Salen del conocimiento previo y no se re-verificaron hoy contra la CLI 27/28.

### Gaps
- No se verificaron la versión exacta de Scaffold Stellar ni el estado actual de Freighter (versión y soporte de passkeys).
- No se verificó la URL de stellar.expert para testnet. Por conocimiento previo es `https://stellar.expert/explorer/testnet`; confirmar en el navegador.

## 5. Privacidad y ZK en Soroban

### Takeaway
Para la demo: **on-chain van solo un ID seudónimo (hash con sal) y un rango de monto**; los datos personales viven off-chain. Soroban ya tiene primitivas ZK nativas (BLS12-381 desde P22, BN254 y Poseidon desde P25/P26) y hay un **verificador Groth16 oficial en soroban-examples**. Probar "sin incumplimientos" con ZK es posible como **siguiente paso**, no en 4 horas.

### Cited Findings
- **Primitivas ZK:** P22 agregó funciones host BLS12-381; P25 agregó BN254 y Poseidon/Poseidon2; P26 agregó "ZK BN254 operations" adicionales — [Software Versions](https://developers.stellar.org/docs/networks/software-versions)
- Ejemplo oficial de verificador Groth16: [stellar/soroban-examples/groth16_verifier](https://github.com/stellar/soroban-examples/tree/main/groth16_verifier)
- Proyecto comunitario que usa Groth16 con las funciones host BN254 de P25 para escrow privado: [stellar-zklab/stellar-zkstream](https://github.com/stellar-zklab/stellar-zkstream). Su calidad no se evaluó.

### Inferences
- **Patrón MVP:**
  - `customer_id = sha256(sal_plataforma || teléfono_normalizado)` como `BytesN<32>`.
  - El monto se guarda como bucket (`u32`: 0 = <5k, 1 = 5–20k, …) y no como cifra exacta.
  - Opcional: `doc_hash` del pagaré en papel o foto.
- **Limitación honesta:** un hash de teléfono se puede atacar por fuerza bruta (el espacio es pequeño). La sal tiene que ser secreta, lo cual la vuelve un identificador administrado por la plataforma. Hay que decirlo si preguntan.
- **Siguiente paso ZK:** el cliente prueba que "`CustomerStats.overdue == 0` en N notas" contra un commitment Poseidon, verificado con Groth16 en BN254. Queda como roadmap.

### Gaps
- No se leyó el código del `groth16_verifier` ni su costo en instrucciones.
- No se encontró ningún ejemplo de "reputación privada" ya hecho en Soroban.

## 6. Rieles MXN: MXNe, anchors y Trustless Work

### Takeaway
**MXNe** (Etherfuse, acuñado vía Brale y respaldado en CETES) existe en Stellar, Solana y Base, pero **no se encontró evidencia de un MXNe en testnet** ni el issuer en Stellar. No se encontró un listado confiable de anchors MXN con SEP-24/SEP-6 en 2026. **Trustless Work** documenta solo XLM y USDC en testnet. Conclusión: en la demo no se mueve dinero; MXNe entra en el pitch como liquidación futura.

### Cited Findings
- MXNe: stablecoin de peso mexicano de Etherfuse; se acuña a través de Brale, está respaldada por CETES y opera en Solana, Base y Stellar. Se anunció el 22 may 2024 — [Etherfuse Substack](https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne). Caso de estudio de Brale: [Brale, caso Etherfuse](https://brale.xyz/case-studies/etherfuse). Salió después en Base, con onramp vía Capa — [X @etherfuse](https://x.com/etherfuse/status/1898043366828388541)
- Sin testnet: la fuente de Etherfuse no menciona testnet ni da el código o issuer de Stellar — [Etherfuse Substack](https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne)
- **Trustless Work en testnet:** documenta XLM (Friendbot/Lab) y USDC (issuer `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`, vía el faucet de Circle); no documenta EURC ni MXNe — [Trustless Work, Testnet tokens](https://docs.trustlesswork.com/trustless-work/introduction/stellar-and-soroban-the-backbone-of-trustless-work/testnet-tokens.md). El repo del contrato de escrow se describe sobre USDC — [Trustless-Work-Smart-Escrow](https://github.com/Trustless-Work/Trustless-Work-Smart-Escrow)
- **Anchors para México:** solo se encontraron issues de proyectos comunitarios que proponen "probar Bitso (MX)" como corredor e incluir a Etherfuse como "issuer-only operator". No son fuentes primarias ni confirman soporte SEP-24 — [corridor-in-a-box#220](https://github.com/ezedike-evan/corridor-in-a-box/issues/220), [stellar-intel#1599](https://github.com/ezedike-evan/stellar-intel/issues/1599). El directorio oficial de anchors está descrito en [Stellar blog, Anchor Directory](https://stellar.org/blog/tools-solutions/anchor-directory-guide-finding-interoperable-asset-issuers-on-off-ramps-stellar)

### Inferences
- **Si se quiere simular liquidación** (no es recomendable en 4 h): emitir un asset de prueba "MXNT" desde una cuenta testnet propia, o desplegar un token SEP-41 de OpenZeppelin, y aclarar que es simulado. No hay que llamarlo MXNe.
- **Mensaje para el pitch:** "Siguiente paso: liquidación opcional en MXNe (Etherfuse/Brale) sobre Stellar mainnet". No hay que afirmar que haya anchors MXN específicos sin verificarlo.

### Gaps
- No se obtuvieron el issuer de MXNe en Stellar mainnet ni el mecanismo de redención (¿SPEI?).
- No se confirmaron anchors MXN activos con SEP-24 o SEP-6 (Bitso, MoneyGram u otros) en 2026. Hay que revisar a mano el [Anchor Directory](https://stellar.org/blog/tools-solutions/anchor-directory-guide-finding-interoperable-asset-issuers-on-off-ramps-stellar) y el stellar.toml de cada candidato.
- No se encontró si Trustless Work acepta assets arbitrarios en mainnet.

## 7. Ejemplos open source para reutilizar

### Takeaway
Hay proyectos comunitarios de facturas y receivables en Soroban (InvoFi, payper) y el ejemplo oficial de Atomic Swap para multifirma. Ninguno es un registro de crédito con doble firma listo para usar; conviene tomarlos como referencia de estructura, no copiarlos.

### Cited Findings
- InvoFi: contratos Soroban de registro, financiamiento, repago, seguro y **reputación** de facturas, con flujos SEP-41 y eventos — [Stellar-VaultLink/invofi-contracts](https://github.com/Stellar-VaultLink/invofi-contracts). Hay varios forks con la misma descripción, lo que sugiere una plantilla de bootcamp o hackathon.
- payper: financiamiento de receivables con contratos Soroban, un riel fiat SEP-6 y descuento calculado con datos de la cadena (Rise In x Stellar Pro Hackathon 2026) — [cansarihan/payper](https://github.com/cansarihan/payper)
- Parity: mercado de forwards de FX en Soroban y Next.js, desplegado en testnet (mismo hackathon) — [nurkardelens/parity-stellar](https://github.com/nurkardelens/parity-stellar)
- STABL: smart accounts con passkey construidos sobre OpenZeppelin stellar-accounts — [STABL-Africa/stabl_contracts](https://github.com/STABL-Africa/stabl_contracts)
- Ejemplos oficiales: `soroban-examples`, que incluye auth, atomic swap (multiparte), simple account y groth16_verifier — [Auth example](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth), [groth16_verifier](https://github.com/stellar/soroban-examples/tree/main/groth16_verifier)
- Stellar publica "Stellar Skills" para agentes o IA — [skills.stellar.org](https://skills.stellar.org/). No se revisó su contenido.

### Inferences
- **Diferenciador frente a InvoFi y payper:** ellos financian facturas; nuestra propuesta es un **historial de cumplimiento co-firmado por ambas partes y portable entre bodegas**, sin mover dinero. Eso responde a "¿por qué blockchain?": ninguna bodega controla el registro, ninguna puede escribir sola una deuda (el cliente co-firma) y el historial sobrevive aunque cambien de bodega.

### Gaps
- No se revisaron el código ni las licencias de InvoFi y payper.
- No se buscaron proyectos específicos del SCF (Stellar Community Fund) de reputación crediticia en LATAM.

## 8. Riesgos para construir en 4 horas

### Takeaway
Los mayores riesgos de tiempo son instalar y compilar el toolchain en Codespaces, las passkeys y confusiones de versión SDK/CLI (27 frente a 28). Un reset de testnet no es riesgo: el próximo es el 16 dic 2026.

### Cited Findings
- Los resets de testnet ocurren entre 2 y 4 veces al año a las 17:00 UTC y se anuncian con al menos dos semanas de anticipación; el único programado en 2026 es el **16 dic 2026**. Un reset borra todas las entradas del ledger — [Networks](https://developers.stellar.org/docs/networks). Un anuncio anterior de @StellarRelease menciona el 17 dic (Q4, año sin precisar); podría referirse a 2025 — [X @StellarRelease](https://x.com/StellarRelease/status/2001006989724545438)
- Friendbot tiene límite de tasa — [Networks](https://developers.stellar.org/docs/networks)
- Se requiere Rust ≥ 1.84 y el target `wasm32v1-none`, que hay que reinstalar al actualizar Rust — [Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
- Una transacción armada sin `simulateTransaction` no restaura entradas archivadas y además le faltan los datos de footprint y recursos — [State Archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival)
- Hay versiones en conflicto entre páginas oficiales (CLI 27.1.0 frente a 28.0.0) — [Software Versions](https://developers.stellar.org/docs/networks/software-versions) vs [Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)
- Scaffold Stellar necesita Docker para la red local y se instala con `cargo install` — [Scaffold Stellar](https://developers.stellar.org/docs/tools/scaffold-stellar)

### Inferences
- **Mitigaciones concretas:**
  1. Instalar la CLI con el binario de `install.sh`.
  2. Un solo contrato, sin dependencias de OZ.
  3. Tests con `mock_all_auths()`.
  4. Desplegar temprano y guardar el Contract ID en `.env`.
  5. Tener un script CLI (`demo.sh`) con los 4 pasos como **plan B** si el frontend falla.
  6. Grabar video de respaldo.
  7. Usar el RPC público de testnet. Si hay 429 (rate limit; su existencia en el RPC de testnet no se verificó con cifras), reintentar con backoff.
- **No hay que intentar passkeys, Channels, ZK ni un token MXN en el MVP.** Todo eso va a la diapositiva de "siguientes pasos".

### Gaps
- No se encontró documentación sobre los límites de tasa específicos del RPC público de testnet.
- No se midieron los tiempos reales de instalación en Codespaces.
