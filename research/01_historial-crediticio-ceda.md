# Reencuadrar el buró como bitácora co-firmada

> **Correcciones posteriores (25-sep-2026, 11:50):** el proyecto se llamó **Palabra** de las 10:28 a las 12:06 y hoy se llama **Cuentas Claras**, con el equipo **Palabra** (decisión #36); se retiró el nombre de la bodega del equipo y la cifra exacta de su fiado ("bodega ancla", "cientos de miles de pesos al día"); y la afirmación de que nada en la cadena permite saber quién es el cliente ni cuánto debe es imprecisa: ver spec v2, sección 3b, y `research/README.md`.

**Veredicto: sí es viable y defendible para GOYA HACK, pero solo si se reencuadra.** "Historial de crédito comercial portable consultable por otras bodegas" se parece casi palabra por palabra a la actividad que el art. 5o de la LRSIC reserva a las Sociedades de Información Crediticia autorizadas por la SHCP ([LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)). Por eso el producto debe presentarse como una **bitácora bilateral de notas de crédito co-firmadas (bodega + cliente) que el cliente porta y comparte con su autorización firmada**, y no como un buró. Además, la cadena guarda **solo hashes, IDs seudónimos y estados; nada de datos personales ni de dinero**. Así se esquivan tres frentes: la nueva LFPDPPP (los datos patrimoniales exigen consentimiento expreso y existe el derecho de cancelación), la Ley Fintech/Banxico (no se mueven pesos tokenizados) y la tesis aislada 2031391, que exige firma electrónica avanzada para que un pagaré digital sea título de crédito. Para la CEDA no hay ninguna fuente pública sobre cómo se da crédito de bodega a cliente. Lo único documentado es que el trato tradicional es "a palabra, en persona y con pagos en efectivo" ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)) y que en 2022 operó una célula "gota a gota" que prestaba entre 10 y 50 mil MXN a comerciantes de frutas, legumbres y abarrotes ([ADN40](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)). La tecnología cabe en 4 horas con un solo contrato Soroban y cuentas G de testnet. Lo difícil no es la cadena: es la **adopción** y la respuesta a "¿por qué no una base de datos?". Esa respuesta depende de un dato que solo José puede confirmar: que no existe un operador neutral en quien confíen bodegas que compiten entre sí.

## La LRSIC es el riesgo principal; el diseño lo desactiva

