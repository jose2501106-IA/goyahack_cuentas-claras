# research/ — investigación con fuentes

Regla del proyecto: **todo dato sobre la CEDA lleva fuente, o se marca como "experiencia de José" o "plano". Sin fuente, se dice. Nunca se estima ni se inventa.** Las cifras autodeclaradas por empresas se marcan como tales.

## Empieza por aquí

| Archivo | Qué es | Cuándo leerlo |
|---|---|---|
| `00_sintesis-estrategica.md` | Síntesis de los 9 frentes de la ronda 2 más la ronda 1: diagnóstico sistémico, precedentes, Stellar, Rust, diseño del producto (máquina de estados, cadena vs fuera de cadena, consentimiento, semáforo), estrategia de implementación, riesgos, pitch, hoja de ruta, 143 fuentes | Antes de escribir pitch, deck, README público o especificación |
| `01_historial-crediticio-ceda.md` | Ronda 1 (24–25 sep): marco legal mexicano (LRSIC, LFPDPPP, pagaré electrónico, Ley Fintech), operación del crédito en la CEDA, precedentes de historial crediticio blockchain, herramientas Stellar para la demo | Para el detalle legal y técnico de la ronda 1 |
| `02_que-busca-el-organizador.md` | Qué ganan CriptoUNAM, Stellar y Avalanche con el hackathon; criterios escritos del SCF y rúbricas verificadas; qué han publicado otros equipos; checklist para satisfacerlos; pendientes (página oficial y correos) | Antes de escribir el pitch y de llenar el formulario de entrega |
| `03_talleres-y-evaluadores.md` | Cada taller y patrocinador de GOYA HACK "como si hubiéramos asistido": qué se enseñó, qué pide al proyecto, cómo lo cumple el proyecto; Pollar, Tangem, GrantFox, APEX, BAF, Avalanche; checklist para la evaluación en vivo | Antes de la mentoría y de la entrega |
| `04_competencia-y-ganadores.md` | Repos públicos de otros equipos de GOYA HACK; ganadores de hackathons de Stellar en México y LatAm; proyectos parecidos en el ecosistema; matriz de posicionamiento; diferenciadores y riesgos | Antes del pitch |
| `05_implementacion-y-replicabilidad.md` | Operación real de la Central (horarios, temporadas), administración y actores, bancos y programas, plan de 16 semanas con la administración, replicabilidad en otras centrales de México y LatAm | Para la propuesta a la administración y el piloto |
| `06_barreras-de-adopcion.md` | Barreras de adopción del micro-comercio con evidencia (fisco, fraude por enlaces, estigma cripto, extorsión, brecha digital) y qué ha funcionado; implicaciones para la campaña y el piloto | Para la campaña y el diseño del piloto |

## Notas de investigación (materia prima)

Cada nota sigue el formato *takeaway → hallazgos citados → inferencias → huecos*. Las inferencias van separadas de los hechos.

### `notas/ronda-3/` (25 sep, 11:00–11:45)

| Nota | Tema |
|---|---|
| `talleres_patrocinadores.md` | Talleres, patrocinadores y herramientas (versión pública: sin nombres de personas ni enlaces de referido) |
| `competencia_ganadores.md` | Competencia en GOYA HACK y ganadores de Stellar en México y LatAm |
| `implementacion_replicabilidad.md` | Logística de la Central, administración, bancos, centrales de abasto de México y LatAm |
| `barreras_adopcion.md` | Barreras de adopción con evidencia |
| `campana_fuentes_comportamiento.md` | Verificación de las fuentes de comportamiento usadas en la campaña |

### `notas/ronda-2/` (25 sep, 01:00–02:30)

