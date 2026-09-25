# Cuentas Claras — problema y solución en una página

*(antes CREDI-CEDA)*

**Estado:** redefinición propuesta el 25-sep-2026 a partir de `research/00_sintesis-estrategica.md`. Aprobada por José el 25-sep a las 08:35; actualizada a las 11:50 (nombre Palabra, corrección de privacidad, sin identificar a la bodega del equipo). Lo marcado *(experiencia de José)* no tiene fuente pública; lo marcado *(propuesta)* es diseño, no dato.

## En una frase

**Cuentas Claras es la bitácora de fiado co-firmada de la Central de Abasto: cada nota de crédito la firman la bodega y el cliente desde su teléfono, ninguna de las dos puede alterarla ni borrarla, y el historial de cumplimiento es del cliente, que decide a quién mostrarlo.**

No es un buró de crédito, no mueve dinero, no emite token, no califica personas. Produce evidencia co-firmada y un agregado orientativo.

## El problema

1. En la CEDA el fiado se pacta de palabra y se cobra en efectivo ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)). Cumplir no deja huella fuera de esa bodega: la reputación del cliente no viaja.
2. Con **1,981 bodegas de frutas y legumbres y 347 de abarrotes** ([FICEDA](https://ficeda.com.mx/sectores-de-actividad/), página sin fecha) a metros unas de otras, la única sanción disponible —cortar el fiado— es débil, y el bodeguero raciona el crédito a los desconocidos. La evidencia comparada dice que la sanción de red vale **10–20 puntos porcentuales más de crédito** y que un competidor cercano lo reduce ~13 puntos ([McMillan y Woodruff, 1999](https://chriswoodruff.qeh.ox.ac.uk/wp-content/uploads/2019/10/VN_QJE.pdf)).
3. El cliente sin historial queda entre el rechazo formal (**18.4 %** de los rechazos de crédito a empresas se deben a falta de historial, [ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)) y el "gota a gota" que opera dentro de la propia central: préstamos de **10,000 a 50,000 MXN "sin requisitos"** con cobro intimidatorio ([ADN40, 2022](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)).
4. En abarrotes el dato ya existe: la bodega ancla del equipo otorga **cientos de miles de pesos de fiado al día** y lo administra en un ERP *(experiencia de José)*. Está encerrado en un sistema que ninguna otra bodega ni banco puede verificar. En frutas y legumbres la mayoría opera en papel *(experiencia de José)*.

## La solución

Una nota de crédito pasa a existir solo cuando **la bodega la crea y el cliente la acepta** (dos firmas, en pasos separados). Después, la bodega confirma el pago o la nota vence; el cliente puede disputar. Cada transición queda registrada en un contrato Soroban en Stellar que **hace cumplir** las reglas: nadie escribe una deuda solo, nadie edita ni borra, "incumplida" solo existe después de vencer más un periodo de gracia, y **la consulta oficial del agregado por un tercero exige un permiso firmado por el cliente**, con vigencia limitada, y deja constancia. En cadena solo hay identificadores seudónimos, rangos de monto y estados; nombres, teléfonos, montos exactos y la nota misma viven fuera, en una base cifrada y borrable. Lo que sí queda en la cadena es público: el permiso controla la consulta oficial, no vuelve secreto el estado (spec v2, sección 3b); la confidencialidad completa (seudónimos por bodega, pruebas de conocimiento cero) es el siguiente paso.

**Para el bodeguero:** cobranza documentada que el cliente no puede negar, y un semáforo para fiarle a quien llega de otra bodega.
**Para el cliente:** su historial es suyo; se lo lleva a donde quiera y la consulta oficial de otra bodega exige su permiso y deja constancia. Paga cero y no instala nada: firma desde un enlace en WhatsApp.
**Para un banco (siguiente fase):** una certificación co-firmada de cumplimiento, como la que el Banco Agrario exige a los tenderos de Corabastos para abrir un cupo ([Banco Agrario de Colombia](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos)).

## ¿Por qué blockchain y no una base de datos?

**Condición:** si existiera un operador neutral, permanente y aceptado por bodegas que compiten, una base de datos con bitácora firmada bastaría. La evidencia pública indica que no existe (FICEDA cambió de titular en 2018 y 2024, opera con contratos privados hasta el 1-feb-2027 y su Comité Técnico lo eligen las propias planillas sectoriales; ver síntesis). **Confirmación pendiente de José.**

Cuatro razones, en el orden en que se dicen:
1. **Ninguna bodega puede escribir sola una deuda**: la nota solo existe con la firma del cliente (`require_auth` de ambos).
2. **Nadie, ni la plataforma, puede borrar ni maquillar el historial**: toda corrección es un evento nuevo que referencia al anterior.
3. **El cliente se lleva su historial** a cualquier bodega o banco sin pedir permiso a un silo (lo que Tienda Pago, Kontempo o Mercado Pago no ofrecen).
4. **Un tercero verifica sin confiar en el operador.**

Una base de datos central operada por un tercero recrearía la figura que regula la LRSIC; una cadena permisionada entre bodegas sería un consorcio de competidores, el modelo que enterró a TradeLens y Marco Polo. Y el contrato no "guarda datos" (lo que el fondo de Stellar descalifica): hace cumplir reglas que hoy nadie puede hacer cumplir en la CEDA.

## ¿Por qué Stellar?

Comisión base de 100 stroops por operación y finalidad determinista sin reorganizaciones ([Stellar Docs](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering)); firmas secp256r1 nativas desde Protocol 21 para que el comerciante firme desde su teléfono sin frase semilla (siguiente paso); rampa a pesos por SPEI ya existente (Félix + Bitso) y peso digital respaldado por CETES (MXNe) para una liquidación futura; una fundación con mandato de acceso financiero y un fondo de más de US$42 millones a más de 650 proyectos ([SCF](https://medium.com/stellar-community/stellar-community-fund-2025-impact-report-6f6c6361aaca)). Debilidades que se dicen antes de que las pregunten: Soroban es joven, la actividad diaria es modesta, y por eso se arranca en testnet con un contrato mínimo.

## Lo que se construye hoy (MVP, testnet)

Un contrato `cuentas_claras` (lista de emisores, máquina de estados, eventos, consentimiento), un backend mínimo que deriva el identificador seudónimo y calcula el semáforo, un frontend con el flujo de una nota y la vista del lector, cuentas G de testnet con una cuenta "plataforma" que paga las comisiones. Sin passkeys, sin ZK, sin dinero, sin token. Plan B: `demo.sh` con los mismos pasos por CLI y video grabado.

## Lo que NO resuelve (y no se promete)

Extorsión, acceso a bodegas, cuotas a productores, márgenes de intermediación, ni la morosidad en sí: solo la hace visible y portable.

## Estrategia de implementación en un mercado en papel

Red atómica: **una bodega de abarrotes con ERP (bodega ancla del equipo) y sus 20–50 clientes recurrentes** *(propuesta)*. La bitácora sirve a esa bodega sola como control de fiado con acuse; la portabilidad llega con la segunda bodega. El cliente se subsidia (paga cero, firma por WhatsApp; 97 % de los usuarios de celular tiene smartphone y 90.6 % usa mensajería, [ENDUTIH 2025](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25_RR.pdf)). Frutas y legumbres, en papel, es segunda fase: foto de la nota + hash + co-firma por enlace, flujo no validado con usuarios. Métricas de uso, no de cuentas (lección CoDi: 21.8 M cuentas, 17.8 M operaciones).
