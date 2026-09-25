# Diseño de sistemas de reputación y credit scoring descentralizado para CREDI-CEDA

Notas de investigación (25 sep 2026). Alcance: teoría de reputación, estándares de atestación/credenciales, implementaciones de scoring descentralizado, técnicas de privacidad, resistencia Sybil en un esquema bipartito y recomendación de diseño MVP vs producción. No repite marco legal (LRSIC), Kiva/Bloom/BanQu ni herramientas Stellar básicas (Groth16 en soroban-examples, passkeys), cubiertos en la ronda anterior. Todo lo marcado como **[inferencia de diseño]** es propuesta propia, no hallazgo citado. Estados "vigente a 2026" se indican con la fecha de la fuente.

---

## 1. Teoría de sistemas de reputación: problemas conocidos y mitigaciones

### Takeaway
La literatura empírica (eBay, Airbnb, oDesk) demuestra que las calificaciones subjetivas bilaterales sufren sesgo por reciprocidad/represalia, inflación de notas y silencio de los insatisfechos; las mitigaciones probadas son revelación simultánea o ciega, métricas construidas con datos objetivos de la plataforma (no con opiniones), decaimiento temporal, filtrado de calificaciones injustas y castigo a identidades nuevas. Para CREDI-CEDA esto favorece un diseño basado en **eventos objetivos de pago** y no en "estrellas".

### Cited Findings

**Sesgo de reciprocidad y represalia**
- Bolton et al. (2013) muestran que en eBay "prácticamente todas las transacciones son (+,+) o (−,−)" y que los vendedores dejaban negativas en represalia el mismo día o al siguiente de recibir una negativa; el miedo a la represalia disuadía a los compradores de calificar honestamente — [Tadelis, "Reputation and Feedback Systems in Online Platform Markets", Annual Review of Economics 2016 (PDF)](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- eBay en 2008 restringió a los vendedores a dejar solo feedback positivo o ninguno, eliminando la represalia; Klein et al. (2015) encontraron un aumento significativo de la satisfacción del comprador (medida con DSR) sin aumento de salida de vendedores — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Fradkin et al. (2015), en experimentos en Airbnb deshabilitando la represalia (revelación simultánea), confirman que la represalia causa sesgo, pero "la magnitud de este sesgo es menor que la causada por la falta de incentivos para dejar feedback veraz" — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Resnick & Zeckhauser (eBay): solo 60.7% de compradores y 51.7% de vendedores dejaban feedback; las calificaciones eran ~99% positivas y <1% negativas, atribuido a normas de reciprocidad ("intercambio de cortesías"), miedo a represalia y renuencia a ofender — citado en [Jøsang, Ismail & Boyd, "A survey of trust and reputation systems for online service provision", Decision Support Systems 43(2), 2007 (PDF)](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf); fuente primaria: [Resnick & Zeckhauser 2002, "Trust Among Strangers in Internet Transactions"](https://presnick.people.si.umich.edu/papers/ebayNBER/index.html).

**Inflación de calificaciones y silencio de los insatisfechos**
- Nosko & Tadelis (2015): en eBay el vendedor mediano tenía 100% positivo y la media era 99.3%, pero había "tres veces más quejas a servicio al cliente que calificaciones negativas" — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Horton & Golden (2015), oDesk: la calificación promedio subió una estrella completa entre 2007 y 2014; los contratos con <4 estrellas cayeron de 28% a 9%; solo la mitad se explica por cambio de composición — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Zervas et al. (2015): Airbnb promedia 4.7/5 y 94% de propiedades tienen ≥4.5, contra 3.8 en TripAdvisor, atribuido a "consideraciones estratégicas incentivadas por el sistema bilateral de reseñas de Airbnb" — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Dellarocas & Wood (2008): muchos compradores con mala experiencia optan por no dejar feedback, generando subreporte sistemático — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf). Marco general de los retos de los mecanismos de feedback en línea (elicitar feedback suficiente y honesto, calificaciones injustas, manipulación estratégica, pseudónimos baratos): [Dellarocas, "The Digitization of Word of Mouth: Promise and Challenges of Online Feedback Mechanisms", Management Science 2003 (PDF)](http://ccs.mit.edu/dell/digitization%20of%20word-of-mouth.pdf) — nota: el PDF no pudo descargarse en esta ronda (bucle de redirección http/https); el contenido específico se cita a través de Tadelis y Jøsang.

**Mitigación probada: métricas con datos de la plataforma, no opiniones**
- Nosko & Tadelis construyeron el "effective percent positive" (EPP) = positivos / total de transacciones (penaliza las transacciones silenciosas); la mediana pasó de 100% a 67%, revelando variación real de calidad; un experimento controlado mostró que priorizar vendedores por EPP en búsqueda aumentó significativamente la recompra — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Masterov et al. (2015): minería de texto de mensajes comprador-vendedor "revela compradores insatisfechos aunque no dejen negativa"; la recomendación es que la plataforma construya medidas de calidad "ingenierizadas" con sus propios datos — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- eBay introdujo Detailed Seller Ratings (DSR) anónimas contra las que no se puede tomar represalia; Fradkin et al. hallaron que usuarios incentivados con cupones reportan más experiencias negativas que el grupo control — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).

**Fraude y manipulación**
- Xu et al. (2015) documentan mercados centralizados de reputación falsa en Alibaba; Mayzlin et al. (2014) muestran manipulación estratégica en sitios de viajes, con "mayor concentración en calificaciones extremas en los sitios donde publicar es más barato" — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Jøsang et al. clasifican calificaciones injustas: ballot stuffing (múltiples votos de un mismo actor) y bad-mouthing; proponen filtrado endógeno (estadístico, por distribución) y exógeno (ponderar inversamente a la reputación del calificador) — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).

**Whitewashing (reingreso con identidad nueva) y cold start**
- Actores desacreditados "cambian de identidad o pseudónimo para cortar con el pasado"; el esquema de Zacharia-Moukas-Maes castiga deliberadamente a los recién llegados, con la dificultad de distinguir nuevos honestos de reincidentes — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).
- Ohlhaver, Weyl & Buterin (2022) proponen que un deudor que intente escapar "creando un Soul nuevo" carecerá de SBTs con los cuales apostar reputación, porque los SBTs no son transferibles — [DeSoc, §4.2](https://www.radicalxchange.org/updates/papers/desoc.pdf).

**Decaimiento temporal y motores de cálculo**
- La calidad del servicio cambia con el tiempo; los sistemas requieren "forgetting factors", "aging factors" o "longevity factors" para ponderar más lo reciente — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).
- Seis familias de motores de reputación: suma/promedio simple (eBay: positivos menos negativos), sistemas bayesianos (distribución beta; el score es la esperanza de la beta, "base teórica sólida"), modelos discretos, modelos de creencia (subjective logic), difusos, y de flujo (PageRank/EigenTrust) — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).

