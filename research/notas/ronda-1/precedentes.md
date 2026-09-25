# Precedentes: historial crediticio / reputación de pago para micro-comerciantes (blockchain y alternativas)

Nota de alcance: ~20 búsquedas/lecturas, 25-sep-2026. Todo lo que no se pudo verificar está en "Gaps". Nada aquí es dato de la CEDA; son precedentes externos.

## 1. Proyectos blockchain de historial crediticio / reputación: ¿qué pasó con ellos?

### Takeaway
Los precedentes blockchain más citados de "historial crediticio portable" fracasaron o se cerraron (Kiva Protocol cerró en 2022; Bloom fue sancionado por la SEC y su producto no estaba terminado al vender su token). Lo que sobrevive con escala es "registro de transacciones en la cadena de suministro" (BanQu), no un buró crediticio. No encontré un proyecto en Stellar/Soroban de historial crediticio entre comercios con tracción verificable.

### Cited Findings
**Kiva Protocol (Sierra Leona) — CERRADO**
- En 2019 Kiva, el gobierno de Sierra Leona y agencias de la ONU (UNCDF, PNUD) anunciaron un "credit bureau of the future" basado en blockchain e identidad digital — [Kiva blog](https://www.kiva.org/blog/kiva-sierra-leone-and-un-agencies-partner-to-implement-credit-bureau-of-the-future); [Cointelegraph](https://cointelegraph.com/news/un-sierra-leone-launch-blockchain-based-credit-bureau-of-the-future)
- El objetivo declarado: "construir el primer sistema nacional de identidad y crédito basado en blockchain del país" — [Kiva Protocol page](https://www.kiva.org/protocol)
- Estado: "Kiva will sunset operations of Kiva Protocol, effective June 30, 2022." — [Kiva Protocol page](https://www.kiva.org/protocol)
- Lección documentada: el componente crítico era la identidad nacional (dependía de un programa gubernamental de ID) — [Ledger Insights](https://www.ledgerinsights.com/kiva-sierra-leone-blockchain-id-system/). Las razones exactas del cierre no las leí (el blog del cierre no se revisó) → ver Gaps.

**Bloom (BloomID / BloomScore, EE. UU.) — SANCIONADO / SIN PRODUCTO COMPLETO**
- Recaudó ~US$30.9 millones de 7,358 inversionistas en ICO (nov-2017 a ene-2018) con el token BLT — [SEC Orden 33-11089, 9-ago-2022](https://www.sec.gov/files/litigation/admin/2022/33-11089.pdf)
- La SEC determinó que BLT era un valor no registrado; multa inicial US$300,000, obligación de registrar el token y abrir proceso de reclamos para inversionistas — [SEC](https://www.sec.gov/files/litigation/admin/2022/33-11089.pdf)
- "El producto promocionado por Bloom no estaba completamente desarrollado" al cierre de la venta (BloomID, BloomIQ, BloomScore, BloomCard incompletos) — [SEC](https://www.sec.gov/files/litigation/admin/2022/33-11089.pdf)
- En 2020 Bloom se asoció con TransUnion para monitoreo de crédito (es decir, terminó apoyándose en un buró tradicional como fuente de datos) — [Forbes 2020](https://www.forbes.com/sites/oluwaseunadeyanju/2020/04/14/bloom-partners-with-transunion-to-bring-consumer-credit-data-to-blockchain/); [Ledger Insights](https://www.ledgerinsights.com/blockchain-credit-score-digital-identity-bloom-transunion/)

**Cred (EE. UU.) — QUIEBRA Y FRAUDE (no es un buró; es prestamista cripto)**
- Cred se declaró en quiebra en nov-2020 tras pérdidas y presunto fraude — [CoinDesk](https://www.coindesk.com/business/2020/11/08/crypto-lender-cred-files-for-bankruptcy-after-losing-funds-in-fraud); ejecutivos sentenciados por fraude electrónico — [CBS SF](https://www.cbsnews.com/sanfrancisco/news/cred-llc-crypto-lender-executives-schatt-podulka-wire-fraud-federal-prison/)
- Relevancia: es ejemplo del riesgo reputacional de "cripto + crédito" ante jueces; NO es precedente de historial crediticio.

**BanQu (agro / recicladores, África y +40 países) — ACTIVO**
- Plataforma "patentada, blockchain no-cripto" que registra transacciones de pequeños agricultores y recicladores vía SMS, creando "pasaportes económicos" — [OECD OPSI](https://oecd-opsi.org/innovations/banqu-economic-passports-for-smallholder-farmers-and-informal-waste-pickers/)
- AB InBev la desplegó en 7 países; BanQu reporta >1 millón de beneficiarios en 40+ países (cifras autodeclaradas) — [OECD OPSI](https://oecd-opsi.org/innovations/banqu-economic-passports-for-smallholder-farmers-and-informal-waste-pickers/); [WEF 2021](https://www.weforum.org/stories/2021/05/banqu-financial-inclusion-sustainability/)
- La fuente NO confirma que esos datos se usen para otorgar crédito; habla de "bankability" — [OECD OPSI](https://oecd-opsi.org/innovations/banqu-economic-passports-for-smallholder-farmers-and-informal-waste-pickers/)
- Clave de adopción: la pagó un comprador ancla (AB InBev) con interés propio en trazabilidad.

**Stellar**
- El ecosistema Stellar tiene fondo de grants (Stellar Community Fund) — [SCF](https://communityfund.stellar.org/projects). En la búsqueda sólo aparecieron repos de hackathon/demo (p. ej. "InvoiceFi-Stellar", tokenización de cosechas en Soroban) sin evidencia de uso real — [GitHub](https://github.com/EmmanuelAdah/InvoiceFi-Stellar)

### Inferences
- Patrón de fracaso: proyectos que empezaron por el token/la identidad nacional y no por un flujo transaccional existente con un pagador interesado. Patrón de supervivencia (BanQu): ancla comercial que ya registra la transacción y la usa para su propio negocio.
- Para el pitch: decir abiertamente "Kiva Protocol cerró; aprendimos que no hay que depender de identidad nacional ni de un token". El diseño CEDA no emite token y se apoya en una relación comercial que ya existe (la nota de crédito bodega–cliente).

### Gaps
- Razones oficiales del cierre de Kiva Protocol (blog de sunset no leído).
- Estado 2026 de Bloom (si sigue operando) — no verificado.
- Celo/Kotani Pay u otros casos africanos de historial crediticio on-chain: no investigados por tiempo.
- Casos Colombia/Argentina/Brasil de historial crediticio en blockchain: no encontrados en esta ronda.
- No encontré un precedente Stellar de historial crediticio B2B con usuarios reales. "No encontramos" ≠ "no existe".

## 2. Alternativas sin blockchain que ya resuelven (parte de) el problema

### Takeaway
Crédito a tienditas y B2B BNPL ya existen en México con datos alternativos (Tienda Pago, Rabbit/Propaga, Kontempo, Mercado Pago), y India resolvió el descuento de facturas MIPYME con una plataforma centralizada regulada (TReDS) sin blockchain. El hueco que queda: esos historiales son silos propiedad de cada fintech/distribuidor; el comerciante no puede llevarse su historial de pago con proveedores a otro proveedor.

### Cited Findings
**México**
- Tienda Pago (México y Perú, >10 años): financia inventario de tiendas vía distribuidores, pago a 7 días; reporta 80,000+ tiendas, 2,000+ préstamos diarios; socios como Heineken y Arca Continental; alta con "sólo tu ID y validación de que tienes negocio" (cifras autodeclaradas) — [tiendapago.com](https://www.tiendapago.com/)
- Rabbit (app de surtido para tienditas, ~5 años a 2026) ofrece "Crédito Rabbit" con Propaga: compra hoy y paga en 15 días; la app guarda historial de compras — [Rabbit blog, abr-2026](https://rabbitmx.com/blog/5-anos-de-rabbit-la-evolucion-digital-de-tu-tienda/)
- Kontempo (B2B BNPL, México desde ene-2022): paga de inmediato al proveedor y cobra al comprador PyME a 30–60 días; seed de "más de US$30 millones" (jun-2022); 26 clientes enterprise incl. Home Depot, acceso a 100,000+ compradores PyME (oct-2022); dice usar datos alternativos para aprobar en minutos — [LatamFintech](https://www.latamfintech.co/articles/fintech-de-bnpl-kontempo-llega-a-mexico-para-ofrecer-sus-servicios-al-sector-b2b)
- Mercado Pago ofrece créditos a vendedores basados en su actividad en la plataforma — [Mercado Pago blog](https://www.mercadopago.com.mx/blog/que-son-creditos-para-vendedores-mercado-pago)

**India – TReDS (plataforma regulada por RBI, sin blockchain)**
- FY2025-26: ₹3.47 lakh crore en facturas financiadas; 2.46 lakh vendedores MIPYME registrados (may-2026); 21,431 compradores — [Data Diaries](https://datadiaries.in/stories/treds-built-for-msme/)
- Penetración ~1.2% de 1.6 crore MIPYMES registradas en GST; promedio de facturas por vendedor "menos de una al mes"; barreras: digitalización (e-factura) y falta de conocimiento — [Data Diaries](https://datadiaries.in/stories/treds-built-for-msme/)
- El gobierno indio obligó a empresas públicas (CPSE) a usar TReDS para pagar a MIPYMES — [Tulsian](https://news.tulsian.ai/news/regulation-legal/government-mandates-treds-for-cpse-msme-invoice-settlement.html) (fuente secundaria)

**Burós y marco legal México (crítico para el pitch)**
- La actividad de información crediticia "sólo podrá llevarse a cabo por Sociedades que obtengan la autorización" de la SHCP (arts. 5 y 6 LRSIC) — [LRSIC, Cámara de Diputados](https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf)
- Historiales se conservan al menos 72 meses; se puede eliminar información después de 72 meses (art. 23) — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf)
- Consultar requiere "autorización expresa del Cliente, mediante su firma" (art. 28); derecho a Reporte Especial y a reclamar información incorrecta (arts. 40, 42) — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf)

### Inferences
- Respuesta a "¿por qué no una base de datos?": las soluciones centralizadas funcionan cuando hay UN operador en quien todos confían y que tiene incentivo (el distribuidor en Tienda Pago, la fintech en Kontempo, el regulador en TReDS). En la CEDA el argumento blockchain sólo se sostiene si NO existe ese operador neutral aceptado por bodegas competidoras entre sí. Si el fideicomiso/administración de la CEDA pudiera operarlo y todos confiaran, una base de datos bastaría. Esto debe validarlo José (experiencia) — no hay fuente externa.
- Riesgo legal fuerte: un sistema donde "otras bodegas consultan el historial" de un cliente se parece a actividad de sociedad de información crediticia (art. 5 LRSIC). Mitigación de diseño: que el historial sea del cliente (credencial verificable que él presenta y firma para compartir, alineado con art. 28), no un buró consultable libremente. En el pitch: "el comerciante porta su historial; no somos buró". Confirmar con abogado es siguiente paso.
- TReDS muestra que aun con mandato gubernamental la adopción MIPYME es ~1.2%: la adopción es el riesgo #1, no la tecnología.

### Gaps
- Dun & Bradstreet / Creditsafe en México para crédito comercial a microempresas: no investigado.
- Konfío, Clip: no revisados en esta ronda.
- Cifras independientes (no autodeclaradas) de Tienda Pago, Rabbit, Kontempo: no encontradas.
- Si Kontempo sigue operando en 2026: no verificado.

## 3. Críticas conocidas y mitigaciones documentadas

### Takeaway
Los organismos (Banco Mundial 2019, EDPB 2025) coinciden: blockchain en crédito sigue mayormente en prueba de concepto, y datos personales no deben ir on-chain; lo aceptado es "hashes/pruebas on-chain, datos off-chain". Garbage-in-garbage-out y colusión no se resuelven con la cadena: se mitigan con firmas de ambas partes y con que el registro tenga consecuencias económicas reales.

### Cited Findings
- Banco Mundial (2019): DLT "podría" dar más automatización, seguridad y control de privacidad; permite que el cliente controle sus datos "mientras los valida el otorgante de crédito"; cita "credit passports" transfronterizos de Nova Credit y Creditinfo — [World Bank, Disruptive Technologies in the Credit Information Sharing Industry](https://documents1.worldbank.org/curated/en/587611557814694439/pdf/Disruptive-Technologies-in-the-Credit-Information-Sharing-Industry-Developments-and-Implications.pdf)
- Mismo reporte: blockchain sigue "at a proof-of-concept stage for all but a few applications"; obstáculos: costos y reparto de costos, alinear incentivos de actores, estandarización, seguridad, incertidumbre legal — [World Bank 2019](https://documents1.worldbank.org/curated/en/587611557814694439/pdf/Disruptive-Technologies-in-the-Credit-Information-Sharing-Industry-Developments-and-Implications.pdf)
- EDPB (UE, abril 2025): blockchain es "una tecnología como cualquier otra" sin excepción; datos seudónimos son personales si se pueden vincular; recomendación: datos off-chain, en cadena sólo "referencias, hashes o pruebas cifradas"; el derecho al olvido choca con la inmutabilidad — [OMFIF](https://www.omfif.org/2025/06/european-data-protection-board-puts-blockchain-at-a-gdpr-crossroads/); ver también [EU Blockchain Observatory 2018](https://blockchain-observatory.ec.europa.eu/document/download/b3a919ed-0045-46f8-89de-f23ca140e037_en?filename=20181016_report_gdpr.pdf) (no leído completo)
- En México, la LRSIC ya prevé eliminación de información después de 72 meses (art. 23) → un historial inmutable con datos personales on-chain chocaría con esa lógica — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf)
- Revisión sistemática de literatura sobre blockchain para financiamiento PyME (Journal of Trade Science) existe — [Emerald](https://www.emerald.com/insight/content/doi/10.1108/jts-06-2023-0003/full/html) (no leída; conclusiones no verificadas)

### Inferences (aplicación al diseño CEDA)
- Privacidad: en Stellar guardar sólo hash de la nota + estado (emitida/pagada/vencida) y claves públicas; nombres, montos detallados y RFC off-chain. Borrar el dato off-chain deja el hash huérfano (patrón "crypto-shredding"; mencionarlo como diseño, no como cumplimiento legal garantizado).
- Oráculo/GIGO: la cadena no sabe si el pago ocurrió. La doble firma (bodega + cliente) prueba acuerdo, no verdad. Mitigación: que el "pagado" lo firme también el cliente (o provenga de un pago on-chain/SPEI conciliado), y que una disputa quede registrada como disputa, no como impago.
- Sybil/colusión: una bodega y un "cliente" falso pueden inflar historial. Mitigaciones plausibles: ponderar el historial por número de bodegas distintas y verificadas (lista de emisores autorizados = bodegas con local en CEDA), no por número de notas. Esto requiere un registro de bodegas (punto semicentralizado; decirlo con honestidad).
- Portabilidad = argumento real: el historial vive en llaves del comerciante y lo pueden verificar terceros sin pedírselo a la bodega original ni a una fintech (lo que Tienda Pago/Kontempo no ofrecen: son silos).

### Gaps
- Papers BIS / IDB-BID / CGAP específicos sobre blockchain para buró comercial MIPYME: no encontré en esta ronda un reporte con conclusión directa.
- Casos documentados de fraude por colusión en sistemas de reputación on-chain: no buscados.
- Evidencia de uso real de W3C Verifiable Credentials / ZK en historial crediticio en LatAm: no encontrada.
