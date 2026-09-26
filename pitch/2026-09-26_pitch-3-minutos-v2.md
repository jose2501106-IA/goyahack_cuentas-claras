# Pitch de 3 minutos — Cuentas Claras (v2)

> **Borrador v2 — pendiente de aprobación de José** · 26-sep-2026 · Equipo **Palabra** · GOYA HACK · track Blockchain
> Sustituye a `2026-09-25_pitch-3-minutos.md` (v1, bitácora). Cambios: la app con el **gemelo digital del Pasillo A-B** es la demo (#47, #48); la historia de los **dos huecos que cerramos** (#42, #46) pasa a ser el argumento de «¿por qué blockchain?»; «historial insuficiente» se presenta como virtud (#44); el refrán abre y cierra.
> Estado: contrato `CDPFZN…GBDTW` en testnet, 13 pruebas en verde; app de cuatro vistas y gemelo digital funcionando en el Codespace. Lo que depende del ensayo está marcado **[CONFIRMAR]**.

Convenciones: `‖` = pausa de un segundo. *[cursiva entre corchetes]* = acotación: no se dice. **[CORTABLE]** = se quita si el ensayo pasa de 3:00.

---

## 1. Guion palabra por palabra

### 0:00–0:12 · Apertura: el refrán · *[diapositiva 1]*

> Cuentas claras… ‖‖ *[mira al público; si alguien completa, asiente]* …amistades largas. En la Central de Abasto el fiado se da de palabra. Y la palabra se cumple, pero no viaja: fuera de la bodega, nadie la conoce. ‖

### 0:12–0:30 · Problema · *[diapositiva 2]*

> El trato es a palabra, en persona y en efectivo. Entre más de 2,300 bodegas no hay un registro compartido y no se pasan referencias. Quien paga puntual no tiene cómo demostrarlo. Y en el crédito formal, 18.4 % de los rechazos a empresas son por falta de historial. ‖

### 0:30–1:15 · Producto: tres reglas · *[diapositiva 3; una regla por clic]*

> La bodega de abarrotes de nuestro equipo fía cientos de miles de pesos al día, y ese historial no sale de su sistema.
>
> Cuentas Claras es la bitácora de fiado co-firmada de la Central. Tres reglas que hace cumplir un contrato en Stellar, no nuestra buena fe. ‖
>
> Una: **ninguna bodega escribe sola una deuda**: la firman la bodega y el cliente. ‖
>
> Dos: **nadie borra ni maquilla el historial**, ni nosotros. ‖
>
> Tres: **tu historial es tuyo**: otra bodega solo lo consulta con tu permiso, y cada consulta queda registrada. ‖
>
> ¿Por qué no una base de datos? Porque necesitaría un custodio en quien confíen bodegas que compiten, y hoy no existe.

### 1:15–2:25 · Demo en el gemelo digital · *[cambia a la app, portada «Pasillo A-B»; detalle en `2026-09-26_guion-demo-v2.md`]*

> Este es el Pasillo A-B de la Central, con su forma real. Las bodegas y los datos de la demo son ficticios, y todo corre en Stellar testnet.
>
> Bodega A-17 le fía 8,500 pesos a Doña Mary, a 15 días. *[clic]* Sale la nota; todavía no es deuda.
>
> Doña Mary la acepta desde su teléfono. *[clic]* Segunda firma: ahora existe. En la cadena no va su nombre ni el monto: un seudónimo y un rango.
>
> Paga, y Bodega A-17 lo confirma. *[clic]* Cumplida. **[CORTABLE]**
>
> Ahora Doña Mary cruza el pasillo, a Bodega B-40, donde nadie la conoce. Bodega B-40 pide su historial. *[clic]* Rechazado. ‖‖
>
> Doña Mary le da permiso por 30 días. *[clic]* Bodega B-40 consulta otra vez. *[clic]* Ve sus notas cumplidas y en cuántas bodegas… y dice «historial insuficiente». Es a propósito: con menos de dos meses de historial, no juzgamos.

*[Mientras confirma cada transacción, habla; si la frase termina antes, espera en silencio. Si la vista del cliente está en la laptop: «desde su teléfono —aquí, simulado—». Narra lo que aparezca en pantalla: si los contadores cambian, di lo que se ve [CONFIRMAR en el ensayo].]*

### 2:25–2:45 · Los dos huecos que cerramos · *[diapositiva 6]*

> Una cosa más. Revisando nuestro propio contrato encontramos dos huecos: uno entregaba el resumen sin permiso; otro se lo dejaba ver a cualquier bodega que ya te hubiera fiado. Los cerramos. ‖ Y como el contrato no se puede actualizar, cerrarlos fue desplegar uno nuevo: ni nosotros cambiamos las reglas en silencio. ‖

### 2:45–3:00 · Cierre · *[diapositivas 8 → 10]*

> Lo que vieron corre hoy en testnet; mainnet va después de una auditoría. Les pedimos ayuda para llevarlo a un piloto con una bodega y sus clientes. ‖ Cuentas claras, amistades largas. ‖ Somos el Equipo Palabra.

*[Un segundo de silencio y luego «Gracias».]*

---

## 2. Datos que se dicen en voz alta (los mismos cinco de la v1)

| Dato | Fuente |
|---|---|
| El trato es a palabra, en persona y en efectivo | [Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/) (H-07) |
| Más de 2,300 bodegas | [FICEDA](https://ficeda.com.mx/sectores-de-actividad/): 1,981 + 347 (H-01) |
| 18.4 % de los rechazos por falta de historial | [ENAFIN 2024, INEGI](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf) (H-05) |
| No hay registro compartido ni se pasan referencias; no existe un custodio de confianza | Experiencia de José |
| La bodega del equipo fía cientos de miles de pesos al día | Experiencia de José (decisión #28: sin nombre ni cifra exacta en público) |

**Lo que se afirma sobre el producto y su respaldo:**
- **«Forma real del Pasillo A-B»:** plano de la CEDA, publicado con autorización de José (#48), sin rótulos. Las posiciones de la demo son ilustrativas.
- **«Dos huecos cerrados»:** decisiones #42 (`get_stats`, que entregaba el resumen sin permiso) y #46 (excepción del emisor). Cada una llevó a un redespliegue.
- **«No se puede actualizar»:** no hay función `upgrade` (decisión #30).
- **«Historial insuficiente»:** regla del semáforo (spec v2 §8; #44). Exige 3 notas cerradas, 2 bodegas y 60 días.

El gota a gota (ADN40, 2022), la LRSIC y la extorsión pasan a preguntas y a la diapositiva 6 del PDF.

## 3. Conteo (verificado con script sobre el texto hablado, sin acotaciones)

| Tramo | Palabras | Tiempo |
|---|---|---|
| Apertura | 30 | 0:00–0:12 (con pausa de dos segundos) |
| Problema | 49 | 0:12–0:30 |
| Producto | 109 | 0:30–1:15 |
| Demo | 136 | 1:15–2:25 (habla mientras confirma cada transacción) |
| Huecos cerrados | 51 | 2:25–2:45 |
| Cierre | 35 | 2:45–3:00 |
| **Total** | **410** | **3:00**, a unas 135 palabras por minuto (rango: 390–420) |

Si el ensayo pasa de 3:05, quita el paso del pago (**[CORTABLE]**, 6 palabras más su transacción): el mapa ya muestra la nota cumplida de Bodega A-73.

## 4. Notas de entrega (lo que cambia respecto a la v1)

- **La pausa de dos segundos** va en «Rechazado». Es el momento que prueba que el contrato hace cumplir la regla. Mira al jurado, no a la pantalla.
- **«Es a propósito: no juzgamos»:** dilo más lento. Convierte lo que parece una falla en una decisión de diseño.
- **Los huecos cerrados:** dilo con orgullo, no como disculpa. Es la prueba de que las reglas no dependen de nosotros.
- **No digas:** «metaverso», «buró», «score», «calificación», «anónimo», «nadie puede verlo», ni el nombre o número real de tu bodega. Tampoco digas que el mapa muestra bodegas participantes.

## 5. Versión de 30 segundos (stand y primeros segundos del video)

> Cuentas claras, amistades largas. En la Central de Abasto el fiado se da de palabra, y la palabra no viaja. Cuentas Claras es la bitácora de fiado co-firmada: cada nota la firman la bodega y el cliente, nadie la puede borrar, y el historial es del cliente, que decide quién lo consulta. Lo hace cumplir un contrato en Stellar, que ni nosotros podemos cambiar.
