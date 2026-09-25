# Marco legal: historial de pago compartido entre bodegas de la CEDA y notas/pagarés firmados electrónicamente

> Notas de investigación, 25 sep 2026. **No es asesoría legal.** Todo lo marcado como "Inferencia" debe validarlo un abogado antes de operar en producción/mainnet. Varias fuentes primarias (DOF, Condusef, SJF) bloquearon la descarga directa; se usaron las versiones de diputados.gob.mx vía resumen del fetch y análisis de despachos/medios. Los textos citados "verbatim" provienen de ese resumen y conviene cotejarlos en el PDF oficial.

## 1. LRSIC: ¿quién debe ser SIC? ¿Un grupo de bodegas que comparte comportamiento de pago cae en el régimen SIC? Sanciones

### Takeaway
La LRSIC reserva a las Sociedades de Información Crediticia (SIC) autorizadas por la SHCP la actividad de "recopilación, manejo y entrega o envío" del historial crediticio de personas físicas y morales, **incluidas las operaciones con Empresas Comerciales** (art. 5o). Las bodegas de la CEDA que venden a crédito son, por definición, "Empresas Comerciales" (art. 2, fr. IV) y pueden ser **Usuarios** de una SIC, pero una plataforma que recopile y entregue el historial de pago de clientes a varias bodegas se parece mucho a la actividad reservada. Es el riesgo legal más fuerte del proyecto.

