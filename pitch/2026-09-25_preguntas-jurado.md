# Banco de preguntas del jurado — Cuentas Claras

> **Borrador v1 — pendiente de aprobación de José**
> Fecha: 2026-09-25 · Proyecto: **Cuentas Claras** · Equipo: **Palabra** (en formularios: "Equipo Palabra") · GOYA HACK · Hackathon UNAM 2026 · track Blockchain
> Estado del código: **por construirse hoy**. Lo que depende de la construcción está marcado **[CONFIRMAR]**.

Base: `docs/riesgos.md` (su última columna es el guion del Q&A), `docs/hoja-de-hechos.md`, `docs/problema-solucion.md`, `docs/plan-maestro.md`, `spec/2026-09-25_especificacion-tecnica-v2.md` y `research/00_sintesis-estrategica.md`.

## Reglas para responder

- **Primera frase = la respuesta.** Máximo 20 segundos. Un dato, no tres. Si cabe, vuelve a uno de los tres mensajes: *ninguna bodega escribe sola una deuda* · *nadie borra ni maquilla el historial* · *tu historial es tuyo y viaja contigo*.
- **Si no sabemos:** «No lo sabemos todavía. Lo que sí sabemos es… Lo vamos a medir así: …». Nunca estimar, nunca inventar, nunca citar resultados de un piloto que no ha empezado.
- Cada respuesta tiene **50 palabras o menos** (verificado con script) y solo usa hechos con fuente o marcados como **experiencia del equipo** (lo que sabe José por operar en la Central).
- Las preguntas están escritas con las palabras que probablemente use el jurado, **incluidas algunas vetadas** («buró», «score»). **Las respuestas nunca las repiten.**
- No decir el nombre de la bodega ni datos que identifiquen la bodega del equipo *(pendiente de José)*.

---

## A. Problema y evidencia

### 1. ¿Cómo saben que es un problema real? ¿Lo validaron con usuarios?

**R.** Con experiencia directa: la bodega de abarrotes de nuestro equipo fía cientos de miles de pesos al día, y en la Central no hay registro compartido ni se pasan referencias. No hemos hecho entrevistas formales con clientes: esa es la primera tarea del piloto.

