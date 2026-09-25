# Stellar: historia, casos comprobados, ecosistema, huella en México/LatAm y comparación honesta (corte: 25 sep 2026)

Notas para justificar "¿por qué Stellar?" en el pitch de CREDI-CEDA. Cada cifra lleva fecha y fuente. Las cifras que vienen de la Stellar Development Foundation (SDF) o de sus socios se marcan como **[autoreportado]**. No se repite el tooling de Soroban (ronda anterior). Salvo indicación, "Stellar" = red principal (mainnet); nuestra demo corre en testnet.

---

## 1. Historia y línea de tiempo (2014 → 2026)

### Takeaway
Stellar es una de las redes más antiguas que siguen activas (julio 2014), nació con misión de inclusión financiera, tiene una fundación sin fines de lucro que la administra (SDF) y un protocolo de consenso académico (SCP, 2015). Su giro a contratos inteligentes (Soroban) es reciente —mainnet en 2024— y desde entonces ha lanzado un protocolo nuevo aproximadamente cada 3–6 meses, con foco en llaves passkey (secp256r1), archivo de estado, ejecución paralela y criptografía ZK.

### Cited Findings
**Fundación y primeros años**
- Lanzamiento oficial el 31 de julio de 2014 por Jed McCaleb y Joyce Kim; Stripe aportó US$3 millones de capital semilla y recibió 2% de los 100 mil millones de tokens iniciales (2 mil millones de XLM); 25% de la distribución inicial se reservó para organizaciones sin fines de lucro enfocadas en inclusión financiera — [Wikipedia: Stellar (payment network)](https://en.wikipedia.org/wiki/Stellar_(payment_network))
- Abril 2015: se anunció el protocolo renovado con nuevo algoritmo de consenso; noviembre 2015: entró en vivo el Stellar Consensus Protocol (SCP), diseñado por el profesor de Stanford David Mazières — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network))
- La Stellar Development Foundation es una entidad sin fines de lucro (no cuenta con estatus fiscal 501(c)(3)); en mayo de 2017 lanzó un brazo comercial con fines de lucro, Lightyear.io — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network))
- Diciembre 2016: expansión con Coins.ph (Filipinas), ICICI Bank (India), Flutterwave (África) y Tempo Money Transfer; octubre 2017: alianza IBM + KlickEx para pagos transfronterizos en el Pacífico Sur — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network))

