# Modelo de negocio — opciones para decidir

**Estado:** borrador para la mentoría del 25-sep-2026 (12:35). **Decide José.** No lleva montos: ningún precio está validado y no se inventan. Lo marcado *(inferencia)* es deducción nuestra; lo marcado *(propuesta)* es diseño.

## En una frase (pitch y mentoría)

> Paga la bodega, por su herramienta de cobranza; el cliente, nunca. Mientras el piloto prueba que la bodega paga, el puente es el fondo de Stellar.

## Principios, con su base

1. **Un lado se subsidia.** En un mercado de dos lados, uno paga y el otro entra gratis ([Rochet y Tirole, 2003](https://doi.org/10.1162/154247603322493212)). Aquí el cliente paga cero, no instala nada y firma con un toque. Paga la bodega, que ya carga el costo del fiado y de la cobranza.
2. **El canal es la bodega.** Quienes llegaron a miles de tienditas en México se montaron sobre el proveedor. Propaga da crédito en el punto de compra «a través de los sistemas de los distribuidores» ([El Financiero, 2025](https://www.elfinanciero.com.mx/monterrey/2025/07/30/buscan-digitalizar-y-abastecer-a-las-18-mil-tienditas-de-la-esquina-en-nl/); cifras autodeclaradas). Kontempo se integra al checkout del proveedor ([Marketing4ecommerce, 2022](https://marketing4ecommerce.mx/kontempo-la-empresa-mexicana-de-soluciones-y-financiamiento-enfocada-al-b2b-commerce-capta-30-mdd-en-financiacion/)).
3. **Sin token.** En nueve airdrops estudiados, muchos receptores vendieron pronto y eso no se tradujo en retención. Los autores recomiendan descuentos ligados al uso ([arXiv 2312.02752](https://arxiv.org/html/2312.02752)). Aquí los incentivos son comerciales: plazo, línea y trato, y los decide cada bodega.
4. **El riesgo es la activación, no el margen** *(inferencia)*. Cuentas Claras no mueve mercancía ni dinero. Su costo principal es operar y acompañar a las bodegas.

## Opciones

| | Quién paga | Qué compra | Riesgo | Cuándo |
|---|---|---|---|---|
| **A. Herramienta de cobranza** | La bodega emisora, con una suscripción por bodega *(propuesta)* | Notas con acuse del cliente, recordatorios con el nombre del vendedor y cartera ordenada. Le sirve aunque ninguna otra bodega la use | No sabemos si pagaría ni cuánto. El piloto lo mide: cuatro semanas gratis y, al final, la pregunta | Desde el piloto |
| **B. Membresía del Círculo** | Las bodegas que emiten y consultan | Entrar a la red: consultar, con permiso del cliente, el historial de clientes nuevos. Quien consulta, también firma | Se acerca a «consultar historiales»: dictamen legal antes de cobrarla | Fase 2, con dictamen |
| **C. Convenio con un lector** | Un banco o una fintech | Integración para leer, con permiso del cliente, su historial. Es el esquema de Banco Agrario con los tenderos de Corabastos ([Banco Agrario](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos)) | **Cobrar por consulta se parece a lo que la LRSIC reserva a las sociedades de información crediticia** ([LRSIC, art. 5o](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)). Solo con dictamen, y cobrando un servicio tecnológico, no el dato | Fase 3 |
| **D. Fondos para bienes comunes** | Stellar Community Fund | Infraestructura abierta en Stellar: Instawards y Build Award de hasta US$150,000 en XLM ([SCF](https://communityfund.stellar.org/)) | No es un ingreso recurrente: es el puente mientras se prueba A | Octubre y noviembre (plan maestro, P3) |
| ~~**E. Cobrar al cliente**~~ | — | — | Rompe la adopción: el cliente es el lado que se subsidia. Con DiMo, BBVA lo resumió así: «no hay los incentivos adecuados» ([El Universal vía Yahoo, 2025](https://es-us.finanzas.yahoo.com/noticias/dimo-banxico-convence-mexicanos-transferencias-220146306.html)) | Nunca |

**Recomendación *(propuesta)*: A + D ahora; B y C, solo con dictamen legal.**

## Qué tiene que medir el piloto

- Si la bodega ancla pagaría después de cuatro semanas, y por qué: tiempo de cobranza, menos disputas, cartera ordenada.
- Minutos de cobranza por semana, antes y después *(métrica propuesta)*.
- Disputas del tipo «ya te pagué» por cada 100 notas.
- Cuántas bodegas piden entrar al Círculo después del primer caso.

## Tres preguntas para los mentores

1. ¿Suscripción por bodega o cobro por nota? ¿Qué han visto funcionar con comercios pequeños?
2. ¿Ven un camino para el convenio con un lector que no choque con la LRSIC?
3. ¿Qué evidencia del piloto los convencería de que la bodega paga?

## Lo que no se dice

- Precios o ingresos proyectados: no hay datos.
- Que cobramos por consulta.
- Que hay acuerdos con bancos o con la administración de la Central.
