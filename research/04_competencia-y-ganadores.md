---
título: Competencia en GOYA HACK y ganadores de Stellar en México y LatAm
fecha: 2026-09-25
estado: investigación cerrada el 25-sep-2026 a las 11:05 CDMX. Los repos de la competencia pueden cambiar antes de la entrega; volver a revisarlos con `git log --all` hacia las 16:00
origen: notas competencia_ganadores.md (25-sep); hackathon_que_gana.md; talleres_patrocinadores.md; stellar_historia_casos.md; clonación de los repos públicos de la competencia; Stellar Ecosystem DB (Lumen Loop)
---

# Competencia y ganadores: dónde se para Palabra

> **Nota de nombre (25-sep-2026, 12:30):** este documento se escribió cuando el proyecto se llamaba «Palabra». Desde las 12:06 el proyecto se llama **Cuentas Claras** y el equipo, **Palabra** (decisión #36). El texto conserva el nombre con el que se escribió.

Regla: todo hecho lleva fuente y fecha. Las inferencias se marcan con **[INFERENCIA]**. Las cifras autodeclaradas se marcan como **[AUTODECLARADO]**. Si algo no se encontró, se dice.

## Resumen ejecutivo

1. **Solo encontramos dos competidores con repo público. Ninguno usa contratos Soroban de verdad ni tiene demo publicada** (corte: 25-sep, 11:05 CDMX).
   - **PatchProof** (bug bounty verificable) avanzó más de lo que sabíamos: 22 commits en 7 ramas y un commit del 24-sep a las 23:48 que dice "demo funcional (falta el testeo)". Aun así, su uso de Stellar se reduce a guardar un hash en el memo de un autopago y a una cuenta "escrow" cuya llave secreta guarda su propio backend. No hay contrato Soroban en ninguna rama, aunque su README lo anuncia. Además declara el track "Innovación", no Blockchain.
   - **PumaTrade** (marketplace estudiantil) sigue siendo solo documentación, sin código. Planea usar Pollar con login de Google y una cuenta multifirma 2-de-2 clásica, y deja Soroban "a futuro".
   - La búsqueda de otros equipos en GitHub quedó bloqueada, así que puede haber más ([PatchProof](https://github.com/AngelTapiaLedesma/CriptoUNAM), [PumaTrade](https://github.com/zums-stuff/Goya-Hack), revisados el 25-sep-2026).
2. **GOYA HACK es parte de un circuito.** La Blockchain Acceleration Foundation (BAF), coanfitriona de GOYA HACK, ya organizó con la Stellar Development Foundation (SDF) "Código Raíz" en Morelos (oct-2025, 400+ participantes, US$750 por track), el Stellar Hack+ de Buenos Aires (nov-2025, US$15,000) y "Código Alebrije" en CDMX (2026). Los tracks se llaman **Genesis** (idea → producto) y **Scale** (producto → producción). Lo que premian por escrito: "real integrations", "production grade use", "composability" y "real-world systems".
3. **Solo hay un ganador documentado:** el equipo de la UTEZ, con una app de finanzas personales ("Intelligent System for Income & Spending"), primer lugar de un track en Morelos. Las listas de ganadores de DoraHacks (Alebrije, Hack+, GIVE, PULSO) no se pudieron leer. **No afirmamos quién ganó ahí.**
4. **Palabra no tiene gemelo en el ecosistema.** En los 839 proyectos del agregador Stellar Ecosystem DB no hay nada sobre fiado ni crédito comercial informal en mercados. Lo más cercano que financió el Stellar Community Fund (SCF) presta dinero o tokeniza cuentas por cobrar: Indentura (US$80k), Microvault (US$24k, microcrédito agrícola por SMS) y Trustful (US$142k, reputación). Son **aliados potenciales**: futuros "terceros" que consultarían el semáforo con permiso.
5. **El riesgo competitivo es la experiencia de uso, no la tecnología.** El equipo con login de Google y "cero frases semilla" (PumaTrade con Pollar) puede lucir más pulido. Nuestra respuesta es terminar un solo flujo que funcione en testnet, en el que la consulta sin permiso falla frente al jurado, y abrir con la evidencia de la CEDA.

## 1. Competidores de GOYA HACK 2026

Método: se clonaron los repos y se revisaron **todas** sus ramas con `git log --all` (25-sep-2026, 10:45 y de nuevo a las 11:05 CDMX). La búsqueda web de GitHub quedó bloqueada: robots.txt y 403 del proxy en `/search`, `/topics` y perfiles.

| | **PatchProof** | **PumaTrade** |
|---|---|---|
| Repo | [AngelTapiaLedesma/CriptoUNAM](https://github.com/AngelTapiaLedesma/CriptoUNAM) | [zums-stuff/Goya-Hack](https://github.com/zums-stuff/Goya-Hack) |
| Problema | Confianza en bug bounties: el investigador necesita "evidencia de que su reporte fue recibido y que la recompensa prometida existe" (README) | Estudiantes que "gastan miles de pesos en activos académicos temporales" (README, **sin fuente**) |
| Track | "**Innovación**" (README); equipo de 4 | No declarado |
| Stack | React + Vite, FastAPI, SQLite, `stellar_sdk` (Python) contra Horizon testnet | Next.js 14, Prisma + SQLite, `@pollar/react`, USDC de testnet como "PumaDolar" |
| Uso real de Stellar | Operaciones clásicas: (a) "escrow" = cuenta aleatoria creada con `create_account`, cuya **llave secreta se guarda en la base de datos**; (b) "evidencia" = autopago de 0.0000001 XLM con el SHA-256 del reporte en `HashMemo`; (c) pago de la recompensa; (d) "proof of remediation" = otro hash en memo ([rama MVPTest](https://github.com/AngelTapiaLedesma/CriptoUNAM/tree/MVPTest), [rama blockchain](https://github.com/AngelTapiaLedesma/CriptoUNAM/tree/blockchain)) | Planeado: cuenta **multifirma 2-de-2 clásica** ("Plataforma firma + comprador firma"); plazo, liberación automática y disputa corren en un cron del backend cada 30 s ([PRD](https://github.com/zums-stuff/Goya-Hack/blob/main/PRD.md)) |
| ¿Soroban? | El README dice "Soroban para smart contracts", pero **no hay `.rs` ni `Cargo.toml` en ninguna de las 7 ramas** | "Smart contract Soroban real sustituyendo el multi-sig" aparece como **fuera de alcance** (README) |
| ¿Wallets sin frase semilla? | No; llaves de testnet en el código ("se dejaron directamente en el código", README de la rama blockchain) | Sí: Pollar, "wallets embebidas… con solo iniciar sesión con Google. Cero seed phrases" |
| Madurez (25-sep, 11:05) | 22 commits en 7 ramas; 5 autores. Último: 24-sep 23:48 −06:00, "demo funcional (falta el testeo)", **sin fusionar a main**. Main sigue diciendo que la demo y las instrucciones "se agregarán". Sin video ni enlace de demo | 5 commits, todos de documentación (PRD v1.0→v3.2, 24-sep 20:00–21:25 −06:00). **Sin código.** El PRD dice "Tiempo de implementación: <24h", "1 implementador full-stack + 2 teammates" y "alinear con MVP del socio". Sin demo |
| Fortalezas frente a Palabra | Más horas y más manos (4 personas desde el martes); backend y frontend separados; flujo con pago real de XLM en testnet | Problema cercano a un jurado universitario; UX sin frase semilla con una herramienta de un taller del evento (Pollar); PRD muy detallado con guion de demo de 3 min |
| Debilidades frente a Palabra | Ninguna investigación del problema publicada; integración que el SCF llamaría "superficial" o "for data storage" [INFERENCIA]; promete Soroban sin tenerlo; custodia de llaves en el backend | Sin código público a horas de la entrega; problema sin evidencia; escrow que depende de la plataforma, no de un contrato [INFERENCIA]; alcance amplio (3 tipos de oferta, disputas, IA de precios) |

- **Nadie más apareció.** Las búsquedas "GOYA HACK" github y "Goya Hack"/"GoyaHack" UNAM 2026 Stellar (25-sep-2026) solo devolvieron PatchProof, el PR que corrige el nombre del evento ([MarxMad/MarxMad#2](https://github.com/MarxMad/MarxMad/pull/2)) y el post del evento ([Instagram CriptoUNAM](https://www.instagram.com/p/DcIPulDlUVl/)). **Hueco:** revisar a mano la lista de proyectos del dashboard y el Discord.
- **Track [INFERENCIA]:** si los tracks se juzgan por separado, PatchProof ("Innovación") podría no competir directamente con Palabra en Blockchain. Confirmar en el dashboard.

## 2. Ganadores previos de Stellar en México y LatAm

| Evento | Fecha y sede | Organiza | Tracks y premios | Ganadores (lo verificable) | Fuente (fecha) |
|---|---|---|---|---|---|
| **Stellar Hackathon México 2025 "Código Raíz"** | 3 días; UTEZ, Emiliano Zapata, Morelos; "más de 400 jóvenes" | Gobierno de Morelos (SDEyT, CCyTEM), **SDF**, **BAF**, ayuntamientos, CEMITT | Educación, inclusión financiera, turismo sostenible, sostenibilidad ambiental; **US$750 por track**; el ganador iría a Argentina | **UTEZ** (5 estudiantes): "Intelligent System for Income & Spending", "plataforma digital que ayuda a las personas a administrar sus ingresos y gastos", **primer lugar del track** ("track uno"). No se dice cómo usa Stellar. También se destacó un proyecto de tokenización de CO₂ de caña de azúcar (no se dice si ganó) | [Morelos, 29-oct-2025](https://www.morelos.gob.mx/ultimas-noticias/impulsa-gobierno-del-estado-la-innovacion-tecnologica-desde-morelos-en-el-hackathon-stellar-mexico-2025); [Morelos, 4-nov-2025](https://www.morelos.gob.mx/ultimas-noticias/representaran-a-mexico-estudiantes-de-la-utez-en-el-hackathonstellar-argentina-2025); [La Jornada Morelos, 5-nov-2025](https://www.lajornadamorelos.mx/sociedad/estudiantes-de-la-utez-representaran-a-mexico-en-el-hackathon-stellar-2025-en-argentina/) |
| **Hack+ Alebrije / "Código Alebrije" CDMX 2026** | Fecha no visible en Luma [INFERENCIA débil: ~mar-2026]; PÚBLICO Coworking, Reforma 333, piso 7; Luma registra 89 asistentes el día 1 y 84 el día 2 | Anfitrión: **BAF**; guía técnica del equipo DevRel de la **SDF** | **Genesis** y **Scale** ("formar equipos en Genesis y conocer a los mentores en Scale"); premios no visibles | **No accesibles** (DoraHacks bloquea). MicoPay dice haber nacido ahí ("Born at *Código Alebrije*"), pero **no dice que haya ganado** | [DoraHacks](https://dorahacks.io/hackathon/alebrije2026); [Luma día 1](https://luma.com/waxc3081?locale=es); [Luma día 2](https://luma.com/69y1s91u); [guía SDF](https://github.com/stellar/ecosystem-resources/blob/main/building-with-ai/mexico-hackathon.md) (todas consultadas 25-sep-2026) |
| **Stellar Hack+ Buenos Aires 2025** (Stellar Week) | 20–23 nov 2025, Buenos Aires | **BAF** (Stellar Week) | US$15,000 en total. Stellar Scale: US$5,000 al 1.er lugar ("productos en funcionamiento que integran Soroban"). Stellar Genesis: US$5,000 al 1.er lugar ("DeFi experimental y finanzas del mundo real"). Integrator Award: US$500. Innovation Award: US$500. Se premió "real integrations", "production grade use", "composability", "real-world systems" | **No accesibles.** Tampoco se sabe cómo le fue al equipo UTEZ | [Stellar.org, consultado 25-sep-2026](https://stellar.org/community/events/stellar-at-devconnect-argentina); [BAF Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025); [DoraHacks BUIDLs](https://dorahacks.io/hackathon/stellarhack/buidl) |
| **Stellar GIVE Hackathon Argentina 2025** | No accesible | No accesible | No accesible | **No accesibles** | [DoraHacks](https://dorahacks.io/hackathon/give-hackathon-argentina/detail) |
| **Stellar PULSO Hackathon** (NearX × SDF, según MicoPay) | No accesible | NearX × SDF | No accesible | **No accesibles** | [DoraHacks](https://dorahacks.io/hackathon/stellar-pulso-hackathon/tracks); [README MicoPay](https://github.com/Micopay/micopay-protocol) |
| **HackMeridian 2026** (referencia) | 25–26 oct 2026, Lisboa | SDF | Hasta US$30 mil en XLM; tracks **Genesis** y **Scale** | Aún no ocurre | [hackmeridian.com](https://www.hackmeridian.com/) (vía notas previas, 25-sep-2026) |

"Stellar LATAM Hackathon" con ese nombre no apareció en las búsquedas; no afirmamos que exista.

**Qué tienen en común, con lo que hay escrito:**
- **Problema real e inclusión financiera por encima de la sofisticación.** Los tracks de Morelos son de impacto social, y el único ganador con nombre resolvió finanzas personales. BAF pide "real-world systems" ([Morelos](https://www.morelos.gob.mx/ultimas-noticias/impulsa-gobierno-del-estado-la-innovacion-tecnologica-desde-morelos-en-el-hackathon-stellar-mexico-2025); [BAF](https://www.blockchainacceleration.org/stellarweek2025)).
- **Soroban haciendo trabajo real.** El track Scale de Buenos Aires era para "productos en funcionamiento que integran Soroban" ([BAF](https://www.blockchainacceleration.org/stellarweek2025)).
- **El kit que la SDF espera en México:** rieles MXN/SPEI (Etherfuse, AlfredPay), wallets con **passkeys** (sin frase semilla) y escrow (Trustless Work). La guía dice: "Mexico has one of the most active SPEI networks in the world… Stellar is built for exactly this" ([guía SDF para Hack+ Alebrije](https://github.com/stellar/ecosystem-resources/blob/main/building-with-ai/mexico-hackathon.md)).
- **Continuidad.** El proyecto nacido en Alebrije que encontramos (MicoPay) siguió con fondos de Stellar Drips y otros hackathons: 670 commits entre el 22-mar y el 25-sep-2026 ([GitHub MicoPay](https://github.com/Micopay/micopay-protocol)).

[INFERENCIA] No hay datos para decir que "los ganadores tenían demo, problema real y UX sin frase semilla": solo conocemos un ganador. Lo anterior es el patrón de **lo que los organizadores dicen premiar**, no de quién ganó.

## 3. Proyectos parecidos en el ecosistema Stellar

Base: [Stellar Ecosystem DB de Lumen Loop](https://github.com/lumenloop/stellar-ecosystem-db), un **agregador** con 839 proyectos (sincronizado el 25-sep-2026). Los montos son "awarded_total" en USD según el agregador; **no se cotejaron en communityfund.stellar.org**. Búsqueda de "fiado", "tianguis", "abarrote", "central de abasto", "mercado", "tienda", "tendero", "shopkeeper", "kirana", "corner store" y "bodega": **0 coincidencias**.

| Proyecto | Qué hace | SCF (ronda; monto) | ¿Parecido a Palabra? | Relación [INFERENCIA] |
|---|---|---|---|---|
| **Indentura** (Thaw Digital, EE. UU.) | "On-chain credit infrastructure… rebuilding trade credit and receivables financing with programmable, transparent settlement" | 37; US$80,000 | El más cercano en concepto (crédito comercial), pero financia cuentas por cobrar y liquida dinero; B2B en Norteamérica | Aliado potencial: consumiría historial verificado |
| **Trustful** (Blockful, Brasil) | "A reputation system using Stellar badges and on-chain data" | 27 y 30; US$142,000 | Reputación, pero de colaboradores de comunidades, no de crédito | Precedente: el SCF financia reputación en Stellar |
| **Microvault** (Shamba Records, Kenia) | Microcrédito sin colateral completo para pequeños agricultores, con bóvedas SEP-56 en Soroban y solicitudes por USSD/SMS | 42; US$24,000 | Agro, informal y canal de baja tecnología; pero presta dinero | Aliado potencial y ejemplo de canal simple |
| **ClickPesa Debt Fund** (Tanzania) | Transparencia para financiar pymes y negocios de mujeres | 26 y 28; US$125,000 | Financiamiento a pymes | Aliado potencial |
| **Kasi Money** (Sudáfrica) | Banca digital para pequeños negocios: pagos, ahorro y préstamos | 38; US$100,000 | Pequeños negocios; mueve dinero | Lejano |
| **Lumen Later** (Canadá) | Compra ahora y paga después en Soroban, sobrecolateralizado | 39; US$87,700 | Crédito DeFi, no informal | Lejano |
| **BorderDollar**, **Airswift**, **Quidroo**, **Rivool**, **Kutana** | Financiamiento de facturas, cuentas por cobrar o comercio de pymes | 26/29 US$133,000; 16 US$150,000; 9 US$55,880; 37 US$150,000; 45 US$29,100 | Crédito comercial formal y tokenizado | Aliados lejanos |
| **ACTA** (Costa Rica) | Credenciales verificables W3C "via Soroban smart contracts" | 42; US$45,000 | Herramienta, no competidor | Posible pieza futura para el "permiso" |
| **MicoPay** (CDMX; no aparece con SCF en el agregador; Stellar Drips según su README) | Cambiar USDC por efectivo con escrow HTLC en Soroban; comercios como puntos de efectivo con reputación | — | Vecino más cercano en México (comercio de barrio, reputación, Soroban). Su "98% completion, 312 trades" es un **ejemplo ilustrativo** del README, no una métrica | Posible aliado (bodegas como puntos de efectivo). **No hay evidencia de que esté en GOYA HACK** |

Proyectos con base en México que recibieron fondos del SCF (según el agregador): Alfred Pay (US$335,000), CashAbroad (US$225,025), Decaf (US$150,000), Mica (US$138,700; escrow inmobiliario), Syklo (US$87,800), Bando (US$45,000; CETES tokenizados), ChainCred (US$32,000; datos del agregador inconsistentes: su GitHub apunta a `kommitters/chaincerts`) y Stellar Nest (US$14,800). **Ninguno trabaja crédito comercial informal** ([Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db)). Pollar no aparece en el agregador.

**Lectura [INFERENCIA]:** Palabra no compite con nadie financiado. Llena un hueco que esos proyectos tienen antes de prestar: saber, con permiso del cliente, si un comerciante informal cumple. Esto encaja con el criterio del SCF de ser "unique or meaningfully differentiated" ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria)).

## 4. Matriz de posicionamiento

Ejes (juicio propio, **[INFERENCIA]**):
- **Eje 1, "problema real con evidencia":** hay fuentes públicas o experiencia operativa declarada, frente a una idea sin datos.
- **Eje 2, "uso significativo de Soroban":** un contrato hace cumplir reglas centrales, frente a guardar hashes o dejar la lógica en el backend. El criterio es el del SCF: "meaningfully improve core features, not as a superficial integration, or for data storage" ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria)).

```
                        USO SIGNIFICATIVO DE SOROBAN
                 bajo (hash/backend)          alto (contrato hace cumplir)
              +----------------------------+------------------------------+
  PROBLEMA    |                            |  PALABRA  (si la demo corre) |
  CON         |                            |  MicoPay  (referencia; no    |
  EVIDENCIA   |                            |            está en GOYA)     |
              +----------------------------+------------------------------+
  IDEA SIN    |  PatchProof (hash en memo, |                              |
  EVIDENCIA   |    llave en BD)            |                              |
  PUBLICADA   |  PumaTrade (multifirma     |                              |
              |    clásica + backend;      |                              |
              |    más cerca del centro)   |                              |
              +----------------------------+------------------------------+
```

| Proyecto | Eje 1: evidencia | Eje 2: Soroban | Por qué |
|---|---|---|---|
| **Palabra** | Alta | Alta, **condicionada a la demo** | Fuentes públicas (FICEDA, ENAFIN, Bakić Hayden) + experiencia de José. El contrato exige dos firmas `require_auth`, lleva los estados y controla los permisos (spec v1). Si la demo no muestra las firmas y la consulta rechazada, cae al cuadrante de la izquierda |
| **PatchProof** | Baja-media | Baja | Problema plausible, pero sin datos ni usuarios en el repo; Stellar como anclaje de hash y escrow con custodia ([rama MVPTest](https://github.com/AngelTapiaLedesma/CriptoUNAM/tree/MVPTest)) |
| **PumaTrade** | Baja-media | Baja-media | Problema cercano al jurado, pero sin fuente; pagos reales en USDC de testnet con Pollar; la lógica del escrow está en un cron del backend; Soroban "fuera de alcance" ([README](https://github.com/zums-stuff/Goya-Hack)) |
| **MicoPay** (referencia) | Media [AUTODECLARADO: entrevistas en LatAm] | Alta | Contratos de escrow HTLC, insignias y verificador ZK en Soroban ([GitHub](https://github.com/Micopay/micopay-protocol)) |

## 5. Diferenciadores y riesgos

### Cinco diferenciadores que hay que decir en el pitch

1. **"Lo construimos desde adentro de la Central."** El equipo opera ahí: la bodega ancla fía cientos de miles de pesos diarios (experiencia de José). Hoy no existe ningún registro compartido entre bodegas (experiencia de José). Son 1,981 bodegas de frutas y legumbres y 347 de abarrotes ([FICEDA](https://ficeda.com.mx/sectores-de-actividad/)), y el trato es "a palabra, en persona y con pagos en efectivo" ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)).
   *Frente a quién:* ni PatchProof ni PumaTrade publican evidencia de su problema.
2. **"El contrato hace cumplir las reglas; no guarda datos."** Ninguna bodega puede escribir una deuda sola: firman la bodega y el cliente, cada uno en su paso. Nadie la edita ni la borra; las correcciones se agregan como eventos nuevos.
   *Frente a quién:* PatchProof guarda hashes en memos y PumaTrade deja la lógica en su backend. Decirlo con la frase del SCF en la diapositiva de "por qué Stellar".
3. **"Tu historial es tuyo: la consulta oficial exige tu permiso y deja constancia."** El permiso tiene vigencia, se puede revocar y cada lectura deja rastro auditable. **Momento de demo:** la misma consulta, sin permiso, falla frente al jurado.
   *Frente a quién:* ningún competidor tiene consentimiento verificable.
4. **"Fiado de palabra, firmado por los dos. No toca el dinero."** El fiado y el pago siguen como hoy; lo único nuevo es que la nota queda co-firmada. Palabra no emite moneda, no pide al cliente comprar nada y el cliente no ve llaves.
   *Frente a quién:* PumaTrade necesita su propia moneda (PumaDolar en USDC) y PatchProof mueve XLM; nosotros no pedimos esa adopción.
   *Para jueces de Stellar México, que esperan rieles MXN:* "a propósito no movemos dinero; los pagos ya existen, lo que no existe es la confianza compartida".
5. **"Es la pieza que le falta al ecosistema."** En Stellar ya hay quien presta a pymes y a pequeños productores: Indentura, Microvault, BorderDollar, con fondos del SCF según [Stellar Ecosystem DB](https://github.com/lumenloop/stellar-ecosystem-db). Nadie ha resuelto cómo saber, con permiso, si un comerciante informal cumple. Siguiente paso: piloto con la bodega ancla, mainnet después de entregar, y la ruta Genesis (HackMeridian / SCF).

### Tres riesgos competitivos y cómo mitigarlos

| Riesgo | Por qué es real | Mitigación |
|---|---|---|
| **R1. Otro equipo muestra una demo más pulida** | PumaTrade promete login con Google y "cero seed phrases"; PatchProof ya tiene 4 vistas y un commit de "demo funcional"; los dos empezaron el martes ([PumaTrade](https://github.com/zums-stuff/Goya-Hack); [PatchProof](https://github.com/AngelTapiaLedesma/CriptoUNAM)) | Un solo camino feliz, ensayado. La aceptación del cliente se ve en pantalla de teléfono. Cuentas de testnet prefondeadas. Pestaña del explorador abierta. Video de respaldo y `demo.sh`. README con el ID del contrato y los hashes de las transacciones. Cero funciones nuevas después de las 06:00 |
| **R2. Un equipo con Pollar (herramienta de un taller del evento) suma puntos de "integración"** | BAF ya premió la integración con el ecosistema ("Integrator Award", [Stellar Week](https://www.blockchainacceleration.org/stellarweek2025)); la guía de la SDF para México destaca passkeys ([guía](https://github.com/stellar/ecosystem-resources/blob/main/building-with-ai/mexico-hackathon.md)) | No integrar Pollar a última hora (requiere dashboard, API key y allowlist; ver `talleres_patrocinadores.md`). Decir: "el cliente firma sin ver llaves ni frase semilla; en producción, con passkey o Pollar" y ponerlo en la diapositiva de siguientes pasos. Si un mentor pregunta, mostrar que se evaluó |
| **R3. El jurado prefiere un problema cercano y simple, o duda de "¿por qué no una base de datos?"** | PumaTrade habla de la vida del estudiante de la UNAM; el único ganador mexicano documentado resolvió finanzas personales ([Morelos](https://www.morelos.gob.mx/ultimas-noticias/representaran-a-mexico-estudiantes-de-la-utez-en-el-hackathonstellar-argentina-2025)) | Abrir con una historia concreta de la Central (sin datos personales) y cerrar con la cifra de ENAFIN (18.4 % de rechazos por falta de historial, [INEGI](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)). Una diapositiva con la respuesta: no hay custodio neutral en quien confíen bodegas rivales; ninguna bodega escribe sola; nadie borra; el cliente se lleva su historial. Enseñar la consulta que falla sin permiso |

**Acción concreta [INFERENCIA]:** hacia las 16:00, correr `git log --all` en los dos repos. Si PatchProof fusiona su demo o PumaTrade sube código, ajustar el R1. Confirmar en el dashboard en qué track está cada uno.

## 6. Fuentes

Todas consultadas el 25-sep-2026 (10:40–11:05 CDMX), salvo que se indique otra fecha.

**Competidores (GitHub, revisión con `git clone` y `git log --all`)**
- PatchProof: https://github.com/AngelTapiaLedesma/CriptoUNAM (ramas main, MVPTest, blockchain, feature/backend, David, integration/mvp y feature/frontend; último commit 24-sep-2026 23:48 −06:00)
- PumaTrade: https://github.com/zums-stuff/Goya-Hack (README y PRD.md; último commit 24-sep-2026 21:25 −06:00)
- PR "Corregir nombre del hackathon a GOYA HACK": https://github.com/MarxMad/MarxMad/pull/2
- Post del evento: https://www.instagram.com/p/DcIPulDlUVl/ (solo el fragmento indexado)

**Hackathons de Stellar en México y LatAm**
- Gobierno de Morelos, 29-oct-2025: https://www.morelos.gob.mx/ultimas-noticias/impulsa-gobierno-del-estado-la-innovacion-tecnologica-desde-morelos-en-el-hackathon-stellar-mexico-2025
- Gobierno de Morelos, 4-nov-2025: https://www.morelos.gob.mx/ultimas-noticias/representaran-a-mexico-estudiantes-de-la-utez-en-el-hackathonstellar-argentina-2025
- La Jornada Morelos, 5-nov-2025: https://www.lajornadamorelos.mx/sociedad/estudiantes-de-la-utez-representaran-a-mexico-en-el-hackathon-stellar-2025-en-argentina/
- DoraHacks Hack+ Alebrije CDMX 2026 (no accesible): https://dorahacks.io/hackathon/alebrije2026
- Luma, Código Alebrije, día 1: https://luma.com/waxc3081?locale=es · día 2: https://luma.com/69y1s91u
- Guía de la SDF para Hack+ Alebrije (repo actualizado el 9-sep-2026): https://github.com/stellar/ecosystem-resources/blob/main/building-with-ai/mexico-hackathon.md
- MicoPay: https://github.com/Micopay/micopay-protocol (último commit 25-sep-2026 06:35 −06:00)
- Stellar at DevConnect Argentina (Hack+): https://stellar.org/community/events/stellar-at-devconnect-argentina
- BAF Stellar Week 2025: https://www.blockchainacceleration.org/stellarweek2025 (vía `talleres_patrocinadores.md`)
- DoraHacks Stellar Hack+ (no accesible): https://dorahacks.io/hackathon/stellarhack/buidl
- DoraHacks Stellar GIVE Argentina 2025 (no accesible): https://dorahacks.io/hackathon/give-hackathon-argentina/detail
- DoraHacks Stellar PULSO (no accesible): https://dorahacks.io/hackathon/stellar-pulso-hackathon/tracks
- HackMeridian 2026: https://www.hackmeridian.com/ (vía `stellar_historia_casos.md`)

**Ecosistema y SCF**
- Stellar Ecosystem DB (Lumen Loop; agregador; sincronizado el 25-sep-2026): https://github.com/lumenloop/stellar-ecosystem-db
- Envíos al SCF citados (no se abrieron): Indentura https://communityfund.stellar.org/submissions/recghVchvFzCaKCpO · Trustful https://communityfund.stellar.org/submissions/recTRjymkbSHuOlXH · Microvault https://communityfund.stellar.org/submissions/recvNshb1L59hprMV · ClickPesa Debt Fund https://communityfund.stellar.org/submissions/recLlGrfUZ3BXOFcw · ACTA https://communityfund.stellar.org/submissions/recUBbVLf5Vj8oEW0
- Trustful: https://github.com/blockful/trustful-stellar-v1 · Microvault: https://github.com/shamba-records-limited/microvault
- SCF Handbook, criterios del Build Award: https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria

**Evidencia de Palabra citada en el pitch** (ya verificada en el contexto común)
- FICEDA: https://ficeda.com.mx/sectores-de-actividad/ · Bakić Hayden (2022): https://www.redalyc.org/journal/747/74772617003/ · ENAFIN 2024: https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf

**Huecos declarados:** ganadores de Alebrije, Hack+ Buenos Aires, GIVE Argentina y PULSO (DoraHacks, LinkedIn y X bloqueados); fecha exacta de Código Alebrije; otros equipos de GOYA HACK (búsqueda de GitHub bloqueada); razones de los revisores del SCF por proyecto; rúbrica con pesos de GOYA HACK.
