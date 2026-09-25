# Competencia de Palabra en GOYA HACK 2026 y ganadores de hackathons de Stellar en México y LatAm (notas de investigación)

Fecha de investigación: 25-sep-2026, 10:40–11:05 CDMX. Todas las fuentes se consultaron ese día. Complementa, sin repetir, `hackathon_que_gana.md` (rúbricas de Stellar y Rise In, Build Better, consejos de jueces) y `talleres_patrocinadores.md` (Pollar, BAF, Stellar Week).

Nota de método. GitHub bloquea la búsqueda web a herramientas automáticas: robots.txt en WebFetch, y 403 del proxy en `github.com/search`, `/topics` y en perfiles de usuario. La API `api.github.com` también da 403. `git clone` sí funciona, así que los repos conocidos se clonaron y se revisaron **todas sus ramas**. DoraHacks devuelve 405 a WebFetch y 403 al proxy, así que no se pudo leer ninguna lista de ganadores de DoraHacks. Los montos del Stellar Community Fund (SCF) vienen de un agregador (Lumen Loop, "Stellar Ecosystem DB", sincronizado el 25-sep-2026 15:52 UTC) y no se cotejaron una por una en communityfund.stellar.org.

---

## 1. Repos públicos de equipos de GOYA HACK 2026: quiénes son, qué construyen y qué tan maduros están

### Takeaway
Solo aparecen dos repos públicos de GOYA HACK: PatchProof y PumaTrade. Ninguno tiene demo publicada ni usa contratos Soroban de verdad. PatchProof avanzó más de lo que se sabía: 22 commits en 7 ramas y una rama "MVPTest" con "demo funcional (falta el testeo)". Aun así, en Stellar solo hace operaciones clásicas: un hash en el memo de un autopago y una cuenta "escrow" cuya llave secreta guarda su backend. Su README anuncia Soroban, pero no hay contratos en ninguna rama. PumaTrade sigue siendo solo documentación (README y PRD de 1,120 líneas). Planea usar Pollar con login de Google y una cuenta multifirma 2-de-2 clásica, y deja Soroban "a futuro". No se encontraron otros repos; la búsqueda de GitHub estuvo bloqueada.

