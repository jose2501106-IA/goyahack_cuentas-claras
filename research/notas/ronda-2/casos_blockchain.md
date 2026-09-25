# Casos de éxito y fracaso de blockchain en el mundo (trade finance, cadena de suministro, agro, comercio informal, stablecoins en LatAm) — notas para CREDI-CEDA

Fecha de corte de la investigación: 25 de septiembre de 2026. Convenciones: toda cifra lleva fecha y fuente; las cifras que la propia empresa reporta se marcan como **[autoreportado]**; los montos se dejan en la moneda original de la fuente (USD, AUD, EUR, GBP) porque convertir a MXN implicaría inventar un tipo de cambio. Cuando una fuente solo se conoció por el título del resultado de búsqueda (no se pudo abrir el texto completo) se marca **[solo título]**. Este bloque NO repite los precedentes de historial crediticio ya cubiertos (Kiva Protocol, Bloom, BanQu, TReDS, Tienda Pago, Rabbit, Kontempo).

---

## Pregunta 1. Fracasos empresariales y de consorcios (TradeLens, we.trade, Marco Polo, Contour, IBM Food Trust, Everledger, ASX CHESS, B3i): ¿qué razones se declararon?

### Takeaway
Ninguno de los grandes consorcios de trade finance / cadena de suministro murió por un fallo técnico de la cadena; murieron por falta de adopción de competidores ("colaboración global de la industria no alcanzada"), por no llegar a viabilidad comercial antes de agotar el capital, y —en el caso de ASX— por sobre-ingeniería de una arquitectura DLT en la que el operador seguía siendo el "árbitro final", lo que anulaba el beneficio de descentralizar. La lección repetida por la industria es: "la tecnología no fue el problema; el problema fue el modelo de negocio y la gobernanza".

### Cited Findings