*Fuente:* **experiencia del equipo** (decisiones #18 y #19). *[CONFIRMAR con José que no hay entrevistas formales]*. Si piden literatura: en la Central, «la búsqueda de información es el principal reto» ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)).

### 2. ¿Cuánto cuesta el problema? ¿Tienen datos de morosidad?

**R.** No tenemos cifra de morosidad de la Central y no la vamos a estimar: la medirá el piloto. Sí está documentado el costo de la alternativa: en un caso en la CDMX, un préstamo gota a gota de 10 mil pesos se volvió una deuda de 107 mil en semanas.

*Fuente:* [N+](https://www.nmas.com.mx/sociedad/prestamo-estafa-gota-a-gota-en-cdmx-leticia-pidio-10000-y-debe-107000/), caso de prensa en la CDMX, no en la Central. **No calcular ni decir una tasa.** Morosidad: pendiente (`docs/preguntas-pendientes.md`).

## B. Por qué blockchain / por qué no una base de datos

### 3. ¿Por qué blockchain y no una base de datos?

**R.** Una base de datos necesita un custodio en quien confíen bodegas que compiten, y en la Central no existe. El contrato pone la confianza en reglas públicas: ninguna bodega escribe sola una deuda, nadie borra, el cliente se lleva su historial y un tercero verifica sin confiar en nosotros.

*Fuente:* **experiencia del equipo** (no hay registro ni custodio compartido del crédito); `docs/problema-solucion.md`. Si insisten, la condición honesta: «Si existiera ese custodio neutral, una base de datos bastaría. Hoy no existe.»

### 4. ¿Y si la administración de la Central operara esa base de datos?

**R.** Un registro entre competidores no debería depender de ningún custodio, ni nuestro ni de la administración: las administraciones cambian —la última designación fue en octubre de 2024— y el historial del cliente debe sobrevivir. A la administración le proponemos validar qué bodegas emiten, no custodiar datos.

*Fuente:* [El Heraldo de México, 2024](https://heraldodemexico.com.mx/nacional/2024/10/23/brugada-designa-titulares-de-central-de-abasto-injuve-pilares-648130.html); `docs/plan-maestro.md` §5b (propuesta). Tono: argumento de diseño, no crítica a nadie.

### 5. ¿No es solo guardar un hash en cadena? ¿Por qué no una cadena privada entre bodegas?

**R.** No: un hash sería almacenamiento, y el fondo de Stellar lo descarta. El contrato hace cumplir reglas: dos firmas, gracia antes de «incumplida», lectura solo con permiso. Y una cadena privada entre bodegas sería un consorcio de competidores, como TradeLens, que cerró por falta de colaboración.

*Fuente:* [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria): *"not… for data storage"*; spec v2 §6 (invariantes); [Maersk, 2022](https://www.maersk.com/news/articles/2022/11/29/maersk-and-ibm-to-discontinue-tradelens): *"the need for full global industry collaboration has not been achieved"*.

## C. Por qué Stellar

### 6. ¿Por qué Stellar?

**R.** Comisión base de 100 stroops por operación y finalidad sin reorganizaciones; verificación nativa de passkeys, para que después el cliente firme desde su teléfono; rampa a pesos ya existente; y es la red del track. Debilidad: Soroban es joven; por eso testnet y auditoría antes de mainnet.

*Fuente:* [Stellar Docs, comisiones](https://developers.stellar.org/docs/learn/fundamentals/fees-resource-limits-metering); [Protocol 21, firmas secp256r1](https://stellar.org/protocol-upgrades); [Félix + Bitso por SPEI](https://stellar.org/case-studies/felix-bitso). Las passkeys **no** están en el MVP. Nunca el precio de XLM.

### 7. ¿Por qué no Avalanche, Ethereum o Solana?

**R.** No hicimos una comparación numérica entre cadenas y no la vamos a improvisar. Elegimos Stellar por comisión base baja, finalidad sin reorganizaciones, passkeys y rampa a pesos, y porque su fondo pide justo lo que hacemos: que la cadena mejore funciones centrales, no que guarde datos.

*Fuente:* `research/00_sintesis-estrategica.md` (no se obtuvieron cifras comparables entre cadenas); [SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria). Tono: respeto; Avalanche está en el evento.

## D. Legal: LRSIC, datos personales, pagaré

### 8. ¿Esto no es un buró de crédito? La LRSIC reserva esa actividad a sociedades autorizadas.

**R.** Es nuestro principal riesgo legal y no está resuelto. La LRSIC reserva a sociedades autorizadas recopilar y entregar historiales; por eso el historial es del cliente: la consulta oficial de un tercero exige su permiso firmado, con vigencia, y cada consulta queda registrada. Dictamen legal antes de la segunda bodega.

*Fuente:* [LRSIC, arts. 5o y 28](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf); `docs/riesgos.md`; `docs/plan-maestro.md` P2. **Nunca** cifras de sanciones.

### 9. ¿Cómo cumplen con la ley de datos personales si la cadena es inmutable?

**R.** En la cadena no hay nombre, teléfono ni monto exacto: solo un seudónimo con llave, rangos, fechas y estados. Nombre, teléfono y montos viven fuera, cifrados y borrables. Si borrar lo que vive fuera satisface el derecho de cancelación, ninguna autoridad mexicana lo ha confirmado: va al dictamen.

*Fuente:* [LFPDPPP, arts. 7, 24, 35 y 36](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf); [EDPB 02/2025 v2.0](https://www.edpb.europa.eu/system/files/2026-07/edpb_guidelines_202502_blockchain_v2_en.pdf); spec v2 §3. **Ojo:** no decir «cero datos personales en cadena»; con criterios europeos, un seudónimo puede seguir siendo dato personal.

### 10. ¿La nota es un pagaré? ¿Sirve para cobrar en un juicio?

**R.** No la presentamos como pagaré ni como título de crédito. Es una nota firmada electrónicamente con valor probatorio: el Código de Comercio no niega efectos a un mensaje de datos. Para título de crédito, una tesis de 2025 exige firma electrónica avanzada; esa opción es fase posterior.

*Fuente:* [Código de Comercio, arts. 89 bis y 93](https://www.diputados.gob.mx/LeyesBiblio/pdf/CCom.pdf); tesis aislada 2031391, oct-2025 ([Nexos](https://eljuegodelacorte.nexos.com.mx/cuando-una-tesis-sobre-pagares-digitales-afecta-la-inclusion-financiera/)). No prometer resultados en juicio.

## E. Privacidad y extorsión

### 11. En la Central hay extorsión. ¿No están creando un mapa para extorsionadores?

**R.** Diseñamos para que no lo sea: en cadena no hay nombres, locales, teléfonos ni montos exactos, solo seudónimos y rangos. Ningún tercero ve el agregado sin permiso del cliente, y cada consulta queda registrada. No prometemos resolver la extorsión: prometemos no darle un mapa.

*Fuente:* `docs/riesgos.md` ([Proceso, 2022](https://www.proceso.com.mx/reportajes/2022/11/17/la-central-de-abasto-una-gran-bodega-de-la-delincuencia-organizada-296458.html); [La Silla Rota, 2023](https://lasillarota.com/metropoli/2023/7/4/niegan-extorsiones-en-la-ceda-diableros-tienen-otros-datos-350133.html)). Sin cifras de extorsión. Nunca «reduce la extorsión».

### 11b. La cadena es pública: ¿no puede cualquiera leer el historial sin permiso?

**R.** Sí: lo que está en la cadena es público, y lo decimos. Por eso ahí no va nombre, teléfono ni monto exacto: solo un seudónimo y rangos. El permiso controla la consulta oficial al contrato, que es la que usa una bodega para decidir, y deja constancia. La confidencialidad completa, con seudónimos por bodega y pruebas de conocimiento cero, es el siguiente paso, antes de abrir consultas entre bodegas en el piloto.

*Fuente:* spec v2, sección 3b; `docs/riesgos.md`. **Nunca** decir «solo lo ve quien tú autorices» sin este matiz.

### 12. ¿Quién tiene la llave del seudónimo? ¿No son ustedes un custodio?

**R.** Sí, en el MVP la llave vive en nuestro servidor: con un hash sin llave, cualquiera adivinaría el teléfono detrás del seudónimo. Pero el historial no lo custodiamos: está en cadena y, con permiso del cliente, un lector lo lee directo del contrato. Las cuentas de demo sí las operamos.

*Fuente:* spec v2 §8 (un teléfono mexicano tiene 10^10 valores posibles y un hash simple se puede recorrer) y §5.1 (cuentas de demo custodiadas). Rotación del seudónimo por periodo y passkeys: fases posteriores.

## F. Adopción y modelo de negocio

### 13. ¿Quién paga? ¿Cuál es el modelo de negocio?

**R.** Hipótesis que valida el piloto: el cliente paga cero; la bodega paga la herramienta —cobranza con acuse del cliente— y cubre las comisiones de red. Cobrar a terceros por consulta queda fuera hasta el dictamen: se parecería a una sociedad de información crediticia. Mientras el piloto prueba que la bodega paga, el puente es el fondo de Stellar. Todavía no tenemos precio.

*Fuente:* `docs/modelo-de-negocio.md` (opciones A a E; recomendación A + D, propuesta); `docs/problema-solucion.md` (el cliente paga cero); `docs/plan-maestro.md` P1 (comisiones pagadas por la bodega). Excluir el cobro por consulta es **inferencia de diseño** por el riesgo LRSIC; lo decide el dictamen. No inventar precio.

### 14. ¿Por qué una bodega lo adoptaría, si hoy fía de palabra sin problema?

**R.** Porque le sirve sola desde el primer día: cobranza documentada que el cliente no puede negar. La portabilidad se suma cuando llega la segunda bodega. Si no le sirve a una sola bodega, no funciona; eso mide el piloto: notas co-firmadas por semana, no cuentas creadas, la lección de CoDi.

*Fuente:* CoDi: 21.8 millones de cuentas validadas contra 17.8 millones de operaciones en seis años ([El Cronista](https://www.cronista.com/mexico/finanzas-economia/no-es-para-todos-la-banca-simplifica-codi-y-dimo-ante-una-adopcion-menor-a-la-esperada-de-los-pagos-digitales/)); `docs/plan-maestro.md` §8. La propuesta de valor es hipótesis del piloto.

### 15. ¿Cómo firma un cliente que no sabe de wallets?

**R.** No ve una wallet ni la palabra blockchain: toca «Aceptar» en una página. En producción le llegará un enlace por WhatsApp: 97 % de los usuarios de celular tiene smartphone y 90.6 % usa mensajería. En la demo, su cuenta la opera nuestro servidor; firmar con passkey es el siguiente paso.

*Fuente:* [ENDUTIH 2025](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25_RR.pdf), primaria; spec v2 §5.1. El enlace por WhatsApp es diseño propuesto, no validado con usuarios.

## G. Técnica: qué hace el contrato, qué es real y qué es simulado

### 16. ¿Qué hace exactamente el contrato? ¿Qué es real y qué es simulado?

**R.** Hace cumplir: solo emiten bodegas de la lista; la nota existe con dos firmas; nada se edita; «incumplida» solo tras gracia; lectura solo con permiso. Real: contrato y transacciones en testnet *[CONFIRMAR]*. Simulado: datos ficticios y llaves de demo que guarda nuestro servidor; en producción, cada quien firma con la suya.

*Fuente:* spec v2 §5, §5.1 y §6. **Pregunta de seguimiento probable:** «¿Entonces su servidor podría firmar por los dos?» → «En la demo, sí, porque las cuentas son de prueba; por eso el siguiente paso son passkeys en el teléfono de cada quien. El contrato ya exige dos firmas distintas y no cambia.»

### 17. ¿Cómo sabe la cadena que el pago realmente ocurrió?

**R.** No lo sabe, y no lo fingimos: registra lo que las dos partes firman. Si el cliente dice que pagó y la bodega no lo reconoce, la nota queda «en disputa», que no es lo mismo que «incumplida». Validar comprobantes bancarios como evidencia es fase posterior.

*Fuente:* spec v2 §5 (`claim_paid`, estados `PaidClaimed` y `Disputed`); `docs/riesgos.md`.

### 18. ¿Y si una bodega y un cliente se ponen de acuerdo para inflar un historial?

**R.** Un solo emisor cómplice no alcanza para pintar de verde: solo emiten bodegas verificadas, el agregado muestra cuántas bodegas distintas respaldan el historial, y con pocas notas, una sola bodega o poco tiempo dice «historial insuficiente». Capital en riesgo del emisor es fase posterior.

*Fuente:* spec v2 §8 (umbrales propuestos: menos de 3 notas cerradas, menos de 2 emisores o menos de 60 días); `docs/riesgos.md`. **Coherencia con la demo:** si se usan umbrales de demostración (guion de demo §4, opción A), decirlo antes de que lo noten.

## H. Escalabilidad y siguientes pasos

### 19. ¿Por qué empezar por abarrotes? ¿Cómo llegan a frutas y legumbres y a toda la Central?

**R.** Abarrotes primero porque empezamos con una bodega que lleva su fiado en un sistema de ventas, y una bodega con sus clientes funciona sola. En frutas y legumbres, con 1,981 bodegas, la mayoría opera en papel: fotografiar la nota y co-firmar por enlace es la idea, sin validar con usuarios.

*Fuente:* [FICEDA](https://ficeda.com.mx/sectores-de-actividad/), página sin fecha; **experiencia del equipo** (sistema de ventas en la bodega del equipo; papel en frutas y legumbres); red que funciona sola: `research/00_sintesis-estrategica.md` («Implementación en un mercado de papel»).

### 20. ¿Qué sigue después del hackathon? ¿Por qué no mainnet ya?

**R.** Piloto de cuatro semanas con una bodega de abarrotes y sus clientes; dictamen legal; postulación al Stellar Community Fund; segunda bodega. Mainnet solo después de una auditoría, con passkeys y un relayer para comisiones. Testnet es a propósito: primero evidencia de uso, después mainnet.

*Fuente:* `docs/plan-maestro.md` §5 (P1–P5, propuesta); regla del proyecto: mainnet solo después de entregar.

---

## I. Preguntas nuevas del 26-sep (gemelo digital y seguridad)

### 21. ¿Qué eran esos «dos huecos»? ¿Por qué no los vieron antes?

**R.** Uno era una función de consulta que entregaba el resumen del cliente sin pedir permiso. El otro, una regla que dejaba leerlo a cualquier bodega que ya le hubiera fiado, aunque el cliente no se lo hubiera autorizado. Los encontramos en nuestra propia revisión antes de entregar, los cerramos con pruebas que fallan si vuelven a aparecer, y desplegamos un contrato nuevo. Los anteriores quedan registrados como obsoletos en el repositorio.

*Fuente:* decisiones #42 y #46; `demo/deploy.json` (`contratos_anteriores`); pruebas `no_hay_get_stats_publico` y `emisor_con_notas_necesita_permiso`.

### 22. Si no se puede actualizar, ¿qué controla el administrador?

**R.** Solo el padrón de bodegas emisoras: dar de alta o de baja a quién puede crear notas. No puede editar ni borrar notas, no puede leer resúmenes sin permiso y no puede cambiar las reglas, porque el contrato no tiene función de actualización. En producción, ese padrón lo validaría la administración de la Central con más de una firma.

*Fuente:* spec v2 §5; decisión #30 (sin `upgrade`); decisión #24 (administración como validadora, propuesta).

### 23. ¿El mapa es real? ¿La ubicación de la bodega va a la cadena?

**R.** Es la forma real del Pasillo A-B, tomada del plano con autorización y sin rótulos. Las bodegas de la demo están en posiciones ilustrativas: ninguna bodega real participa. La ubicación nunca va a la cadena; el contrato no sabe dónde está cada bodega.

*Fuente:* decisiones #47 y #48; `plano/pasillo-a-b.json`.

### 24. ¿Por qué el semáforo dice «historial insuficiente» si tiene notas cumplidas?

**R.** Porque exige tres condiciones: tres notas cerradas, dos bodegas distintas y 60 días de historial. En testnet no se pueden fabricar 60 días, y no bajamos la regla para que la demo salga en verde. Una sola bodega, o pocos días, no bastan para juzgar a alguien. Eso también protege contra una bodega y un cliente que se pongan de acuerdo (pregunta 18).

*Fuente:* spec v2 §8; decisión #44.

### 25. Ya hubo un proyecto de la Central de Abasto que ganó un hackathon. ¿En qué se diferencian?

**R.** *[Pendiente: no lo hemos podido identificar. Una mentora nos lo mencionó. Antes del pitch hay que conseguir el nombre o el repositorio y escribir esta respuesta con datos. Mientras tanto: «No conocemos su código a detalle. Lo nuestro no mueve dinero ni emite token: es la bitácora de fiado firmada por los dos, con el historial en manos del cliente. Si resuelven otra parte de la Central, somos complementarios».]*

*Fuente:* por confirmar (`docs/preguntas-pendientes.md`).

---

## Si el jurado usa estas palabras (no cuentan entre las 20)

| El jurado dice | Nosotros decimos |
|---|---|
| «score», «calificación» | «Un agregado orientativo, con estado explícito de "historial insuficiente"; la bodega decide.» |
| «buró» | «Una sociedad de información crediticia; no somos una: el cliente autoriza cada lectura.» |
| «pagaré» | «Una nota firmada electrónicamente con valor probatorio.» |
| «token», «cripto» | «No hay token y no se mueve dinero: la cadena solo registra firmas, estados y permisos.» |