### Cited Findings
**PatchProof** (repo `AngelTapiaLedesma/CriptoUNAM`, clonado el 25-sep-2026 ~10:45 y refrescado a las 11:05 CDMX)
- README (rama main): "A verifiable bug bounty platform powered by Stellar"; problema: "un investigador necesita tener evidencia de que su reporte fue recibido y que la recompensa prometida existe"; stack declarado: React + Vite, Python + FastAPI, "Stellar Testnet", "Stellar SDK", "**Soroban** para smart contracts", SQLite; "**Track: Innovación** · Equipo: 4 integrantes · Estado: 🚧 En desarrollo"; "Las instrucciones de instalación, ejecución y enlaces de la demo se agregarán conforme avance el proyecto" — [GitHub PatchProof](https://github.com/AngelTapiaLedesma/CriptoUNAM) (último commit en main: 23-sep-2026 19:04 −06:00).
- Actividad: 22 commits únicos en 7 ramas remotas (main, David, MVPTest, blockchain, feature/backend, feature/frontend, integration/mvp); 5 autores (Angel Tapia Ledesma, DavidT328, Samantha Mojica, laelmarcial7 y uno sin nombre). Último commit en cualquier rama: `478384b`, 24-sep-2026 23:48 −06:00, rama MVPTest: "demo funcional (falta el testeo)". Ninguno se fusionó a main. Sin commits el 25-sep hasta las 11:05 CDMX — [GitHub PatchProof](https://github.com/AngelTapiaLedesma/CriptoUNAM) (revisión con `git log --all`).
- Uso real de Stellar (rama MVPTest, `backend/stellar.py`): `stellar_sdk` contra `horizon-testnet.stellar.org`. (a) "Escrow" = `create_account` de una cuenta aleatoria fondeada con el monto del bounty, cuya llave secreta se guarda en la base de datos ("Debes guardar 'escrow_secret' en la base de datos", README de la rama blockchain). (b) "Evidencia" = pago de 0.0000001 XLM a sí mismo con el SHA-256 del reporte en un `HashMemo`. (c) Pago de la recompensa desde la cuenta escrow. (d) "Proof of remediation" = otro hash en memo. No hay archivos `.rs` ni `Cargo.toml` en ninguna de las 7 ramas. Su README reconoce: "las llaves de Stellar Testnet se dejaron directamente en el código" — [GitHub PatchProof, rama blockchain](https://github.com/AngelTapiaLedesma/CriptoUNAM/tree/blockchain); [rama MVPTest](https://github.com/AngelTapiaLedesma/CriptoUNAM/tree/MVPTest) (consultado 25-sep-2026).
- Frontend (main): 4 vistas (Company, Dashboard, Investigator, Triager) con `mockReports.js`; la única mención de Stellar en el frontend de main es el texto "Stellar Testnet" en `App.jsx` — [GitHub PatchProof](https://github.com/AngelTapiaLedesma/CriptoUNAM) (consultado 25-sep-2026).

**PumaTrade** (repo `zums-stuff/Goya-Hack`, clonado el 25-sep-2026 ~10:45 y refrescado a las 11:05 CDMX)
- README: "Marketplace universitario de intercambio flexible con dinero protegido y ventana de prueba"; artículos académicos en desuso; 3 tipos de oferta (saldo en "PumaDolar (P$)", trueque, híbrido); "el saldo del comprador se congela en un smart contract (**cuenta Stellar multi-sig 2-de-2**)"; ventana de prueba de 48 h (3 min en demo) con tres ramas (aceptar, auto-liberar, disputa); "PumaDolar, una moneda digital respaldada por USDC en Stellar testnet, gestionada a través del SDK **Pollar** — wallets embebidas que se crean con solo iniciar sesión con Google. Cero seed phrases" — [GitHub PumaTrade](https://github.com/zums-stuff/Goya-Hack) (consultado 25-sep-2026).
- Fuera de alcance según su propio README: "**Smart contract Soroban real sustituyendo el multi-sig**", tarjeta Tangem, IA completa, on-ramp SEP-24, "Reputación y ratings" — [GitHub PumaTrade](https://github.com/zums-stuff/Goya-Hack).
- Problema declarado sin fuente: "Cada semestre los estudiantes gastan miles de pesos en activos académicos temporales" — [README PumaTrade](https://github.com/zums-stuff/Goya-Hack).
- Madurez: 5 commits en 1 rama, todos de documentación (v1.0 a v3.2 del PRD) entre el 24-sep 20:00 y el 24-sep 21:25 −06:00. Archivos: `.gitignore`, `PRD.md` (1,120 líneas) y `README.md`; **sin código**. El PRD dice: "Tiempo de implementación: <24h", "1 implementador full-stack + 2 teammates (diseño/pitch)" y "v3.0 — alinear con MVP del socio" — [GitHub PumaTrade, historial](https://github.com/zums-stuff/Goya-Hack/commits/main) (consultado 25-sep-2026 11:05).
- Diseño del escrow: la liberación automática la dispara un cron del backend cada 30 s ("Plataforma firma con timestamp"); la aceptación la firman "Plataforma + comprador" — [PRD PumaTrade](https://github.com/zums-stuff/Goya-Hack/blob/main/PRD.md).

**Búsqueda de otros equipos**
- WebSearch "GOYA HACK" github y "Goya Hack"/"GoyaHack" UNAM 2026 Stellar (25-sep-2026) solo devolvieron PatchProof, el PR de MarxMad ("Corregir nombre del hackathon a GOYA HACK") y el post de Instagram del evento — [PR MarxMad](https://github.com/MarxMad/MarxMad/pull/2); [Instagram CriptoUNAM](https://www.instagram.com/p/DcIPulDlUVl/).
- La búsqueda de GitHub (`/search`, `/topics`, perfiles) quedó bloqueada por robots.txt y 403; no se pudo buscar "criptounam", "goyahack" ni "hackathon unam 2026" dentro de GitHub.

### Inferences
- [INFERENCIA] PatchProof encaja con lo que el SCF descalifica: "Stellar must be used to meaningfully improve core features, not as a superficial integration, or for data storage" ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria)). Su "evidencia" es un hash en memo (almacenamiento) y su "escrow" depende de que el backend guarde la llave (custodia, no contrato). Si un juez revisa el código, la promesa de "Soroban" en su README no se sostiene.
- [INFERENCIA] PatchProof declara el track "Innovación", no "Blockchain". Si los tracks se juzgan por separado, quizá no compita directamente con Palabra. Hay que confirmarlo en el dashboard.
- [INFERENCIA] PumaTrade tiene la mejor narrativa de UX para un jurado de la UNAM: problema de estudiantes, login con Google y cero frases semilla con Pollar, que es herramienta de un taller del evento. Pero hasta las 11:05 del viernes no ha publicado código. "Alinear con MVP del socio" sugiere que el código podría estar en otro repo o en privado.
- [INFERENCIA] Ninguno de los dos publica investigación del problema (fuentes, datos, usuarios). Ese es el hueco que Palabra llena.

### Gaps
- No se pudo enumerar a todos los equipos: GitHub bloquea la búsqueda automática y el dashboard de criptounam.xyz no se puede leer. Puede haber equipos con repos privados o sin indexar. Revisar a mano la lista de proyectos en el dashboard y en el Discord.
- No se ejecutó el código de PatchProof ni hay video de su demo; "demo funcional" es lo que declara su propio commit.
- Track real de PumaTrade: no aparece en su README ni en su PRD.

---

## 2. Hackathons de Stellar en México y LatAm 2025–2026: ganadores, categorías, premios y rasgos comunes

### Takeaway
Hay un circuito de hackathons de Stellar coorganizado por la Blockchain Acceleration Foundation (BAF), la misma que coorganiza GOYA HACK. Incluye "Código Raíz" (Morelos, oct-2025), Stellar Hack+ en la Stellar Week de Buenos Aires (nov-2025) y "Código Alebrije" (CDMX, 2026). Dos de ellos usan los tracks **Genesis** (idea → producto) y **Scale** (producto → producción). Solo se pudo documentar un ganador con nombre: el equipo de la UTEZ con "Intelligent System for Income & Spending", primer lugar de un track en Morelos. Las listas de ganadores de DoraHacks (Alebrije, Hack+, GIVE, PULSO) no fueron accesibles. Lo que sí está escrito es lo que premian: integraciones reales, uso con calidad de producción, composabilidad, sistemas del mundo real e inclusión financiera. En México se añaden rieles en MXN, SPEI y wallets sin frase semilla.

### Cited Findings
**Stellar Hackathon México 2025 "Código Raíz" (Morelos)**
- Sede: Universidad Tecnológica Emiliano Zapata (UTEZ); duración de tres días; "más de 400 jóvenes, estudiantes, desarrolladores y desarrolladoras". Aliados: Gobierno de Morelos (SDEyT, CCyTEM), **Stellar Development Foundation**, **Blockchain Acceleration Foundation**, ayuntamientos de Emiliano Zapata y Xochitepec, y CEMITT. Tracks: educación, inclusión financiera, turismo sostenible y sostenibilidad ambiental. Premio: **750 dólares por track**; el equipo ganador representaría a México en el "Hackathon Stellar Argentina 2025". Proyecto destacado (la nota no dice si ganó): tokenización de CO₂ a partir de caña de azúcar, con el Ayuntamiento de Xochitepec — [Gobierno de Morelos, 29-oct-2025](https://www.morelos.gob.mx/ultimas-noticias/impulsa-gobierno-del-estado-la-innovacion-tecnologica-desde-morelos-en-el-hackathon-stellar-mexico-2025).
- Ganador documentado: equipo UTEZ (Isaac Jiménez Barcelata, Roberto Israel Flores Reza, Ángel Santiago Murga Arcos, Erick García Salgado y Jonathan Ocampo Flores), proyecto "**Intelligent System for Income & Spending**", "plataforma digital que ayuda a las personas a administrar sus ingresos y gastos de manera eficiente"; "obtuvieron el primer lugar del track" (La Jornada Morelos: "track uno"). Las notas no explican cómo usa Stellar — [Gobierno de Morelos, 4-nov-2025](https://www.morelos.gob.mx/ultimas-noticias/representaran-a-mexico-estudiantes-de-la-utez-en-el-hackathonstellar-argentina-2025); [La Jornada Morelos, 5-nov-2025](https://www.lajornadamorelos.mx/sociedad/estudiantes-de-la-utez-representaran-a-mexico-en-el-hackathon-stellar-2025-en-argentina/).

**Hack+ Alebrije / "Código Alebrije" CDMX 2026**
- Página oficial en DoraHacks (contenido no accesible: 405/403) — [DoraHacks Hack+ Alebrije CDMX 2026](https://dorahacks.io/hackathon/alebrije2026).
- Luma: "Código Alebrije by Stellar | Hackathon Day 1 (Genesis y Scale)" y "Day 2"; "Presentado por: Código Alebrije CDMX 2026"; anfitrión: **Blockchain Acceleration Foundation**. Sede: PÚBLICO Coworking, Av. Paseo de la Reforma 333, piso 7, CDMX. Día 1: "intro sesiones para formar equipos en Genesis y conocer a los mentores en Scale"; día 2: "madurar sus ideas, fortalecer sus proyectos". Luma muestra 89 asistentes el día 1 y 84 el día 2. Las páginas no muestran fecha, premios, criterios ni ganadores — [Luma Día 1](https://luma.com/waxc3081?locale=es); [Luma Día 2](https://luma.com/69y1s91u) (consultados 25-sep-2026).
- Guía oficial del equipo DevRel de la SDF para el evento: "Assembled by the SDF DevRel team for the Mexico City hackathon (Hack+ Alebrije | CDMX 2026)". Destaca rieles de México: Etherfuse (MXN ↔ CETES vía SPEI), AlfredPay (MXN ↔ USDC vía SPEI), BlindPay; ejemplos de referencia con Freighter, Soroswap, DeFindex, **passkeys** (smart wallet con WebAuthn + rampa MXN de Etherfuse) y Trustless Work (escrow). Cita: "Mexico has one of the most active SPEI networks in the world and a massive remittance corridor with the US. Stellar is built for exactly this." — [stellar/ecosystem-resources, mexico-hackathon.md](https://github.com/stellar/ecosystem-resources/blob/main/building-with-ai/mexico-hackathon.md) (último commit del repo: 9-sep-2026).
- Proyecto nacido ahí: MicoPay ("Born at *Código Alebrije* (CDMX)"). App móvil para cambiar USDC por pesos en efectivo mediante un escrow HTLC en Soroban, con CETES (Etherfuse) y SPEI. Después recibió apoyo de "Stellar Drips (Waves 4–6)" y se envió al "PULSO Hackathon — NearX × Stellar Development Foundation". Tiene 670 commits del 22-mar-2026 al 25-sep-2026 y contratos `micopay-escrow`, `htlc-core`, `atomic-swap`, `micopay-badges` y `zk-verifier`. Su README **no dice que haya ganado** en Alebrije. Afirma, sin evidencia pública (autodeclarado), estar "validated with real customer-discovery interviews across LATAM (Mexico, Argentina, Colombia)" — [GitHub Micopay/micopay-protocol](https://github.com/Micopay/micopay-protocol) (consultado 25-sep-2026).

**Stellar Hack+ Buenos Aires 2025 (Stellar Week, BAF)**
- "A pro-level hackathon with $15,000 USD in prizes", del 20 al 23 de noviembre de 2025, "bringing together top developers to turn ideas into real products powered by Stellar"; dentro de la Stellar Week (Stellar Lab del 17 al 19 de noviembre y Casa Stellar del 19 al 24 de noviembre) — [Stellar: Stellar at DevConnect Argentina](https://stellar.org/community/events/stellar-at-devconnect-argentina) (consultado 25-sep-2026).
- Categorías (tomadas de `talleres_patrocinadores.md`, consultado 25-sep-2026): Stellar Scale, US$5,000 en USDC al 1.er lugar ("productos en funcionamiento que integran Soroban"); Stellar Genesis, US$5,000 al 1.er lugar ("DeFi experimental y finanzas del mundo real"); Integrator Award, US$500 ("composabilidad con el ecosistema"); Innovation Award, US$500. Se priorizaron "real integrations", "production grade use", "composability" y "real-world systems" — [BAF Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025).
- Lista de proyectos en DoraHacks (no accesible) — [DoraHacks Stellar Hack+ BUIDLs](https://dorahacks.io/hackathon/stellarhack/buidl).

**Otros**
- Stellar GIVE Hackathon Argentina 2025: existe en DoraHacks; contenido no accesible — [DoraHacks GIVE Argentina](https://dorahacks.io/hackathon/give-hackathon-argentina/detail).
- Stellar PULSO Hackathon (NearX × SDF, según MicoPay): existe en DoraHacks; contenido no accesible — [DoraHacks PULSO tracks](https://dorahacks.io/hackathon/stellar-pulso-hackathon/tracks); [README MicoPay](https://github.com/Micopay/micopay-protocol).
- HackMeridian 2026 (Lisboa, 25 y 26 de octubre de 2026; hasta US$30 mil en XLM; tracks "Genesis" y "Scale"), tomado de `stellar_historia_casos.md` — [hackmeridian.com](https://www.hackmeridian.com/).

### Inferences
- [INFERENCIA] Genesis/Scale es el vocabulario de BAF y de la SDF en 2025–2026 (Buenos Aires, CDMX, Lisboa). Palabra es un proyecto "Genesis": problema real y prototipo que funciona en testnet. Conviene decirlo en el pitch ("estamos en Genesis; el siguiente paso es un piloto").
- [INFERENCIA] La guía de la SDF para México muestra el "proyecto tipo" que esperan los mentores: rieles MXN/SPEI, passkeys sin frase semilla y escrow. Palabra comparte dos de los tres rasgos: firma sin que el cliente vea llaves y un contrato que hace cumplir reglas. Por diseño no mueve dinero. Eso hay que explicarlo en una frase, porque un juez de Stellar podría esperar pagos.
- [INFERENCIA] El único ganador mexicano documentado (UTEZ) resolvió un problema cotidiano de finanzas personales. No hay evidencia de que haya ganado por la sofisticación técnica. Esto es coherente con "no buscamos un producto perfecto" (organizador de GOYA HACK, correo).
- [INFERENCIA] MicoPay muestra qué pasa después de un hackathon de BAF y la SDF en CDMX: los proyectos que siguen trabajando reciben fondos del ecosistema (Drips). La "continuidad" es un argumento que estos organizadores valoran.

### Gaps
- Ganadores de Hack+ Alebrije CDMX 2026, Stellar Hack+ Buenos Aires 2025, Stellar GIVE Argentina 2025 y PULSO: no se pudieron leer (DoraHacks bloquea el acceso automático; LinkedIn y X también). Tampoco se sabe cómo le fue al equipo UTEZ en Argentina.
- Fecha exacta de Código Alebrije: Luma no la muestra. [INFERENCIA débil] Por el primer commit de MicoPay (22-mar-2026), habría sido alrededor de marzo de 2026.
- "Stellar LATAM Hackathon" con ese nombre no apareció en las búsquedas; no se afirma que exista.
- No hay rúbrica publicada con pesos para Código Raíz, Código Alebrije ni Hack+.

---

## 3. Proyectos de crédito, reputación o micro-comercio en Stellar financiados por el SCF (2024–2026) y parecido con Palabra

### Takeaway
En el agregador de 839 proyectos de Stellar no hay ninguno de fiado ni de crédito comercial informal en mercados mayoristas. La búsqueda de "fiado", "tianguis", "abarrote", "central de abasto", "mercado", "tienda", "tendero", "shopkeeper", "kirana", "corner store" y "bodega" dio cero coincidencias. Lo más cercano que ha financiado el SCF es de tres tipos: (a) financiamiento de crédito comercial o cuentas por cobrar (Indentura US$80k, BorderDollar, Airswift, Quidroo, Rivool); (b) reputación (Trustful US$142k); (c) microcrédito agro con SMS (Microvault US$24k). Todos mueven dinero o tokenizan activos. Palabra no hace ninguna de las dos cosas, así que es complementaria, no competidora. Esos proyectos podrían ser, a futuro, los "terceros" que consultan el semáforo con permiso.

### Cited Findings
Fuente de toda esta sección, salvo que se indique otra: [Lumen Loop, Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db) (agregador; commit "sync 839 projects" del 25-sep-2026). Montos en USD "awarded_total" según el agregador; **no se verificaron en communityfund.stellar.org**.
- **Indentura** (Thaw Digital, EE. UU.; SCF ronda 37; US$80,000): "On-chain credit infrastructure on Stellar, rebuilding trade credit and receivables financing with programmable, transparent settlement." Región: Norteamérica sin México — [envío SCF](https://communityfund.stellar.org/submissions/recghVchvFzCaKCpO).
- **Trustful** (Blockful, Brasil; rondas 27 y 30; US$142,000): "A reputation system using Stellar badges and on-chain data that prioritizes fair cross-community collaboration over wealth." — [GitHub trustful-stellar-v1](https://github.com/blockful/trustful-stellar-v1); [envío SCF](https://communityfund.stellar.org/submissions/recTRjymkbSHuOlXH).
- **Microvault** (Shamba Records, Kenia; ronda 42; US$24,000): "Microlending engine… SEP-56 tokenized vaults on Stellar's Soroban… undercollateralized credit to smallholder farmers in East Africa, with loans requested via USSD/SMS and disbursed in local currency." — [GitHub microvault](https://github.com/shamba-records-limited/microvault); [envío SCF](https://communityfund.stellar.org/submissions/recvNshb1L59hprMV).
- **ClickPesa Debt Fund** (Tanzania; rondas 26 y 28; US$125,000): "Web3 end-to-end transparency and accountability promoting access to funding for SMEs and women-owned businesses." — [envío SCF](https://communityfund.stellar.org/submissions/recLlGrfUZ3BXOFcw).
- **Lumen Later** (Canadá; ronda 39; US$87,700): BNPL en Soroban, "over-collateralized, instant credit with a 14-day interest-free period" — [envío SCF](https://communityfund.stellar.org/submissions/recBgGBddXapJNL0S).
- **Kasi Money** (Sudáfrica; ronda 38; US$100,000): banca digital para trabajadores de plataformas y pequeños negocios ("payments, savings, and lending on Stellar") — [envío SCF](https://communityfund.stellar.org/submissions/reckmHC3jhm3U074S).
- Financiamiento de cuentas por cobrar y de comercio para pymes: **BorderDollar** (Singapur; rondas 26 y 29; US$133,000), **Airswift** (Canadá; ronda 16; US$150,000; cuentas por cobrar tokenizadas "using Stellar's Soroban"), **Quidroo** (Nigeria; ronda 9; US$55,880), **Rivool Finance** (Brasil; ronda 37; US$150,000), **Kutana** (Reino Unido/África; ronda 45; US$29,100; escrow por hitos para pymes) — [Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db).
- **reBlue** (EE. UU.; ronda 37; US$66,667): "supply chain oversight within fragile states… engage informal economic systems" — [envío SCF](https://communityfund.stellar.org/submissions/recOh6YWp05fsz94f).
- **ACTA** (Costa Rica; ronda 42; US$45,000): credenciales verificables W3C "via Soroban smart contracts" — [envío SCF](https://communityfund.stellar.org/submissions/recUBbVLf5Vj8oEW0).
- Proyectos con base en México y fondos del SCF (según el agregador): Alfred Pay (rondas 9 y 19; US$335,000; pagos B2B con stablecoins), CashAbroad (rondas 11, 14, 21 y 41; US$225,025), Decaf (ronda 17; US$150,000; wallet), Mica (ronda 16; US$138,700; escrow inmobiliario), Syklo (rondas 19 y 41; US$87,800; plugin WooCommerce), Bando (ronda 42; US$45,000; tesorería en CETES tokenizados), ChainCred (ronda 27; US$32,000; "credible company finances on Soroban"), Stellar Nest (ronda 25; US$14,800). **Ninguno trabaja crédito comercial informal** — [Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db).
- Dato inconsistente: ChainCred aparece "based in Mexico", pero su GitHub apunta a `kommitters/chaincerts-smart-contracts` y su web a una página personal de GitHub. Tratar con cautela — [Stellar Ecosystem DB, chaincred.yaml](https://github.com/lumenloop/stellar-ecosystem-db/blob/main/projects/chaincred.yaml).
- Pollar no aparece en el agregador (ni como proyecto ni con fondos SCF); GrantFox, KindFi, Offer Hub y Trustless Work sí aparecen como proyectos — [Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db).
- Criterio del SCF que explica qué se financia: "product–market fit, either through significant user traction, or a clearly validated need identified by a team or individual with relevant experience"; "Stellar must be used to meaningfully improve core features, not as a superficial integration, or for data storage"; ser "unique or meaningfully differentiated" — [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria).
- MicoPay (CDMX, fuera del SCF según el agregador; apoyo de Stellar Drips según su README): su ejemplo de uso incluye "check on-chain reputation → 98% completion, 312 trades" para comercios que entregan efectivo. Es un ejemplo ilustrativo del README, no una métrica real — [GitHub MicoPay](https://github.com/Micopay/micopay-protocol).

### Inferences
- [INFERENCIA] Palabra no tiene un gemelo en el ecosistema: nadie hace una bitácora de fiado co-firmada, sin dinero y con permiso del cliente en un mercado mayorista. Eso cumple el criterio del SCF de ser "meaningfully differentiated".
- [INFERENCIA] Indentura, BorderDollar, Microvault y Kasi Money son **aliados potenciales**, no competidores. Son quienes prestan, y hoy les falta justo lo que Palabra produce: un historial verificable del deudor informal, compartido con su consentimiento. Así se puede plantear la "siguiente etapa" sin que Palabra mueva dinero.
- [INFERENCIA] Trustful demuestra que el SCF sí financia reputación en Stellar, algo relevante ante un juez escéptico. ACTA (credenciales W3C en Soroban) podría servir más adelante para el "permiso" del cliente.
- [INFERENCIA] MicoPay es el vecino más cercano en México: comercios de barrio, reputación y Soroban en CDMX. Es posible aliado, porque las bodegas podrían ser puntos de efectivo, pero no hay evidencia de que participe en GOYA HACK.

### Gaps
- No se leyeron los envíos individuales del SCF (communityfund.stellar.org es una aplicación JavaScript) y no se conocen las razones de los revisores por proyecto.
- El agregador puede omitir proyectos o traer descripciones incompletas. Que no aparezca "fiado" no prueba que nadie lo haga.
- Rondas por fecha: el agregador da número de ronda, no fecha. No se verificó qué rondas caen en 2024–2026.

---

## 4. Implicaciones: matriz de posicionamiento, diferenciadores y riesgos

### Takeaway
En la matriz "problema real con evidencia" contra "uso significativo de Soroban", Palabra es el único proyecto de GOYA HACK que puede quedar arriba a la derecha, siempre que la demo muestre las dos firmas y la consulta que falla sin permiso. PatchProof tiene un problema real, pero sin evidencia publicada, y su integración con Stellar es superficial (hash en memo y llave en la base de datos). PumaTrade tiene un problema cercano al jurado, pero genérico, y hace un uso intermedio de Stellar (multifirma clásica con Pollar), aún sin código. El mayor riesgo competitivo es la experiencia de uso (PumaTrade con Pollar), no la tecnología.

### Cited Findings
- Todas las ubicaciones se derivan de los hallazgos de las secciones 1 a 3 y del criterio del SCF — [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria).
- Evidencia de Palabra que se puede decir en el pitch (con fuente, ver `contexto_comun_palabra.md`): 1,981 bodegas de frutas y legumbres y 347 de abarrotes ([FICEDA](https://ficeda.com.mx/sectores-de-actividad/)); tratos "a palabra, en persona y con pagos en efectivo" ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)); 18.4 % de rechazos de crédito por falta de historial ([ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)); la bodega ancla fía cientos de miles de pesos diarios (experiencia de José).
- BAF premió el uso de herramientas del ecosistema con un "Integrator Award" en la Stellar Week — [BAF Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025).

### Inferences
- [INFERENCIA] Matriz, diferenciadores y riesgos: ver el documento final `research/04_competencia-y-ganadores.md`.

### Gaps
- La ubicación en la matriz es un juicio propio. No hay rúbrica oficial de GOYA HACK con pesos.
- No se sabe cuántos equipos compiten en el track Blockchain.
