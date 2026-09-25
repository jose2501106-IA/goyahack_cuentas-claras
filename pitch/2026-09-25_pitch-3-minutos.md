# Pitch de 3 minutos — Cuentas Claras

> **Borrador v1 — pendiente de aprobación de José**
> Fecha: 2026-09-25 · Proyecto: **Cuentas Claras** · Equipo: **Palabra** (en formularios: "Equipo Palabra") · GOYA HACK · Hackathon UNAM 2026 · track Blockchain
> Estado del código: **por construirse hoy**. Aquí se describe *lo que mostraremos*. Toda frase que dependa de la construcción está marcada **[CONFIRMAR]** y trae una frase alternativa por si no queda lista.

Fuentes de este guion: `docs/problema-solucion.md`, `docs/hoja-de-hechos.md`, `docs/riesgos.md`, `docs/nombre-y-marca.md`, `spec/2026-09-25_especificacion-tecnica-v2.md` (§10 y §12), `research/00_sintesis-estrategica.md` ("Pitch, demo y README") y la estructura de 10 s · 20 s · 1 min · 1 min · 30 s de [TAIKAI](https://taikai.network/en/blog/how-to-create-a-hackathon-pitch) y [Best3Minutes](https://best3minutes.com/wp-content/uploads/2020/05/Make-a-Winning-Hackathon-Pitch_MIT-COVID19.pdf) (≈390–420 palabras en 3 minutos; "los últimos 20 segundos son lo primero que recordarán").

Convenciones: `‖` = pausa de un segundo. *[cursiva entre corchetes]* = acotación: no se dice. **[CORTABLE]** = línea que se quita si el ensayo pasa de 3:00.

---

## 1. Guion palabra por palabra (3:00)

### 0:00–0:10 · Apertura: un hecho, sin saludo · *[diapositiva 1]*

> En 2022 se detectó gota a gota dentro de la Central de Abasto: préstamos de 10 a 50 mil pesos, «sin requisitos», con cobro intimidatorio. ‖

### 0:10–0:30 · Problema · *[diapositiva 2]*

> En la Central, quien paga puntual no tiene cómo demostrarlo: el trato es a palabra, en persona y en efectivo. Entre más de 2,300 bodegas no hay registro compartido y no se pasan referencias. Y en el crédito formal, 18.4 % de los rechazos a empresas son por falta de historial. ‖

### 0:30–1:30 · Producto y tres mensajes · *[diapositiva 3; los tres mensajes aparecen uno por clic]*

> La bodega de abarrotes de nuestro equipo fía cientos de miles de pesos al día, y ese historial no sale de su sistema.
>
> Cuentas Claras es la bitácora de fiado co-firmada de la Central. Tres reglas que hace cumplir un contrato en Stellar, no nuestra buena fe. ‖
>
> Una: **ninguna bodega escribe sola una deuda**. La nota existe cuando la bodega la crea y el cliente la acepta desde su teléfono. ‖
>
> Dos: **nadie borra ni maquilla el historial**, ni nosotros. Corregir es agregar un evento **[CORTABLE]**, y «incumplida» solo existe tras un periodo de gracia. ‖
>
> Tres: **tu historial es tuyo y viaja contigo**. Otra bodega solo ve su semáforo con un permiso firmado del cliente, y cada consulta queda registrada. ‖
>
> ¿Por qué no una base de datos? Porque necesitaría un custodio en quien confíen bodegas que compiten, y hoy no existe.

### 1:30–2:30 · Demo · *[diapositiva 4 → cambiar a la app; detalle en `2026-09-25_guion-demo.md`]*

> Datos ficticios, en Stellar testnet. *[CONFIRMAR]*
>
> Bodega A le fía 8,500 pesos a Doña Mary, a 15 días. *[clic]* Creada, pero todavía no es deuda.
>
> Doña Mary la acepta desde su teléfono. *[clic]* Segunda firma: ahora existe. En el explorador no hay nombre ni monto: un identificador y un rango.
>
> Doña Mary paga; Bodega A confirma. *[clic]* Pagada a tiempo. **[CORTABLE: si vas tarde, salta este paso; el historial sembrado ya tiene notas pagadas]**
>
> Ahora Doña Mary va a Bodega B, donde nadie la conoce. Bodega B le pide su historial al contrato *[clic]*: rechazado. ‖ Esa negativa la hace cumplir el contrato. ‖
>
> Doña Mary le da permiso por 30 días. *[clic]* Bodega B consulta de nuevo *[clic]*: semáforo, notas pagadas a tiempo, cuántas bodegas las respaldan. Esa consulta también queda registrada.

*[Haz clic y habla mientras la transacción confirma: en testnet cada paso tarda unos segundos (CONFIRMAR el tiempo real en el ensayo). Si una frase termina antes que la confirmación, espera en silencio; no rellenes.]*

*[Variante si el semáforo sale «historial insuficiente» (probable con los umbrales de la spec; ver guion de demo §4). Sustituye la última oración por:]* «Dice "historial insuficiente": una sola bodega no basta para pintar de verde. Pero Bodega B ya ve lo que antes no existía: cuatro notas pagadas a tiempo, firmadas por los dos.» *[CONFIRMAR "cuatro": tres sembradas + una en vivo]*

*[Si la vista del cliente corre en la laptop y no en un teléfono, di:]* «Doña Mary la acepta desde su teléfono —aquí, simulado—».

### 2:30–3:00 · Cierre: riesgos antes que el jurado, qué funciona, qué sigue, petición · *[diapositivas 6 → 7 → 10]*

> Antes de que pregunten. La LRSIC: no somos una sociedad de información crediticia; el cliente autoriza cada lectura. La extorsión: en la cadena no hay nombre, teléfono ni monto exacto del cliente; aquí, eso sería un mapa para extorsionadores. ‖
>
> Lo que vieron corre en testnet; mainnet va después de una auditoría. *[CONFIRMAR]* ‖
>
> Les pedimos una cosa: ayúdennos a llevarlo a un piloto con una bodega y sus clientes. ‖
>
> Cuentas Claras: fiado de palabra, firmado por los dos.

*[Frase alternativa para «Lo que vieron corre en testnet», según lo que esté listo:]*
- Si corre el contrato pero la demo fue con `demo.sh`: «Lo que vieron es el contrato en testnet, operado por línea de comandos; la interfaz va después.»
- Si solo pasan las pruebas del contrato: «Hoy el contrato pasa sus pruebas de reglas; el despliegue en testnet es el siguiente paso.» *(En ese caso, la demo se sustituye por el video o las capturas; ver guion de demo §6.)*

*[Variante de la petición, solo si José la aprueba:]* «Les pedimos su respaldo —mentoría y contactos del ecosistema— para un piloto de cuatro semanas con una bodega y sus clientes.»

### Conteo y tiempos (verificado con script sobre el texto hablado, sin acotaciones)

| Tramo | Palabras | Tiempo objetivo | Diapositiva |
|---|---|---|---|
| Apertura | 25 | 0:00–0:10 | 1 |
| Problema | 50 | 0:10–0:30 | 2 |
| Producto | 139 | 0:30–1:30 | 3 |
| Demo | 111 | 1:30–2:30 (habla mientras confirma cada transacción) | 4 → app |
| Cierre | 75 | 2:30–3:00 | 6 → 7 → 10 |
| **Total** | **400** | **3:00** a ≈135 palabras por minuto (rango recomendado: 390–420) | |

Apertura y problema juntos suman 75 palabras para 30 segundos: van rápido a propósito; recupera el ritmo en el producto. Si el ensayo pasa de 3:05, quita las líneas **[CORTABLE]** (14 palabras, ≈6 s).

### Variante con el refrán *(propuesta del 25-sep, 12:30; José decide en el ensayo)*

El nombre del proyecto es la primera mitad de un refrán. Esta variante lo aprovecha: el público completa la frase, en voz alta o en su cabeza (`docs/nombre-y-marca.md`, sección 0).

**Apertura (0:00–0:10, sustituye a la del gota a gota):**

> Cuentas claras… ‖‖ *[mira al público y espera; si alguien completa, asiente]* …amistades largas. En la Central de Abasto el fiado se da de palabra. Y la palabra se cumple, pero no deja cuentas claras: fuera de la bodega, nadie la conoce. ‖

*[Si alguien dice «…y chocolate espeso»:]* «También: los dos finales piden claridad.»

Con esta apertura, el dato del gota a gota pasa al problema en lugar de la oración de ENAFIN (misma duración), o se guarda para preguntas. La apertura suma 32 palabras (7 más que la original) y una pausa de dos segundos: quita una línea **[CORTABLE]** para compensar.

**Cierre (2:52–3:00, sustituye a la última línea):**

> Cuentas claras, amistades largas. ‖ Somos el Equipo Palabra.

---

## 2. Datos que se dicen en voz alta (máximo cinco)

| # | Dato tal como se dice | Fuente y estatus | Cuándo |
|---|---|---|---|
| 1 | Gota a gota dentro de la Central: préstamos de 10 a 50 mil pesos «sin requisitos», con cobro intimidatorio (2022) | [ADN40](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial), secundaria (cita a la SSC) | 0:00 |
| 2 | El trato es a palabra, en persona y en efectivo | [Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/), primaria: tratos «a palabra, en persona y con pagos en efectivo» | 0:10 |
| 3 | Más de 2,300 bodegas | [FICEDA](https://ficeda.com.mx/sectores-de-actividad/), página sin fecha: 1,981 de frutas y legumbres + 347 de abarrotes = 2,328. **No** usar la cifra de Wikipedia | 0:10 |
| 4 | 18.4 % de los rechazos de crédito a empresas es por falta de historial | [ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf), primaria. Ojo: cubre empresas de 6 o más personas | 0:10 |
| 5 | La bodega de abarrotes del equipo fía cientos de miles de pesos al día | **Experiencia del equipo** (sin fuente externa). Es colocación diaria, no saldo ni morosidad (decisión #18) | 0:30 |

Afirmaciones sin cifra que también se dicen, y su respaldo:
- «No hay un registro compartido y no se pasan referencias»; «hoy no existe» un custodio en quien confíen bodegas rivales → **experiencia del equipo** (respuestas de José del 25-sep, `docs/preguntas-pendientes.md`).
- «Aquí eso sería un mapa para extorsionadores» → extorsión documentada en la Central ([Proceso, 2022](https://www.proceso.com.mx/reportajes/2022/11/17/la-central-de-abasto-una-gran-bodega-de-la-delincuencia-organizada-296458.html); [La Silla Rota, 2023](https://lasillarota.com/metropoli/2023/7/4/niegan-extorsiones-en-la-ceda-diableros-tienen-otros-datos-350133.html)). No se dice ninguna cifra de extorsión y **nunca** que Cuentas Claras la reduzca.
- La LRSIC reserva a sociedades autorizadas el manejo de historiales ([LRSIC, art. 5o](https://www.diputados.gob.mx/LeyesBiblio/pdf/LRSIC.pdf)). Sin cifras de sanciones.

Todo lo demás (ENDUTIH, ENIF, CoDi, McMillan y Woodruff, costo en Stellar) vive en el deck, el README y `2026-09-25_preguntas-jurado.md`.

---

## 3. Versión de 60 segundos (stand / evaluación en vivo)

> En la Central de Abasto el fiado se da a palabra y en efectivo. La palabra se cumple, pero no viaja: si cambias de bodega, empiezas de cero. Hoy no hay registro compartido ni referencias entre bodegas, y la bodega de abarrotes de nuestro equipo fía cientos de miles de pesos al día.
>
> Cuentas Claras es la bitácora de fiado co-firmada: la bodega crea la nota y el cliente la acepta desde su teléfono. Ninguna bodega escribe sola una deuda. Nadie borra ni maquilla el historial. Y tu historial es tuyo y viaja contigo: otra bodega solo ve su semáforo con un permiso firmado del cliente.
>
> Lo hace cumplir un contrato en Stellar: no hay custodio en quien confíen bodegas rivales. Y en la cadena no hay nombre, teléfono ni monto exacto del cliente.
>
> ¿Le muestro la demo? Es un minuto.

*(141 palabras. Datos: a palabra y en efectivo, Bakić Hayden; cifra de la bodega, experiencia del equipo. Si el frontend está publicado, sigue con «¿Quiere ser el cliente? Firme desde su teléfono»: ver guion de demo §5.)*

## 4. Versión de 30 segundos (elevator)

> En la Central de Abasto el fiado se da de palabra. La palabra se cumple, pero no viaja: si cambias de bodega, empiezas de cero. Cuentas Claras es la bitácora de fiado co-firmada: cada nota la firman la bodega y el cliente, nadie la puede borrar, y el historial es del cliente, que decide quién lo ve. Lo hace cumplir un contrato en Stellar. Fiado de palabra, firmado por los dos.

*(70 palabras. Sin cifras. Sirve para abrir la mentoría, para presentarse en el stand y para los primeros 15 segundos del video.)*

---

## 5. Notas de entrega

**Ritmo.** Unas 135 palabras por minuto. Las cifras se dicen despacio y completas («dieciocho punto cuatro por ciento»). Las oraciones terminan con la voz hacia abajo, no en pregunta. Sin muletillas («este…», «o sea»): una pausa en silencio es mejor.

**Pausas (`‖`).** Un segundo después del hecho de apertura; uno después de cada uno de los tres mensajes; **dos** segundos cuando aparece «rechazado» en la demo (es el momento que prueba que el contrato hace cumplir); uno antes de la petición. Al terminar, un segundo de silencio y luego «Gracias». No digas «y eso sería todo».

**Dónde mirar.**
- 0:00–0:10: al centro del jurado, no a la pantalla. Espera a tener silencio antes de la primera palabra.
- 0:10–0:30: recorre a los jueces, una frase por juez.
- 0:30–1:30: cada mensaje a un juez distinto; cuenta con los dedos: una, dos, tres.
- 1:30–2:30: a la pantalla **solo** para hacer clic; la frase se dice mirando al jurado. En «rechazado», mira al jurado durante la pausa.
- 2:30–3:00: nada de pantalla. La petición, al centro; la última frase, más lenta.

**Manos y cuerpo.** De pie, con los pies firmes. La laptop a un lado, no entre tú y el jurado. Si hay control remoto para las diapositivas, úsalo; si no, un clic por paso con los formularios de la demo precargados *[CONFIRMAR con Claude Code: valores precargados]*.

**Memoria.** Las dos primeras oraciones y las dos últimas, palabra por palabra. El centro se sostiene con tres apoyos: *ninguna bodega escribe sola una deuda* · *nadie borra ni maquilla* · *tu historial es tuyo y viaja contigo*. No leas las diapositivas.

**Reloj.** Revisa el tiempo en dos puntos: a la 1:30 deberías estar abriendo la app; a las 2:30, empezando el cierre. Si vas tarde a la 1:30, salta el paso 3 de la demo.

**Ensayo.** Tres veces en voz alta con cronómetro y una grabada con el teléfono (mírala una vez). Ensaya también el paso a plan B: di la frase de rescate y cambia al video sin mirar el teclado (guion de demo §8).

**Qué no decir nunca.** «Buró», «score», «calificación», «pagaré ejecutable»; cifras de sanciones de la LRSIC; la cifra de bodegas de Wikipedia; una tasa del gota a gota; que Cuentas Claras «reduce la extorsión»; que MEGA se integrará; el precio de XLM; comparaciones numéricas entre cadenas; que el piloto ya empezó o tiene resultados; problemas de desarrollo o disculpas por lo que falta.

---

## 6. Mapa pitch ↔ diapositivas (versión en vivo)

| Tiempo | En pantalla |
|---|---|
| 0:00–0:10 | Diapositiva 1 · Gancho |
| 0:10–0:30 | Diapositiva 2 · Para quién y cuánto cuesta |
| 0:30–1:30 | Diapositiva 3 · Solución (los tres mensajes aparecen uno por clic; el «¿por qué no una base de datos?» se dice aquí) |
| 1:30–2:30 | Diapositiva 4 → app en vivo. Si la app falla, se queda la 4 con capturas del ensayo, o `demo.sh`, o el video |
| 2:30–2:45 | Diapositiva 6 · Vive en cadena / vive fuera (LRSIC y extorsión) |
| 2:45–2:52 | Diapositiva 7 · Hoy y lo que sigue |
| 2:52–3:00 | Diapositiva 10 · Cierre |

Diapositivas 5, 8 y 9: **ocultas en la versión en vivo** (su contenido ya se dijo, o es para preguntas); visibles en el PDF de entrega, en el stand y para responder al jurado.

---

## 7. Pendientes antes de ensayar

**Para José (decisiones):**
1. Aprobar el guion: tres mensajes, cierre y petición.
2. **No decir el nombre de la bodega en público** (recomendación): el identificador de la bodega más su volumen diario es exacto al tipo de dato que el diseño protege. El guion dice «la bodega de abarrotes de nuestro equipo».
3. **Forma pública de la cifra (decisión #28):** en el repo, el video y el PDF se dice «cientos de miles de pesos al día», sin nombre de bodega; la cifra exacta vive en `privado/`. Decir la cifra exacta en vivo es decisión de José. Ojo: en el **video público** y en el PDF queda junto a tu nombre. Opciones: dejarla como está, decirla solo en vivo o decir «cientos de miles de pesos al día».
4. La petición: el guion no afirma que la bodega del equipo hará el piloto. ¿Se puede decir?
5. Semáforo en la demo: opción recomendada en el guion de demo §4.

**Dependen de la construcción [CONFIRMAR]:** que el flujo corra en testnet; que la vista del cliente abra en un teléfono; historial sembrado de Doña Mary (tres notas) y sin permiso vigente para Bodega B; estado real del semáforo; frase de «lo que funciona hoy».