**TradeLens (Maersk + IBM, logística marítima, Hyperledger Fabric, lanzado 2018, cerrado 2023)**
- Maersk anunció el 29 de noviembre de 2022 la discontinuación de TradeLens; la plataforma dejaría de operar a fines del primer trimestre de 2023. Razones textuales: "the need for full global industry collaboration has not been achieved" y la plataforma "has not reached the level of commercial viability necessary to continue work and meet the financial expectations as an independent business". El comunicado no publica métricas de miembros, puertos ni eventos rastreados — [Maersk, comunicado oficial 29-nov-2022](https://www.maersk.com/news/articles/2022/11/29/maersk-and-ibm-to-discontinue-tradelens)
- Rotem Hershko (Maersk): "TradeLens was founded on the bold vision to make a leap in global supply chain digitization as an open and neutral industry platform" — [Maersk](https://www.maersk.com/news/articles/2022/11/29/maersk-and-ibm-to-discontinue-tradelens)
- ABI Research tituló su análisis: la discontinuación "apunta a la necesidad de mayor compromiso de la industria si las iniciativas de blockchain empresarial han de tener éxito" — [ABI Research](https://www.abiresearch.com/market-research/insight/7781608-ibm-and-maersks-tradelens-platform-discont) [solo título]
- Cobertura adicional del cierre: [Supply Chain Dive](https://www.supplychaindive.com/news/Maersk-IBM-shut-down-TradeLens/637580/); [GTR](https://www.gtreview.com/news/top-stories/maersk-and-ibm-pull-the-plug-on-tradelens/); [Port de Barcelona – "cuando la tecnología no es suficiente"](https://piernext.portdebarcelona.cat/en/technology/the-closure-of-tradelens) [solo títulos]

**we.trade (consorcio bancario europeo, Hyperledger Fabric/IBM, 2017–2022)**
- we.trade colapsó aproximadamente 9 meses antes de la insolvencia de Marco Polo (febrero 2023), es decir alrededor de mayo–junio de 2022; era una plataforma de trade finance respaldada por HSBC — [Trade Finance Global, nota sobre Marco Polo](https://www.tradefinanceglobal.com/posts/marco-polo-network-runs-insolvent/)
- Futurum Group lo tituló "HSBC, IBM, and SocGen Backed Blockchain Company we.trade is Now we.broke" — [Futurum Group](https://futurumgroup.com/insights/hsbc-ibm-and-socgen-backed-blockchain-company-we-trade-is-now-we-broke/) [solo título]

**Marco Polo Network (trade finance, R3 Corda, 2017–2023)**
- Entró en insolvencia el 22 de febrero de 2023 con deudas de €5.2 millones (£4.6 M) y una brecha pasivos-activos de €2.5 millones. Detonante: cayó un acuerdo estratégico de US$12 millones con Bank of America; el tribunal notó la reticencia de BofA a invertir en blockchain tras el colapso de FTX. Bancos participantes citados: SMBC y BNP Paribas. Tecnología: R3 Corda — [Trade Finance Global, 2023](https://www.tradefinanceglobal.com/posts/marco-polo-network-runs-insolvent/)
- La misma nota lista cinco retos estructurales: resistencia a la adopción (cambios de sistemas), incertidumbre regulatoria, límites de escalabilidad, altos costos de desarrollo y falta de interoperabilidad; cita a un experto: "technology is an enabler… not the sole driver for a successful business" — [Trade Finance Global](https://www.tradefinanceglobal.com/posts/marco-polo-network-runs-insolvent/)
- Cobertura adicional: [Global Trade Leaders – "Marco Polo goes bankrupt"](https://www.globaltradeleaders.com/marco-polo-insolvency-lessons/) [solo título]

**Contour (cartas de crédito digitales, R3 Corda, consorcio de bancos, 2019–2023)**
- Ledger Insights: "Blockchain trade finance network Contour to shutter" (cierre anunciado en 2023) — [Ledger Insights](https://www.ledgerinsights.com/contour-blockchain-trade-finance-network-shutter/) [solo título]
- Trade Finance Global (8-dic-2023) lo describe como "the last-standing global trade finance project built on DLT" y extrae 5 lecciones: (1) "blockchain no es el problema" — nunca hubo reportes de que la tecnología matara a Contour, Marco Polo, we.trade o TradeLens; (2) la digitalización necesita "activistas" dentro de la comunidad, no solo tecnólogos; (3) hay que comprometerse a una pista larga: la alineación regulatoria toma mínimo 4 años y los proyectos se quedaron sin fondos antes; (4) "hay que hacerlo mejor que el papel": "paper is the most interoperable instrument we have"; (5) atraer ideas nuevas — [Trade Finance Global, dic-2023](https://www.tradefinanceglobal.com/posts/top-5-trade-lessons-from-the-contour-collapse/)
- S&P Global tituló en 2023: "Trade finance industry remains hopeful on blockchain despite failed projects" — [S&P Global Market Intelligence](https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/trade-finance-industry-remains-hopeful-on-blockchain-despite-failed-projects-72557910) [solo título]

**ASX CHESS replacement (Australia, liquidación bursátil, Digital Asset/Daml sobre VMware Blockchain, 2017–2022)**
- La revisión independiente de Accenture encontró: la DLT introdujo latencia "exacerbada con múltiples capas… en la arquitectura actual"; el software fallaba con más de 100,000 transacciones "porque los datos se quedaban sin tiempo"; Daml "may not be the most appropriate to solve for all business process, logic, and data" y aportaba "poco valor" a los participantes; el ledger VMware llegando a consenso por "slow path" impactaba latencia. Conclusión clave: el rol de ASX como árbitro final "minimizaba muchos de los beneficios de una arquitectura DLT" — [iTnews, 2022](https://www.itnews.com.au/news/accenture-report-could-end-asxs-blockchain-vision-587915)
- ASX "derecognised" aproximadamente AUD 245–255 millones (antes de impuestos) del proyecto en noviembre de 2022 — [ASIC, comunicado 26-143MR, 2026](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-143mr-asx-ordered-to-pay-205-million-penalty-for-misleading-conduct-relating-to-chess-replacement-project)
- El 3 de julio de 2026 la Corte Federal ordenó a ASX pagar una multa de AUD 20.5 millones más AUD 3 millones de costas; ASX admitió que su declaración del 10 de febrero de 2022 de que el proyecto "progresaba bien" fue engañosa (secciones 12DA y 12DB de la ASIC Act). La jueza Markovic señaló que ASX "fell short" de los estándares esperados de un operador de infraestructura crítica — [ASIC 26-143MR](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-143mr-asx-ordered-to-pay-205-million-penalty-for-misleading-conduct-relating-to-chess-replacement-project)
- Estado 2026: el reemplazo se reestructuró en dos entregas; la Release 1 (clearing) entró en producción el 20 de abril de 2026 y la Release 2 (settlement y subregistro) sigue pendiente — [ASIC 26-143MR](https://www.asic.gov.au/about-asic/news-centre/find-a-media-release/2026-releases/26-143mr-asx-ordered-to-pay-205-million-penalty-for-misleading-conduct-relating-to-chess-replacement-project)
- Cobertura: [ARN – "Misaligned views led towards $250M ASX CHESS project failure"](https://www.arnnet.com.au/article/1254533/misaligned-views-led-towards-250m-asx-chess-project-failure.html); [Finextra – ASX settles ASIC case](https://www.finextra.com/newsarticle/47917/asx-settles-legal-case-over-bungled-chess-project) [solo títulos]

**Everledger (trazabilidad de diamantes/ESG, Reino Unido–Australia, 2015–2023)**
- La subsidiaria australiana entró en administración en mayo de 2023 y la británica en liquidación. Capital levantado ≈ US$27–34 M: Serie A de US$20 M (2019, liderada por Tencent), US$7 M (2020, incl. gobierno del Reino Unido) y un acuerdo de £5.7 M (nov-2022) del que solo llegaron £1.6 M; el segundo tramo de £4.1 M no se materializó en el 1T-2023. La fundadora Leanne Kemp atribuyó el cierre a "external reasons and pressures on this investor". La nota no analiza adopción comercial — [Ledger Insights, 2023](https://www.ledgerinsights.com/everledger-bankruptcy-esg-blockchain-traceability/)
- Cobertura adicional: [Cointelegraph – "Tencent-backed Everledger collapses amid lack of funding"](https://cointelegraph.com/news/tencent-backed-everledger-collapses-amid-lack-of-funding-report); [Startup Daily](https://www.startupdaily.net/topic/business/brisbane-blockchain-provenance-startup-everledger-placed-in-administration-after-funding-evaporates/) [solo títulos]

**B3i (consorcio de seguros/reaseguros, Suiza, Corda, 2016–2022)**
- Insolvencia en julio de 2022 (nota del 28-jul-2022). Miembros fundadores/accionistas: Zurich, Swiss Re, Generali, Allianz, XL Innovate, SCOR, Aegon Blue Square, MAPFRE y Achmea. Serie A > US$20 M; Serie B a fines de 2020 (monto no revelado). Razón declarada: "was unable to close a further funding round". Sin métricas de uso publicadas. El autor observa que "consortia are notoriously hard" — [Ledger Insights, jul-2022](https://www.ledgerinsights.com/major-insurers-pull-the-plug-on-b3i-insurance-blockchain-consortium/)
- Cobertura: [Insurance Journal, 29-jul-2022](https://www.insurancejournal.com/news/international/2022/07/29/677926.htm); [Reinsurance News – "B3i fails to raise new capital"](https://www.reinsurancene.ws/b3i-fails-to-raise-new-capital-enters-insolvency/) [solo títulos]

**IBM Food Trust (trazabilidad alimentaria, Hyperledger Fabric, 2018–?)**
- La página de producto de IBM sigue en línea en 2026 — [IBM Food Trust](https://www.ibm.com/blockchain/solutions/food-trust). Los únicos materiales con métricas que aparecieron en la búsqueda son de 2018–2019 (lanzamiento comercial con Carrefour/Walmart) — [Supply Chain Dive, 2018](https://www.supplychaindive.com/news/IBM-Food-Trust-SaaS-available-Carrefour/539065/); [CIO Dive, 2018](https://www.ciodive.com/news/ibms-blockchain-platform-for-food-goes-live-and-harvests-big-customers/539096/). **No encontré anuncio oficial de cierre ni métricas 2024–2026** (ver Gaps).

### Inferences
- Patrón común a TradeLens, we.trade, Marco Polo, Contour y B3i: eran **consorcios de competidores** operados por uno de ellos (Maersk) o por una entidad financiada por ellos, sin un operador neutral con incentivo propio; el capital se agotó antes de que el efecto de red (y la regulación) llegara. La frase de Maersk "colaboración global no alcanzada" es la confesión de que los competidores no quisieron subir sus datos a la plataforma del rival.
- ASX es el caso inverso: no faltó adopción (era obligatorio para el mercado), faltó una razón para usar DLT. Si un solo actor sigue siendo "árbitro final", la cadena solo agrega latencia y complejidad — eso es lo que Accenture documentó.
- Everledger y B3i muestran que un modelo "la trazabilidad/consorcio se pagará sola después" no sobrevive a un ciclo de financiamiento adverso (2022–2023, post-FTX).
- "Por qué blockchain" que NO se sostuvo: "los competidores compartirán datos porque la cadena es neutral" (TradeLens, we.trade, Marco Polo, Contour, B3i); "la inmutabilidad justifica reemplazar un sistema central que funciona" (ASX); "la procedencia es un producto vendible por sí misma" (Everledger).
- **Lección para CREDI-CEDA**: no diseñar un consorcio de acreedores competidores que deban "compartir cartera"; diseñar un registro donde cada par comerciante-proveedor sube SU propio dato, firmado por ambos, y el beneficio es individual e inmediato (el comerciante se lleva su historial). El operador no debe ser un competidor de los usuarios (ni un banco ni un proveedor grande). Evitar, como en ASX, que la demo dependa de un "árbitro central" que haría redundante a la cadena.

### Gaps
- No obtuve métricas de TradeLens (miembros, puertos, eventos) ni las cifras de volumen de Contour/we.trade; los comunicados oficiales no las publican.
- Fecha exacta de cierre de we.trade: solo inferida ("≈9 meses antes de feb-2023").
- Estado real de IBM Food Trust en 2025–2026 (activo, en mantenimiento o cerrado): no encontré fuente confiable; solo la página de producto y materiales de 2018–2019.
- Los "siete errores" de Gartner en proyectos blockchain empresariales están tras muro de pago (ver Pregunta 4).

---

## Pregunta 2. Éxitos comprobados con métricas públicas (stablecoins, fondos tokenizados, Kinexys, El Salvador, Chainalysis LatAm, Bitso)

### Takeaway
Lo que sí funcionó a escala tiene tres rasgos: dinero tokenizado (stablecoins, JPM Coin, fondos de tesorería) con un caso de uso claro de liquidación 24/7 o cobertura de tipo de cambio; operador con incentivo de negocio (Tether/Circle, JPMorgan, Bitso); y encaje regulatorio (GENIUS Act 2025). El contraejemplo es El Salvador: adopción impuesta por ley sin problema de usuario resuelto → uso mínimo y ley enmendada en 2025.

### Cited Findings

**Stablecoins (USDT/USDC) — oferta y volumen**
- Oferta total de stablecoins: pico ≈ US$310 mil millones en mayo de 2026; ≈ US$300 mil millones en junio de 2026; la caída de junio (US$7.7 mil millones) fue la mayor desde el colapso de Terra (mayo 2022). USDT ≈ US$184 mil millones (junio 2026, desde ≈190 en mayo); USDC ≈ US$74 mil millones (junio 2026, desde pico ≈80 en marzo) — [Forbes, 27-jul-2026](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)
- Volumen "ajustado" (transferencias verificadas, sin duplicados): junio 2026 US$1.79 billones (récord); 1T-2026 ≈ US$4.5 billones; año 2025 completo US$10.8 billones. Volumen bruto 2025: US$33 billones; en febrero de 2026 el volumen bruto mensual (US$7.2 billones) superó al de la red ACH (US$6.8 billones) — [Forbes, 27-jul-2026](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)
- Cifra de honestidad: solo ≈1% del movimiento de 2025 fueron pagos "reales" (≈US$390 mil millones): B2B US$226 mil millones, nómina y remesas ≈US$90 mil millones, liquidación de mercados de capital US$8 mil millones — [Forbes, 27-jul-2026](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)
- Visa: liquidación en stablecoins con tasa anualizada de US$7 mil millones, +50% trimestre a trimestre, en nueve blockchains; Mastercard: seis stablecoins en ocho cadenas (cifras citadas por Forbes a partir de Visa Onchain Analytics; **[autoreportado por Visa/Mastercard]**) — [Forbes, 27-jul-2026](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)
- Regulación: la GENIUS Act fue promulgada en julio de 2025; prohíbe pagar rendimiento sobre stablecoins; plazo de cumplimiento para emisores extranjeros: julio de 2028 — [Forbes, 27-jul-2026](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)

**Chainalysis — Geography of Cryptocurrency, LatAm 2026 (12 meses al 30-jun-2026)**
- Valor recibido en LatAm: US$593.8 mil millones, +9.8% anual. Brasil US$252.5 mil millones (43.7% de la región, −1.6%), Argentina US$88.5 mil millones (+15.3%), México US$77.6 mil millones (+25.5%), Venezuela US$39.1 mil millones (+107.2%), Colombia US$29.1 mil millones (+13.8%); los cinco concentran >80% — [Chainalysis, 2026](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/)
- Participación de stablecoins (junio 2026): 32.1% del valor transfronterizo, 22.1% de la actividad P2P doméstica, 17.6% de saldos en billeteras personales — [Chainalysis, 2026](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/)
- México: las stablecoins son 61% de los flujos (≈US$47 mil millones de US$77.6 mil millones); volumen transfronterizo mensual en stablecoins US$1.8 mil millones (junio 2026), ≈4x desde inicios de 2024; México es 11º en adopción "grassroots" y 5º en transfronterizo a nivel mundial. Cita de Ben Reid (Bitso): "strong demand for peso-denominated stablecoins like MXNB as a fiat ramp currency" — [Chainalysis, 2026](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/)
- Casos de uso identificados: cobertura contra inflación/volatilidad, remesas (corredor EE.UU.–México), acceso a divisas en mercados restringidos, liquidez B2B y transferencias corporativas, pagos cotidianos a comercios — [Chainalysis, 2026](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/)
- Reportes previos para contexto: [Chainalysis LatAm 2025](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2025/); [Chainalysis LatAm 2024 – "The Rise of Stablecoins"](https://www.chainalysis.com/blog/2024-latin-america-crypto-adoption/); [Dune – "The Money Layer: LATAM Crypto 2025"](https://dune.com/blog/latam-crypto-2025-report) [solo títulos]

**Bitso — participación en remesas EE.UU.–México**
- Bitso afirma procesar ≈10% de los envíos transfronterizos del corredor México–EE.UU. (fuente: reporte de Bitso Business; **[autoreportado]**). El artículo lo contrasta con el total Banxico de enero–junio 2025 (US$31,326 millones) y calcula ≈US$3,132 millones; el título habla de 2024 mientras el cuerpo usa datos del 1S-2025, por lo que el año exacto al que aplica el 10% es ambiguo. La nota no afirma que Bitso liquide esas remesas específicamente en USDC/USDT; sí cita costos de 0.1–0.15% en stablecoins vs 4–8% en remesadoras tradicionales (afirmación de la industria, no verificada aquí) — [Alto Nivel, 2025](https://www.altonivel.com.mx/remesas-en-mexico-bitso-sostiene-su-tajada-del-10-en-2024/)
- Misma afirmación ("más del 10%") replicada por [BeInCrypto](https://es.beincrypto.com/bitso-gestiona-mas-10-porciento-remesas-mexico-eeuu-ultimo-ano/) [solo título]
- Contexto: las remesas a México cayeron en 2025, rompiendo una racha de más de una década (título de [CNN en Español, 11-feb-2026](https://cnnespanol.cnn.com/2026/02/11/mexico/remesas-mexico-caida-2025-ofensiva-migratoria-trump-orix)); BBVA proyectaba una caída de 5.8% a ≈US$61 mil millones al cierre de 2025 ([BBVA](https://www.bbva.com/es/mx/las-remesas-en-mexico-podrian-caer-5-8-al-cierre-de-2025-y-alcanzar-los-61-mil-millones-de-dolares/)) [solo títulos]

**JPMorgan Kinexys (ex-Onyx) — blockchain permisionada bancaria**
- **[autoreportado]** "más de US$3 billones (trillion) en transacciones desde su inicio" y "promedio de más de US$5 mil millones diarios" (comunicado de hitos 2026). Hitos 2026: JPM Coin (ticker JPMD, token de depósito en USD) disponible para clientes institucionales en Base (L2 de Coinbase); "Kinexys Fund Flow" en blockchain privada permisionada (primera transacción entre J.P. Morgan Private Bank, JPM Asset Management y Citco); alianzas con BMW Group, FirstRand, Mitsubishi Corp. (pagos programables), B2C2 y Siemens (FX). Oliver Harris nombrado Head of Kinexys en abril 2026 — [J.P. Morgan, Kinexys milestones 2026](https://www.jpmorgan.com/payments/newsroom/kinexys-milestones-2026)
- CoinDesk, 29-jun-2026: "JPMorgan broadens Kinexys blockchain settlement network as banks modernize cross-border payments" — [CoinDesk](https://www.coindesk.com/business/2026/06/29/j-p-morgan-broadens-blockchain-settlement-network-as-banks-modernize-cross-border-payments) [solo título]
- Cifra anterior (para mostrar la trayectoria): "volumen acumulado supera US$1.5 billones" — [Bitget News](https://www.bitget.com/news/detail/12560605424789) [solo título; fecha no verificada]

**Fondos de tesorería tokenizados (BlackRock BUIDL, Franklin Templeton BENJI)**
- "BlackRock Files 2 Tokenized Funds: BUIDL Hits $2.3B in 2026" — [RWA Times (Substack)](https://rwatimes.substack.com/p/blackrock-files-2-tokenized-funds) [solo título; la página devolvió 404 al intentar abrirla]
- "Franklin Templeton's $726 Million Tokenized Fund Wins SEC Clearance to Enter $872 Billion of ETFs and Mutual Funds" (24-ago-2026) — [Genfinity](https://genfinity.io/2026/08/24/franklin-templeton-tokenized-fund-sec-clearance-benji-etfs-mutual-funds/) [solo título]
- Página de datos de BENJI en rwa.xyz (fuente primaria de AUM en tiempo real, no consultada en texto completo) — [RWA.xyz BENJI](https://app.rwa.xyz/assets/BENJI)

**El Salvador — Bitcoin como moneda de curso legal (2021) y enmienda (2025)**
- IMF Selected Issues (2025), con base en encuestas: 60% de los usuarios registrados en Chivo descargaron la app solo para cobrar el bono de US$30 y no hicieron más transacciones (NBER, Alvarez et al. 2022); encuesta FUSADES oct-2022: "97¾ percent of business have not made even one sale in Bitcoin"; datos del banco central: "only 1¾ percent of the remittances were transferred using a crypto wallet" en el año previo; IUDOP/UCA sep-2022: 66% considera que Bitcoin fracasó y 77% se opone a más gasto público en él — [FMI, Country Report 2025/068](https://www.elibrary.imf.org/view/journals/002/2025/068/article-A001-en.xml)
- Conclusión del FMI: "Bitcoin adoption as legal tender has not contributed to promote financial inclusion and digital remittances. The evidence is conclusive, the use of Bitcoin is minimal, and the cost-benefit is largely unfavorable" — [FMI, 2025](https://www.elibrary.imf.org/view/journals/002/2025/068/article-A001-en.xml)
- Enmienda de la ley Bitcoin tras el acuerdo con el FMI (enero 2025), que volvió voluntaria la aceptación: [Yahoo Finance/Reuters – "El Salvador amends bitcoin law following IMF loan deal"](https://finance.yahoo.com/news/el-salvador-amends-bitcoin-law-160419360.html); [Forbes, 28-feb-2025](https://www.forbes.com/sites/digital-assets/2025/02/28/el-salvadors-bitcoin-law-changes-to-secure-imf-funding/); [The Central American Group – "The Cryptocurrency is optional"](https://www.thecentralamericangroup.com/el-salvador-bitcoin-law-reform/) [solo títulos; el detalle del texto legal no fue verificado en fuente primaria]

### Inferences
- "Por qué blockchain" que sí se sostuvo: (a) stablecoins: dólares transferibles 24/7 sin cuenta bancaria en EE.UU., con costo marginal bajo — el usuario en México/Argentina/Venezuela lo adopta por cobertura cambiaria y remesas, no por ideología; (b) Kinexys: liquidación interbancaria programable dentro de un solo operador con clientes que ya pagan (no consorcio); (c) fondos tokenizados: colateral y liquidación instantánea para tesorerías cripto, con emisor regulado.
- El Salvador es el espejo de los consorcios: adopción "empujada" (por ley o por consorcio) sin un problema del usuario final resuelto produce uso residual (1¾% de remesas, 97¾% de negocios sin una venta).
- Para CREDI-CEDA el dato más útil de Chainalysis es que México ya mueve ≈US$1.8 mil millones/mes en stablecoins transfronterizas y que 61% de su flujo cripto es stablecoin: el "riel" de dinero digital ya existe en el país; el proyecto no necesita crear ni un token ni un riel, solo un registro de datos que después pueda conectarse a esos rieles (p. ej., MXNB de Bitso).
- La cifra de "1% de pagos reales" es la que hay que citar frente a un jurado escéptico: demuestra honestidad y que el volumen no es adopción.

### Gaps
- No verifiqué en texto completo el AUM de BUIDL (≈US$2.3 mil millones según título de RWA Times) ni de BENJI (≈US$726 millones según título de Genfinity, ago-2026); un dato de rwa.xyz sería la fuente primaria.
- No encontré cifras de liquidación en stablecoins de Stripe ni de PayPal (PYUSD) en esta ronda.
- No cubrí métricas de Ethereum L2 ni de adopción de Lightning/Bitcoin en pagos.
- La afirmación de Bitso (10%) es autoreportada y el año es ambiguo; no hallé confirmación independiente (Banxico no desglosa por intermediario).
- El texto exacto de la enmienda salvadoreña de enero 2025 no fue leído en fuente primaria (solo títulos de prensa).

---

## Pregunta 3. Aplicaciones concretas en mercados agrícolas, comercio informal y crédito on-chain en LatAm/África (GrainChain, Sarafu, Credix/Goldfinch/Huma, MiniPay, etc.)

### Takeaway
Los dos casos con evidencia sólida son Sarafu (Kenia): monedas comunitarias en blockchain con un RCT publicado que muestra efectos positivos en ingreso y consumo de hogares informales, y GrainChain (México/EE.UU.): liquidación de granos con contratos inteligentes lanzada en Tamaulipas en 2019, pero sin fuentes de estado 2025–2026. El crédito privado on-chain (Credix, Goldfinch, Huma) sigue operando en 2026 según listados de la industria, pero no obtuve métricas verificadas de volumen o impago en esta ronda.

### Cited Findings

**Sarafu / Grassroots Economics (Kenia; monedas de inclusión comunitaria; POA/xDai → Celo)**
- **[autoreportado]** Grassroots Economics: 26,600+ personas apoyadas, 290+ comunidades, 2,140+ vouchers emitidos; fundada en 2010; mecanismo "Commitment Pooling" con Community Asset Vouchers sobre Sarafu.Network; Celo aparece como socio — [Grassroots Economics – Sarafu Network](https://www.grassrootseconomics.org/sarafu-network)
- RCT (Mqamelo, Frontiers in Blockchain, 2021/publicado ene-2022): 791 participantes en Nairobi (389 tratamiento, 402 control), nov–dic 2020; intervención: 400 Sarafu semanales por 3 semanas (≈US$29.20) en la cadena xDai. Resultados: saldos de billetera +US$93.51, ingreso mensual +US$23.17, gasto en alimentos/agua +US$28.43; aumentó frecuencia y tamaño de transacciones; efecto mayor en hombres que en mujeres (contrario a la hipótesis). La cadena permitió trazar cada transacción para evaluar impacto, algo imposible con efectivo — [Frontiers in Blockchain, DOI 10.3389/fbloc.2021.739751](http://www.frontiersin.org/articles/10.3389/fbloc.2021.739751)
- Dataset abierto de transacciones Sarafu 2020–2021 publicado en Scientific Data (Nature, 2022) — [Nature Scientific Data](https://www.nature.com/articles/s41597-022-01539-4); versión en [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9298170/) [solo títulos]

**GrainChain (EE.UU./México; liquidación de granos con contratos inteligentes; Symbiont Assembly)**
- Lanzamiento en México anunciado el 2 de mayo de 2019 — [TechCrunch](https://techcrunch.com/2019/05/02/grainchain-a-blockchain-based-platform-for-commodity-sales-launches-in-mexico/) [solo título]
- El estado de Tamaulipas introdujo una iniciativa con GrainChain para digitalizar y automatizar procesos de agricultores (mayo 2019) — [PR Newswire](https://www.prnewswire.com/news-releases/mexican-state-of-tamaulipas-introduces-blockchain-initiative-using-grainchain-to-digitize-and-automate-processes-for-farmers-300842472.html); [Forbes, 2-may-2019](https://www.forbes.com/sites/benjaminpirus/2019/05/02/mexican-state-tamaulipas-incorporates-blockchain-for-grain-tracking/) [solo títulos]
- Marzo 2020: "GrainChain Goes Global On Symbiont's Blockchain. Small Farmers Are Signing Up." — [Forbes, 27-mar-2020](https://www.forbes.com/sites/robertanzalone/2020/03/27/grainchain-goes-global-on-symbionts-blockchain-small-farmers-are-signing-up/) [solo título]
- Perfil corporativo — [CB Insights](https://www.cbinsights.com/company/grainchain). **No encontré ninguna fuente de 2024–2026 sobre su estado operativo** (ver Gaps).

**Crédito privado on-chain (Credix, Goldfinch, Huma)**
- Credix se presenta en 2026 como "Credit infrastructure for Brazil's most ambitious businesses" (giro de fintech DeFi en Solana a infraestructura de crédito B2B en Brasil) — [credix.finance](https://credix.finance/); perfil histórico en [Solana Compass](https://solanacompass.com/projects/credix-finance) [solo títulos]
- Listados de la industria en mayo 2026 siguen incluyendo plataformas de crédito privado tokenizado con rendimientos de 8–15% APY — [Stablecoin Insider, may-2026](https://stablecoininsider.org/top-8-tokenized-private-credit-platforms-delivering-8-to-15-apy-in-may-2026/) [solo título; sitio secundario]
- Pools subcolateralizados on-chain — [FinanceFeeds](https://financefeeds.com/undercollateralized-on-chain-private-credit-pools/) [solo título]

### Inferences
- Sarafu es el precedente más cercano a CREDI-CEDA en espíritu: economía informal, usuarios sin banco, registro on-chain que hace **auditable** lo que antes era invisible. El "por qué blockchain" que sostuvo Sarafu: un registro compartido y verificable de compromisos entre pares de una comunidad, que ninguna parte controla y que permite evaluar impacto con datos reales. Nótese que su escala (≈26 mil personas en 15 años) es modesta: el valor está en la verificabilidad, no en el volumen.
- GrainChain valida que el problema "liquidación entre productor y comprador con desconfianza mutua" existe en el agro mexicano y que un gobierno estatal (Tamaulipas) lo apoyó; pero la ausencia de noticias posteriores a 2020 es en sí una señal (posible pivote o bajo perfil) que hay que reconocer en el pitch, no ocultar.
- Credix muestra el patrón de pivote típico: de "DeFi para LatAm" a "infraestructura de crédito para Brasil" — el mercado premió el enfoque en un país y en clientes B2B que pagan.
- **Lección para CREDI-CEDA**: replicar de Sarafu la idea de "registro de compromisos entre pares, verificable por terceros" y publicar datos anónimos para investigación; evitar prometer volumen. De GrainChain, tomar la validación del problema (contratos de compraventa con desconfianza) y la estrategia de aliado institucional (gobierno/central de abasto) como "anchor partner".

### Gaps
- Estado 2025–2026 de GrainChain (activo, pivote, cierre): no encontrado.
- Volúmenes, tasas de impago y estado 2026 de Credix, Goldfinch y Huma: no verificados en fuente primaria en esta ronda.
- AgriLedger (Haití), Farmer Connect, Ripio, Lemon, Mercado Libre "Meli Dólar", Nubank crypto, Coinbase/Base en LatAm, Celo MiniPay (usuarios) y pilotos tipo Grameen: **no se investigaron** por límite de búsquedas; no hay hallazgos que reportar y no deben citarse cifras de memoria.

---

## Pregunta 4. Lecciones transversales y meta-análisis (Gartner, académicos, industria): ¿qué predice éxito vs. fracaso?

### Takeaway
Las fuentes coinciden en que el fracaso se predice por consorcio-de-competidores sin operador neutral, ausencia de problema real del usuario, costo > beneficio y horizonte regulatorio más largo que el capital disponible; el éxito se predice por un operador con incentivo económico propio, dinero/liquidación real en juego, encaje regulatorio y "blockchain invisible" para el usuario final.

### Cited Findings
- Gartner (12-jun-2019, Adrian Leow): solo 11% de 3,000 CIOs encuestados habían desplegado o planeaban desplegar blockchain en el corto plazo; blockchain "sliding down toward the Trough of Disillusionment"; "no industry consensus on key components such as product concept, feature set and core application requirements"; no esperaban una plataforma dominante en 5 años. Los "siete errores" están tras muro de pago — [Ledger Insights, 2019](https://www.ledgerinsights.com/enterprise-blockchain-gartner-mistakes/)
- Gartner: "Most blockchain applications sunk in the 'trough of disillusionment'" — [CIO Dive](https://www.ciodive.com/news/most-blockchain-applications-sunk-in-the-trough-of-disillusionment-gartn/564613/); "Gartner predicts 90% of enterprise blockchain platforms obsolete in two years" — [Ledger Insights](https://www.ledgerinsights.com/enterprise-blockchain-gartner-obsolete/) [solo títulos]
- Estudio académico revisado por pares (Journal of Operations Management, 2025): "Success and Failure of Blockchain Technology Providers: Founders' Power, Beyond-Blockchain Exploration and Centralized Decision-Making" (Zhan et al.) — [Wiley](https://onlinelibrary.wiley.com/doi/10.1002/joom.1364) [solo título; el sitio devolvió 403; no se leyeron los hallazgos]
- Trade Finance Global (dic-2023): "blockchain no es el problema"; la alineación regulatoria toma ≥4 años; "paper is the most interoperable instrument we have"; se necesitan "activistas" de la digitalización — [TFG](https://www.tradefinanceglobal.com/posts/top-5-trade-lessons-from-the-contour-collapse/)
- Trade Finance Global (2023) sobre Marco Polo: resistencia a la adopción, incertidumbre regulatoria, escalabilidad, costos de desarrollo e interoperabilidad; "technology is an enabler… not the sole driver" — [TFG](https://www.tradefinanceglobal.com/posts/marco-polo-network-runs-insolvent/)
- Accenture/ASX: si un operador sigue siendo árbitro final, "muchos de los beneficios de una arquitectura DLT" se minimizan — [iTnews](https://www.itnews.com.au/news/accenture-report-could-end-asxs-blockchain-vision-587915)
- Ledger Insights sobre B3i: "consortia are notoriously hard" — [Ledger Insights](https://www.ledgerinsights.com/major-insurers-pull-the-plug-on-b3i-insurance-blockchain-consortium/)
- Maersk: "the need for full global industry collaboration has not been achieved" — [Maersk](https://www.maersk.com/news/articles/2022/11/29/maersk-and-ibm-to-discontinue-tradelens)
- Análisis de industria 2026 sobre qué cambió y qué funciona en trade finance — [Espeo, "Blockchain in trade finance: what changed and what works in 2026"](https://espeo.eu/content/blockchain-trade-finance-what-changed-what-works/) [solo título]; "RIP (finally) to the blockchain hype" — [CIO.com](https://www.cio.com/article/3838169/rip-finally-to-the-blockchain-hype.html) [solo título]
- Forbes (jul-2026): solo ≈1% del volumen de stablecoins de 2025 fueron pagos reales — [Forbes](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/)

### Inferences
Patrones que predicen **fracaso** (derivados de los casos citados arriba):
1. Consorcio de competidores sin operador neutral con incentivo propio (TradeLens, we.trade, Marco Polo, Contour, B3i).
2. Reemplazar un sistema central que ya funciona, manteniendo un árbitro central (ASX).
3. Producto cuyo valor ("procedencia", "trazabilidad") no lo paga nadie de forma recurrente; dependencia de rondas de capital (Everledger, B3i).
4. Adopción impuesta sin problema de usuario (El Salvador).
5. Horizonte regulatorio (≥4 años) más largo que la pista de capital (Contour).

Patrones que predicen **éxito**:
1. Un operador con negocio propio que gana con cada transacción (Tether/Circle, JPMorgan, Bitso, Visa).
2. Dinero o liquidación real en juego (stablecoins, JPM Coin, fondos tokenizados), no solo "datos compartidos".
3. El usuario no necesita saber que hay una blockchain (remesas vía Bitso; Kinexys para tesorerías).
4. Encaje regulatorio explícito (GENIUS Act 2025; emisores regulados de BUIDL/BENJI).
5. Sin token propio ni economía especulativa como requisito de uso (Kinexys, Sarafu con vouchers no especulativos).

**Aplicación a CREDI-CEDA (respuesta de una línea a "¿por qué blockchain y no una base de datos?")**: porque el registro debe ser **neutral entre dos partes que desconfían** (comerciante y proveedor), **portátil** (el comerciante se lo lleva a otro proveedor, otra bodega u otro financiador sin pedir permiso al operador) y **verificable por un tercero sin confiar en el operador** — exactamente las tres propiedades que una base de datos de un solo dueño (banco, proveedor grande o administración de la CEDA) no puede garantizar y que los consorcios fallidos intentaron resolver al revés (pidiendo a competidores compartir datos en la plataforma de un rival). La cadena no es el producto; el historial firmado a dos manos lo es.

Riesgos específicos que los casos señalan para CREDI-CEDA: (a) si el proyecto depende de que los proveedores grandes compartan su cartera, replicará TradeLens; (b) si el "operador" del registro es quien decide qué se escribe, replicará ASX; (c) si se promete volumen en vez de verificabilidad, el jurado citará el "1% de pagos reales".

### Gaps
- No pude leer los hallazgos del estudio de Zhan et al. (2025, JOOM) ni los "siete errores" de Gartner (muro de pago); solo se citan como referencias existentes.
- No consulté los informes del BID/IDB sobre blockchain en LatAm, el toolkit del WEF, Deloitte, Messari ni a16z State of Crypto en esta ronda.
- No encontré una posición de Gartner sobre blockchain específica de 2024–2026 (las fuentes localizadas son de 2019); el hype cycle reciente no fue verificado.

---

## Pregunta 5. Catálogo resumido de casos (nombre, país, problema, cadena, año, métricas, estado 2026, por qué funcionó/falló, lección para CREDI-CEDA)

### Takeaway
La tabla condensa lo citado en las preguntas 1–4; cada fila remite a las fuentes ya listadas. Las columnas "por qué funcionó/falló" y "lección" son inferencias del investigador, no citas.

### Cited Findings
- Todas las cifras de la tabla provienen de las fuentes citadas en las Preguntas 1–4 (Maersk, TFG, iTnews, ASIC, Ledger Insights, Forbes, Chainalysis, Alto Nivel, J.P. Morgan, FMI, Grassroots Economics, Frontiers in Blockchain). Los campos marcados "n/d" no tienen fuente verificada.

### Inferences

| Caso | País | Problema | Cadena | Lanzó | Métricas (fecha) | Estado 2026 | Por qué funcionó / falló | Lección para CREDI-CEDA |
|---|---|---|---|---|---|---|---|---|
| TradeLens | Global (DK/US) | Documentos de comercio marítimo | Hyperledger Fabric | 2018 | Sin métricas públicas al cierre | Cerrado (1T-2023) | Falló: competidores no se sumaron; sin viabilidad comercial (Maersk, nov-2022) | No depender de que competidores compartan datos en la plataforma de un rival |
| we.trade | Europa | Financiamiento de comercio PyME | Hyperledger Fabric | 2018 | n/d | Cerrado (≈mediados 2022) | Falló: consorcio bancario sin tracción | Beneficio individual e inmediato para cada usuario, no "beneficio de red" futuro |
| Marco Polo | Global (IE) | Trade finance | R3 Corda | 2017 | Deuda €5.2 M (feb-2023) | Insolvente (22-feb-2023) | Falló: cayó inversión de US$12 M de BofA post-FTX | Pista de capital corta + dependencia de un solo inversionista = muerte; para el hackathon, costo ≈0 de operación |
| Contour | Global (SG) | Cartas de crédito digitales | R3 Corda | 2019 | n/d | Cerrado (2023) | Falló: regulación tarda ≥4 años; "el papel es más interoperable" | Que el registro sea legible sin la app (exportable, imprimible con QR) |
| ASX CHESS | Australia | Liquidación bursátil | Daml + VMware Blockchain | 2017 (proy.) | AUD 245–255 M cancelados (nov-2022); multa AUD 20.5 M (jul-2026) | Abandonado; Release 1 no-DLT en vivo 20-abr-2026 | Falló: >100 k tx fallaban; operador seguía siendo árbitro final | Si hay un árbitro central, la cadena sobra; en CREDI-CEDA nadie es árbitro: firman las dos partes |
| Everledger | UK/AU | Procedencia de diamantes/ESG | Propia (Fabric) | 2015 | ≈US$27–34 M levantados | En administración (may-2023) | Falló: inversionista no completó tramo de £4.1 M | La trazabilidad no se vende sola; el valor debe ser un uso concreto (acceso a crédito) |
| B3i | Suiza | Reaseguro | R3 Corda | 2016 | Serie A >US$20 M | Insolvente (jul-2022) | Falló: no cerró nueva ronda; "consortia are notoriously hard" | Evitar gobernanza de consorcio; operador ligero |
| IBM Food Trust | US/Global | Trazabilidad alimentaria | Hyperledger Fabric | 2018 | Solo métricas 2018–2019 | **Incierto** (página activa; sin noticias 2024–26) | n/d | Decir "estado incierto" si el jurado pregunta |
| Stablecoins USDT/USDC | Global | Dólares 24/7 sin banco | Ethereum, Tron, Solana, etc. | 2014/2018 | Oferta ≈US$300 mil M (jun-2026); vol. ajustado 2025 US$10.8 billones; ≈1% pagos reales | Activo, regulado (GENIUS Act jul-2025) | Funcionó: problema real (cobertura FX, remesas), operador con incentivo, sin consorcio | El riel de dinero ya existe en México (61% de flujos); CREDI-CEDA solo registra datos y puede conectarse después |
| Chainalysis LatAm 2026 | LatAm | — | — | — | LatAm US$593.8 mil M; México US$77.6 mil M, +25.5%; US$1.8 mil M/mes stablecoin transfronterizo (jun-2026) | — | Evidencia de adopción "grassroots" real | Dato de contexto para el pitch: México es 5º mundial en transfronterizo |
| Bitso remesas | México | Remesas EE.UU.–MX | Multi-cadena; MXNB | 2014 (empresa) | ≈10% del corredor **[autoreportado]**; Banxico 1S-2025 US$31,326 M | Activo | Funcionó: blockchain invisible; costo menor | Posible socio de rieles (MXNB) para fase post-hackathon |
| JPMorgan Kinexys | US/Global | Liquidación interbancaria 24/7 | Privada permisionada + Base | 2019 (JPM Coin) | >US$3 billones acumulado; >US$5 mil M/día **[autoreportado]** (2026) | Activo, en expansión | Funcionó: un solo operador con clientes que pagan; dinero real | Un operador claro con incentivo > consorcio |
| BUIDL / BENJI | US | Fondos de tesorería tokenizados | Ethereum y otras | 2024 / 2021 | BUIDL ≈US$2.3 mil M; BENJI ≈US$726 M (2026) **[solo títulos]** | Activos | Funcionó: emisor regulado, liquidación instantánea | Cumplimiento regulatorio como ventaja, no como obstáculo |
| El Salvador Bitcoin | El Salvador | Inclusión financiera/remesas | Bitcoin/Lightning (Chivo) | 2021 | 60% de usuarios Chivo solo por bono; 97¾% negocios sin ventas BTC; 1¾% de remesas (FMI 2025) | Ley enmendada (ene-2025): aceptación voluntaria | Falló: adopción impuesta, sin problema de usuario | No imponer; el comerciante debe querer el historial porque le da crédito |
| Sarafu (Grassroots Economics) | Kenia | Liquidez en economía informal | xDai → Celo | 2010 (2018 on-chain) | 26,600+ personas, 290+ comunidades **[autoreportado]**; RCT n=791: +US$23.17 ingreso mensual | Activo | Funcionó (a escala modesta): registro verificable de compromisos entre pares; evidencia RCT | Precedente directo: registro de compromisos en economía informal; publicar datos anónimos |
| GrainChain | US/México | Liquidación productor-comprador de granos | Symbiont Assembly | 2019 (MX) | Sin métricas 2024–26 | **Incierto** | n/d | Validación del problema y del "anchor partner" (Tamaulipas); reconocer que no hay noticias recientes |
| Credix | Brasil (ex-LatAm) | Crédito B2B | Solana → infraestructura propia | 2021 | n/d | Activo, pivotó a Brasil | Pivote a un país y clientes que pagan | Enfocarse en una sola central (CEDA) antes de "LatAm" |

### Gaps
- Filas con "n/d" o "incierto" carecen de fuente verificada en esta ronda; no se deben rellenar de memoria.
- No se construyeron filas para AgriLedger, Farmer Connect, Ripio, Lemon, Meli Dólar, Nubank, Base/Coinbase LatAm, MiniPay, Goldfinch, Huma, Lightning ni L2s por falta de búsquedas dentro del límite; se recomienda una segunda ronda si el pitch los necesita.
