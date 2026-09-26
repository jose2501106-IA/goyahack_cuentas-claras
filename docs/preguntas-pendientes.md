# Preguntas pendientes para José

Fuente: `research/00_sintesis-estrategica.md`, sección "Preguntas pendientes". Cada respuesta se registra aquí con fecha y la etiqueta *experiencia de José*, y se propaga a `docs/decisiones.md` y a `spec/`.

Las dos primeras deciden si el argumento "¿por qué blockchain?" se sostiene tal como está escrito.

| Pregunta | Qué decide | Prioridad |
|---|---|---|
| ¿Existe hoy algún actor (FICEDA, la administración, una asociación de bodegueros, un banco de la central) en quien bodegas que compiten confiarían para custodiar un registro compartido de pagos? | Si la respuesta es sí, "¿por qué no una base de datos?" se responde distinto y hay que decirlo; si es no, es la primera frase del "por qué blockchain" | Decisiva, antes del pitch |
| ¿Ya existe intercambio informal de información entre bodegas (referencias por teléfono, grupos de WhatsApp de morosos, "no le fíes a X")? | Confirma que la sanción de red existe y es lenta y deformable; también confirma que el riesgo LRSIC ya está presente en la práctica actual | Decisiva, antes del pitch |
| ¿Qué instrumento documenta el fiado en la bodega ancla (nota de remisión del ERP, libreta, pagaré, cheque posfechado) y qué campos tiene? | Define el documento canónico del que sale `doc_commit` y qué se firma en la demo | Alta, para la demo |
| ¿Plazos típicos (7, 15, 30 días), qué pasa a los pocos días de vencer y cuándo se considera perdida una cuenta? | Fija `due_ts`, la gracia antes de `Defaulted` y la ventana de disputa, hoy propuestas en 30 y 15 días | Alta, para el contrato |
| ¿Cómo se evalúa a un cliente nuevo hoy (referencias, aval, identificación, monto inicial pequeño)? | Confirma el problema de selección adversa y da el guion de la "segunda bodega" en la demo | Alta, para el pitch |
| ¿Cuántos clientes recurrentes con crédito tiene la bodega ancla y cuántos usan WhatsApp y transferencias? | Dimensiona la red atómica del piloto y valida el canal | Alta, para el piloto |
| ¿Los cientos de miles de pesos diarios son saldo vivo, colocación diaria o cobranza diaria? ¿La bodega ancla es persona moral? ¿Qué ERP usa y exporta datos? | Precisión de la cifra que se dirá con etiqueta; afiliación a una SIC; viabilidad de la integración | Alta, para README y ruta legal |
| ¿En frutas y legumbres hay consignación del productor a la bodega, con qué plazos y comisión? | Segundo caso de uso y su viabilidad de firma | Media |
| ¿Hay morosidad estimable en la bodega ancla (porcentaje o casos por mes) que se pueda citar como experiencia? | Costo del problema en abarrotes; si no hay dato, se dice que no hay | Media |
| ¿Qué partes del plano se pueden mostrar sin exponer locales, accesos o rutas? | Regla del proyecto: verificar antes de publicar; versión simplificada ante duda | Alta, antes del video |
| ¿Se confirmó en el dashboard la hora de entrega (20:00 CDMX), el track y los campos del formulario? | La investigación no pudo renderizar el sitio | Alta, hoy |
| ¿Hay un banco dentro de la central con el que la bodega ancla ya trabaje y que pudiera ser el primer lector en producción? | Replica el esquema Corabastos–Banco Agrario | Baja, para siguientes pasos |

## Respuestas registradas