| Nota | Tema |
|---|---|
| `economia_mercados_informales.md` | Formación de precios y valor en mercados mayoristas; confianza y crédito informal (Geertz, Fafchamps, McMillan & Woodruff, Ostrom); evidencia sobre compartir información crediticia (Djankov et al.); informalidad y efectivo en México (INEGI); comparativo Corabastos, CEAGESP, Buenos Aires, Lo Valledor, eNAM; bucles sistémicos |
| `mapa_sistemico_ceda.md` | Actores, incentivos y poder en la CEDA; flujos de mercancía, dinero e información; gobernanza de FICEDA 1981–2026; problemas documentados (extorsión, intermediación); digitalización; dónde encaja un registro co-firmado |
| `casos_blockchain.md` | Fracasos de consorcios (TradeLens, we.trade, Marco Polo, Contour, ASX, B3i) y éxitos con métricas (stablecoins, fondos tokenizados, Kinexys); aplicaciones en agro y comercio informal (GrainChain, Sarafu, Goldfinch, Huma, MiniPay); lecciones transversales; catálogo |
| `aplicaciones_latam_agro_comercio.md` | Ronda 2b: Agrotoken, Drex (Brasil), CPR tokenizada, LACChain/LNet, Twiga, Wasoko/MaxAB, Account Aggregator (India), postura de Banxico, Bitso Business, BlockchainHACKMX, CGAP sobre finanzas embebidas |
| `stellar_historia_casos.md` | Historia de Stellar 2014–2026, métricas de red, casos con números (MoneyGram, BENJI, ACNUR, PYUSD, Félix + Bitso), programas del ecosistema (SCF, Meridian), huella en México, comparación honesta con otras cadenas |
| `rust.md` | Historia (2006–2026), filosofía e idiomas, fortalezas y debilidades con evidencia, Rust + Wasm en Soroban, pitfalls de hackathon, talento en México |
| `adopcion_y_marketing.md` | Teoría de adopción (Rogers, Moore, TAM/UTAUT, mercados de dos lados, arranque en frío); catalizadores y fracasos (Pix, UPI, M-Pesa, CoDi, DiMo); preparación digital del comerciante mexicano (ENDUTIH, ENIF, Findex); marketing Web3 (qué funciona y qué no, airdrops); GTM fintech B2B a tienditas en LatAm |
| `diseno_reputacion.md` | Sistemas de reputación (eBay, Tadelis, Jøsang); estándares de atestación (EAS, VC/DID, SEP-45); credit scoring descentralizado; privacidad (EDPB 02/2025, HMAC, SD-JWT, ZK en Soroban); resistencia Sybil; diseño recomendado |
| `hackathon_que_gana.md` | CriptoUNAM y GOYA HACK; hackathons de Stellar 2024–2026; hackathons Web3 en LatAm; rúbricas y jueces; pitch de 3 minutos, demo, video, README; checklist para CREDI-CEDA |
| `por_que_hackathons_organizador.md` | Por qué las comunidades estudiantiles, la SDF y Avalanche organizan o patrocinan hackathons; evidencia sobre resultados (adopción +20 % al año siguiente); qué miden patrocinadores y qué premian jueces; checklist por actor |

### `notas/ronda-1/` (24–25 sep, 23:30–00:15)

| Nota | Tema |
|---|---|
| `marco_legal.md` | LRSIC, nueva LFPDPPP (2025), LGTOC y tesis 2031391 sobre pagaré digital, Código de Comercio, Ley Fintech y Banxico |
| `credito_en_la_ceda.md` | Lo poco que hay publicado sobre crédito en la CEDA; cifras de bodegas (FICEDA); gota a gota; plataforma MEGA; preguntas para José |
| `precedentes.md` | Kiva Protocol, Bloom, Cred, BanQu, Tienda Pago, Rabbit, Kontempo, TReDS, Banco Mundial 2019, EDPB |
| `stellar_tecnico.md` | Protocolo 27, versiones de SDK/CLI, storage y TTL, passkeys (passkey-kit, smart-account-kit), Launchtube descontinuado → OpenZeppelin Channels, MXNe, riesgos de construcción |

## Correcciones posteriores (25-sep, 11:50)

1. **Nombre:** el proyecto se llamó CREDI-CEDA (nombre de trabajo) hasta el 25-sep a las 10:28 y Palabra hasta las 12:06; hoy se llama **Cuentas Claras** y el equipo, **Palabra** (decisión #36). Los documentos de investigación conservan el nombre con el que se escribieron; cada uno lo advierte al inicio.
2. **Bodega del equipo:** se retiró su nombre y la cifra exacta de su fiado de todos los documentos públicos (decisión #28). Donde se lee "bodega ancla" y "cientos de miles de pesos al día", es esa sustitución.
3. **Privacidad:** la frase "nada en la cadena permite, por sí solo, saber quién es el cliente ni cuánto debe" (en `00_sintesis-estrategica.md` y en notas) es imprecisa: el rango de monto es visible y el estado de una cadena pública lo puede leer cualquiera. La versión correcta está en la spec v2, sección 3b.

## Lo que la investigación NO encontró (y por eso no se afirma)

- Ninguna fuente pública sobre instrumentos, plazos, cobranza o morosidad del fiado **bodega → cliente** en la CEDA. Todo eso es experiencia de José y así se etiqueta.
- Ninguna tasa oficial del "gota a gota"; solo casos de prensa.
- Ningún documento primario para los "9,000 millones de dólares anuales" de la CEDA; es cifra institucional repetida.
- Ninguna cifra pública de adopción de MXNe/Etherfuse ni un MXNe en testnet.
- Ninguna rúbrica, jurado ni premios publicados de GOYA HACK 2026 (el sitio no renderiza sin JavaScript).
- Ningún precedente en Stellar con usuarios reales para historial crediticio.
- Qué es APEX ("Sube tu proyecto") ni los ponentes, temarios o láminas de los talleres de GOYA HACK.
- Los montos de premios y los criterios con pesos de GOYA HACK; los ganadores completos de los eventos de Stellar organizados por BAF.
- Los días de mayor y menor venta de la Central; una cifra del miedo al SAT entre comerciantes.

## Cómo citar en el pitch y el README

- Máximo cinco datos en el pitch (ver `docs/hoja-de-hechos.md`); el resto vive en el README y en las respuestas preparadas.
- Cifras con estatus: *primaria*, *secundaria*, *autodeclarada* o *experiencia de José*.
- Vocabulario vetado: «buró», «pagaré ejecutable», cifras de sanciones de la LRSIC, la cifra de bodegas de Wikipedia, "260 denuncias diarias", una tasa del gota a gota, cualquier afirmación de que MEGA se integrará o de que el registro reduce la extorsión.