**Defensas en capas**
- Barreras financieras (comisiones de eBay elevan el costo de ballot stuffing), requisitos de antigüedad (Slashdot solo permite moderar a usuarios de larga data), supervisión manual, no publicar la fórmula exacta y, "cuando sea posible, medir contra criterios objetivos verificables en lugar de juicios subjetivos"; los autores concluyen que la robustez contra ataques "sigue sin resolverse" porque surgen ataques nuevos — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).

### Inferences
- **[inferencia de diseño]** CREDI-CEDA debe basar el puntaje en eventos objetivos y bilateralmente firmados (nota aceptada, pago confirmado, vencida, disputada) y no en calificaciones de "estrellas": es la recomendación explícita de Jøsang ("criterios objetivos") y evita de raíz el sesgo de reciprocidad documentado por Bolton/Fradkin. Si se agregan calificaciones subjetivas (p. ej., "trato" o "calidad del producto"), deben ser con revelación simultánea y solo publicarse agregadas.
- **[inferencia de diseño]** Aplicar la lógica del EPP: el denominador debe ser el total de notas emitidas/aceptadas, no solo las que tuvieron desenlace positivo; las notas que quedan "sin cerrar" tras el vencimiento cuentan en contra (análogo a las "transacciones silenciosas").
- **[inferencia de diseño]** Un motor tipo beta-reputation con factor de olvido (score = (r+1)/(r+s+2), r = eventos positivos ponderados por recencia, s = negativos) es más defendible ante un jurado técnico que un promedio simple, y da un intervalo de incertidumbre natural para cuentas con poco historial (cold start).
- **[inferencia de diseño]** Contra whitewashing: identidades nuevas arrancan en cero y sin línea de crédito recomendada ("pagar derecho de piso"), y la identidad del minorista se ancla a un identificador estable (teléfono/RFC) mediante hash con llave secreta de la plataforma (ver §4), de modo que crear una llave nueva no borra el historial ligado al identificador subyacente.

### Gaps
- No pude descargar el PDF de Dellarocas 2003 ni el de Friedman & Resnick ("The Social Cost of Cheap Pseudonyms"); el resultado de que "los recién llegados deben empezar con la reputación más baja" se cita aquí solo a través del survey de Jøsang (esquema Zacharia-Moukas-Maes), no de la fuente primaria.
- No hay estudios empíricos (encontrados en esta ronda) sobre sistemas de reputación en crédito comercial B2B informal comparables a la CEDA; toda la evidencia es de marketplaces de consumo.

---

## 2. Estándares de atestación y credenciales on-chain (EAS, VC/DID, Passport, World ID, SBT, Stellar SEPs, repos Soroban)

### Takeaway
El patrón dominante es "schema + attestation con attester/recipient/UID/expiración/revocación por el emisor, datos off-chain con hash o raíz Merkle on-chain" (EAS), y en Stellar ya existe un port de ese patrón (soroban-sas, testnet, fase MVP) además de repos de "registro de atestaciones + allowlist de emisores". Para autenticación de cuentas contrato con un backend existe SEP-45 (borrador, dic 2025); SEP-10 solo cubre cuentas G/M.

### Cited Findings