**Quién puede ser buró.** La LRSIC (última reforma DOF 24-01-2024) reserva la "recopilación, manejo y entrega o envío de información relativa al historial crediticio", incluida la que surge de operaciones con **Empresas Comerciales**, a sociedades autorizadas por la SHCP, oyendo a Banxico y a la CNBV (arts. 5o y 6o) ([LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)). Una bodega que vende a crédito es Empresa Comercial (art. 2, fr. IV) y puede ser Usuario de una SIC. Pero una plataforma que recopila los pagos de clientes de varias bodegas y se los entrega a otras hace exactamente lo que describe el art. 5o. Para consultar a una SIC se necesita "autorización expresa del Cliente, mediante su firma", con vigencia de un año (art. 28), y los historiales se pueden eliminar después de 72 meses (art. 23) ([LRSIC](https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf)). No se pudieron obtener las penas ni los montos de multa (arts. 68 y 68 Bis); **no se deben citar cifras de sanción en el pitch**. La ruta legal que ya existe es que cada bodega se afilie a Círculo de Crédito o a Buró de Crédito como otorgante no bancario. Ambas lo aceptan, pero no publican requisitos ni costos ([Círculo de Crédito](https://www.circulodecredito.com.mx/legales/afiliate); [Buró de Crédito](https://www.burodecredito.com.mx/personas-morales-y-pfae/empresa-bur%C3%B3.html)). Queda una duda abierta: la definición de Empresa Comercial habla de "persona moral", así que una bodega que opere como persona física con actividad empresarial podría no calificar. **Validar con abogado.**

**Datos personales.** La nueva LFPDPPP (DOF 20-03-2025, última reforma 14-11-2025) cambió al INAI por la Secretaría Anticorrupción y Buen Gobierno. Exige **consentimiento expreso para datos financieros o patrimoniales** (art. 7), trata como transferencia compartirlos con otras bodegas (arts. 35 y 36) y protege el derecho de cancelación (art. 24), con multas de hasta 320,000 UMA (art. 59) ([LFPDPPP](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf); [Garrigues](https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce)). Que la bodega registre su propia venta cae en la excepción por relación jurídica (art. 9). Compartir el registro con terceros no. La doctrina mexicana ([Ocampo Muñoa, 2019](https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2594-00822019000200003&lng=en&nrm=iso)) y el EDPB europeo ([OMFIF, 2025](https://www.omfif.org/2025/06/european-data-protection-board-puts-blockchain-at-a-gdpr-crossroads/)) coinciden en poner off-chain los datos personales y en cadena solo hashes. Un ID seudónimo estable y correlacionable puede seguir siendo dato personal. Borrar la sal off-chain ("crypto-shredding") es una mitigación de diseño, **no un cumplimiento confirmado por autoridad mexicana**.

**Nota o pagaré.** La LGTOC ya admite títulos de crédito electrónicos (arts. 5 y 5 Bis, reforma DOF 26-03-2024) ([LGTOC](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf)). Sin embargo, la **tesis aislada 2031391 (24-oct-2025)** del Segundo Tribunal Colegiado en Materia Civil del Primer Circuito exige firma electrónica avanzada para que el pagaré digital surta efectos. Es aislada, no obligatoria, y ha sido criticada por romper la neutralidad tecnológica ([Nexos](https://eljuegodelacorte.nexos.com.mx/cuando-una-tesis-sobre-pagares-digitales-afecta-la-inclusion-financiera/); [Mifiel](https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/); [IDC](https://idconline.mx/corporativo/2025/12/17/pagare-digital-solo-la-firma-electronica-avanzada-garantiza-su-validez)). Una firma con llave del teléfono es firma electrónica simple. Vale como **mensaje de datos con valor probatorio**: el CCom dice que "no se negarán efectos jurídicos" a la información por estar en un mensaje de datos (art. 89 bis) y que la forma escrita se cumple si la información se mantiene íntegra y accesible (art. 93) ([CCom](https://www.diputados.gob.mx/LeyesBiblio/pdf/CCom.pdf)). **No se debe decir "pagaré ejecutable"**. Lo correcto es "nota de crédito firmada electrónicamente" y, como siguiente paso, "pagaré con e.firma/FEA + NOM-151". El hash en Stellar prueba integridad y fecha, no identidad.

**Fintech y Banxico.** Si solo se registran eventos, no se encontró ninguna regla que exija autorización. Si se mueven pesos tokenizados, hace falta autorización de la CNBV para emitir o administrar fondos de pago electrónico (LRITF arts. 11 y 22), y los activos virtuales quedan restringidos por la Circular 4/2019 de Banxico ([LRITF](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRITF.pdf); [Banxico 4/2019](https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-4-2019/%7B8D7769AF-03F6-701A-68AA-EF25A73AD035%7D.pdf)). **El MVP no mueve dinero.**

## Crédito en la CEDA: el problema se sostiene, la mecánica depende de José

**Lo que sí está documentado.** Frutas y legumbres tiene casi seis veces más bodegas que abarrotes: **1,981 contra 347, según FICEDA (página vigente, sin fecha)** ([FICEDA](https://ficeda.com.mx/sectores-de-actividad/)). La cifra de 1,741 que repite la prensa es la de la construcción de 1982 ([FICEDA PDF](https://ficeda.com.mx/pdf/antecedentes_historico_n.pdf)). Se dice que la central mueve ~180,000 MDP al año, pero la cifra viene solo de fuentes secundarias ([Infobae, 2025](https://www.infobae.com/mexico/2025/11/23/central-de-abasto-de-la-cdmx-celebra-su-43-aniversario/); [Proceso, 2022](https://www.proceso.com.mx/reportajes/2022/11/17/la-central-de-abasto-una-gran-bodega-de-la-delincuencia-organizada-296458.html)) y no se encontró el documento primario. La etnografía de El Colegio de México describe un mercado donde "la búsqueda de información es el principal reto para todos los actores", con crédito basado en confianza ("que le dieran el camión de aguacates fiado") y una mezcla de efectivo, transferencias y WhatsApp ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)). Ese fiado está documentado en la relación **proveedor → bodeguero en frutas y legumbres**, no en la de bodega → cliente. El único crédito con plazos documentados es el de las bodegas que venden a Walmart: 30 días que se estiran a 45–60, con factoraje a un descuento de 10–11% ([Rivera-Sánchez, 2021](https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2395-91692021000100102)). Es el segmento formal y no representa al cliente típico. Una guía de 2017 recomendaba pagar en efectivo, aunque ya había bancos en los pasillos ([Excélsior, 2017](https://www.excelsior.com.mx/comunidad/2017/02/02/1143930)). En 2022 la SSC detectó una célula "gota a gota" que ofrecía préstamos "sin requisitos" de **10,000 a 50,000 MXN** con cobro intimidatorio ([ADN40](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)). Es el mejor argumento del pitch: hay comerciantes sin historial que mostrar. MEGA, la plataforma de la alcaldía GAM y la CEDA para 54 mercados (sep 2026), digitaliza catálogo y precios, pero **no crédito ni pagos** ([La Crónica](https://www.cronica.com.mx/metropoli/2026/09/04/mercados-de-gam-tendran-conexion-con-la-central-de-abasto-a-traves-de-una-plataforma-digital/)). Ese hueco es también una integración posible, pero no está confirmada.

**Experiencia de José (sin fuente externa).** La bodega de abarrotes del equipo otorga **cientos de miles de pesos de fiado al día**, gestionado en un ERP. En frutas y legumbres la mayoría de las bodegas opera en papel y pocas tienen ERP. Ninguna encuesta pública lo confirma ni lo contradice.

**Pendiente de confirmar con José antes del pitch:**

| Pregunta | Por qué importa |
|---|---|
| Instrumento del crédito bodega → cliente (libreta, nota de remisión, pagaré, cheque posfechado) | Define qué se "firma" en la demo |
| Plazos típicos (7/15/30 días) y qué pasa cuando no pagan | Estados del contrato (vencida, disputa) |
| Cómo se revisa a un cliente nuevo (referencias, aval, listas informales o grupos de WhatsApp de morosos) | Si ya hay un intercambio informal, el problema es real y también lo es el riesgo LRSIC |
| ¿Existe un actor neutral (FICEDA, administración, asociación) en quien confíen bodegas rivales? | **Decide si blockchain se justifica** |
| ¿Hay consignación o crédito de productor a bodega en frutas y legumbres? | Segundo caso de uso (historial en los dos sentidos) |
| ¿La bodega ancla es persona moral? ¿Qué ERP usa y si exporta datos? | Afiliación a SIC; piloto por integración |
| ¿Los clientes usan smartphone y WhatsApp? | Canal de co-firma |
| ¿Qué partes del plano se pueden mostrar? | Regla del proyecto: verificar antes de publicar |

## Los precedentes blockchain fracasaron donde no había un flujo que ya existiera

**Fracasos.** Kiva Protocol, el "credit bureau of the future" de Sierra Leona con la ONU, **cerró el 30 de junio de 2022** ([Kiva](https://www.kiva.org/protocol)). Dependía de un programa nacional de identidad ([Ledger Insights](https://www.ledgerinsights.com/kiva-sierra-leone-blockchain-id-system/)). Bloom levantó US$30.9 millones en una ICO con el producto sin terminar, fue sancionado por la SEC en 2022 ([SEC](https://www.sec.gov/files/litigation/admin/2022/33-11089.pdf)) y terminó usando datos de TransUnion ([Forbes](https://www.forbes.com/sites/oluwaseunadeyanju/2020/04/14/bloom-partners-with-transunion-to-bring-consumer-credit-data-to-blockchain/)).

**Lo que sobrevive.** BanQu registra transacciones de pequeños productores vía SMS y lo pagó un comprador ancla, AB InBev. Sus cifras de más de un millón de usuarios son autodeclaradas, y no hay evidencia de que se usen para dar crédito ([OECD OPSI](https://oecd-opsi.org/innovations/banqu-economic-passports-for-smallholder-farmers-and-informal-waste-pickers/)). El Banco Mundial ubica el blockchain en crédito "at a proof-of-concept stage" y señala como obstáculos los incentivos, los costos y la incertidumbre legal ([World Bank, 2019](https://documents1.worldbank.org/curated/en/587611557814694439/pdf/Disruptive-Technologies-in-the-Credit-Information-Sharing-Industry-Developments-and-Implications.pdf)). No se encontró ningún precedente en Stellar con usuarios reales. En Soroban solo aparecen demos de facturas: InvoFi y payper ([InvoFi](https://github.com/Stellar-VaultLink/invofi-contracts); [payper](https://github.com/cansarihan/payper)).

**Las alternativas sin blockchain ya funcionan, pero cada una es un silo.** Tienda Pago financia inventario a 7 días a través de distribuidores ([Tienda Pago](https://www.tiendapago.com/)). Rabbit/Propaga ofrece crédito a 15 días ([Rabbit](https://rabbitmx.com/blog/5-anos-de-rabbit-la-evolucion-digital-de-tu-tienda/)). Kontempo es BNPL B2B a 30–60 días ([LatamFintech](https://www.latamfintech.co/articles/fintech-de-bnpl-kontempo-llega-a-mexico-para-ofrecer-sus-servicios-al-sector-b2b)). Mercado Pago presta según la actividad de cada vendedor en su plataforma ([Mercado Pago](https://www.mercadopago.com.mx/blog/que-son-creditos-para-vendedores-mercado-pago)). Las cifras de todas son autodeclaradas. En ninguna el comerciante se lleva su historial a otro proveedor. TReDS, en India, es centralizado y está regulado. Aun con mandato gubernamental llega solo a **~1.2% de las MIPYMES**, con menos de una factura al mes por vendedor ([Data Diaries](https://datadiaries.in/stories/treds-built-for-msme/)). **La adopción es el riesgo número uno, no la tecnología.** La lección para el pitch: no hay token, no hay identidad nacional y se parte de una transacción que ya existe (la nota de venta a crédito) con un ancla interesada (la bodega que presta).

## Stellar: un contrato, cuentas G y un script de respaldo

**Versiones.** La red está en Protocolo 27 (mainnet desde el 8 jul 2026). La tabla oficial lista soroban-sdk 27.0.6, CLI 27.1.0, JS SDK 16.2.0 y RPC 27.1.1 ([Software Versions](https://developers.stellar.org/docs/networks/software-versions)). La página de setup ya menciona la CLI 28.0.0 ([Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)). Hay que **fijar la versión que genere `stellar contract init` y no mezclar versiones mayores**.

**Contrato.** Cada nota se guarda en storage **Persistent** con `extend_ttl`. Temporary se borra para siempre al vencer el TTL. Desde P23, las entradas archivadas se restauran solas si la transacción se simula ([State Archival](https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival)). La co-firma se resuelve con `require_auth()` de cada parte en pasos separados; el ejemplo Atomic Swap sirve de referencia multiparte ([Auth](https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth)). El flujo recomendado es:

1. `create_note` (bodega)
2. `accept_note` (cliente)
3. `mark_paid` (bodega)
4. `confirm_paid` (cliente)
5. `dispute` (cliente) y `mark_overdue` (cualquiera, después del vencimiento)

Además, un agregado `CustomerStats` por ID seudónimo y un evento en cada transición, que es lo que se ve en el explorador.

**Lo que no entra en 4 horas.** Las passkeys requieren HTTPS, RP ID y relay, y **Launchtube está descontinuado**: su reemplazo es OpenZeppelin Channels, con passkey-kit o smart-account-kit ([OZ Relayer](https://developers.stellar.org/docs/tools/openzeppelin-relayer); [passkey-kit](https://github.com/stellar/passkey-kit); [smart-account-kit](https://github.com/stellar/smart-account-kit)). Como el contrato no distingue entre una cuenta G y un smart account (ambas son `Address`), las passkeys se agregan después sin tocar el contrato. MXNe (Etherfuse/Brale) existe en Stellar, pero **no se encontró versión en testnet** ([Etherfuse](https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne)). Tampoco se confirmaron anchors MXN.

**Setup en Codespaces.** Instalar la CLI con el binario de `install.sh`, con Rust ≥ 1.84 y `wasm32v1-none` ([Setup](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)). Para testnet: RPC `soroban-testnet.stellar.org` y Friendbot, que tiene límite de tasa ([Networks](https://developers.stellar.org/docs/networks)). Scaffold Stellar requiere Docker y compila con cargo ([Scaffold Stellar](https://developers.stellar.org/docs/tools/scaffold-stellar)). Si el tiempo aprieta, alcanza con `contract init/build/deploy`, `bindings typescript` y un Vite mínimo. El próximo reset de testnet es el **16 dic 2026**, así que no afecta la entrega ([Networks](https://developers.stellar.org/docs/networks)).

**Ruta a producción:**

- Fee-bump o relayer para que el comerciante nunca vea XLM ([OZ Relayer](https://developers.stellar.org/docs/tools/openzeppelin-relayer)).
- Passkeys con smart accounts de OpenZeppelin.
- Un cron que renueve el TTL.
- Un RPC de mainnet de terceros, porque SDF no opera uno público.
- Prueba ZK de "cero vencidas" con el verificador Groth16 ([soroban-examples](https://github.com/stellar/soroban-examples/tree/main/groth16_verifier)).
- Liquidación opcional en MXNe **a través de un tercero autorizado**.

## "¿Por qué blockchain y no una base de datos?": respuesta honesta y ajustes

**La respuesta fuerte, en una frase.** Ninguna bodega puede escribir sola una deuda (el cliente co-firma), ninguna bodega ni plataforma puede borrar o maquillar el historial, y el comerciante se lleva su historial a cualquier proveedor sin pedirle permiso a un silo.

**Dónde se cae.** Si existe un operador neutral aceptado por todas las bodegas (por ejemplo FICEDA), una base de datos con log firmado bastaría. Esto **está pendiente de confirmar con José** y es la pregunta que un jurado va a hacer. Tampoco hay que esconder tres límites:

- **La cadena no sabe si el pago ocurrió.** La doble firma prueba acuerdo, no verdad; es "garbage in, garbage out".
- **Una bodega y un cliente falso pueden coludirse** para inflar historial. Se mitiga ponderando por número de bodegas emisoras distintas y verificadas, lo cual exige un registro de emisores semicentralizado.
- **Un hash de teléfono es atacable por fuerza bruta** sin una sal secreta, lo que convierte a la plataforma en custodio del identificador.

**Ajustes de diseño recomendados:**

1. El historial es **del cliente**: la consulta de un tercero requiere que el cliente la firme, imitando el art. 28 de la LRSIC.
2. En cadena solo van `hash(nota)`, un ID con sal, el monto por rango (bucket) y el estado. Nombre, teléfono, RFC y foto de la nota quedan off-chain y borrables.
3. Un estado **"disputada"** distinto de "vencida".
4. Se habla de "nota firmada con valor probatorio", nunca de "pagaré ejecutable".
5. Cero dinero en cadena.
6. Ruta de salida explícita: reportar a una SIC autorizada o ser proveedor tecnológico de una.

**Implementación en un mercado mayoritariamente en papel.** Hay que empezar donde ya hay datos: **abarrotes con ERP**, con la bodega ancla del equipo (experiencia de José). Ahí la integración es una exportación del ERP y no cambia la operación. En papel, el flujo propuesto es: la bodega fotografía la nota, se calcula su hash y el cliente co-firma desde un enlace en su teléfono. Es una propuesta de diseño: **no está validado que los clientes lo acepten**. El valor para el cliente tiene que ser tangible (más línea o más plazo en una segunda bodega) o no firmará. Lección de BanQu y TReDS: sin un ancla que pague y sin beneficio inmediato para ambas partes, no hay adopción.

## Implicaciones para el pitch y la demo

**Gancho.** El gota a gota de la CEDA (10–50 mil MXN, "sin requisitos") y la cita "la búsqueda de información es el principal reto". El dato de escala de José se presenta explícitamente como "experiencia de José", y el número de bodegas como "1,981 frutas y legumbres / 347 abarrotes, FICEDA, página sin fecha".

**Frase clave.** "El comerciante porta su historial; no somos un buró". Y se nombra la LRSIC antes de que lo haga el jurado.

**Demo (4 pasos en testnet con datos ficticios).**

1. La bodega crea la nota.
2. El cliente la acepta.
3. La bodega marca el pago.
4. El cliente lo confirma.

Después, una segunda bodega consulta el historial **tras la autorización firmada del cliente**. Se muestran los eventos en el explorador y el plano solo en una versión aprobada por José.

**Plan B.** Un `demo.sh` con los mismos pasos desde la CLI, más un video grabado por la mañana.

**Diapositiva de siguientes pasos.** Mainnet, passkeys, alianza con una SIC, e.firma/NOM-151, ZK y MXNe vía un tercero autorizado.

**Qué no decir.** "Pagaré ejecutable", "buró", cifras de sanciones, la cifra de Wikipedia, las "260 denuncias diarias" (su ámbito no está verificado) ni que MEGA vaya a integrarse.

## Conclusión

El proyecto no gana por la tecnología, que es sencilla y cabe en 4 horas. Gana si convierte el riesgo legal en tesis de diseño: un registro co-firmado, propiedad del cliente, sin datos personales ni dinero en cadena, es lo que distingue a esta propuesta de los burós blockchain que cerraron y de los silos fintech que ya existen. La debilidad real es empírica, no técnica. La mecánica del crédito bodega → cliente en la CEDA y la ausencia de un operador neutral descansan hoy solo en la experiencia de José. Confirmar esas dos cosas antes de las 10:00 es la tarea más valiosa del día.

## Fuentes

**Marco legal**
- LRSIC, Cámara de Diputados: https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf
- LRSIC (versión pdf_mov, art. 23): https://www.diputados.gob.mx/LeyesBiblio/pdf_mov/Ley_para_Regular_las_Sociedades_de_Informacion_Crediticia.pdf
- Índice LRSIC (arts. 68 y 68 Bis): https://leyes-mx.com/ley_para_regular_las_sociedades_de_informacion_crediticia.htm
- Banxico, Reglas generales SIC: https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-operaciones-y-actividades-de-las-sociedad/%7B6029D1F3-2633-F5F7-65DD-D7A8A408C447%7D.pdf
- Círculo de Crédito, Afíliate: https://www.circulodecredito.com.mx/legales/afiliate
- Buró de Crédito, Empresa + Buró: https://www.burodecredito.com.mx/personas-morales-y-pfae/empresa-bur%C3%B3.html
- LFPDPPP 2025: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- Garrigues, nueva LFPDPPP: https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce
- Ocampo Muñoa (2019), blockchain y datos personales: https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2594-00822019000200003&lng=en&nrm=iso
- LGTOC: https://www.diputados.gob.mx/LeyesBiblio/pdf/LGTOC.pdf
- Código de Comercio: https://www.diputados.gob.mx/LeyesBiblio/pdf/CCom.pdf
- Tesis 2031391, SJF: https://sjfsemanal.scjn.gob.mx/detalle/tesis/2031391
- Nexos, El Juego de la Corte: https://eljuegodelacorte.nexos.com.mx/cuando-una-tesis-sobre-pagares-digitales-afecta-la-inclusion-financiera/
- Mifiel, pagaré digital y FEA: https://blog.mifiel.com/pagare-digital-exigir-firma-electronica-avanzada/
- IDC (17-dic-2025): https://idconline.mx/corporativo/2025/12/17/pagare-digital-solo-la-firma-electronica-avanzada-garantiza-su-validez
- Ley Fintech (LRITF): https://www.diputados.gob.mx/LeyesBiblio/pdf/LRITF.pdf
- Banxico, Circular 4/2019: https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-4-2019/%7B8D7769AF-03F6-701A-68AA-EF25A73AD035%7D.pdf
- DOF, Circular 4/2019: https://www.dof.gob.mx/nota_detalle.php?codigo=5552303&fecha=08/03/2019

**CEDA**
- Bakić Hayden (2022), *Alteridades*: https://www.redalyc.org/journal/747/74772617003/
- Rivera-Sánchez (2021), UNAM/SciELO: https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S2395-91692021000100102
- FICEDA, Sectores de actividad (sin fecha): https://ficeda.com.mx/sectores-de-actividad/
- FICEDA, antecedentes históricos: https://ficeda.com.mx/pdf/antecedentes_historico_n.pdf
- Excélsior (2017): https://www.excelsior.com.mx/comunidad/2017/02/02/1143930
- Infobae (nov 2025): https://www.infobae.com/mexico/2025/11/23/central-de-abasto-de-la-cdmx-celebra-su-43-aniversario/
- Proceso (nov 2022): https://www.proceso.com.mx/reportajes/2022/11/17/la-central-de-abasto-una-gran-bodega-de-la-delincuencia-organizada-296458.html
- Proceso (mar 2026), gota a gota en la CDMX: https://www.proceso.com.mx/nacional/cdmx/2026/3/6/cae-celula-criminal-de-prestamos-gota-gota-en-la-cdmx-367675.html
- ADN40 (feb 2022), gota a gota en la CEDA: https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial
- La Crónica (sep 2026), MEGA: https://www.cronica.com.mx/metropoli/2026/09/04/mercados-de-gam-tendran-conexion-con-la-central-de-abasto-a-traves-de-una-plataforma-digital/
- Excélsior, MEGA: https://www.excelsior.com.mx/ultima-hora/janecarlo-lozano-conecta-54-mercados-gam-con-central-abasto
- Zoé IT Customs, Click Abasto: https://www.zoeitcustoms.com/la-central-de-abastos-cdmx-se-digitaliza/
- Emprendedor (2023): https://emprendedor.com/central-de-abastos-el-mejor-proveedor-para-tu-micronegocio/
- SE/PROLOGYCA, estudio sobre centros de abasto (no descargado): http://www.ccpci.economia.gob.mx/work/models/Prologyca/Resource/2/1/images/EstudioparaelDesarrollodeunEsquemadeGestionparaCentrosdeAbastoenMexico.pdf

**Precedentes y alternativas**
- Kiva Protocol: https://www.kiva.org/protocol
- Kiva blog: https://www.kiva.org/blog/kiva-sierra-leone-and-un-agencies-partner-to-implement-credit-bureau-of-the-future
- Ledger Insights, Kiva: https://www.ledgerinsights.com/kiva-sierra-leone-blockchain-id-system/
- SEC, Orden 33-11089 (Bloom): https://www.sec.gov/files/litigation/admin/2022/33-11089.pdf
- Forbes (2020), Bloom y TransUnion: https://www.forbes.com/sites/oluwaseunadeyanju/2020/04/14/bloom-partners-with-transunion-to-bring-consumer-credit-data-to-blockchain/
- CoinDesk, Cred: https://www.coindesk.com/business/2020/11/08/crypto-lender-cred-files-for-bankruptcy-after-losing-funds-in-fraud
- OECD OPSI, BanQu: https://oecd-opsi.org/innovations/banqu-economic-passports-for-smallholder-farmers-and-informal-waste-pickers/
- WEF (2021), BanQu: https://www.weforum.org/stories/2021/05/banqu-financial-inclusion-sustainability/
- Tienda Pago: https://www.tiendapago.com/
- Rabbit (abr 2026): https://rabbitmx.com/blog/5-anos-de-rabbit-la-evolucion-digital-de-tu-tienda/
- LatamFintech, Kontempo: https://www.latamfintech.co/articles/fintech-de-bnpl-kontempo-llega-a-mexico-para-ofrecer-sus-servicios-al-sector-b2b
- Mercado Pago, créditos a vendedores: https://www.mercadopago.com.mx/blog/que-son-creditos-para-vendedores-mercado-pago
- Data Diaries, TReDS: https://datadiaries.in/stories/treds-built-for-msme/
- World Bank (2019): https://documents1.worldbank.org/curated/en/587611557814694439/pdf/Disruptive-Technologies-in-the-Credit-Information-Sharing-Industry-Developments-and-Implications.pdf
- OMFIF, EDPB (2025): https://www.omfif.org/2025/06/european-data-protection-board-puts-blockchain-at-a-gdpr-crossroads/

**Stellar**
- Software Versions: https://developers.stellar.org/docs/networks/software-versions
- Setup: https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup
- Networks: https://developers.stellar.org/docs/networks
- State Archival: https://developers.stellar.org/docs/learn/fundamentals/contract-development/storage/state-archival
- Resource Limits & Fees: https://developers.stellar.org/docs/networks/resource-limits-fees
- Stellar Lab, Network Limits: https://lab.stellar.org/network-limits
- Ejemplo Auth: https://developers.stellar.org/docs/build/smart-contracts/example-contracts/auth
- OpenZeppelin Relayer/Channels: https://developers.stellar.org/docs/tools/openzeppelin-relayer
- passkey-kit: https://github.com/stellar/passkey-kit
- smart-account-kit: https://github.com/stellar/smart-account-kit
- OpenZeppelin stellar-contracts (accounts): https://github.com/OpenZeppelin/stellar-contracts/tree/main/packages/accounts
- Scaffold Stellar: https://developers.stellar.org/docs/tools/scaffold-stellar
- groth16_verifier: https://github.com/stellar/soroban-examples/tree/main/groth16_verifier
- Etherfuse, MXNe: https://etherfuse.substack.com/p/etherfuse-introduces-real-mxn-mxne
- Trustless Work, tokens de testnet: https://docs.trustlesswork.com/trustless-work/introduction/stellar-and-soroban-the-backbone-of-trustless-work/testnet-tokens.md
- InvoFi: https://github.com/Stellar-VaultLink/invofi-contracts
- payper: https://github.com/cansarihan/payper