| Fecha | Pregunta | Respuesta (experiencia de José) | Consecuencia |
|---|---|---|---|
| 2026-09-24 | Escala del crédito en abarrotes | La bodega ancla otorga cientos de miles de pesos de crédito diario, gestionado en un ERP (compras, ventas, almacén). | Ancla del piloto; cifra siempre con etiqueta. Falta precisar si es colocación, saldo vivo o cobranza. |
| 2026-09-24 | Digitalización en frutas y legumbres | La mayoría de las bodegas gestiona ventas "muy prehistóricamente", algunas en papel; pocas con ERP. | Frutas y legumbres es segunda fase; flujo de foto + co-firma por enlace, no validado. |
| 2026-09-24 | Estructura de la CEDA | Dos lados: abarrotes y frutas/verduras (más flores, hortalizas, subasta y zonas aledañas). | Segmentación del pitch y del piloto. |
| 2026-09-25 08:35 | ¿Existe un actor que centralice o custodie el crédito entre bodegas? | "Actualmente no hay ninguna cosa que centralice los créditos que se llevan a cabo dentro de la central." Cada bodega da crédito a clientes específicos que ella misma elige. | Confirma la primera frase del "por qué blockchain": no existe registro ni custodio compartido. Queda abierta la pregunta de si las bodegas *aceptarían* un custodio neutral (FICEDA, asociación); hoy no existe ninguno. |
| 2026-09-25 08:35 | ¿Se pasan referencias entre bodegas? | "Actualmente no se pasan referencias entre bodegueros." Existen conexiones informales de networking y colaboración entre dueños, pero "no hay tal cual un ritual, un lugar donde se comparta este tipo de información" sobre clientes o proveedores. | La sanción de red descrita por McMillan y Woodruff no opera hoy en la CEDA: la reputación está encerrada en cada díada. Es el hueco exacto que llena la bitácora portable. En el pitch se dice así, con etiqueta. |
| 2026-09-25 08:35 | ¿A quién se le da crédito y cómo se evalúa a un cliente nuevo? | Solo a clientes específicos: (1) los que compran mucho y (2) los que tienen años de relación y confianza. Se evalúa "personalmente, por la amistad, por el tiempo"; "es muy empírico": conocer a la persona, la relación de años y ver que paga y es constante. Hay clientes que piden crédito y no se les da; hay clientes de muchos años que nunca lo han querido. | Confirma la selección adversa y el "closed shop" de Fafchamps: el crédito es un privilegio de la relación larga. El guion de la "segunda bodega" en la demo es literal: un cliente bueno de la bodega ancla llega a otra bodega donde nadie lo conoce. |
| 2026-09-25 08:35 | Plazos | Un plazo específico por cliente: desde 1 día; 2, 3, 4, 5 días; una semana; hasta 15 días "o un poco más"; unos muy seleccionados, más de un mes (amistad, colaboración y alto volumen). | `due_ts` se fija por nota, no por sistema. Los rangos de plazo para la demo: 1, 7 y 15 días. La gracia antes de `Defaulted` (propuesta: 30 días) y la ventana de disputa (15 días) siguen siendo propuestas; José decide. |
| 2026-09-25 08:35 | ¿Qué son los cientos de miles de pesos diarios? | Es lo que se fía al día; se cobra por separado según el plazo de cada cliente (1 día a 2 semanas; algunos más de un mes). | Es **colocación diaria**, no saldo vivo ni cobranza. Así se dice en el pitch: "la bodega ancla fía cientos de miles de pesos al día (experiencia del equipo)". El saldo vivo no se conoce; no se estima. |
| 2026-09-25 08:35 | ¿La bodega ancla es persona moral? | Sí. | Califica como "Empresa Comercial" bajo la LRSIC (art. 2, fr. IV); la ruta de afiliación a una SIC queda abierta para producción. |
| 2026-09-25 08:35 | Plan de trabajo A–E y reencuadre | "Me encanta el plan propuesto. Lo aprobo." Sin objeción al reencuadre de `docs/problema-solucion.md`. | Plan aprobado; reencuadre se toma como aprobado (decisión #3). |
| 2026-09-25 12:06 | Nombre | «Me gustaría que el equipo se llame "Palabra". Y que el proyecto se llame Cuentas Claras»: el refrán es muy conocido y quien oye el nombre lo completa. | Decisión #36. Riesgos del nombre y cómo se usa: `docs/nombre-y-marca.md`, sección 0. |
| 2026-09-25 12:15 | Hora de entrega | «Todavía podré hasta al menos entregar todo hasta las 8pm.» | Decisión #37: entrega hoy antes de las 20:00; todo listo a las 19:00. |

## Siguen pendientes (25-sep, 08:35)

- Instrumento exacto que documenta cada venta a crédito en la bodega ancla (registro del ERP, nota de remisión, ticket) y sus campos: define el documento canónico de `note_id`. Hasta confirmar, la demo usa una "nota de crédito" con folio, cliente, monto, fecha y vencimiento.
- Número de clientes recurrentes con crédito y cuántos usan WhatsApp/transferencias (dimensiona el piloto).
- Morosidad observada (casos por mes o porcentaje), si existe un dato; si no, se dice que no hay.
- Consignación en frutas y legumbres (segundo caso de uso).
- Plano: qué versión se puede mostrar.
- Track, criterios y campos de entrega vigentes en `criptounam.xyz/hackathon/dashboard` (pendiente). La hora quedó resuelta: al menos hasta las 20:00 de hoy (José, 12:15).
- Correos de GOYA HACK / CriptoUNAM (pendiente de activar Gmail en este chat).

## Nuevas preguntas (25-sep, 11:50)

- **APEX ("Sube tu proyecto"):** ¿es parte obligatoria de la entrega? No se pudo identificar en fuentes públicas (`research/03`). Preguntar hoy en mentoría o Discord.
- **Modelo de negocio:** elegir entre las opciones de `docs/modelo-de-negocio.md` (recomendación: A + D) y llevarlo a la mentoría.
- **Cifra pública:** ¿se queda la forma general ("cientos de miles de pesos al día") o dices la cifra exacta en vivo? (decisión #28)
- **Administración:** ¿quién es tu enlace y en qué área? ¿Vigencia del Comité Técnico y quién representa a Abarrotes y Víveres? ¿Relación de la bodega ancla con la UNCOFYL? (`research/05`, sección 8)
- **Operación:** ¿qué días vende menos la bodega ancla? ¿Te funciona capacitar de 13:00 a 15:00? ¿Qué edad tienen los clientes típicos de fiado?
- **Bancos:** ¿con cuál trabaja la bodega ancla? (lista vigente del PDF de FICEDA)
- **Modelo de negocio:** ¿quién paga: la bodega por su herramienta de cobranza, una cuota del Círculo, un banco lector con convenio? (evitar cobrar por consulta: se parece a lo que la LRSIC reserva)
- **Campaña:** las 12 decisiones de la sección 14 de `docs/campana-marketing.md`.
| ¿Hora exacta del nuevo plazo del domingo 27 (¿23:59?), dónde se anunció y cuál es el formato de la presentación final (¿pitch en vivo?, ¿cuándo es la clausura?)? | Fija la meta interna del domingo y si hace falta ensayar pitch en vivo | Alta, sábado temprano (decisión #43) |