**2019: quema de lumens y nuevo mandato de la SDF (anunciado en la Ciudad de México)**
- El 4 de noviembre de 2019, en la conferencia Meridian en la **Ciudad de México**, la SDF quemó 55 mil millones de XLM (más de la mitad del suministro): la oferta pasó de 105 mil millones a 50 mil millones de XLM; la SDF conservó ~30 mil millones repartidos en: desarrollo directo 12 mil M, soporte al ecosistema 2 mil M, inversiones 10 mil M, adquisición de usuarios 6 mil M. Cita de Denelle Dixon (CEO): "We didn't start by wanting to burn. We started by asking, 'What do we need?'". El 28 de octubre de 2019 la comunidad votó descontinuar la inflación (oferta fija) y la fundación se comprometió a no quemar más — [CoinDesk, 5 nov 2019](https://www.coindesk.com/markets/2019/11/05/stellars-foundation-just-destroyed-half-the-supply-of-its-lumens-cryptocurrency)
- Versión oficial: "50 billion of the 68 billion lumens in those programs have also been burned" más 5 mil millones del fondo operativo; razón declarada: "giveaways and airdrops have diminishing effects, especially in the outsized amounts"; la SDF describe los lumens retenidos como "Stellar's lumens", en custodia temporal para el avance de la red **[autoreportado]** — [SDF: SDF's Next Steps](https://stellar.org/blog/foundation-news/sdfs-next-steps)

**Liderazgo**
- Denelle Dixon aparece como CEO de la SDF desde 2019 (citada como CEO en la quema de 2019) y sigue siéndolo en 2026 (citada como CEO en el comunicado de los 5 años de BENJI) — [CoinDesk 2019](https://www.coindesk.com/markets/2019/11/05/stellars-foundation-just-destroyed-half-the-supply-of-its-lumens-cryptocurrency); [SDF/Franklin Templeton 2026](https://stellar.org/press/franklin-templeton-stellar-development-foundation-mark-five-years-of-benji-the-first-u-s-registered-tokenized-money-market-fund)
- José Fernández da Ponte aparece como Presidente de la SDF en 2026 (entrevista de Messari sobre el Q1 2026 y el anuncio con DTCC) — [Messari en X, 2026](https://x.com/MessariCrypto/status/2062598435287810161)

**Soroban y protocolos (fechas de mainnet según la página oficial de upgrades)**
- Protocol 19 (8 jun 2022): CAP-0021 condiciones generalizadas de transacción, CAP-0040 firma compartida — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Protocol 20 (fecha listada: 19 mar 2024) — lanzamiento de Soroban (serie CAP-0046, marco completo de contratos inteligentes) — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades). *Nota: otras coberturas citan el 20 de febrero de 2024 como la votación de validadores; no se verificó en esta ronda (ver Gaps).*
- Protocol 21 (18 jun 2024): CAP-0051 verificación de firmas **secp256r1** (base de passkeys), CAP-0053 extensión de TTL, CAP-0054–0056 optimizaciones de costo — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Protocol 22 (5 dic 2024): CAP-0058 constructores en Soroban, CAP-0059 funciones host BLS12-381 — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Protocol 23 "Whisk" (3 sep 2025): CAP-0062 separación de estado vivo/archivado (state archival), CAP-0063 **ejecución paralela** de transacciones de contratos, CAP-0065 caché permanente de módulos WASM, CAP-0067 formato estándar de eventos Classic/Soroban, CAP-0070 configuración dinámica de tiempo de ledger — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Protocol 24: upgrade de estabilidad con calendario comprimido, "necessary to fix a bug in the state archival feature" — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Protocol 25 "X-Ray": introdujo trabajo de curva BN254 (base ZK); fecha de mainnet no obtenida en esta ronda — [SDF: Yardstick, Protocol 26](https://stellar.org/blog/foundation-news/yardstick-stellar-protocol-26)
- Protocol 26 "Yardstick" (mainnet 6 may 2026): CAP-0077 *Quorum Freeze* (validadores pueden congelar llaves de ledger para respuesta a incidentes), CAP-0082 aritmética con verificación de overflow (256 bits), CAP-0078 control preciso de TTL, CAP-0080 nueve funciones host ZK (BN254 y BLS12-381), CAP-0073/0079 (cuentas del Stellar Asset Contract y direcciones muxed) — [SDF: Yardstick, Protocol 26](https://stellar.org/blog/foundation-news/yardstick-stellar-protocol-26)
- Protocol 27 "Zipper": testnet 18 jun 2026; votación de mainnet programada 8 jul 2026; CAP-0071-01 delegación de autenticación para cuentas de contrato inteligente (múltiples firmantes delegados en una sola entrada de autorización) y CAP-0071-02 credenciales ligadas a dirección (`SOROBAN_CREDENTIALS_ADDRESS_V2`) contra replay — [SDF: Zipper, Protocol 27 Upgrade Guide](https://stellar.org/blog/foundation-news/stellar-zipper-protocol-27-upgrade-guide); [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)
- 29 jun 2026: vista previa para desarrolladores de *Confidential Tokens* — [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)

**Posicionamiento estratégico 2025–2026 (autoreportado por la SDF)**
- Título del informe trimestral de la SDF del Q2 2026: "What Stellar was built for has arrived"; tres hitos de RWA en 2026: US$1 mil M (enero), US$2 mil M (abril), US$3 mil M (junio); regiones con mayor concentración de uso: Nigeria, India, Turquía y Brasil; ejes: remesas en LATAM, emisión regulada en Europa, acceso a pagos en África (costo promedio de remesa citado: 8.8%) **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- DTCC (que supervisa US$114 billones —trillions— de los mercados de capital de EE. UU.) seleccionó Stellar para tokenización; Figure lanzó YLDS (primer dólar con rendimiento registrado ante la SEC) en Stellar; Circle CCTP en vivo conectando 23 cadenas **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)

### Inferences
- Para el pitch: Stellar tiene 12 años de operación continua y una fundación con mandato explícito de "acceso financiero"; nuestro caso (comerciantes de la CEDA sin historial bancario) cae exactamente en la narrativa fundacional. Conviene mencionar que la propia SDF anunció su reestructura de 2019 en la Ciudad de México (Meridian 2019).
- El ritmo de protocolos (21 → 27 en dos años) indica una red en evolución activa, pero también que Soroban es una plataforma joven: el Protocol 24 fue un parche de emergencia por un bug de state archival. Eso es un argumento de honestidad que conviene reconocer.
- Las primitivas que más nos sirven (firmas secp256r1/passkeys en P21; delegación de autenticación para cuentas inteligentes en P27; credenciales anti-replay) ya están en mainnet o en camino, lo que sostiene la promesa de "firma de dos partes sin frase semilla".

### Gaps
- Fecha exacta de la votación de Protocol 20 (la página oficial lista 19 mar 2024; se recuerda 20 feb 2024 como fecha de votación; no verificado en esta ronda).
- Fecha de mainnet de Protocol 25 "X-Ray" (no fetchada; existe la guía oficial en stellar.org/blog/developers/stellar-x-ray-protocol-25-upgrade-guide).
- IBM World Wire (2019) y la llegada de USDC a Stellar (2021): no se verificaron fuentes primarias en esta ronda; solo se confirmó la alianza IBM/KlickEx de 2017 vía Wikipedia.
- Estructura actual de la tesorería de la SDF (cuántos XLM conserva en 2026) — no obtenida; la última cifra sólida es la de 2019 (~30 mil M de 50 mil M).

---

## 2. Métricas de red 2025–2026

### Takeaway
Con corte a mitad de 2026, Stellar reporta ~10.7 M de cuentas, ~4.9 M de transacciones diarias, ~63 mil direcciones activas diarias, US$3 mil M en activos del mundo real (RWA) y US$11.4 mil M de volumen trimestral de transferencias en stablecoins; las comisiones base son de 100 stroops (0.00001 XLM) por operación y la finalidad es al cierre del ledger, sin reorganizaciones. Los informes de Messari no fueron accesibles directamente (403), por lo que se usaron el resumen oficial de la SDF, el informe de Nansen y las notas de reunión de developers.stellar.org.

### Cited Findings
**Cuentas, actividad y desarrolladores**
- "Active accounts crossed 10.7 million"; 2,968 desarrolladores mensuales activos al 30 jun 2026 (máximo histórico, "#2 globally"), actividad de desarrolladores +125% interanual **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- Septiembre 2025 (comunicado PYUSD): "nearly 10 million accounts" y "20+ billion total operations to date" **[autoreportado]** — [SDF: PYUSD is now available on Stellar](https://stellar.org/press/paypal-pyusd-is-now-available-on-stellar)
- Q2 2026: promedio ~4.9 M de transacciones diarias (rango 2.6–7.1 M); ~63 mil direcciones activas diarias promedio (rango 44 mil–113 mil) — [Nansen: Stellar Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)

**Stablecoins y RWA**
- Volumen de transferencias en stablecoins Q2 2026: US$11.4 mil M (máximo histórico), +72% trimestral, "first double-digit-billion quarter", velocidad ~33x **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- RWA en Stellar: US$3 mil M en junio 2026; el mercado RWA global creció ~50% y "Stellar grew four times faster" **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived); confirmado como "$3 billion threshold crossed" con productos como los T-Bills europeos de Spiko y fondos de mercado de dinero tokenizados de Malasia — [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)
- Resumen del Messari "State of Stellar Q1 2026" discutido en la reunión de desarrolladores del 23 abr 2026: RWA US$2 mil M (+33% trimestral, 3x interanual desde US$500 M en Q1 2025, "the biggest single-quarter move across any metric in the report"); volumen diario promedio en contratos inteligentes US$16 M/día (8x interanual desde US$2 M); un rubro etiquetado stablecoins/DeFi con US$300 M (+20% trimestral) y protocolos clave Aquarius, Blend y SolarSwap; Aquarius cruzó US$50 M de TVL — [Stellar Docs: reunión 2026-04-23](https://developers.stellar.org/meetings/2026/04/23). *Nota: la etiqueta "market cap US$300 M" es ambigua en las notas (puede referirse a TVL DeFi, no a la oferta total de stablecoins).*
- TVL de Stellar cerca de máximo histórico de ~US$150 M en septiembre 2025 (+200% desde inicio de 2025); capitalización de XLM ~US$12 mil M (+300% en el año) — [The Defiant, sep 2025](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets)

**Confiabilidad, comisiones y finalidad**
- "99.99%+ uptime, average fees around one hundredth of a penny", "Zero core protocol security incidents" (Q2 2026) **[autoreportado]** — [SDF: Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- Comisión base: 100 stroops por operación = 0.00001 XLM (mínimo de red; la "effective base fee" fluctúa con la demanda); en Soroban: `Tx.fee = Resource Fee + Inclusion Fee` (CPU, lecturas/escrituras, bytes, tamaño de tx, eventos, renta de almacenamiento por TTL); *surge pricing* cuando las operaciones exceden la capacidad del ledger (1,000 operaciones clásicas); "Transactions become final once the ledger closes" y el consenso impide reorganizaciones — [Stellar Docs: Fees, Resource Limits, and Metering](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering)
- Circle CCTP: 24 cadenas conectadas (Ethereum, Solana, Base, Arbitrum, etc.) — [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report) (la SDF reporta 23 en su resumen del Q2 — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)); discrepancia menor de conteo entre fuentes.

### Inferences
- Para CREDI-CEDA, las métricas relevantes no son precio de XLM ni TVL, sino: comisión por operación (~US$0.0001 con XLM a US$0.10–0.40, es decir, una fracción de centavo de peso por registro de crédito), finalidad determinista en segundos y 99.99% de disponibilidad. Con 100 stroops por operación, un comerciante podría registrar miles de eventos de crédito por menos de MXN$1 en total.
- Las cifras de "cuentas" (10.7 M) son acumuladas, no usuarios activos; el dato honesto de uso es ~63 mil direcciones activas diarias (Nansen), pequeño frente a las grandes cadenas (ver sección 6).

### Gaps
- Los informes de Messari (Q4 2025, Q1 2026) devolvieron HTTP 403 al fetch; sus tablas completas (oferta de stablecoins por emisor, número de anchors, validadores, DEX volume) no se obtuvieron. Recomendado abrir manualmente https://messari.io/report/state-of-stellar-q1-2026 y https://messari.io/report/state-of-stellar-q4-2025.
- Oferta circulante de USDC/PYUSD/EURC/MGUSD en Stellar (por emisor) a 2026: no obtenida.
- Número de anchors activos y de validadores (Tier-1) a 2026: no obtenido.
- Tiempo de cierre de ledger actual (post-CAP-0070 "dynamic ledger timing"): no obtenido en esta ronda; históricamente ~5 s (no verificado aquí).
- No hay informe Messari Q2 2026 confirmado; se usó el informe de Nansen del Q2 2026 como sustituto independiente.

---

## 3. Casos de éxito con números

### Takeaway
Los casos más sólidos y verificables son: MoneyGram (5 años con Stellar, ~500 mil puntos de efectivo en 200+ países y su propia stablecoin MGUSD desde junio 2026), Franklin Templeton BENJI (primer fondo mutuo registrado en EE. UU. con una blockchain pública como libro oficial; US$650 M+ en Stellar de un total de US$1.98 mil M en abril 2026), UNHCR/Stellar Aid Assist (US$1.1 M a 1,500+ personas en el primer año) y PYUSD de PayPal (en vivo desde septiembre 2025). En México/LatAm destacan Félix + Bitso (remesas por WhatsApp liquidadas en USDC sobre Stellar y pagadas vía SPEI) y Etherfuse (MXNe y stablebonds de CETES).

### Cited Findings
**MoneyGram (Access/Ramps → MGUSD)**
- MoneyGram lanzó MGUSD el 2 de junio de 2026 (inicio en EE. UU., expansión global planeada); emisor regulado: Bridge (empresa de Stripe, "GENIUS Act-ready"); M0 para minteo/quema; Stellar como cadena; Fireblocks para custodia; se integra en la app de MoneyGram como billetera autocustodiada con saldo en dólares, transferible y convertible a moneda local; escala: cerca de 500,000 puntos de venta, 60 M+ de clientes activos, 70% de transacciones digitales; "MoneyGram has partnered with Stellar for five years"; CEO Anthony Soohoo: "MGUSD is the stablecoin we built for our customers" — [PR Newswire / MoneyGram, 2 jun 2026](https://www.prnewswire.com/news-releases/moneygram-launches-mgusd-a-stablecoin-to-power-its-own-global-network-302787799.html); cobertura: [CoinDesk, 2 jun 2026](https://www.coindesk.com/business/2026/06/02/moneygram-launches-stablecoin-on-stellar-joining-rush-toward-digital-dollar-payments)
- Relación desde 2021: cerca de 500 mil ubicaciones en 200+ países; en 2026 lanzamiento en El Salvador y despliegue adicional en Latinoamérica planeado — [Stellar Docs: reunión 2026-04-23](https://developers.stellar.org/meetings/2026/04/23); "475,000+ global locations accessible" — [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)
- En Meridian 2025 MoneyGram confirmó que usuarios pueden mantener USDC en Stellar dentro de su app; cita del CEO: "maximum flexibility for users to hold currency in USD and redeem at the moment they want" — [The Defiant, sep 2025](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets)

**UNHCR / Stellar Aid Assist / Stellar Disbursement Platform**
- Piloto lanzado en diciembre de 2022 (menos de 10 meses después de la invasión rusa) para desplazados internos en Ucrania (Kyiv, Lviv, Vinnytsia), con USDC, cash-out vía MoneyGram (~150 países), wallet Vesseo y UNICC; MVP construido en menos de 2 meses; primer año: US$1.1 M desembolsados a más de 1,500 personas (necesidades básicas, renta, apoyo a víctimas de violencia de género); en agosto de 2023 la SDF liberó como código abierto la Stellar Disbursement Platform; el programa recibió premios y respaldo del gobierno ucraniano; se menciona expansión a Gambia y **México** **[autoreportado por SDF]** — [SDF: One year of Stellar Aid Assist](https://stellar.org/blog/thought-leadership/one-year-of-stellar-aid-assist); [SDF: caso UNHCR](https://stellar.org/case-studies/unhcr)
- UNHCR ganó un premio por el uso de blockchain para entregar efectivo a desplazados en Ucrania (comunicado propio de ACNUR) — [UNHCR press release](https://www.unhcr.org/news/press-releases/unhcr-wins-award-innovative-use-blockchain-solutions-provide-cash-forcibly)

**Franklin Templeton — BENJI (FOBXX)**
- 5 años de BENJI (comunicado 2026): AUM total de la suite BENJI US$1.98 mil M al 29 abr 2026; BENJI en Stellar: US$650 M+ (abril 2026), segundo RWA tokenizado más grande de la red; transferencias P2P acumuladas US$211 M+ al 31 mar 2026; base de inversionistas +140% (abr 2024–mar 2026); primer fondo mutuo registrado en EE. UU. que usa una blockchain pública como sistema oficial de registro; único fondo de mercado de dinero con transferencias P2P entre accionistas y rendimiento intradía; dividendo diario 365 días; P2P minorista ampliado en mayo 2025; BENJI usado como contraprestación en la adquisición pendiente de 250 Digital; Denelle Dixon: "BENJI is the clearest proof that blockchain belongs in everyday financial products" — [SDF/Franklin Templeton, 2026](https://stellar.org/press/franklin-templeton-stellar-development-foundation-mark-five-years-of-benji-the-first-u-s-registered-tokenized-money-market-fund); versión de Franklin Templeton: [franklintempleton.com](https://www.franklintempleton.com/press-releases/news-room/2026/franklin-templeton-stellar-development-foundation-mark-five-years-of-benji-the-first-u.s.-registered-tokenized-money-market-fund)
- 2021: Franklin Templeton lanzó el primer fondo mutuo de EE. UU. tokenizado, en Stellar — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network))

**PayPal — PYUSD**
- 11 jun 2025: PayPal anunció planes de usar Stellar para PYUSD — [PayPal newsroom](https://newsroom.paypal-corp.com/2025-06-11-PayPal-USD-PYUSD-Plans-to-Use-Stellar-for-New-Use-Cases)
- 18 sep 2025 (anunciado en Río de Janeiro): PYUSD en vivo en Stellar; regulado por NYDFS, respaldado 1:1; casos de uso: PayFi para PyMEs, capital de trabajo en tiempo real, transferencias de bajo costo, pagos programables con Soroban; plataformas de soporte: Bitcoin.com, Chipper Cash, Decaf, Arculus, Meru, CiNKO, COCA, Lobstr; May Zabaneh (PayPal): "Expanding PYUSD to Stellar broadens access and opens up new use cases" — [SDF: PYUSD is now available on Stellar](https://stellar.org/press/paypal-pyusd-is-now-available-on-stellar); Kraken habilitó depósitos/retiros de PYUSD vía Stellar — [Kraken Blog](https://blog.kraken.com/product/new-features/pyusd-deposits-and-withdrawals-now-available-on-stellar)

**Etherfuse (México/Brasil)**
- 22 may 2024: Etherfuse introdujo MXNe, stablecoin de peso mexicano respaldada por Stablebonds (CETES, "BBB+ rated bonds"), emitida vía Brale, en Solana, Base y **Stellar**; usos: remesas, nómina, transacciones de bajo costo; fundador y CEO: David (Dave) Taylor — [Etherfuse Substack](https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne); caso de Brale: [brale.xyz](https://brale.xyz/case-studies/etherfuse)
- Meridian 2025 (Río): Etherfuse presentó TESOURO, stablebond basado en bonos del banco central de Brasil con 13% APY — [The Defiant, sep 2025](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets)

**Félix Pagos + Bitso (remesas EE. UU. → México)**
- Félix: plataforma de remesas por WhatsApp para migrantes latinos en EE. UU.; convierte USD a USDC en Stellar vía la cuenta de Bitso y Bitso convierte a MXN y liquida por **SPEI** a cualquier banco mexicano; Bitso: "Latin America's largest cryptocurrency platform" con 5 M+ de usuarios en México, Argentina, Brasil y Colombia; métricas: +70% mensual en volumen, US$100 mil semanales en USDC sobre Stellar, NPS 80, liquidación de horas/días a segundos, comisión tradicional promedio US$10 por US$300; lanzamiento con Bitso a inicios de 2022 **[autoreportado por SDF/socios]** — [SDF: caso Félix + Bitso](https://stellar.org/case-studies/felix-bitso); anuncio de integración de USDC de Stellar por Bitso — [SDF blog](https://stellar.org/blog/ecosystem/latam-crypto-exchange-bitso-to-integrate-stellar-usdc); cobertura en español — [CriptoNoticias](https://www.criptonoticias.com/finanzas/bitso-stellar-permiten-transferencias-internacionales-hacia-latam/)

**Otros (Meridian 2025 y Q2 2026)**
- Ondo Finance confirmó el lanzamiento de USDY en Stellar; LayerZero integró Stellar; la SDF presentó Meridian Pay (billetera inteligente open source con "invisible smart contracts") — [The Defiant, sep 2025](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets)
- Figure YLDS y selección por DTCC (Q2 2026) — ver sección 1 — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- Coins.ph (Filipinas) es socio de la red desde diciembre de 2016 — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network))

### Inferences
- El patrón de los casos exitosos en Stellar es "institución regulada + activo real + rampa de efectivo": MoneyGram (efectivo), Franklin Templeton (fondo registrado), UNHCR (ayuda humanitaria), PayPal (stablecoin regulada), Etherfuse (deuda soberana). CREDI-CEDA encaja en el lenguaje del ecosistema si se presenta como "registro verificable de un activo real (crédito comercial) con firma de las dos partes", no como DeFi especulativo.
- BENJI vive en varias cadenas (US$650 M de US$1.98 mil M están en Stellar), por lo que el argumento correcto es "Stellar fue la primera y sigue siendo una de las principales", no "exclusiva".
- Félix + Bitso demuestra que ya existe una ruta USDC (Stellar) → MXN vía SPEI operando en México; eso es útil para el "siguiente paso" del pitch (liquidar pagos de crédito en pesos), sin necesidad de prometerlo en la demo.
- La Stellar Disbursement Platform (open source, 2023) es un antecedente de "desembolsos programables a muchos beneficiarios"; podría citarse como evidencia de que el ecosistema ya construyó herramientas de pagos masivos que un fondeador de crédito para la CEDA podría reutilizar.

### Gaps
- WisdomTree Prime, Mastercard Crypto Credential, IRC, Vibrant/Beans (Argentina), Cowrie (Nigeria) y Airtm como *anchor* activo: no se obtuvieron fuentes primarias en esta ronda; no incluir cifras sin verificar.
- Cifras de uso de MoneyGram Ramps (volumen de cash-in/cash-out en USDC) nunca han sido publicadas en las fuentes consultadas.
- UNHCR: no se encontró cifra acumulada 2024–2026 posterior a los US$1.1 M del primer año.
- Etherfuse: oferta circulante de MXNe/CETES en Stellar, y si el stablebond CETES está emitido en Stellar (no solo MXNe) — no confirmado.
- Bitso como *anchor* SEP-24 formal para MXN en el directorio de anchors: no verificado (el directorio está en https://anchors.stellar.org/).

---

## 4. Programas del ecosistema (SCF, Build Better, Meridian, hackathons)

### Takeaway
La SDF financia al ecosistema principalmente vía el Stellar Community Fund (SCF): US$42 M+ acumulados a 650+ proyectos desde 2019 y ~US$17 M solo en 2025, con Argentina y Brasil entre los cuatro países con más equipos financiados. Meridian 2025 fue en Río de Janeiro (17–18 sep 2025) y Meridian 2026 será en Lisboa (28–29 oct 2026) con HackMeridian los días 25–26. Los hackathons recientes premian productos que resuelven acceso financiero real y llegan a mainnet.

### Cited Findings
**Stellar Community Fund (SCF)**
- 2025: Build Award US$14.4 M en XLM a 154 proyectos; Audit Bank US$1.3 M (23 auditorías, 21 protocolos); Public Goods Award US$419 mil (10 proyectos); Growth Hack piloto US$300 mil (10 empresas); Liquidity Award US$200 mil (4 protocolos); Kickstart US$570 mil (41 equipos); total 2025 ~US$17 M+; acumulado desde 2019: más de US$42 M a 650+ proyectos; 8 rondas de Build Award (SCF #33–#40); 1,163 postulaciones (644 de Build), tasa de premiación ~25%; 82 equipos completaron lanzamiento en mainnet; 10 firmas de auditoría **[autoreportado]** — [SCF 2025 Impact Report (Medium, mar 2026)](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)
- Alcance geográfico: equipos en 86 países; principales: Nigeria, **Argentina, Brasil** y EE. UU.; >33% de las empresas apuntan a acceso financiero en mercados desatendidos; proyectos destacados de LatAm: AlfredPay (billetera LatAm, Serie A de US$15 M, +40% mensual de usuarios en Q4), Decaf (US$48 M de volumen mensual), Amero Exchange (colaboración con PNUD Guatemala para inversión comunitaria ligada a remesas); 120 equipos levantaron ~US$70 M externos tras el SCF; 52 de 154 (34%) llegaron a mainnet; >50% de las empresas activas con fines de lucro generan ingresos (~US$57 mil/mes promedio) **[autoreportado]** — [SCF 2025 Impact Report](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)
- SCF 7.0 (lanzado enero 2026): intake por referidos, soporte de crecimiento post-mainnet, modelo continuo de seguridad, descentralización progresiva de la gobernanza y evaluación "AI-aware" — [SCF 2025 Impact Report](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)
- Rondas SCF #42 y #43 (H1 2026): US$5.5 M a 55 empresas **[autoreportado]** — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived); existe recap de SCF #44 (jul 2026) — [Medium: SCF #44 Round Recap](https://medium.com/stellar-community/scf-44-round-recap-b5e8acd87045)
- Build Award: hasta US$150 mil+ por proyecto — [communityfund.stellar.org/awards](https://communityfund.stellar.org/awards); manual del programa — [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award)

**Build Better (2024)**
- "Build Better on Stellar: Smart Contract Challenge" en Dev.to: 10 jul–18 ago 2024, ganadores 27 ago 2024; premios de US$50 mil+; categorías: Overall dApp (US$13 mil), Overall Tutorial (US$13 mil), Glorious Game, Super Sustainable (dApp de impacto real), Wonderfully Written, Vivid Video (US$6 mil c/u); ganadores de las dos categorías generales viajaron a Meridian 2024 en Londres (15–17 oct 2024) — [SDF: Build Better challenge](https://stellar.org/community/build-better-challenge); edición en DoraHacks (no accesible al fetch, HTTP 405) — [DoraHacks](https://dorahacks.io/hackathon/build-on-stellar/report)

**Meridian**
- Meridian 2019: Ciudad de México (4 nov 2019, anuncio de la quema) — [CoinDesk 2019](https://www.coindesk.com/markets/2019/11/05/stellars-foundation-just-destroyed-half-the-supply-of-its-lumens-cryptocurrency)
- Meridian 2024: Londres, 15–17 oct 2024 — [SDF: Build Better](https://stellar.org/community/build-better-challenge)
- Meridian 2025: Río de Janeiro (Copacabana Palace), 17–18 sep 2025; foco en RWA, stablecoins y mercados emergentes; un expresidente del Banco Central de Brasil afirmó que las stablecoins "provide a very cheap way to create an account in dollars" — [The Defiant, sep 2025](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets); página oficial — [stellar.org/community/events/meridian-2025](https://stellar.org/community/events/meridian-2025)
- Meridian 2026: Lisboa, Portugal, 28–29 oct 2026 — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)

**Hackathons 2024–2026**
- HackMeridian 2026: 25–26 oct 2026, ONE16, Lisboa; hasta US$30 mil en XLM; tracks "Genesis" (idea/prototipo → producto) y "Scale" (producto existente → producción); sin experiencia previa en Stellar requerida; apoyo de viaje para seleccionados; mentores de la SDF y herramienta de IA "Raven" — [hackmeridian.com](https://www.hackmeridian.com/)
- Stellar Agents Hackathon (Q1 2026): 600+ hackers, 260+ proyectos enfocados en pagos agénticos (protocolos x402 y MPP) — [Stellar Docs: reunión 2026-04-23](https://developers.stellar.org/meetings/2026/04/23)
- Rise In organiza hackathons regionales de Stellar (Build on Stellar Philippines, APAC Stellar Hackathon, Stellar Pro Hackathon) — [Rise In](https://www.risein.com/programs/stellar-pro-hackathon)

### Inferences
- Lo que tienen en común los proyectos que el ecosistema premia y financia (según el Impact Report): apuntan a acceso financiero en mercados desatendidos (33%+), llegan a mainnet (34% de los premiados) y generan ingresos. Para el pitch: presentar CREDI-CEDA con ruta explícita "testnet hoy → SCF Kickstart/Build Award → mainnet", en el vocabulario del SCF ("financial access", "underserved markets", "mainnet launch").
- Argentina y Brasil están entre los 4 países con más equipos financiados; México no aparece en el top-4, lo que puede jugar a favor ("hueco" de proyectos mexicanos con problema real) si se presenta bien.
- La existencia de un track "Genesis" en HackMeridian 2026 y de Kickstart en el SCF es una vía concreta de continuidad post-hackathon que se puede nombrar en la diapositiva de "siguientes pasos".

### Gaps
- Lista de proyectos ganadores de Build Better 2024, Stellar Agents Hackathon 2026 y hackathons de Rise In: no obtenida (las páginas no listan ganadores o no fueron accesibles).
- Bounties de Stellar en ETHGlobal 2024–2026: no verificados.
- Montos totales de SCF por país (México específicamente): no publicados en las fuentes consultadas.

---

## 5. Huella en México y Latinoamérica

### Takeaway
Stellar tiene presencia comprobable en México desde hace años: Meridian 2019 se celebró en la Ciudad de México; la SDF invirtió US$15 M en la fintech mexicana AirTM (2021, la mayor inversión de su fondo empresarial hasta entonces); Bitso integró USDC de Stellar y opera como rampa a pesos vía SPEI (caso Félix); Etherfuse emitió MXNe en Stellar respaldado por CETES; y Stellar Aid Assist menciona expansión a México. En la región, Argentina y Brasil concentran más equipos financiados y Meridian 2025 fue en Río. No se encontró evidencia pública de una relación formal Stellar–CriptoUNAM más allá del taller del hackathon (dato del proyecto).

### Cited Findings
**México**
- Meridian 2019 se realizó en la Ciudad de México (4 nov 2019) — [CoinDesk 2019](https://www.coindesk.com/markets/2019/11/05/stellars-foundation-just-destroyed-half-the-supply-of-its-lumens-cryptocurrency); [SDF: Next Steps](https://stellar.org/blog/foundation-news/sdfs-next-steps)
- 26 may 2021: la SDF invirtió US$15 M (en dólares, no en XLM) en AirTM, billetera digital y exchange mexicano con servicios de cuentas en dólares y remesas en LatAm; fue "the largest disbursement made by Stellar's enterprise fund" hasta ese momento; integración a Stellar prevista para 2022; Dixon: "we imagine a future where Latin America could become one of the fastest-growing regions for global remittances" — [CriptoNoticias, 2021](https://www.criptonoticias.com/negocios/stellar-invierte-usd-15-millones-mexicana-airtm-dinamizar-remesas/)
- Bitso (5 M+ usuarios; México, Argentina, Brasil, Colombia) integró USDC de Stellar y funge como rampa USDC → MXN vía SPEI en el caso Félix — [SDF: caso Félix + Bitso](https://stellar.org/case-studies/felix-bitso); [SDF blog: Bitso to integrate Stellar USDC](https://stellar.org/blog/ecosystem/latam-crypto-exchange-bitso-to-integrate-stellar-usdc); [Yahoo Finance](https://finance.yahoo.com/news/latin-american-crypto-firm-bitso-123000380.html)
- Etherfuse: MXNe (peso mexicano) en Stellar desde mayo 2024, respaldado por Stablebonds de CETES vía Brale — [Etherfuse Substack](https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne)
- Stellar Aid Assist: la SDF menciona expansión a Gambia y México **[autoreportado]** — [SDF: One year of Stellar Aid Assist](https://stellar.org/blog/thought-leadership/one-year-of-stellar-aid-assist)
- Bitso lista XLM para compra/venta en México — [Bitso: precio XLM](https://bitso.com/mx/prices/xlm)

**Latinoamérica**
- Meridian 2025 en Río de Janeiro (17–18 sep 2025); PYUSD en Stellar anunciado desde Río el 18 sep 2025; Etherfuse presentó TESOURO (Brasil) — [The Defiant](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets); [SDF: PYUSD live](https://stellar.org/press/paypal-pyusd-is-now-available-on-stellar)
- SCF 2025: Argentina y Brasil entre los 4 países con más equipos financiados; AlfredPay (LatAm), Decaf y Amero Exchange (Guatemala/PNUD) como casos destacados — [SCF 2025 Impact Report](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)
- MoneyGram: lanzamiento en El Salvador en 2026 y más despliegue en LatAm planeado — [Stellar Docs: reunión 2026-04-23](https://developers.stellar.org/meetings/2026/04/23)
- La SDF identifica "LATAM remittances" como eje regional y a Brasil entre los cuatro países de mayor concentración de uso (Q2 2026) **[autoreportado]** — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)

**CriptoUNAM**
- CriptoUNAM existe como comunidad (perfil en LinkedIn, Coyoacán, CDMX; grupo en Meetup; repositorio en GitHub) — [LinkedIn](https://www.linkedin.com/in/criptounam-oficial-a97815352/); [Meetup](https://www.meetup.com/criptounam/); [GitHub](https://github.com/AngelTapiaLedesma/CriptoUNAM). No se encontró en esta búsqueda una página pública que documente una alianza formal Stellar–CriptoUNAM; el taller de Stellar en GOYA HACK consta en la información del proyecto (fuente: organizadores del hackathon).

### Inferences
- Narrativa de pitch sugerida: "Stellar ya está en México: anunció su reestructura en la CDMX (2019), invirtió US$15 M en AirTM (2021), Bitso liquida USDC de Stellar a pesos por SPEI, y hay un peso digital respaldado por CETES (MXNe) sobre la red. Lo que falta es un caso de uso para la economía real de la CEDA: ese es el nuestro."
- La ruta Stellar → Bitso → SPEI ya existe y está documentada por la SDF; se puede usar para el "siguiente paso" (liquidar pagos de crédito en MXN sin que el comerciante toque cripto), sin prometerlo en la demo.

### Gaps
- Estado actual (2026) de la integración AirTM–Stellar (si opera como anchor y con qué volumen): no verificado.
- Anchors SEP-24/SEP-31 activos para MXN en 2026 (Bitso, AirTM, Etherfuse/Brale u otros) y su estado en el directorio oficial: no verificado.
- Notas regulatorias de México (Ley Fintech, criterio de Banxico sobre activos virtuales, tratamiento de stablecoins MXN): no se investigaron en esta ronda; se recomienda una fuente primaria (DOF/Banxico/CNBV) antes de afirmar algo en el pitch.
- Presencia de Stellar en Colombia: no encontrada más allá de la operación de Bitso.
- Eventos de Stellar en México 2024–2026 (meetups, Stellar Hacks): no se encontraron fuentes.

---

## 6. Comparación honesta para CREDI-CEDA (vs Avalanche, Ethereum L2, Solana, Polygon)

### Takeaway
Lo que Stellar aporta de forma sourceable a nuestro caso: comisiones fijas y minúsculas (100 stroops por operación), finalidad determinista al cierre del ledger sin reorganizaciones, verificación nativa de secp256r1 (passkeys) desde 2024, 99.99%+ de uptime reportado y un ecosistema orientado a activos reales, stablecoins reguladas y rampas de efectivo. Sus debilidades honestas: Soroban es joven (mainnet 2024, parche de emergencia en P24), la actividad on-chain diaria es modesta (~63 mil direcciones activas/día), la red depende fuertemente de una sola fundación que además concentra buena parte de los XLM, y el ecosistema de desarrolladores y herramientas es menor que el de EVM/Solana. No se obtuvieron en esta ronda cifras comparables de las otras redes, por lo que la comparación cuantitativa queda como pendiente.

### Cited Findings
**Fortalezas de Stellar con fuente**
- Comisión base 100 stroops (0.00001 XLM) por operación; modelo de fees de Soroban (recurso + inclusión) y renta de almacenamiento por TTL; finalidad al cierre del ledger sin reorganizaciones — [Stellar Docs: Fees](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering)
- Verificación de firmas secp256r1 en protocolo desde Protocol 21 (18 jun 2024) — base técnica de passkeys/WebAuthn — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Delegación de autenticación y credenciales anti-replay para cuentas inteligentes (Protocol 27, 2026) — [SDF: Zipper](https://stellar.org/blog/foundation-news/stellar-zipper-protocol-27-upgrade-guide)
- 99.99%+ uptime, cero incidentes de seguridad del protocolo central, comisiones promedio "around one hundredth of a penny" (Q2 2026) **[autoreportado]** — [SDF Q2 2026](https://stellar.org/blog/foundation-news/q2-2026-what-stellar-was-built-for-has-arrived)
- Foco en RWA/stablecoins reguladas con emisores de primer nivel (Franklin Templeton, PayPal, MoneyGram/Bridge, Figure, DTCC, Ondo) — ver sección 3.
- Ejecución paralela de contratos (Protocol 23, sep 2025) y funciones ZK nativas (P26) — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades); [SDF: Yardstick](https://stellar.org/blog/foundation-news/yardstick-stellar-protocol-26)

**Debilidades y riesgos de Stellar con fuente**
- Soroban llegó a mainnet apenas en 2024 (Protocol 20); el Protocol 24 fue un upgrade de estabilidad con calendario comprimido para corregir un bug en state archival — [Stellar: Protocol Upgrades](https://stellar.org/protocol-upgrades)
- Actividad diaria modesta: ~63 mil direcciones activas diarias promedio en Q2 2026 (rango 44 mil–113 mil) — [Nansen Q2 2026](https://nansen.ai/post/stellar-q2-2026-report)
- TVL DeFi pequeño: ~US$150 M en sep 2025 (máximo histórico cercano) — [The Defiant](https://thedefiant.io/news/blockchains/stellar-s-flagship-meridian-conference-highlights-focus-on-rwas-stablecoins-and-emerging-markets); Aquarius, el protocolo destacado, apenas cruzó US$50 M de TVL en Q1 2026 — [Stellar Docs: reunión 2026-04-23](https://developers.stellar.org/meetings/2026/04/23)
- Concentración en la fundación: tras la quema de 2019 la SDF conservaba ~30 mil M de 50 mil M de XLM (~60%) — [CoinDesk 2019](https://www.coindesk.com/markets/2019/11/05/stellars-foundation-just-destroyed-half-the-supply-of-its-lumens-cryptocurrency); la SDF no tiene estatus 501(c)(3) — [Wikipedia](https://en.wikipedia.org/wiki/Stellar_(payment_network)); Forbes reportó en 2023 que la fundación de McCaleb prestó dinero a Genesis — [Forbes, ene 2023](https://www.forbes.com/sites/johnhyatt/2023/01/20/crypto-billionaire-ripple-founder-jed-mccalebs-nonprofit-lent-money-to-genesis/)
- Nuevo poder de gobernanza en P26: *Quorum Freeze* permite a los validadores mantener una lista de llaves de ledger congeladas ("governed incident response for financial networks") — útil para instituciones, pero es un mecanismo de intervención a nivel protocolo que conviene conocer — [SDF: Yardstick](https://stellar.org/blog/foundation-news/yardstick-stellar-protocol-26)
- La SDF es la principal fuente de financiamiento del ecosistema (US$42 M+ vía SCF desde 2019) — dependencia de un solo actor — [SCF 2025 Impact Report](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)

### Inferences
- **Por qué Stellar y no una base de datos** (argumento que exige el proyecto): la base de datos la controlaría una sola parte (el proveedor o el mercado); el registro de crédito de CREDI-CEDA necesita que ni el proveedor ni el comerciante puedan alterar el historial unilateralmente y que el comerciante pueda llevárselo a otro proveedor (portabilidad). Stellar da eso con finalidad determinista, sin reorgs, a costo casi cero por registro (100 stroops) y con firmas passkey nativas (secp256r1), lo que permite que un comerciante firme desde su teléfono sin frase semilla. Esta es una inferencia técnica construida sobre las fuentes anteriores; no es una comparación medida contra otras cadenas.
- **Vs Ethereum L2 / Polygon / Avalanche / Solana** (inferencia; sin cifras comparables obtenidas en esta ronda): esas redes tienen ecosistemas de desarrolladores, wallets y proveedores RPC más grandes y maduros (EVM tiene la mayor base de herramientas); Solana tiene mucha más actividad diaria; Avalanche estuvo presente en el hackathon y también impulsa RWA y subredes institucionales. Stellar se diferencia por (a) comisión fija y predecible en lugar de mercado de gas volátil, (b) finalidad determinista de consenso federado (no probabilística ni dependiente de un secuenciador centralizado como en muchas L2), (c) passkeys a nivel protocolo, y (d) la red de rampas de efectivo (MoneyGram, Bitso/SPEI) relevante para comerciantes que operan en efectivo. Estas afirmaciones sobre las otras redes deben verificarse con fuentes antes de ponerlas en una diapositiva.
- **Irrelevancia del precio de XLM para nuestro caso**: las comisiones se pagan en XLM pero son de 100 stroops por operación; un movimiento de precio de 10x cambia el costo por registro de fracción de centavo a fracción de centavo. El pitch no debe hablar de XLM como activo; debe hablar de costo por registro y finalidad.
- Riesgo a reconocer en el pitch (fortalece credibilidad): "Soroban es joven y la red vive de una fundación; por eso empezamos en testnet, con contratos mínimos y con plan de auditoría vía SCF Audit Bank antes de mainnet".

### Gaps
- No se obtuvieron cifras comparables (comisión promedio, tiempo de finalidad, direcciones activas diarias, desarrolladores activos) de Avalanche, Ethereum L2 (Arbitrum/Base/Optimism), Polygon ni Solana en esta ronda; tampoco el informe de desarrolladores de Electric Capital 2025. Se requiere una búsqueda dedicada si la comparación cuantitativa va a aparecer en el deck.
- Tiempo de cierre de ledger actual en Stellar (post-Protocol 23 "dynamic ledger timing") y número de validadores/organizaciones Tier-1: no obtenidos.
- Número de proveedores RPC de Soroban en 2026 (ronda anterior cubrió tooling; aquí no se re-verificó).
- El "#2 globally" de desarrolladores activos mensuales es autoreportado por la SDF sin que la fuente indique la metodología ni el ranking completo.

---

## Nota metodológica
- Corte: 25 de septiembre de 2026. Se usaron ~30 llamadas de búsqueda/fetch (por encima del time-box sugerido de 20–25) para cubrir las seis preguntas. 
- Fuentes primarias no accesibles por bloqueo (HTTP 403/405): informes de Messari "State of Stellar" Q4 2025 y Q1 2026; página de DoraHacks del Build Better Hackathon. Se sustituyeron con el resumen oficial de la SDF, las notas de reunión de developers.stellar.org (que resumen el informe de Messari Q1 2026) y el informe de Nansen del Q2 2026.
- Etiqueta **[autoreportado]** = cifra publicada por la SDF o por el socio del caso, sin verificación independiente.