**Ethereum Attestation Service (EAS)**
- La revocabilidad "se controla a nivel de schema, que define si las atestaciones de ese tipo pueden revocarse"; la revocación actualiza el campo `revoked` a `true`; para "más control sobre quién puede revocar" se recomienda un resolver contract; casos de uso: pérdida de vigencia, corrección de errores, cambio de condiciones; el patrón de corrección es "revocar la atestación original y emitir una nueva, posiblemente referenciando el UID de la revocada" — [EAS docs, Revocation (fuente en GitHub)](https://raw.githubusercontent.com/ethereum-attestation-service/eas-docs-site/main/docs/core--concepts/revocation.md).
- Atestaciones on-chain vs off-chain: las off-chain viven "en una base de datos u otro mecanismo de almacenamiento", cuestan cero gas, dan "más control sobre la visibilidad de datos" y son "preferibles para confidencialidad"; se puede "timestampear el UID de la atestación off-chain on-chain para darle prueba verificable de existencia"; las revocaciones off-chain "requieren gestión separada"; "private data attestations": atestar "una cantidad casi infinita de datos privados atestando su raíz Merkle on-chain", habilitando divulgación selectiva de componentes — [EAS docs, Onchain vs Offchain (fuente en GitHub)](https://raw.githubusercontent.com/ethereum-attestation-service/eas-docs-site/main/docs/core--concepts/onchain-vs-offchain.md).
- SDKs: [eas-sdk](https://github.com/ethereum-attestation-service/eas-sdk) y [eas-sdk-v2](https://github.com/ethereum-attestation-service/eas-sdk-v2); contrato base [EAS.sol](https://github.com/ethereum-attestation-service/eas-contracts/blob/master/contracts/EAS.sol).

**Port a Soroban: Stellar Attestation Service (soroban-sas)**
- Workspace en Rust con tres contratos: `schema-registry` (schemas con control de propiedad), `sas` (emisión, verificación, revocación con expiración) e `indexer` (consulta por recipient o schema); "solo los emisores originales pueden revocar claims marcados como revocables"; soporta verificación off-chain "similar a EIP-712"; política de "sin recuperación administrativa"; 196 commits; estado "Phase 1 (MVP Foundation)" con beta en testnet planeada; **no desplegado en mainnet**; scripts de despliegue a testnet; sin licencia visible en el contenido revisado; docs de arquitectura, supuestos de seguridad y runbook de upgrade en `/docs` — [Soroban-Eas/soroban-sas (GitHub)](https://github.com/Soroban-Eas/soroban-sas) (fork: [Agencybuilds/soroban-sas](https://github.com/Agencybuilds/soroban-sas)).
- Otros repos Soroban relevantes (no auditados en esta ronda): "attestation registry + attester allowlist. Testnet first" — [Lafiya-contract](https://github.com/Onomebello/Lafiya-contract) (con issue abierto para exportar atestaciones como W3C VC 2.0 ancladas a estado on-chain: [issue #391](https://github.com/Lafiya-xyz/Lafiya-contract/issues/391)); y "Soroban-Identity", protocolo DID/credenciales en Soroban con múltiples forks idénticos — [Soroban-Identity](https://github.com/Fidelis900/Soroban-Identity). La existencia de muchos forks con la misma descripción sugiere proyectos de hackathon/bounty, no infraestructura madura.

**Soulbound tokens (DeSoc)**
- SBTs: "tokens no transferibles (pero posiblemente revocables por el emisor)" que codifican "compromisos, credenciales y afiliaciones", potentes cuando "los SBTs de un Soul son emitidos —o atestados— por otros Souls que son contrapartes de esas relaciones" (§3). Crédito sin colateral: "SBTs que representan credenciales educativas, historial laboral y contratos de renta podrían servir como registro persistente de historial crediticio"; "préstamos y líneas de crédito podrían representarse como SBTs no transferibles pero revocables" como "colateral reputacional no embargable" (§4.2). Privacidad: "un SBT podría almacenar datos off-chain, dejando solo el hash on-chain", con permisos separados de escritura y lectura, y ZK para probar "tengo SBTs que satisfacen la propiedad X" (§5.3, §7.1) — [Ohlhaver, Weyl & Buterin, "Decentralized Society: Finding Web3's Soul", mayo 2022 (PDF)](https://www.radicalxchange.org/updates/papers/desoc.pdf); [SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763). Estado: propuesta conceptual, no un estándar implementado.

**Human Passport (ex Gitcoin Passport)**
- Umbral: "la mayoría de los programas socios requieren un score de ~20"; filosofía de pesos: "ponderar fuertemente ciertos Stamps de alta señal humana, para que solo tengas que verificar unos pocos"; la verificación de identificación gubernamental vale 16 puntos; otros stamps de alto valor: historial de transacciones ETH, historial NFT, staking de GTC — [Human Passport KB, "Scoring 20, for humans"](https://support.passport.xyz/passport-knowledge-base/using-passport/scoring-20-for-humans); pesos detallados en [Passport Stamp Weights](https://support.passport.human.tech/stamps/stamp-weights) (no descargado en esta ronda).

**World ID (Worldcoin)**
- A abril de 2026 World reporta "más de 18 millones de personas verificadas en 160 países"; acciones regulatorias: Kenia pausó verificación biométrica (2023), India detuvo registros (2023), Francia lo retiró (2023), España detuvo operaciones y ordenó borrado (2024), Portugal prohibió recolección (2024), Hong Kong ordenó cese (2024), Alemania ordenó borrado (2024), Brasil prohibió operaciones (ANPD, 2025), Indonesia suspendió (2025), Filipinas detuvo (NPC, 2025), Tailandia cerró y ordenó borrado (2025); críticas centrales: recolección de iris sin consentimiento informado significativo, incentivos en cripto a poblaciones de bajos ingresos, y el consentimiento para biometría debe ser "libre, informado e inequívoco" (ANPD) — [Rest of World, 27 abr 2026](https://restofworld.org/2026/sam-altman-worldcoin-zoom-tinder-partnerships/).

**Stellar: SEPs relevantes**
- SEP-45 "Stellar Web Authentication for Contract Accounts": estado **Draft** v0.1.1 (actualizado 2025-12-16); autentica usuarios que controlan cuentas contrato (`C...`) ante servicios web (ejemplo: subir KYC a un anchor); "SEP-10 solo soporta cuentas G y M", así que un servicio que atienda ambos tipos debe implementar ambos SEPs; flujo: el cliente pide authorization entries al `WEB_AUTH_FOR_CONTRACTS_ENDPOINT` (stellar.toml), el servidor devuelve entries XDR con invocaciones a `web_auth_verify` en un contrato publicado como `WEB_AUTH_CONTRACT_ID`, el cliente firma y el servidor valida simulando la transacción (footprint read_write limitado a nonces) y emite un JWT con `iss`, `sub`, `iat`, `exp` y `home_domain`; nonce contra replay y expiración por ledger; no menciona passkeys/secp256r1 — [SEP-0045 (stellar-protocol)](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0045.md). Implementación Rust: [stellar-agent-sep45](https://docs.rs/stellar-agent-sep45/latest/stellar_agent_sep45/).
- Guía oficial de smart wallets / cuentas contrato: [Stellar Docs, Smart wallets](https://developers.stellar.org/docs/build/guides/contract-accounts/smart-wallets).

### Inferences
- **[inferencia de diseño]** El "schema" de CREDI-CEDA es una nota de crédito bipartita, no una atestación unilateral: EAS/soroban-sas asumen un solo attester y un recipient. Se puede reutilizar el vocabulario (schema UID, attester, recipient, expiration, revocable, refUID) pero el contrato propio debe exigir **dos** `require_auth` (bodega y minorista) para pasar a "aceptada". Conviene no depender de soroban-sas en el MVP (fase MVP, sin mainnet, sin licencia visible), sino copiar su patrón de allowlist de emisores.
- **[inferencia de diseño]** Regla EAS de corrección ("revocar + nueva referenciando el UID") aplica tal cual: nunca editar una nota; toda corrección es un evento nuevo que referencia `note_id`.
- **[inferencia de diseño]** SEP-45 es la pieza correcta para que el minorista (con smart wallet/passkey, cuenta `C...`) se autentique ante el backend que guarda los datos personales off-chain; en el MVP basta con firma de challenge simple, dejando SEP-45 para producción porque aún es borrador.
- **[inferencia de diseño]** World ID es un antipatrón para CEDA por riesgo regulatorio y reputacional (biometría, prohibiciones en Brasil/España/Portugal); la unicidad de personas se resuelve mejor con el registro de bodegas verificadas y la vinculación teléfono/RFC con hash con llave (ver §4-5).

### Gaps
- W3C Verifiable Credentials 2.0 / DIDs no se descargaron en esta ronda; no verifiqué su estado actual ni detalles de Data Integrity proofs. Trátese como "estándar de exportación a evaluar", no como pieza del MVP.
- No verifiqué contenidos de SEP-10 ni SEP-12 en esta ronda (solo la afirmación de SEP-45 de que SEP-10 cubre cuentas G/M y el caso de uso KYC).
- No revisé las reglas de deduplicación ni la caducidad (¿90 días?) de los stamps de Human Passport.

---

## 3. Implementaciones de credit scoring descentralizado: estado 2026 y lecciones

### Takeaway
Casi todos los "credit scores" cripto (Spectral MACRO, Cred Protocol, RociFi NFCS, Providence, ChainAware) puntúan **historial on-chain de wallets en DeFi**, sin KYC, con sesgo de selección por opt-in y varios dormidos; los protocolos que sí financian actividad real (Goldfinch, Huma/Arf, Maple, TrueFi) **no** usan scoring algorítmico sino evaluación humana/institucional, capital de primera pérdida y KYC/KYB. Ninguno resuelve el caso CEDA: crédito comercial off-chain entre partes conocidas, con datos que nacen fuera de la cadena.

### Cited Findings
- Comparativa (blog del proveedor ChainAware, 27 jun 2026 — fuente interesada): **Spectral** = "Multi-Asset Credit Risk Oracle" (MACRO) sobre transacciones DeFi, sin KYC, "solo ETH y produce un número, no una decisión de préstamo"; **Cred Protocol** = historial de préstamos, ratios deuda/colateral y liquidaciones en Aave/Compound/MakerDAO, sin KYC, activo (~3 años) con endpoints MCP; **RociFi** = Non-Fungible Credit Score (NFCS) 1–10 en NFT no transferible, Polygon, "actividad on-chain limitada desde 2023" (dormido), con "sesgo de selección" por opt-in; **TrueFi** = reputación on-chain + KYC off-chain + votación de gobernanza TRU, activo desde nov 2020, "barreras geográficas, de identidad y regulatorias"; **Maple** = due diligence off-chain por pool delegates, KYC institucional, "la suscripción manual no escala"; **Providence** (Andre Cronje) = 20 cadenas, sin KYC, estado "incierto" — [ChainAware, DeFi Credit Score Platforms Compared](https://chainaware.ai/blog/defi-credit-score-comparison/).
- Spectral: perfil de inversión (General Catalyst) y cobertura de prensa la describen como "programmable creditworthiness"; no encontré documentación primaria actualizada de MACRO en esta ronda — [General Catalyst](https://www.generalcatalyst.com/stories/our-investment-in-spectral-building-programmable-creditworthiness); [Upgraded Points](https://upgradedpoints.com/news/spectral-finance/).
- **Goldfinch** ("trust through consensus"): el protocolo "no confía en ningún Backer o Auditor individual, confía en" sus acciones agregadas; Backers aportan capital junior de primera pérdida a pools de prestatarios específicos; Liquidity Providers aportan capital senior que se asigna automáticamente según participación de Backers (modelo de apalancamiento: "cuando más Backers aportan a un Borrower Pool, el Senior Pool aumenta la razón de apalancamiento"); Auditors "seleccionados aleatoriamente" que apuestan GFI votan para aprobar prestatarios ("a junio de 2021 el rol de Auditor aún no está activo"); resistencia Sybil vía Unique Identity (UID), un NFT de identidad con KYC/KYB "sin almacenar datos personales identificables" on-chain; documentación corresponde a V1 (whitepaper v1.1, jul 2021) — [Goldfinch Docs, Goldfinch V1 Overview](https://docs.goldfinch.finance/goldfinch/goldfinch-v1/goldfinch-overview).
- **Huma Finance** (PayFi): financia flujos de pago (tarjetas, trade finance, remesas) con stablecoins; tras fusionarse con Arf en abril de 2024 superó "US$1.8 mil millones en transacciones de financiamiento de pagos"; operaba en Scroll con expansión planeada a **Stellar** y Solana; menciona inversión de US$10 millones de la Stellar Development Foundation vía Arf — [Huma blog, 11 sep 2024](https://blog.huma.finance/huma-raises-38m-to-hyper-scale-its-payfi-network). El post no describe metodología de evaluación crediticia ni tasas de incumplimiento.
- SBT como historial crediticio: la propuesta DeSoc de representar préstamos como SBTs revocables y usar historial no transferible como "colateral reputacional" sigue siendo conceptual — [DeSoc §4.2](https://www.radicalxchange.org/updates/papers/desoc.pdf).

### Inferences
- **[inferencia]** La lección transversal: los scores puramente algorítmicos sobre datos on-chain no han producido crédito real a escala; los que sí prestan (Goldfinch, Huma, Maple) combinan (a) emisores/evaluadores identificados y responsables, (b) capital en riesgo de quien avala y (c) KYC/KYB con datos personales fuera de la cadena. CREDI-CEDA encaja en esa segunda familia: la bodega es el "Backer" que ya pone capital en riesgo al fiar mercancía, y su firma es la señal de calidad.
- **[inferencia]** El sesgo de selección por opt-in (RociFi) también amenaza a CREDI-CEDA: si solo los buenos pagadores acumulan historial, el sistema no distingue "nuevo" de "malo". Mitigación en §5: el denominador incluye todas las notas aceptadas, y las bodegas registran también vencidas/incumplidas.
- **[inferencia]** El pitch puede citar Huma/Arf como validación de que Stellar ya aloja financiamiento de cuentas por cobrar reales (US$1.8B), diferenciando: CREDI-CEDA no mueve dinero on-chain en el MVP, solo el historial verificable.

### Gaps
- No encontré fuentes primarias actualizadas (2025-2026) de Spectral, Cred Protocol, RociFi, Masa Finance, Credora ni Centrifuge; el estado "activo/dormido" proviene de un blog de competidor y debe tratarse con cautela.
- El reporte de Messari sobre Huma devolvió 403; no verifiqué "Huma 2.0 permissionless", evaluation agents, tranches ni tasas de incumplimiento.
- No verifiqué el estado 2026 de Goldfinch (posibles defaults reportados en 2022-2023, migración a V2/"Goldfinch Prime"); la doc citada es V1 (2021).

---

## 4. Técnicas de privacidad aplicables (hashes con llave, commitments, SD-JWT/BBS+, ZK en Soroban, crypto-shredding, pseudónimos)

### Takeaway
La EDPB (Guidelines 02/2025 v2.0, adoptadas 7 jul 2026) fija el estándar práctico: datos hasheados/cifrados siguen siendo personales; on-chain solo debe ir un puntero, un hash **con llave o sal secreta** o un commitment criptográfico, con el dato real off-chain y borrable; los hashes sin sal/llave "no deben considerarse suficientes". SD-JWT (RFC 9901, nov 2025) ofrece divulgación selectiva estándar pero **sin** pruebas de rango; para "≥N notas pagadas y 0 incumplimientos" sin revelar detalle se necesita ZK, que en Stellar es viable desde Protocol 22 (BLS12-381) pero es material de producción, no de MVP.

### Cited Findings

**EDPB Guidelines 02/2025 (v2.0, adoptadas 7 de julio de 2026)**
- "Los datos personales cifrados siguen siendo datos personales" y los hasheados también (§4.2, párr. 51-52); recomendación 2 (párr. 109): almacenar "cualquier dato personal adicional off-chain"; §4.2 párr. 54: on-chain solo "una forma destinada primordialmente a funcionar como prueba de existencia (p. ej., un puntero, un compromiso criptográfico o un hash generado con una función hash con llave)", con los datos "fuera de la blockchain ... asegurando alto nivel de confidencialidad" — [EDPB Guidelines 02/2025 v2.0 (PDF)](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf).
- Tres técnicas: (A) cifrado con destrucción de llave, aceptable pero "incluso el cifrado de última generación perfectamente implementado será superado por el tiempo si la blockchain se retiene indefinidamente" (párr. 51); (B) hash con sal o llave secreta "generada aleatoriamente y de tamaño suficiente", verificable solo por quien tiene el dato original, aceptable tras borrar llave/sal, con la advertencia de que "los hashes sin sal o sin llave no deben, en general, considerarse suficientes" (párr. 52); (C) commitments criptográficos, los más eficaces: "una vez borrados el dato original y su witness, el commitment que persiste en la blockchain es inútil" (párr. 53) — [EDPB 02/2025 v2.0](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf).
- Gobernanza: "las organizaciones deberían favorecer blockchains permisionadas" (párr. 40); "las blockchains públicas solo deben emplearse si el acceso público es necesario para al menos uno de los fines" (párr. 49); si no existe solución técnica para respetar el plazo de retención, "no debe almacenarse ningún dato personal en la cadena" (recomendación 11, párr. 119-120); datos identificables on-chain solo con justificación y DPIA (párr. 55) — [EDPB 02/2025 v2.0](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf). Versión inicial en consulta (abril 2025): [PDF v1](https://www.edpb.europa.eu/system/files/2025-04/edpb_guidelines_202502_blockchain_en.pdf); resumen práctico: [Bird & Bird](https://www.twobirds.com/en/insights/2026/netherlands/edpb-adopts-final-guidelines-on-blockchain-and-personal-data-a-practical-guide-for-organisations).
- Las guías **no** cuantifican el riesgo de fuerza bruta sobre datos de baja entropía; solo exigen sal/llave "de tamaño suficiente" (párr. 52) — [EDPB 02/2025 v2.0](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf).

**Divulgación selectiva: SD-JWT (RFC 9901)**
- Publicado en noviembre de 2025, Standards Track (Fett, Yasuda, Campbell); cada claim ocultable se reemplaza por un digest de una "disclosure" = (sal aleatoria única por claim, nombre, valor); "para asegurar que los Verifiers no puedan adivinar valores en claro de los elementos no divulgados, se usa una sal adicional" (§1.4); sal recomendada: 128 bits de aleatoriedad criptográfica (§4.2.1); "decoy digests" para ocultar el número real de claims (§4.2.5); Key Binding (SD-JWT+KB) con `nonce`, `aud`, `iat` y `sd_hash` firmados por la llave del Holder (§3.3); **no soporta predicados ni pruebas de rango**: un claim se revela completo o se oculta; riesgo de enlazabilidad por colusión emisor-verificador, mitigado con "emisión por lotes de muchos SD-JWTs" (§10.1) — [RFC 9901](https://www.rfc-editor.org/rfc/rfc9901.html); [RFC Editor info](https://www.rfc-editor.org/info/rfc9901/); resumen: [Nat Sakimura, nov 2025](https://www.sakimura.org/en/2025/11/7764/). La EUDI Wallet lo referencia — [issue eu-digital-identity-wallet](https://github.com/eu-digital-identity-wallet/eudi-doc-standards-and-technical-specifications/issues/28).

**ZK en Stellar**
- Protocol 22 añadió BLS12-381 vía CAP-0059 ("11 nuevas host functions"), habilitando zk-SNARKs ("un prover demuestra que posee cierta información ... sin revelar la información subyacente"), con zkLogin/zkEmail como ejemplos; testnet 12 nov 2024, voto de mainnet 5 dic 2024; no menciona Groth16 ni costos — [Stellar, Announcing Protocol 22](https://stellar.org/blog/developers/announcing-protocol-22); issue de origen: [rs-soroban-env #779](https://github.com/stellar/rs-soroban-env/issues/779). Herramientas comunitarias (no verificadas en esta ronda): [soroban-verifier-gen](https://deepwiki.com/mysteryon88/soroban-verifier-gen), [zk-soroban-examples](https://deepwiki.com/zk-examples/zk-soroban-examples).
- EAS "private data attestations" (raíz Merkle on-chain, hojas reveladas selectivamente) es la alternativa no-ZK más barata a divulgación selectiva — [EAS docs](https://raw.githubusercontent.com/ethereum-attestation-service/eas-docs-site/main/docs/core--concepts/onchain-vs-offchain.md).
- DeSoc: ZK para "tengo SBTs que satisfacen la propiedad X" y "designated-verifier proofs" para impedir la retransmisión de pruebas a terceros no autorizados (§7.1) — [DeSoc](https://www.radicalxchange.org/updates/papers/desoc.pdf).

### Inferences
- **[inferencia de diseño — riesgo de fuerza bruta]** Un número celular mexicano tiene 10 dígitos: el espacio es de 10^10 valores, enumerable por completo con hardware común; un RFC (13 caracteres, estructura predecible) tiene poca entropía adicional. Por tanto `sha256(telefono)` on-chain es re-identificable y, según EDPB párr. 52, no suficiente. Diseño: `subject_id = HMAC-SHA256(k_plataforma, telefono_normalizado)` con `k_plataforma` de 256 bits guardada solo por el backend (o en HSM/KMS). Borrar `k_plataforma` o su entrada por-sujeto equivale a "crypto-shredding" del vínculo. Alternativa más fuerte (EDPB párr. 53): commitment `C = H(telefono || r)` con `r` de 256 bits guardado off-chain por sujeto; borrar `r` inutiliza `C`.
- **[inferencia de diseño — pseudónimos por contraparte vs global]** ID global (`subject_id` único) permite agregar historial entre bodegas (el objetivo del producto) pero hace enlazables todas las notas del minorista para cualquier observador de la cadena. ID por contraparte (`HMAC(k, telefono || bodega_id)`) rompe la enlazabilidad pública pero solo la plataforma puede agregar (recentralización). Opción intermedia recomendada para producción: ID global **rotado por época** (p. ej., mensual) con tabla de vinculación off-chain, o agregado servido solo off-chain con autorización firmada; el MVP puede usar ID global y documentar el trade-off.
- **[inferencia de diseño — qué va on-chain]** Siguiendo EDPB párr. 54: on-chain solo `note_id` (hash), `issuer_id`, `subject_id` (HMAC), `amount_bucket`, `due_ts`, `status`, `doc_commit` (commitment del JSON de la nota), y hashes de evidencias; nada de nombres, montos exactos, RFC, dirección ni productos. Esto también reduce la apariencia de "buró": lo público no permite reconstruir el expediente sin la plataforma.
- **[inferencia de diseño — ZK]** "Tengo ≥N notas pagadas y 0 incumplimientos" es una prueba de rango/agregado que SD-JWT no puede expresar; ZK (Groth16 sobre BLS12-381) sí, pero implica circuito, trusted setup y verificador on-chain: material de roadmap (producción). Para el MVP, el agregado lo emite el backend firmado (o el contrato lo calcula sobre contadores públicos por `subject_id`), y la privacidad viene de que el `subject_id` no es re-identificable sin la llave.
- **[inferencia de diseño — permisionada vs pública]** EDPB prefiere cadenas permisionadas; Stellar es pública. Justificación para el DPIA-equivalente: (1) el acceso público a la cadena es necesario para que cualquier bodega verifique sin confiar en la plataforma (párr. 49), (2) on-chain no hay datos personales en claro, solo commitments (párr. 53-54). Documentarlo en el README.

### Gaps
- No verifiqué BBS+ (estado del draft IETF/CFRG "BBS Signature Scheme" ni W3C Data Integrity BBS Cryptosuite) en esta ronda; se menciona solo como alternativa con unlinkability nativa.
- No encontré cifras de costo (instrucciones/fees) de verificar Groth16 en Soroban ni benchmarks de pruebas de rango; tampoco cuál protocolo (23/24/25) está vigente en mainnet en sep 2026.
- No hay guía mexicana (INAI/LFPDPPP) equivalente a la EDPB sobre blockchain localizada en esta ronda; se usa EDPB como referencia técnica de "estado del arte", no como norma aplicable.

---

## 5. Resistencia Sybil y calidad de datos en un esquema bipartito (bodega + cliente)

### Takeaway
En CREDI-CEDA el ataque relevante no es "una persona, mil wallets" sino **colusión bodega-cliente** para fabricar historial. Las defensas con respaldo en la literatura y en implementaciones son: registro verificado de emisores (allowlist), ponderación por diversidad de contrapartes (descuento por correlación, DeSoc), capital/stake en riesgo del emisor (Goldfinch), ventanas de disputa, evidencia externa de pago (commitment de referencia SPEI/CEP), reputación bidireccional y métrica con denominador completo (EPP).

### Cited Findings
- Jøsang: ballot stuffing = múltiples calificaciones de un mismo actor; defensas: costo por transacción (comisiones eBay), antigüedad mínima para calificar (Slashdot), filtrado exógeno por reputación del calificador, y preferir "criterios objetivos verificables" — [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).
- DeSoc: mitigar Sybil "revisando correlaciones entre los SBTs de los Souls que apoyan un voto y aplicando menor peso a los altamente correlacionados"; señales "de una base más diversa de participantes" valen más (§4.5) — [DeSoc](https://www.radicalxchange.org/updates/papers/desoc.pdf).
- Goldfinch: quien avala (Backer) pone capital de primera pérdida; Auditors aleatorios con stake; UID con KYC/KYB sin PII on-chain — [Goldfinch V1 Overview](https://docs.goldfinch.finance/goldfinch/goldfinch-v1/goldfinch-overview).
- Human Passport: pesos "por alta señal humana" (la ID gubernamental vale 16 de los ~20 necesarios), es decir, el peso refleja el costo de falsificar la señal — [Human Passport KB](https://support.passport.xyz/passport-knowledge-base/using-passport/scoring-20-for-humans).
- Patrón "registro de atestaciones + allowlist de emisores" ya existe en Soroban (testnet) — [Lafiya-contract](https://github.com/Onomebello/Lafiya-contract); soroban-sas restringe la revocación al emisor original — [soroban-sas](https://github.com/Soroban-Eas/soroban-sas).
- Nosko & Tadelis: usar el total de transacciones como denominador (EPP) neutraliza el inflado por selección de qué se reporta — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).
- Tadelis: los sistemas bilaterales generan sesgo estratégico (Airbnb) y la anonimización/revelación simultánea lo reduce — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf).

### Inferences
- **[inferencia de diseño — modelo de amenazas]** (1) Bodega real + cliente ficticio: la bodega emite y "confirma pagadas" notas a un teléfono que controla → historial falso para luego obtener crédito en otras bodegas. (2) Cliente real + bodega cómplice o falsa. (3) Bodega que marca incumplimiento por venganza. (4) Cliente que rota teléfono/llave para escapar (whitewashing). (5) Cliente que reclama "pagado" sin pagar.
- **[inferencia de diseño — defensas por capa]**
  - *Registro de emisores*: solo bodegas verificadas (allowlist administrada en el MVP por la plataforma; en producción por FICEDA/asociación de comerciantes, con `add_issuer/remove_issuer` gobernado) pueden crear notas. Cubre (2).
  - *Diversidad de contrapartes*: el agregado publicado incluye `n_issuers_distintos`; el score descuenta historial concentrado en un solo emisor (p. ej., cap del 40% del peso total por emisor, o factor DeSoc de correlación). Cubre (1): un solo emisor cómplice no basta.
  - *Reputación bidireccional del emisor*: por bodega se publica tasa de disputas perdidas, tasa de notas confirmadas fuera de plazo y concentración de clientes; un emisor con patrones anómalos pierde peso en el score de sus clientes (filtrado exógeno de Jøsang). Cubre (1) y (3).
  - *Stake/bono del emisor (producción)*: depósito en XLM/USDC que se penaliza si un árbitro confirma notas fraudulentas; análogo al capital de primera pérdida de Goldfinch. En el MVP no hay dinero on-chain, así que se presenta como roadmap.
  - *Ventanas de disputa y estados intermedios*: `paid_claimed` requiere confirmación de la contraparte; `defaulted` solo tras `due + gracia` y con ventana en la que el minorista puede disputar; ambas partes firman la aceptación. Cubre (3) y (5).
  - *Evidencia externa*: `evidence_commit = H(referencia_SPEI/CEP || r)` adjunto al `paid_claimed`; en producción, oráculo que valide la referencia contra Banxico CEP. Cubre (5) y refuerza (1). (El detalle de CEP/CoDi no se investigó en esta ronda.)
  - *Antigüedad y volumen mínimos*: el agregado se marca como "insuficiente" con < 3 notas cerradas o < 2 emisores distintos o < 60 días de historial (umbrales propuestos, ajustables). Cubre (4) parcialmente y evita cold-start engañoso.
  - *Anclaje de identidad*: `subject_id` derivado de teléfono/RFC con HMAC (ver §4) para que cambiar de llave no cree un sujeto nuevo; un teléfono nuevo sí lo crea, y por eso el historial nuevo arranca en cero.
- **[inferencia de diseño — regla de agregación propuesta]** Publicar (o servir bajo autorización) solo agregados: `notas_aceptadas`, `pagadas_a_tiempo`, `pagadas_tarde`, `vencidas_abiertas`, `incumplidas`, `disputas_abiertas/resueltas`, `n_issuers`, `primera_nota_ts`, `ultima_nota_ts`, `bucket_monto_max`. Score orientativo (no "calificación crediticia" en el sentido de la LRSIC): beta con olvido, r = Σ w_t·(a tiempo) + 0.5·Σ w_t·(tarde), s = Σ w_t·(incumplida) + 0.5·Σ w_t·(vencida abierta), w_t = 2^(−Δdías/180); multiplicar por factor de diversidad min(1, n_issuers/3). Presentarlo como semáforo (verde/amarillo/rojo + "historial insuficiente") para no imitar un score de buró.

### Gaps
- No encontré literatura empírica sobre colusión emisor-cliente en registros de crédito comercial (equivalente a "fake reputation markets" de Xu et al.) fuera de marketplaces de consumo.
- No verifiqué en esta ronda cómo funciona la consulta de CEP de Banxico ni si existe API programática; la evidencia de pago se deja como commitment del comprobante.

---

## 6. Recomendación de diseño: máquina de estados, on-chain vs off-chain, eventos, consentimiento y roadmap MVP → producción

### Takeaway
Un contrato Soroban propio y pequeño (no un fork de soroban-sas) con una máquina de estados de nota firmada por dos partes, solo commitments y agregados on-chain, datos personales off-chain borrables (crypto-shredding), autorizaciones de lectura firmadas con vencimiento y nonce (patrón KB-JWT/SEP-45), y un roadmap explícito: passkeys + SEP-45 + registro de emisores gobernado + ZK de rango + convenio con una SIC.

### Cited Findings (bases reutilizadas)
- Patrón schema/attester/recipient/expiration/revocable/refUID y "revocar + nueva referenciando UID" — [EAS docs](https://raw.githubusercontent.com/ethereum-attestation-service/eas-docs-site/main/docs/core--concepts/revocation.md); raíz Merkle para datos privados — [EAS docs](https://raw.githubusercontent.com/ethereum-attestation-service/eas-docs-site/main/docs/core--concepts/onchain-vs-offchain.md).
- On-chain solo puntero/commitment/keyed hash; borrado por destrucción de llave/sal/witness — [EDPB 02/2025 v2.0, párr. 51-54](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf).
- Token de presentación con `nonce`, `aud`, `iat` firmado por el titular (KB-JWT) — [RFC 9901 §3.3](https://www.rfc-editor.org/rfc/rfc9901.html); JWT con `exp` y nonce anti-replay para cuentas contrato — [SEP-45](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0045.md).
- Allowlist de emisores y revocación solo por emisor — [soroban-sas](https://github.com/Soroban-Eas/soroban-sas), [Lafiya-contract](https://github.com/Onomebello/Lafiya-contract).
- Métrica con denominador completo y decaimiento — [Tadelis 2016](https://faculty.haas.berkeley.edu/stadelis/Annual_Review_Tadelis.pdf), [Jøsang et al. 2007](https://people.cs.vt.edu/~irchen/5984/pdf/Josang-DSS07.pdf).
- BLS12-381 disponible desde Protocol 22 para ZK futuro — [Stellar Protocol 22](https://stellar.org/blog/developers/announcing-protocol-22).

### Inferences (todo lo siguiente es **[inferencia de diseño]**)

**6.1 Máquina de estados de la nota (`Note`)**

| Estado | Quién transiciona → siguiente | Regla |
|---|---|---|
| `Created` | bodega (`issuer`) crea; solo si `issuer ∈ allowlist` | guarda `note_id`, `subject_id`, `amount_bucket`, `due_ts`, `doc_commit` |
| `Created → Accepted` | minorista (`subject`) firma `accept(note_id)` | `require_auth(subject)`; sin aceptación en `accept_window` (p. ej., 72 h) → `Cancelled` automático al tocar |
| `Created → Cancelled` | bodega, solo antes de `Accepted` | |
| `Accepted → PaidClaimed` | minorista `claim_paid(note_id, evidence_commit)` | opcional; puede saltarse si la bodega confirma directo |
| `Accepted/PaidClaimed → Paid` | bodega `confirm_paid(note_id)` | registra `paid_ts`; `on_time = paid_ts ≤ due_ts` |
| `Accepted → Overdue` | cualquiera (`touch(note_id)`) cuando `ledger_ts > due_ts` | transición mecánica, sin juicio |
| `Overdue → Defaulted` | bodega `mark_default(note_id)` solo si `ledger_ts > due_ts + grace` (p. ej., 30 días) | abre ventana de disputa de `dispute_window` (p. ej., 15 días) |
| `PaidClaimed → Disputed` | bodega `dispute(note_id, reason_code)` si no reconoce el pago | |
| `Overdue/Defaulted → Disputed` | minorista `dispute(note_id, reason_code)` dentro de ventana | |
| `Disputed → Paid / Defaulted / Cancelled` | MVP: acuerdo mutuo (ambas firmas); producción: `arbiter` (asociación/FICEDA) `resolve(note_id, outcome)` | toda resolución referencia `note_id` (patrón refUID) |
| `Accepted → Cancelled` | mutuo (dos firmas) | p. ej., devolución de mercancía |

Invariantes: nunca se edita una nota; cada transición emite evento con `ledger_ts`; `Paid`, `Defaulted` y `Cancelled` son terminales salvo `Disputed` dentro de ventana; `Defaulted` solo puede existir tras `Overdue` + gracia (evita venganza inmediata, mitiga amenaza 3).

**6.2 Qué va on-chain vs off-chain**

- On-chain (storage del contrato + eventos): `note_id` (= `sha256(doc_canónico || r_doc)`), `issuer` (Address de la bodega), `subject_id` (`BytesN<32>` = HMAC del teléfono/RFC), `amount_bucket` (enum: `<1k`, `1k-5k`, `5k-20k`, `20k-50k`, `>50k` MXN), `created_ts`, `due_ts`, `status`, `evidence_commit` opcional, contadores agregados por `subject_id` y por `issuer`, allowlist de emisores, tabla de consentimientos.
- Off-chain (backend, cifrado, borrable): nombre/razón social, teléfono, RFC, dirección, bodega/local, monto exacto, productos, PDF de la nota, comprobante de pago, `r_doc` y sal/llave por sujeto. Borrado = eliminar registro + `r_doc` + llave por sujeto (EDPB párr. 52-53): los commitments on-chain quedan inservibles.
- Regla de oro para el README: "nada en la cadena permite, por sí solo, saber quién es el minorista ni cuánto debe".

**6.3 Esquema de eventos (topics Soroban)**

`note_created(note_id, issuer, subject_id, amount_bucket, due_ts, doc_commit)` · `note_accepted(note_id, subject_id)` · `payment_claimed(note_id, evidence_commit)` · `payment_confirmed(note_id, paid_ts, on_time: bool)` · `note_overdue(note_id)` · `note_defaulted(note_id)` · `note_disputed(note_id, by, reason_code)` · `dispute_resolved(note_id, outcome, resolver)` · `note_cancelled(note_id, by)` · `consent_granted(subject_id, reader, scope, exp_ts, nonce)` · `consent_revoked(subject_id, reader)` · `issuer_added(issuer)` / `issuer_removed(issuer)`.

**6.4 Consentimiento para lecturas de terceros (espejo del art. 28 LRSIC, cubierto en ronda anterior)**

- El agregado de un `subject_id` solo se entrega a un `reader` (otra bodega) si existe `Consent{subject_id, reader, scope, exp_ts, nonce}` firmado por el minorista (`require_auth(subject)`) y no vencido; `scope` = {`aggregate_only`} en MVP; vencimiento corto (p. ej., 30 días) y revocable; cada lectura emite evento `aggregate_read(subject_id, reader)` para dejar rastro auditable de quién consultó. Esto replica el mecanismo de "autorización expresa con vigencia" de las SIC sin operar como una, y usa el mismo patrón de `nonce/aud/exp` que KB-JWT y SEP-45.
- Alternativa MVP más simple si el tiempo aprieta: el contrato guarda el consentimiento y el backend (autenticado por firma del `reader`) sirve el agregado; el contrato no calcula nada.

**6.5 Roadmap**

| Fase | Contenido | Justificación |
|---|---|---|
| **MVP (hackathon, testnet)** | Un contrato `credi_ceda` con allowlist admin, máquina de estados 6.1, eventos 6.3, consentimiento 6.4; `subject_id` por HMAC en backend; agregados calculados off-chain sobre eventos (o contadores on-chain); UI con semáforo; datos personales en SQLite/Postgres cifrado; sin ZK, sin dinero | Menor superficie; cumple EDPB párr. 54 y las restricciones LRSIC; demo verificable en Stellar Expert |
| **Producción 1** | Passkeys/smart wallets para minoristas (cuentas `C...`) + SEP-45 para autenticar contra el backend (cuando salga de borrador); registro de emisores gobernado por FICEDA/asociación (`add_issuer` multi-firma); árbitro de disputas; rotación de `subject_id` por época; evidencia de pago validada contra referencia bancaria | SEP-45 es aún Draft v0.1.1 (dic 2025); reduce dependencia de la plataforma |
| **Producción 2** | Bono/stake de emisores; reputación pública de emisores; exportación del historial como SD-JWT (RFC 9901) para verificadores fuera de Stellar; pruebas ZK de rango ("≥N pagadas, 0 incumplidas") con verificador Groth16 sobre BLS12-381 (Protocol 22+); convenio con una SIC autorizada para reporte formal | Solo aquí tiene sentido la complejidad ZK; evita la trampa de los scores DeFi sin uso real |

**6.6 Por qué blockchain y no una base de datos (respuesta corta para el pitch)**
- Las bodegas compiten entre sí y no confían en una base central operada por un tercero (o por una bodega): la cadena pública da a cada bodega verificación independiente de que la nota existió, fue aceptada por el minorista y cerró como se dice, sin pedir permiso a la plataforma (necesidad de acceso público, EDPB párr. 49). El minorista, además, es dueño portable de su historial: puede autorizar lecturas sin que la plataforma sea cuello de botella. Una base de datos central recrearía exactamente el buró privado que la LRSIC regula.

### Gaps
- Valores de ventanas (72 h aceptación, 30 días de gracia, 15 días de disputa) y buckets de monto son propuestas sin fuente; deben validarse con la "experiencia de José" sobre plazos reales de fiado en la CEDA.
- No verifiqué límites prácticos de Soroban (tamaño de storage persistente por entrada, TTL/rent, costo por evento) para contadores por sujeto; Claude Code debe medirlo en testnet.
- La compatibilidad exacta con art. 28 LRSIC (formato de autorización, vigencia) debe cruzarse con las notas legales de la ronda anterior; aquí solo se propone el mecanismo técnico.