### Cited Findings
- Última reforma de la LRSIC: DOF 24-01-2024 — [LRSIC, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Art. 2, fr. IV, **Empresas Comerciales**: "la persona moral u organismo público distintos de las Entidades Financieras, que realice operaciones de crédito relacionadas con la venta de sus productos o prestación de servicios" — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Art. 2, fr. XV, **Usuarios**: "las Entidades Financieras, las Empresas Comerciales y las Sofomes E.N.R., que proporcionen información o realicen consultas a la Sociedad" — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Definición de **Cliente**: "cualquier persona física o moral que solicite o sobre la cual se solicite información" — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Art. 5o: "La prestación de servicios consistentes en la recopilación, manejo y entrega o envío de información relativa al historial crediticio de personas físicas y morales, así como de operaciones crediticias y otras de naturaleza análoga que éstas mantengan con Entidades Financieras, Empresas Comerciales o las Sofomes E.N.R., sólo podrá llevarse a cabo por Sociedades que obtengan la autorización a que se refiere el artículo 6o." La autorización la otorga la SHCP, oyendo a Banxico y a la CNBV — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Art. 28: las SIC "solo podrán proporcionar información a un Usuario, cuando este cuente con la autorización expresa del Cliente, mediante su firma"; vigencia de 1 año (ampliable 2 años más con autorización expresa) y "permanecerá mientras exista relación jurídica entre el Usuario y el Cliente" — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Art. 29: obligaciones procedimentales para las Empresas Comerciales como Usuarios (obtener autorización del Cliente y entregar originales a la SIC en plazo de 30 días posteriores a la consulta, según el resumen del texto) — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Arts. 68 y 68 Bis: prevén multas aplicables a Empresas Comerciales y Sofomes (no se obtuvo el monto) — [leyes-mx.com, índice LRSIC](https://leyes-mx.com/ley_para_regular_las_sociedades_de_informacion_crediticia.htm)
- La LFPDPPP 2025 excluye de su aplicación a "las sociedades de información crediticia en los supuestos de la Ley para Regular las Sociedades de Información Crediticia" (art. 1) — [LFPDPPP, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)

### Inferences
- **El riesgo no está en que cada bodega lleve su cartera** (eso es su contabilidad), sino en un tercero (la plataforma) que "recopila, maneja y entrega" historiales de pago de clientes de varias Empresas Comerciales. Esa descripción coincide casi literalmente con el art. 5o. Operarlo en producción sin autorización de SHCP podría constituir actividad reservada. Debe validarlo un abogado.
- El diseño más defendible para el hackathon: (a) presentarlo como **prototipo en testnet con datos ficticios**; (b) posicionar la plataforma como **infraestructura de registro de notas/pagarés y de eventos del propio acreedor** (bitácora del crédito bilateral), no como "buró"; (c) presentar como ruta de salida: **alianza con una SIC autorizada** (Buró de Crédito o Círculo de Crédito) a la que las bodegas reporten como Empresas Comerciales, o que la plataforma sea proveedor tecnológico de una SIC.
- La consulta por terceros (otra bodega viendo el historial) es lo que más se parece a "entrega o envío" a Usuarios. Si se muestra en la demo, conviene condicionar la consulta a **autorización firmada del propio cliente (tiendita)**, imitando el art. 28, y decir en el pitch que en producción esto iría vía SIC.

### Gaps
- **No se pudo obtener el texto de los delitos/sanciones penales de la LRSIC** (años de prisión, días multa) por operar como SIC sin autorización: los PDFs de Condusef y diputados no se pudieron descargar completos y Justia no mostró el capítulo. No afirmar penas específicas sin cotejar el PDF oficial.
- No se obtuvieron los montos de las multas de los arts. 68 y 68 Bis.
- No se encontró criterio de CNBV/SHCP ni tesis sobre si un "club de proveedores" que comparte referencias entre sí (sin tercero intermediario) requiere autorización.

## 2. Alternativas legales: referencias comerciales, listas internas, burós gremiales, reportar a Buró/Círculo como Empresa Comercial

### Takeaway
La vía legal clara y existente es que cada bodega (persona moral) se afilie como **Usuario/Empresa Comercial** a una SIC autorizada (Buró de Crédito o Círculo de Crédito), con autorización firmada del cliente para consultarlo. Ambas SIC declaran aceptar otorgantes no bancarios. No se encontraron públicamente requisitos ni costos de afiliación.

### Cited Findings
- Círculo de Crédito afirma que sus usuarios "no solo son los bancos, si otorgas cualquier tipo de crédito, financiamiento o administras cartera", y lista tipos de negocio no financieros (mueblerías, agencias automotrices, prestadores de servicios, etc.) — [Círculo de Crédito, Afíliate](https://www.circulodecredito.com.mx/legales/afiliate)
- Buró de Crédito tiene el programa "Empresa + Buró" para empresas otorgantes ("Descubre lo que podemos aportar a tu proceso de prospección y otorgamiento"; incorporar información, recuperar cartera vencida), pero la página remite a un registro/contacto y no publica requisitos ni precios — [Buró de Crédito, Empresa + Buró](https://www.burodecredito.com.mx/personas-morales-y-pfae/empresa-bur%C3%B3.html)
- La LRSIC no impone requisitos de registro separados para que una Empresa Comercial sea Usuario; la obligación central es contar con la autorización expresa del Cliente mediante su firma (art. 28) y cumplir el art. 29 — [LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)
- Banxico emite "Reglas generales" para las operaciones de las SIC (circular de operaciones y actividades de las SIC) — [Banxico, Reglas generales SIC](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-operaciones-y-actividades-de-las-sociedad/%7B6029D1F3-2633-F5F7-65DD-D7A8A408C447%7D.pdf)

### Inferences
- **Referencias comerciales bilaterales** (una bodega le pregunta a otra "¿te paga?") son práctica común, pero no se encontró fuente que las declare expresamente fuera del art. 5o; si son esporádicas y sin un intermediario que sistematice la información, el riesgo parece menor. Si incluyen datos de personas físicas, aplica la LFPDPPP (ver sección 3). Validar con abogado.
- **Lista negra interna** de una sola bodega: es tratamiento de sus propios datos para su relación jurídica con el cliente (art. 9 LFPDPPP, excepción por relación jurídica). Compartirla con otras bodegas ya es transferencia y/o actividad tipo SIC.
- **Buró gremial** (p. ej., de una asociación de comerciantes de la CEDA): no se encontró ninguna excepción en la LRSIC para burós gremiales; conforme al art. 5o, tendría que ser SIC autorizada o actuar vía una SIC.
- Muchas bodegas de la CEDA pueden operar como personas físicas con actividad empresarial y no como personas morales; la definición de Empresa Comercial (art. 2, fr. IV) habla de "persona moral u organismo público". Si una bodega es persona física, podría no calificar como Empresa Comercial/Usuario. **Validar con abogado y con las SIC.**

### Gaps
- Costos, contrato tipo, volumen mínimo y requisitos técnicos para que una bodega se afilie a Buró o Círculo: no publicados; hay que preguntar directamente.
- No se encontró si una persona física con actividad empresarial puede ser Usuario de una SIC.

## 3. Datos personales: nueva LFPDPPP (20-mar-2025), consentimiento, transferencias y blockchain pública vs derecho de cancelación

### Takeaway
La nueva LFPDPPP está vigente (DOF 20-03-2025, en vigor al día siguiente; última reforma DOF 14-11-2025) y la autoridad ya no es el INAI sino la Secretaría Anticorrupción y Buen Gobierno. **Los datos financieros o patrimoniales requieren consentimiento expreso** (art. 7), y compartirlos con otras bodegas es transferencia (arts. 35-36). Escribir datos personales, aun seudonimizados, en una blockchain pública inmutable choca con el derecho de cancelación (art. 24): la recomendación es **datos personales fuera de cadena y solo hashes/compromisos en cadena**.

### Cited Findings
- Nueva LFPDPPP publicada en el DOF el 20-03-2025, en vigor al día siguiente; la Secretaría Anticorrupción y Buen Gobierno sustituye al INAI; sanciones en UMA; la falta en la atención de solicitudes ARCO es nueva infracción — [Garrigues](https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce)
- Última reforma: DOF 14-11-2025 — [LFPDPPP, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Art. 2, fr. V, datos personales: "Cualquier información concerniente a una persona identificada o identificable" — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Art. 7: "todo tratamiento de datos personales estará sujeto al consentimiento de la persona titular"; puede ser expreso (verbal, escrito, "por medios electrónicos, ópticos, signos inequívocos") o tácito; "Los datos financieros o patrimoniales requerirán el consentimiento expreso" — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Art. 9: excepciones al consentimiento, entre ellas datos "para ejercer un derecho o cumplir obligaciones derivadas de una relación jurídica entre la persona titular y el responsable", datos disociados previamente y orden judicial — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Art. 35: para transferir a terceros hay que comunicarles el aviso de privacidad y las finalidades; el aviso debe incluir una cláusula para aceptar o rechazar la transferencia. Art. 36: transferencias sin consentimiento solo en supuestos tasados (ley, salud, sociedades controladoras/subsidiarias/afiliadas, contrato en interés del titular, interés público, proceso judicial, mantenimiento de la relación jurídica) — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- La obligación de informar sobre transferencias en el aviso de privacidad sigue en el reglamento — [Garrigues](https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce)
- Art. 24: derecho a solicitar la "cancelación de sus datos personales", con un periodo de bloqueo y luego supresión; art. 18: medidas de seguridad administrativas, técnicas y físicas; art. 19: vulneraciones que afecten significativamente derechos patrimoniales se informan "de forma inmediata" — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Art. 59: multas de 100 a 160,000 UMA y de 200 a 320,000 UMA según la infracción, más multa adicional por reincidencia — [LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)
- Doctrina mexicana (Ocampo Muñoa, 2019): hay un conflicto entre la inmutabilidad de blockchain y el derecho de cancelación; propone almacenamiento off-chain de datos personales, cadenas permisionadas y autorregulación — [Estudios en Derecho a la Información, UNAM/SciELO](https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2594-00822019000200003&lng=en&nrm=iso)

### Inferences
- **La LFPDPPP protege a personas físicas** (titulares). Si la tiendita es persona moral, sus datos de empresa no son "datos personales", pero el dueño/firmante sí lo es. En la CEDA muchos clientes son personas físicas, así que aplica.
- **Registrar y cobrar la venta propia** entra en la excepción de relación jurídica (art. 9); **compartir el historial con otras bodegas no**: requiere consentimiento expreso (dato patrimonial) y cláusula de transferencia en el aviso de privacidad.
- **Diseño recomendado:** en Stellar/Soroban guardar solo `hash(nota firmada)`, un identificador seudónimo con sal por cliente y eventos (emitida/pagada/vencida). Nombre, teléfono, RFC y el documento van off-chain en una base borrable. Borrar la sal/clave off-chain hace que el hash deje de ser vinculable ("crypto-shredding"). **No se encontró fuente mexicana** que confirme que eso satisface la cancelación; es inferencia basada en la definición amplia de "identificable". Validar con abogado.
- Un identificador seudónimo estable, visible públicamente y correlacionable entre bodegas, puede seguir siendo dato personal (persona "identificable").

### Gaps
- No se encontraron criterios de la Secretaría Anticorrupción y Buen Gobierno ni del nuevo reglamento sobre blockchain, hashes o seudonimización.
- No se verificó si ya se publicó el nuevo Reglamento de la LFPDPPP 2025.

## 4. Pagarés y notas firmadas electrónicamente: LGTOC art. 170, pagaré electrónico, jurisprudencia y Código de Comercio (firma simple vs avanzada)

### Takeaway
La LGTOC **ya permite títulos de crédito electrónicos** (arts. 5 y 5 Bis, reforma DOF 26-03-2024). Pero hay una **tesis aislada de octubre de 2025 (registro 2031391)** del Segundo Tribunal Colegiado en Materia Civil del Primer Circuito que exige **firma electrónica avanzada (FEA)** para que un pagaré digital surta efectos como título de crédito. Con firma simple (passkey/biometría del teléfono), la nota vale como **mensaje de datos y prueba de la deuda** (Código de Comercio), pero es riesgoso afirmar que es un pagaré ejecutable por vía ejecutiva mercantil.

### Cited Findings
- LGTOC art. 5 (reformado DOF 26-03-2024): "Los títulos de crédito podrán emitirse en medios electrónicos, ópticos o por cualquier otra tecnología a través de un sistema de información" — [LGTOC, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf)
- LGTOC art. 5 Bis (adicionado DOF 26-03-2024): cuando la ley exija que las operaciones "consten por escrito, ese requisito se dará por cumplido respecto de un título de crédito emitido en medios electrónicos" — [LGTOC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf). Según Mifiel, el art. 5 Bis remite a las definiciones del Código de Comercio sin limitar la firma a FEA — [Mifiel](https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/)
- LGTOC art. 14: los títulos solo producen efectos "cuando contengan las menciones y llenen los requisitos señalados por la Ley" — [LGTOC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf)
- LGTOC art. 170, requisitos del pagaré: (I) mención de ser pagaré; (II) promesa incondicional de pagar una suma determinada; (III) nombre del beneficiario; (IV) época y lugar de pago; (V) fecha y lugar de suscripción; (VI) firma del suscriptor — [LGTOC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf)
- **Tesis aislada 2031391** (24-oct-2025), Segundo Tribunal Colegiado en Materia Civil del Primer Circuito: el pagaré digital requiere que, "cuando se requiera firma, ésta se realice a través de la firma electrónica avanzada"; es aislada, no jurisprudencia obligatoria — [Nexos, El Juego de la Corte](https://eljuegodelacorte.nexos.com.mx/cuando-una-tesis-sobre-pagares-digitales-afecta-la-inclusion-financiera/); [Mifiel](https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/); ficha en [SJF, registro 2031391](https://sjfsemanal.scjn.gob.mx/detalle/tesis/2031391) (no se pudo abrir, error 403)
- Existe una tesis relacionada, registro 2031392, sobre el endoso digital — [Mifiel](https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/)
- Críticas: la tesis confunde integridad (NOM-151, conservación) con atribución de autoría y contradice la neutralidad tecnológica de los arts. 89 a 90 Bis del CCom; además crea una barrera de inclusión financiera — [Nexos](https://eljuegodelacorte.nexos.com.mx/cuando-una-tesis-sobre-pagares-digitales-afecta-la-inclusion-financiera/); [Mifiel](https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/). En contraste, IDC titula que "solo la firma electrónica avanzada garantiza su validez" — [IDC, 17-dic-2025](https://idconline.mx/corporativo/2025/12/17/pagare-digital-solo-la-firma-electronica-avanzada-garantiza-su-validez)
- Código de Comercio (última reforma DOF 14-11-2025), art. 89: **Firma Electrónica** = "datos en forma electrónica consignados en un Mensaje de Datos, o adjuntados o lógicamente asociados al mismo por cualquier tecnología, que son utilizados para identificar al Firmante… e indicar que el Firmante aprueba la información"; **Firma Electrónica Avanzada o Fiable** = la que cumple las fracciones I a IV del art. 97; **Mensaje de Datos** = información "generada, enviada, recibida o archivada por medios electrónicos, ópticos o cualquier otra tecnología" — [CCom, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/CCom.pdf)
- CCom art. 89 bis: "No se negarán efectos jurídicos, validez o fuerza obligatoria a cualquier tipo de información por la sola razón de que esté contenida en un Mensaje de Datos"; art. 93: la forma escrita se cumple si la información "se mantenga íntegra y sea accesible para su ulterior consulta"; art. 97: la FEA exige (I) que los datos de creación correspondan exclusivamente al firmante, (II) que estén bajo su control exclusivo al firmar, (III) y (IV) que se pueda detectar cualquier alteración de la firma y del mensaje — [CCom](https://www.diputados.gob.mx/LeyesBiblio/pdf/CCom.pdf)

### Inferences
- **Una passkey o biometría del teléfono es firma electrónica simple.** Técnicamente puede acercarse a los requisitos del art. 97 (clave privada en el dispositivo bajo control exclusivo y hash que detecta alteraciones), pero no es la e.firma del SAT ni un certificado de un prestador de servicios de certificación. Con la tesis 2031391, **no conviene prometer en el pitch "pagaré ejecutable"**. Es más seguro decir "nota de crédito firmada electrónicamente con valor probatorio (CCom 89 bis, 93, 1298-A)" y, como siguiente paso, "pagaré con e.firma/FEA + constancia NOM-151".
- Anclar el hash del documento en Stellar ayuda a probar **integridad y fecha** (útil para la carga de la prueba), pero no resuelve la **atribución de identidad** que exige la tesis.
- La nota debe incluir las menciones del art. 170 si se quiere tratar como pagaré. Si no, es un reconocimiento de adeudo o comprobante de venta a crédito.

### Gaps
- No se pudo leer el texto oficial de la tesis 2031391 en el SJF (403). Las citas vienen de análisis secundarios.
- No se encontró jurisprudencia (obligatoria) ni contradicción de criterios de la SCJN sobre pagarés electrónicos a septiembre de 2026. Verificar en el SJF.
- No se verificó el texto de CCom art. 1298-A (valor probatorio de mensajes de datos) ni su ubicación actual. Pedir al abogado.
- No se confirmó la fecha exacta de la reforma de la LGTOC (26-03-2024 según el resumen del PDF de diputados). Cotejar en el DOF.

## 5. Blockchain y activos virtuales: Ley Fintech y Banxico si solo se registran eventos vs si se mueven pesos tokenizados

### Takeaway
Si el sistema **solo registra eventos** (hash de la nota, "pagado" o "vencido") y **no mueve dinero**, no se encontró regla de la Ley Fintech ni de Banxico que lo prohíba o exija autorización (el riesgo relevante es LRSIC y LFPDPPP). Si **mueve pesos tokenizados o stablecoins**, entra en terreno regulado: emitir o administrar fondos de pago electrónico requiere autorización de la CNBV (IFPE) y las entidades financieras solo pueden operar activos virtuales autorizados por Banxico y de forma restringida (Circular 4/2019).

### Cited Findings
- Ley Fintech (LRITF), última reforma DOF 14-11-2025. Art. 30: activo virtual = "la representación de valor registrada electrónicamente y utilizada entre el público como medio de pago"; las ITF solo pueden operar los que determine Banxico — [LRITF, diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRITF.pdf)
- Art. 34: las ITF deben advertir que el activo virtual "no es moneda de curso legal y no está respaldado por el Gobierno Federal, ni por el Banco de México" — [LRITF](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRITF.pdf)
- Art. 11: para realizar actividades de ITF hay que "obtener una autorización que será otorgada por la CNBV"; art. 22: la emisión y administración de fondos de pago electrónico está reservada a personas morales autorizadas por la CNBV — [LRITF](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRITF.pdf)
- Banxico, Circular 4/2019 (DOF 08-03-2019): disposiciones para instituciones de crédito e ITF en operaciones con activos virtuales — [Banxico, Circular 4/2019](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-4-2019/%7B8D7769AF-03F6-701A-68AA-EF25A73AD035%7D.pdf); [DOF](https://www.dof.gob.mx/nota_detalle.php?codigo=5552303&fecha=08/03/2019) (no se pudo abrir; el contenido detallado no se verificó en esta sesión)

### Inferences
- **Para el hackathon:** mantener el alcance en "registro de eventos, sin dinero". Esto evita el frente Fintech/Banxico. Si el pitch menciona liquidar con stablecoins (p. ej., en Stellar), presentarlo como siguiente paso **a través de un tercero autorizado** (IFPE o una institución con autorización), no como función propia.
- Los pagos en efectivo o transferencia SPEI siguen fuera de cadena. La cadena solo recibe la confirmación del acreedor ("pagado").
- Emitir un token que represente la deuda (pagaré tokenizado y transferible) podría rozar el régimen de títulos de crédito y valores. No se investigó. Evitarlo en el MVP.

### Gaps
- No se leyó el texto vigente de la Circular 4/2019 ni sus reformas (DOF bloqueado), ni se verificó si Banxico emitió en 2025-2026 nuevas reglas sobre stablecoins o tokenización.
- No se revisaron las penas por operar como ITF sin autorización (el resumen del texto no las incluyó).
