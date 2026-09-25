# Mentoría de hoy en 5 minutos — Cuentas Claras

> **Borrador v1 — pendiente de aprobación de José**
> Fecha: 2026-09-25 · Proyecto: **Cuentas Claras** · Equipo: **Palabra** (en formularios: "Equipo Palabra") · GOYA HACK · Hackathon UNAM 2026 · track Blockchain
> Estado del código: **en construcción**. Muestra solo lo que hayas visto funcionar hoy; lo demás se dice como «lo que mostraremos».

## En cinco líneas

1. **La mentoría puntúa:** «los mentores asignarán un puntaje que será considerado en la selección de los proyectos ganadores» (correo del organizador, 22-sep; `research/02_que-busca-el-organizador.md` §1b).
2. **Hoy es la última jornada presencial:** CIA, 10:00–17:00. También hay mentoría por Discord, equipo por equipo.
3. **No esperes a tener la app.** Ve en cuanto el contrato esté desplegado. Si a las **15:30** no hay nada desplegado, ve igual con el escenario C: la sesión presencial cierra a las 17:00.
4. **Tres minutos mostrando, dos preguntando.** Si el mentor conversa, síguelo; pero guarda el último minuto para la hora de entrega y el formato del pitch.
5. **Anota todo** en `docs/decisiones.md` en los 10 minutos siguientes (§6).

Dato de agenda (Luma): hoy, de 14:00 a 15:00, hay sesión de BAF × Stellar en el escenario principal. Sirve para conocer a gente de Stellar; si coincide con tu turno de mentoría, **prioriza la mentoría**, que puntúa.

## 1. Qué llevar

- Laptop y teléfono cargados; datos móviles como respaldo.
- La versión de 30 segundos, memorizada (`2026-09-25_pitch-3-minutos.md` §4).
- `docs/problema-solucion.md` abierto: el proyecto en una página.
- Diapositivas 2, 5 y 7 del deck, aunque sean borrador.
- La URL del repositorio público *[CONFIRMAR]*.
- Las seis preguntas de §4, en el teléfono.

## 2. Los 5 minutos, en orden

| Tiempo | Qué haces | Qué muestras |
|---|---|---|
| 0:00–0:30 | Versión de 30 segundos del pitch | La diapositiva 3 o nada |
| 0:30–1:15 | **Problema con evidencia:** gota a gota «sin requisitos» en la Central ([ADN40, 2022](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)); trato a palabra y en efectivo ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)); sin registro compartido ni referencias entre bodegas (experiencia del equipo); 18.4 % de rechazos por falta de historial ([ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)). **Por qué no una base de datos:** no hay custodio en quien confíen bodegas que compiten; el contrato hace cumplir reglas | Diapositivas 2 y 5 |
| 1:15–2:45 | **Demo según el estado de la construcción** (§3). Una frase de qué es real y una de qué falta | App, `demo.sh` o pruebas |
| 2:45–3:15 | **Modelo y adopción:** el cliente paga cero; la bodega paga la herramienta (hipótesis que valida el piloto); primero una bodega de abarrotes y sus clientes; se miden notas co-firmadas por semana, no cuentas creadas. Opciones y recomendación (A + D): `docs/modelo-de-negocio.md` | Diapositiva 7 |
| 3:15–5:00 | **Las seis preguntas** (§4), por prioridad. Cierra con: «Si tuviera que cambiar una sola cosa para subir nuestro puntaje, ¿cuál sería?» | Tus notas |

## 3. Qué mostrar según el estado de la construcción

| Escenario | Qué hay a la hora de la mentoría | Qué muestras | Qué dices |
|---|---|---|---|
| **A** | Flujo completo en la app | La demo de 60 s (`2026-09-25_guion-demo.md` §3), con el paso negativo | «Esto corre en Stellar testnet, con datos ficticios.» |
| **B** | Contrato desplegado y `demo.sh`, sin interfaz | `demo.sh` paso a paso y el explorador en la página del contrato | «El contrato ya está en testnet; la interfaz la terminamos hoy.» *[CONFIRMAR Contract ID]* |
| **C** | Solo el contrato con pruebas | La salida de `cargo test` con las invariantes (dos firmas, gracia, lectura con permiso) y la diapositiva 5 | «El contrato pasa sus pruebas de reglas; el despliegue en testnet va hoy.» |

En los tres escenarios: nunca digas «ya funciona» de algo que no viste funcionar hoy, y nunca digas que el piloto empezó.

## 4. Las seis preguntas para los mentores

Orden de la tabla: el de la lista acordada. Hazlas por **prioridad** (columna 3): si solo hay tiempo para dos, que sean la 2 y la 3.

