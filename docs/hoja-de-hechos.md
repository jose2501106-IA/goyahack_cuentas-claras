# Hoja de hechos (con fuente y estatus)

Fuente: `research/00_sintesis-estrategica.md`, sección "Cómo exprimir la data". Regla: en el pitch se dicen a lo sumo **cinco** de estos datos (bodegas FICEDA, gota a gota, 18.4 %, efectivo/WhatsApp y la cifra de la bodega ancla con su etiqueta); el resto vive en el README público y en las respuestas preparadas para el Q&A.

Estatus: *primaria* (documento oficial o paper), *secundaria* (prensa), *autodeclarada* (la propia empresa), *experiencia de José* (sin fuente externa).

**IDs:** cada hecho tiene un ID estable (H-01, H-02…) para citarlo desde otros documentos y encontrarlo con `grep -rn "H-07"`. Un hecho nuevo va al final con el siguiente número; los IDs no se reutilizan.

| ID | Dato | Cifra | Fuente y estatus | Dónde usarlo |
|---|---|---|---|---|
| H-01 | Bodegas en la CEDA | 1,981 frutas y legumbres; 347 abarrotes | [FICEDA](https://ficeda.com.mx/sectores-de-actividad/), página sin fecha; no usar la cifra de Wikipedia | Gancho y segmentación |
| H-02 | Crédito diario de la bodega ancla | cientos de miles de pesos, gestionado en ERP | Experiencia de José; sin fuente externa | Problema y ancla; decirlo siempre con la etiqueta |
| H-03 | Gota a gota en la CEDA | 10,000–50,000 MXN "sin requisitos", 2022 | [ADN40](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial), secundaria | Apertura del pitch |
| H-04 | Costo de la opción externa | 10,000 → 107,000 MXN en semanas | [N+](https://www.nmas.com.mx/sociedad/prestamo-estafa-gota-a-gota-en-cdmx-leticia-pidio-10000-y-debe-107000/), caso de prensa; sin tasa oficial | Costo del problema |
| H-05 | Rechazo de crédito por falta de historial | 18.4%; 21.6% por garantías | [ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf), primaria; excluye empresas de 1–5 personas | Problema nacional |
| H-06 | Crédito formal y cuenta | 37.3% con crédito; 63.0% con cuenta | [ENIF 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enif/ENIF2024_CP.pdf), primaria | Por qué no exigir cuenta bancaria |
| H-07 | Efectivo | 85.2% en compras <500 MXN; 75.4% de empresas 6+ | [Expansión citando ENIF](https://expansion.mx/economia/2026/09/18/sheinbaum-ley-economia-digital-pagos-codi-dimo); [ENAFIN](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf) | Por qué doble firma y no rieles de pago |
| H-08 | Canal | 97% smartphone; 90.6% usa mensajería; CDMX 91.3% celular | [ENDUTIH 2025](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25_RR.pdf), primaria | WhatsApp como canal de co-firma |
| H-09 | Valor de la sanción de red | +10–20 pp de crédito; −13 pp con competidor cerca | [McMillan y Woodruff](https://chriswoodruff.qeh.ox.ac.uk/wp-content/uploads/2019/10/VN_QJE.pdf), primaria (Vietnam) | Por qué un registro compartido |
| H-10 | Tribunales en México | Derechos del acreedor 0; 421 días | [Djankov et al.](https://www.nber.org/system/files/working_papers/w11078/w11078.pdf), primaria | Por qué información y no contrato |
| H-11 | Registro ≠ uso | CoDi: 21.8 M cuentas, 17.8 M operaciones | [El Cronista](https://www.cronista.com/mexico/finanzas-economia/no-es-para-todos-la-banca-simplifica-codi-y-dimo-ante-una-adopcion-menor-a-la-esperada-de-los-pagos-digitales/), citando Banxico | Métricas de uso, no de cuentas |
| H-12 | Criterio de la SDF | "not... for data storage" | [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria), oficial | Diapositiva "por qué blockchain" |
| H-13 | Costo y finalidad en Stellar | 100 stroops/operación; finalidad al cierre; sin reorgs | [Stellar Docs](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering), oficial | Diapositiva "por qué Stellar" |
| H-14 | Precedente bancario | Certificación de ≥1 año de la central desbloquea crédito | [Banco Agrario de Colombia](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos), primaria | Lector bancario y siguiente paso |
| H-15 | Honestidad cripto | ≈1% de pagos reales; México 61% stablecoins, US$1.8 mil M/mes | [Forbes](https://www.forbes.com/sites/digital-assets/2026/07/27/the-stablecoin-market-shrank-for-the-first-time-in-four-years-watch-the-volumes-instead/); [Chainalysis](https://www.chainalysis.com/blog/latin-america-crypto-adoption-2026/) | Q&A; "el riel ya existe" |
| H-16 | Ventana institucional | Contratos privados de la CEDA vencen el 1 feb 2027 | [MVS Noticias](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html), secundaria | Diapositiva de siguientes pasos |
| H-17 | Extorsión contra negocios | Delito más frecuente: 1,562 por cada 10 mil unidades (2023); en la modalidad presencial, 67 % entregó lo pedido; cifra negra 90.3 % | [ENVE 2024, INEGI](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2024/ENVE/ENVE24.pdf), primaria | Por qué privacidad es condición de seguridad; nunca "reduce la extorsión" |
| H-18 | Fraude por enlaces | 1.5 millones de quejas por posible fraude en ene–mar 2026 (+31.5 %), sobre todo mensajes con enlaces | Condusef vía [El Informador, 6-jul-2026](https://www.informador.mx/economia/fraude-reclamos-por-las-estafas-bancarias-suben-31.5-20260706-0024.html), secundaria | Por qué la primera firma es en persona |
| H-19 | Estigma cripto | 53 % de quienes conocen las criptomonedas dice que "hay demasiadas estafas" | Consensys–YouGov vía [Mundo Ejecutivo, dic-2024](https://mundoejecutivo.com.mx/fintech/solo-el-47-de-los-mexicanos-entiende-lo-que-son-las-criptomonedas/), secundaria | Por qué no se dice "cripto" al comerciante |
| H-20 | Crédito de proveedores | 60.9 % de las empresas se financió con proveedores vs 24.5 % con banca comercial (2T-2026; encuesta de Banxico a empresas, no a micronegocios) | Banxico vía [La Verdad, ago-2026](https://laverdad.com.mx/2026/08/financian-proveedores-empresas/), secundaria | El crédito de proveedor es el canal principal |
| H-21 | Horario de venta en abarrotes | 04:00 a 15:00 (según la coordinadora de la Central) | [Chilango, 2-oct-2025](https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/), secundaria | Ventana de capacitación y firma en mostrador |
| H-22 | Nombre no distintivo | Varias apps se llaman «Cuentas Claras» o «Mis Cuentas Claras»; también un aplicativo de transparencia de partidos en Colombia | [App Store](https://apps.apple.com/gt/app/cuentas-claras/id405750770); [Google Play](https://play.google.com/store/apps/details?id=com.teamapricot.cuentasclaras&hl=es_MX); [Transparencia por Colombia](https://transparenciacolombia.org.co/lanzamiento-del-aplicativo-cuentas-claras-de-funcionamiento-de-los-partidos-politicos/); consulta del 25-sep | Riesgo del nombre; respuesta en Q&A |
| H-23 | Rima como razón | Los aforismos que riman se juzgan más ciertos que la misma idea sin rima | [McGlone y Tofighbakhsh, 2000](https://journals.sagepub.com/doi/10.1111/1467-9280.00282), primaria (en inglés; aplicarlo a la rima asonante en español es inferencia) | Por qué el nombre es un refrán |
| H-24 | Dos finales del refrán | En México también se dice «cuentas claras y chocolate espeso» | [El Sol de México](https://oem.com.mx/elsoldemexico/analisis/cuentas-claras-y-chocolate-espeso-22814398), secundaria | Apertura del pitch con el refrán |
| H-25 | Fondo de Stellar | Build Award de hasta US$150,000 en XLM (además de Instawards) | [Stellar Community Fund](https://communityfund.stellar.org/), oficial | Modelo de negocio (opción D) y siguientes pasos |

## Forma pública de la cifra de la bodega ancla (decisión #28)

En el repositorio, el video y el PDF se dice **"una bodega de abarrotes del equipo fía cientos de miles de pesos al día"** (experiencia del equipo), sin nombre de bodega. La cifra exacta vive solo en `privado/`. Decir la cifra exacta en vivo es decisión de José.

## Vocabulario vetado

No decir: «buró», «pagaré ejecutable», «score» o «calificación», cualquier cifra de sanciones de la LRSIC, la cifra de bodegas de Wikipedia (1,881 / 338), las "260 denuncias diarias" (ámbito no verificado), una tasa del "gota a gota", que MEGA vaya a integrarse, que el registro reduzca la extorsión, cualquier comparación numérica entre cadenas (no se obtuvieron cifras comparables), el precio de XLM, «anónimo», «100 % seguro», «nadie puede ver nada», «solo lo ve quien tú autorices» (sin el matiz de la spec v2, sección 3b), el nombre de la bodega del equipo y la cifra exacta de su fiado en materiales públicos.

## Cómo se dice

- "Nota firmada electrónicamente con valor probatorio" (no "pagaré").
- "Agregado orientativo con estado explícito de historial insuficiente" (no "score").
- "El cliente porta su historial y autoriza cada lectura; no somos una sociedad de información crediticia."
- "En la cadena no hay nombre, teléfono ni monto exacto del cliente: solo un seudónimo y rangos."
- "El permiso decide quién puede pedirle tu resumen al contrato, y cada consulta queda registrada."
- "Tu palabra vale." (campaña; "Ahora también viaja." solo cuando exista la segunda bodega)
- "Cuentas Claras" (proyecto) y "Equipo Palabra — desde la Central de Abasto" (equipo). "Fiado de palabra, con cuentas claras" (línea puente, propuesta). Nunca decir que el nombre "genera dopamina": no hay fuente (lo documentado es H-23).
- "Lo que sabemos de la CEDA viene de operar una bodega; lo que no, lo mide el piloto."
