# Pitch de 3 minutos — Cuentas Claras (v3: «Un día de Doña Mary»)

> **Borrador v3, pendiente de aprobación de José** · 26-sep-2026, 23:50 · Equipo **Palabra** · GOYA HACK · track Blockchain
> **Sustituye a la v2.** La presentación entera es una historia en orden cronológico: un día de Doña Mary, que es un personaje ficticio. La demo no va aparte: es el clímax de la historia.
> **Cambios frente a la v2:**
> - ya no hay permiso (#57): Doña Mary enseña su código;
> - la demo tiene 5 pasos;
> - «los dos huecos» se sustituyen por «atacamos nuestro propio contrato» (#55) y «escuchamos al mentor» (#57);
> - 8 diapositivas en lugar de 10.
>
> **Contrato:** v5 `CD4DJQ…Q37WL` en Stellar testnet, con 22 pruebas en verde.

Convenciones: `‖` = pausa de un segundo. *[cursiva entre corchetes]* = acotación: no se dice. **[CORTABLE]** = se quita si el ensayo pasa de 3:00.

---

## 1. Guion palabra por palabra

### 0:00–0:12 · Gancho · *[diapositiva 1: portada]*

> Cuentas claras… ‖‖ *[mira al público; si alguien completa, asiente]* …amistades largas. ‖ Son las cuatro de la mañana en la Central de Abasto, y Doña Mary ya está en el pasillo.

### 0:12–0:35 · El mundo de hoy · *[diapositiva 2: Doña Mary]*

> Doña Mary tiene una fonda. Lleva años comprando fiado en la Bodega A-17, y siempre paga. Pero esa palabra cumplida vive en una libreta que solo conoce A-17. En la Central hay más de 2,300 bodegas, y ninguna se pasa referencias.

### 0:35–0:55 · El conflicto · *[diapositiva 3: la palabra no viaja]*

> Hoy A-17 no tiene lo que ella necesita, y Doña Mary cruza a la Bodega B-40. Ahí nadie la conoce, y al que nadie conoce, no se le fía. ‖ Su palabra no viaja. Y no es solo aquí: en el crédito formal, 18.4 % de los rechazos a empresas son por falta de historial. ‖

### 0:55–1:20 · La idea · *[diapositiva 4: tres reglas; una por clic]*

> Cuentas Claras es la libreta de fiado, firmada por los dos. Tres reglas que hace cumplir un contrato en Stellar, no nuestra buena fe. ‖
>
> Una: ninguna bodega escribe sola una deuda. ‖ Dos: nadie borra ni maquilla una nota, ni nosotros. ‖ Tres: el historial es de Doña Mary, y ella decide a qué bodega le enseña su código. ‖
>
> ¿Por qué blockchain? Porque bodegas que compiten no le confían sus cuentas a la base de datos de otra.

### 1:20–2:15 · Clímax: el mismo día, en vivo · *[diapositiva 5 → cambia a la app, portada «Pasillo A-B»; detalle en `2026-09-26_guion-demo-v3.md`]*

> Vamos a vivir su día, en vivo, en el Pasillo A-B. Datos ficticios; todo corre en Stellar testnet.
>
> Bodega A-17 le fía 8,500 pesos, a 15 días. *[clic]* Sale la nota; todavía no es deuda.
>
> Doña Mary la acepta desde su teléfono. *[clic]* Segunda firma: ahora sí existe. En la cadena no va su nombre ni el monto exacto: un código y un rango.
>
> Paga, y A-17 lo confirma. *[clic]* Cumplida. **[CORTABLE]**
>
> Ahora cruza a B-40 y le enseña su código. *[clic]* B-40 consulta… y ve sus notas cumplidas, en dos bodegas distintas. La consulta queda registrada en la cadena. ‖ Y el semáforo dice «historial insuficiente». Es a propósito: con menos de dos meses de historial, no juzgamos.

*[Habla mientras confirma cada transacción; si la frase termina antes, espera en silencio. Narra solo lo que aparece en pantalla.]*

### 2:15–2:35 · La prueba de confianza · *[diapositiva 6: lo que cambiamos en el camino]*

> Una cosa más. Atacamos nuestro propio contrato y encontramos un hueco grave: una bodega podía aceptar su propia nota. Lo cerramos. ‖ Un mentor nos dijo que pedir permiso sobraba, porque la cadena es pública. Tenía razón, y lo quitamos. ‖ Cada cambio fue un contrato nuevo, a la vista: ni nosotros cambiamos las reglas en silencio.

### 2:35–2:50 · Qué sigue · *[diapositiva 7: entrada al mercado]*

> Sigue un piloto con una bodega de abarrotes que fía cientos de miles de pesos al día. Después, una segunda bodega. La bodega paga por la herramienta; el cliente, nunca.

### 2:50–3:00 · Cierre circular · *[diapositiva 8: cierre y QR]*

> Mañana, cuando Doña Mary cruce el pasillo, su palabra va a ir con ella. Les pedimos ayuda para llegar a ese piloto. ‖ Cuentas claras… amistades largas. ‖ Somos el Equipo Palabra.

*[Un segundo de silencio y luego «Gracias».]*

---

## 2. Datos que se dicen en voz alta

| Dato | Fuente |
|---|---|
| A las cuatro de la mañana la Central ya vende (los abarroteros venden de 04:00 a 15:00) | Coordinadora de la Central vía [Chilango, 2-oct-2025](https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/) (`docs/plan-maestro.md` §5b) |
| Más de 2,300 bodegas | [FICEDA](https://ficeda.com.mx/sectores-de-actividad/): 1,981 + 347 (H-01) |
| Ninguna se pasa referencias; al que nadie conoce no se le fía | Experiencia de José (`docs/lean-canvas.md`) |
| 18.4 % de los rechazos por falta de historial | [ENAFIN 2024, INEGI](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf) (H-05) |
| La bodega del piloto fía cientos de miles de pesos al día | Experiencia de José (H-02; decisión #28: sin nombre ni cifra exacta) |

**Lo que se afirma sobre el producto y su respaldo:**
- **«Doña Mary»:** personaje ficticio. Las bodegas A-17, B-40 y A-73 tienen posiciones ilustrativas; ninguna bodega real participa.
- **«En dos bodegas distintas»:** la corrida real de la v5 (`demo/salida-demo.txt`) tiene 2 emisores: A-17 y A-73, que se siembra con `demo/sembrar.sh`.
- **«Atacamos nuestro propio contrato»:** auditoría del 26-sep, hallazgo C1 (`docs/auditoria-2026-09-26.md`), cerrado en la v4 (#55).
- **«Un mentor nos dijo…»:** retroalimentación del 26-sep, decisión #57, cerrada en la v5.
- **«Un contrato nuevo»:** no hay función `upgrade` (decisión #30). Cada cambio fue un despliegue nuevo, y los contratos anteriores están en `demo/deploy.json`.
- **«Historial insuficiente»:** regla del semáforo, que exige 3 notas cerradas, 2 bodegas y 60 días (spec v2 §8; #44).

## 3. Conteo (texto hablado, sin acotaciones)

| Tramo | Palabras | Tiempo |
|---|---|---|
| Gancho | 23 | 0:00–0:12 |
| El mundo de hoy | 41 | 0:12–0:35 |
| El conflicto | 55 | 0:35–0:55 |
| La idea | 76 | 0:55–1:20 |
| Clímax: demo | 113 | 1:20–2:15 |
| Prueba de confianza | 55 | 2:15–2:35 |
| Qué sigue | 30 | 2:35–2:50 |
| Cierre | 30 | 2:50–3:00 |
| **Total** | **423** | **3:00**, a unas 140 palabras por minuto, contando las esperas de la demo. Si el ensayo pasa de 3:05, corta en este orden: 1) el pago **[CORTABLE]**; 2) «Y no es solo aquí… falta de historial»; 3) «Doña Mary tiene una fonda.» |

## 4. Notas de entrega (técnicas de la historia)

- **Una sola protagonista.** Di siempre «Doña Mary», nunca «los usuarios» ni «el cliente».
- **El conflicto antes que la solución.** La palabra «blockchain» no aparece antes del minuto 1:10.
- **La demo es la historia en vivo.** No anuncies «ahora la demo»: di «vamos a vivir su día».
- **Pausa larga en «Su palabra no viaja».** Es la frase que el jurado debe repetir.
- **«Es a propósito: no juzgamos»:** dilo más lento. Convierte lo que parece una falla en una decisión de diseño.
- **La prueba de confianza se dice con orgullo, no como disculpa.** Contar que atacamos nuestro contrato y que escuchamos al mentor le demuestra a un jurado Web3 que el sistema no depende de nuestra buena fe.
- **Cierre circular.** Doña Mary vuelve a cruzar el pasillo, y el refrán cierra lo que abrió.
- **No digas:** «metaverso», «buró», «score», «calificación», «anónimo», «nadie puede verlo», ni el nombre o número real de tu bodega. No digas que el mapa muestra bodegas participantes.

## 5. Diapositivas (8) y lo que muestra cada una

| # | Diapositiva | En pantalla |
|---|---|---|
| 1 | Portada | «Cuentas claras…» · Equipo Palabra |
| 2 | Doña Mary | Ilustración de línea de una fonda y una libreta, sin rostro · «Años de palabra cumplida… en una sola libreta» · «2,300+ bodegas» |
| 3 | La palabra no viaja | El pasillo con A-17 y B-40 y una flecha que no cruza · «18.4 % de los rechazos: falta de historial» |
| 4 | Tres reglas | Las tres reglas, una por clic · «¿Por qué blockchain? Nadie confía en la base de datos de su competencia» |
| 5 | Vamos a vivir su día | Captura del gemelo digital · 5 sellos: nota → firma → pago → código → consulta |
| 6 | Lo que cambiamos en el camino | «Atacamos nuestro contrato: cerrado» · «Escuchamos al mentor: sin permiso» · «Cada cambio, un contrato nuevo» |
| 7 | Entrada al mercado | Piloto (1 bodega) → dictamen → segunda bodega → primer banco · «Paga la bodega; el cliente, nunca» |
| 8 | Cierre | «Cuentas claras, amistades largas.» · sello CUMPLIDA 27·09·2026 · QR del sitio y del repositorio |

El prompt para Claude Design con estas 8 diapositivas está en `pitch/2026-09-26_prompt-claude-design-v2.md`.

## 6. Versiones cortas

Las de 30 y 60 segundos están en `pitch/2026-09-26_elevator-pitch-y-mini-canvas.md`.