| # | Pregunta (dila así) | Prioridad | Por qué la hacemos | Qué hacemos con la respuesta |
|---|---|---|---|---|
| 1 | «¿Cuáles son los criterios del track Blockchain y cuánto pesa cada uno? ¿Qué premios hay, y hay premios por patrocinador?» | 3 | Criterios y premios no están en ningún correo; la única rúbrica ponderada de un hackathon de Stellar que encontramos reparte impacto 30 %, ejecución en Stellar 25 %, experiencia de uso 20 %, innovación 15 %, viabilidad 10 % ([Rise In](https://www.risein.com/programs/build-on-stellar-philippines-hackathon)) | Ajustar deck y README al criterio de mayor peso. Si hay premio a «mejor uso de Stellar», reforzar la diapositiva 5 |
| 2 | «¿A qué hora exacta, y en qué zona horaria, cierra la entrega extendida? ¿Qué pide el formulario: repositorio, video, deck?» | **1** | El correo del 24-sep dice «hasta el fin de semana»; Luma lista el evento hasta el sábado 26 a las 14:00; el plan interno es entregar el sábado antes de las 12:00 (decisión #21) | Actualizar `docs/plan-maestro.md` §4 y `CLAUDE.md`; fijar la hora de congelar el código y de subir el video (2–3 h antes de la entrega) |
| 3 | «¿Cómo es el pitch en vivo: cuánto dura, en escenario o en stand, con proyector, con demo en vivo o con video? ¿Pasan todos los equipos o solo finalistas?» | **2** | Define qué versión se ensaya (3 min, 60 s o 30 s) y si la demo en vivo es plan A | Elegir versión. Si no hay proyector: laptop o teléfono. Si no se permite demo en vivo: el video pasa a plan A |
| 4 | «Para puntuar alto en integración con Stellar, ¿qué esperan ver? ¿Contrato propio en testnet, evidencia en el explorador, algo más?» | 4 | El organizador pide «integrar blockchain de alguna manera»; el fondo de Stellar descalifica usarla «for data storage» ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria)) | Si piden algo que ya hacemos, decirlo en el pitch con sus palabras. Si piden **mainnet**, la regla del proyecto no cambia sola (mainnet solo después de entregar): se anota y decide José |
| 5 | «¿Usar Pollar o Tangem suma puntos o tiene premio aparte?» | 6 | Pollar permitiría que el cliente autorice con login de Google o correo, sin frase semilla, con llaves custodiadas por Pollar ([documentación de Pollar](https://docs.pollar.xyz/docs/sdk-reference/pollar-core)); Tangem requiere app nativa con NFC y la tarjeta física ([SDK de Tangem](https://github.com/tangem/tangem-sdk-react-native)) | **Pollar:** solo si suma o hay premio, en una rama aparte, con tiempo límite y **después** de grabar el video. **Tangem:** no. Si no suman: queda en la diapositiva 7 como siguiente paso |
| 6 | «¿Cómo evalúan el modelo de negocio? ¿Qué quieren ver: quién paga, precio, tracción, piloto?» | 5 | Nuestro modelo es hipótesis: el cliente paga cero y paga la bodega; no tenemos precio ni tracción | Ajustar la diapositiva 8 y la respuesta «¿quién paga?» (`2026-09-25_preguntas-jurado.md` #13) |

**Si la mentoría es por Discord:** comparte pantalla, mismo orden. Si el tiempo no alcanza, pega las seis preguntas en el chat del canal: una respuesta escrita también sirve como fuente para `docs/decisiones.md`.

## 5. Qué no hacer

- **No defender: anotar.** Si un comentario parece débil, se decide después, no frente al mentor.
- **No depurar frente al mentor.** Si algo no corre, pasa al escenario siguiente de §3.
- No prometer lo que no está verde. No decir que el piloto empezó ni dar resultados.
- Vocabulario vetado: «buró», «score», «calificación», «pagaré ejecutable»; nada de «reduce la extorsión».
- No mostrar el plano. No decir el nombre de la bodega ni dar datos que identifiquen la bodega *(pendiente de José)*.

## 6. Cómo registrar la retroalimentación en `docs/decisiones.md`

**Dónde:** sección «Retroalimentación de mentores (se llena hoy)», en su tabla existente: `| Hora | Mentor (rol) | Comentario | Qué cambiamos |`.
**Cuándo:** en los 10 minutos siguientes a la sesión, antes de hablar con otro mentor.

1. **Una fila por comentario.**
2. **Mentor (rol):** rol y organización (por ejemplo, «mentor técnico, ecosistema Stellar»). El nombre, solo si lo autoriza: el repositorio es público.
3. **Comentario:** cita textual entre «» cuando se pueda; si es paráfrasis, márcalo «(paráfrasis)». Separa los **hechos** (hora de entrega, criterios, formato) de las **opiniones**.
4. **Qué cambiamos:** una de cuatro opciones: «Cambio hoy: …» (si cabe en 30 minutos y sube el puntaje) · «Siguiente paso (diapositiva 7)» · «No cambiamos, porque …» · «Pendiente de José».
5. **Hechos oficiales** (hora de entrega, criterios, formato del pitch): además, agrega una decisión nueva numerada al final de la tabla principal (#26, #27…), con estado «aprobada (hecho)» y fuente «mentor, 25-sep, hh:mm». Pide el enlace oficial (Discord o dashboard) y anótalo cuando llegue.
6. No reescribas decisiones anteriores: el archivo solo crece hacia abajo.
7. Avisa a Claude (chat) para propagar los cambios a pitch, deck, preguntas del jurado, `research/02` y plan maestro. Commit sugerido: `docs: retroalimentación de mentoría 25-sep`.

Formato de fila (plantilla; **no** es retroalimentación real):

```
| hh:mm | [rol, organización] | «[cita textual]» | [Cambio hoy: … / Siguiente paso (diapositiva 7) / No cambiamos, porque … / Pendiente de José] |
```

Notas rápidas para llenar en el teléfono durante la sesión:

```
Hora:
Mentor (rol):
Hora de entrega y qué pide el formulario:
Formato del pitch:
Criterios y premios:
Integración con Stellar:
Pollar / Tangem:
Modelo de negocio:
Lo primero que cambiaría:
Otros comentarios:
```
