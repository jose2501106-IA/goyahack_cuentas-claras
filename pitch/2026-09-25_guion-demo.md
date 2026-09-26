# Guion de demo — Cuentas Claras

> **Borrador v1 — pendiente de aprobación de José**
> Fecha: 2026-09-25 · Proyecto: **Cuentas Claras** · Equipo: **Palabra** (en formularios: "Equipo Palabra") · GOYA HACK · Hackathon UNAM 2026 · track Blockchain
> Estado del código: **por construirse hoy**. Este documento describe **lo que mostraremos**. Todo lo que depende de la construcción (URL, Contract ID, hashes, textos de error, tiempos) está marcado **[CONFIRMAR]** y se ajusta después del primer ensayo real.

> **Actualización (25-sep, 17:15; contrato redesplegado el 26-sep por las decisiones #42 y #46):** el contrato está en testnet: [`CDPFZNYZEBTEBB3GLOW62I32CV3LD3QI7KV4YQPFVMZXWC2XRFIGBDTW`](https://stellar.expert/explorer/testnet/contract/CDPFZNYZEBTEBB3GLOW62I32CV3LD3QI7KV4YQPFVMZXWC2XRFIGBDTW). Hoy la demo es **nivel 2: `demo/demo.sh`** (sin frontend). Usa las filas 5 y 6 de la tabla de preparación y el plan B como demo principal; la vista de app queda como siguiente paso.

> **Qué muestra hoy `demo.sh` (17:40):** seis pasos. (1) Bodega A crea la nota; (2) Doña Mary la acepta; (3) Bodega A confirma el pago; (4) Bodega B pide el resumen **sin permiso** y el contrato lo rechaza en simulación (`NoConsent`), sin enviar transacción; (5) Doña Mary da permiso por 30 días; (6) Bodega B consulta y la consulta queda registrada (evento `aggregate_read`). El resumen suma notas entre corridas (es historial real que crece): narra el número que aparezca, con un solo emisor eso es «historial insuficiente». Grabación: `./demo/demo.sh --paso-a-paso`.

Base: `spec/2026-09-25_especificacion-tecnica-v2.md` (§7 eventos, §9 frontend, §10 guion y plan B, §12 datos ficticios), `research/00_sintesis-estrategica.md` ("Pitch, demo y README"), `docs/riesgos.md` (fila «Demo en vivo que falla»). El video como entregable y no solo como respaldo: [Devpost](https://info.devpost.com/blog/6-tips-for-making-a-hackathon-demo-video); las convocatorias de Stellar aceptan capturas de testnet como evidencia ([Rise In](https://www.risein.com/programs/build-on-stellar-philippines-hackathon)).

---

## 0. Qué prueba la demo (y qué no)

**Prueba** que el contrato **hace cumplir reglas**, no que guarda datos: (1) una deuda solo existe con dos firmas, dadas en transacciones separadas; (2) en la cadena no hay nombre ni monto; (3) sin permiso del cliente, el contrato rechaza la consulta; (4) con permiso, la consulta funciona y deja su propio evento.

**Privacidad (spec v2, sección 3b):** la cadena es pública. Nunca decir "nadie puede verlo"; decir "sin permiso, el contrato no entrega el resumen y el intento queda registrado; en la cadena no va nombre, teléfono ni monto exacto".

**No prueba** (y no se dice que prueba): adopción, que el pago ocurrió (el efectivo se entrega fuera de la cadena), validez legal ni resultados de piloto. El piloto no ha empezado. Todos los datos son ficticios.

## 1. Pantallas

| Ventana | Qué muestra | Estado |
|---|---|---|
| 1 | Deck en la diapositiva 4 | Listo antes de subir |
| 2 | App Cuentas Claras: vista **Bodega A** (Bodega A) | *[CONFIRMAR URL]* |
| 3 | App Cuentas Claras: vista **Cliente** (Doña Mary). Mejor en un teléfono real si el frontend está publicado; si no, simulada en la laptop | *[CONFIRMAR]* |
| 4 | App Cuentas Claras: vista **Bodega B** (Bodega B) | *[CONFIRMAR]* |
| 5 | Explorador de testnet abierto en la página del contrato (el que usen los enlaces de `demo.sh`, por ejemplo stellar.expert) | `CDPFZN…GBDTW` en stellar.expert |
| 6 | Terminal con `demo/demo.sh` listo (plan B), letra de 20 pt o más, tema claro | *[CONFIRMAR]* |
| 7 | Video de respaldo, copia local en MP4 | Tras grabarlo |

José presenta y opera solo: **un clic por paso**, con formularios precargados *[CONFIRMAR con Claude Code]*. Si alguien de confianza puede operar los clics, José narra mirando al jurado.

## 2. Datos ficticios

| Rol | Nombre en la app | En cadena | Nota |
|---|---|---|---|
| Emisor y bodega A | Bodega A | Dirección G de testnet, en la lista de emisores | Ficticio (spec §12) |
| Emisor, lector y bodega B | Bodega B | Dirección G de testnet, en la lista de emisores | No ha emitido notas a Doña Mary: por eso necesita permiso |
| Cliente | Doña Mary | `subject_id` (HMAC de un teléfono **ficticio**) y su dirección G de demo | Perfil de 15 días |
| Nota de la demo | 8,500 MXN a 15 días | Rango `5k–20k`, `due_ts` = hoy + 15 días | Monto ficticio *(decide José)* |
| Historial previo | 3 notas pagadas a tiempo con Bodega A | Sembradas antes de presentar | *[CONFIRMAR script de siembra]* (spec §12: «ve tres notas pagadas a tiempo») |
| Permiso | 30 días, revocable | `consent_granted` con `exp_ts` | `consent_ttl` propuesto (spec §4) |

Nada real: ni nombres, ni teléfonos, ni el plano, ni el nombre o identificador de la bodega del equipo.

---

## 3. Camino feliz: cinco pasos y el paso negativo (60 segundos en el pitch)

Orden recomendado: 1 → 2 → 3 → **N (negativo)** → 4 → 5. Poner el rechazo **antes** del permiso no requiere revocar nada, cuenta la historia en orden (Bodega B no la conoce → no puede ver → ella autoriza → ahora sí) y deja la consulta exitosa para el final. Alternativa: poner el negativo al final, con revocación del permiso (cuesta un paso más).

| # | Acción · quién firma | Qué se dice (una frase) | Qué se ve en la app | Qué se ve en el explorador de testnet | s |
|---|---|---|---|---|---|
| 1 | Bodega A **crea** la nota · firma Bodega A | «Bodega A le fía 8,500 pesos a Doña Mary, a 15 días: la nota está creada, pero todavía no es deuda.» | Vista Bodega A: formulario precargado → estado **Creada**; hash con enlace | Evento `note_created`: `note_id`, dirección de Bodega A, `subject_id` de 32 bytes, rango `5k–20k`, vencimiento. **Ni nombre ni monto exacto** | 10 |
| 2 | Doña Mary **acepta** · firma Doña Mary | «Doña Mary la acepta desde su teléfono: con la segunda firma, la deuda existe.» | Vista Cliente: la nota → **Aceptar** → estado **Aceptada** | Evento `note_accepted`. Señala que firmó **otra dirección**: dos firmas, dos transacciones. Aquí se dice: «En el explorador no hay nombre ni monto: un identificador y un rango.» | 12 |
| 3 | Bodega A **confirma el pago** · firma Bodega A | «Doña Mary pagó; Bodega A lo confirma: pagada a tiempo, y ya nadie puede cambiarlo.» | Vista Bodega A: **Confirmar pago** → **Pagada · a tiempo** | Evento `paid_confirmed` con `on_time: true` | 8 |
| N | Bodega B **consulta sin permiso** · firma Bodega B | «Bodega B, que no la conoce, le pide su historial al contrato: rechazado. Esa negativa la hace cumplir el contrato.» | Vista Bodega B: **Consultar historial** → error visible «Sin permiso del cliente» *[CONFIRMAR texto]* | **Nada**: la simulación la rechaza con `NoConsent` y no se envía transacción *[CONFIRMAR comportamiento y código de error]*. Si preguntan: «No hay evento porque la regla no dejó pasar la consulta». | 10 |
| 4 | Doña Mary **da permiso** a Bodega B · firma Doña Mary | «Doña Mary autoriza a Bodega B a ver su semáforo por 30 días, y puede revocarlo cuando quiera.» | Vista Cliente: **Autorizar a Bodega B · 30 días** → «Permiso vigente hasta…» | Evento `consent_granted` con lector y vencimiento | 8 |
| 5 | Bodega B **consulta de nuevo** · firma Bodega B | «Ahora sí: Bodega B ve su semáforo, sus notas pagadas a tiempo y cuántas bodegas las respaldan, y esa consulta también queda registrada.» | Vista Bodega B: semáforo (ver §4) y contadores: aceptadas, pagadas a tiempo, pagadas tarde, vencidas, incumplidas, disputas, bodegas distintas, rango máximo | Evento `aggregate_read` (subject_id, lector): el «¿quién consultó mi historial?» queda auditable | 12 |

**Total ≈ 60 s.** Haz clic y habla mientras confirma cada transacción (en testnet tarda unos segundos; *[CONFIRMAR]* el tiempo real en el ensayo). Si vas tarde, **salta el paso 3** (el historial sembrado ya tiene notas pagadas). Nunca saltes N ni 5: son la prueba.

Si la vista del cliente corre en la laptop, en el paso 2 di «desde su teléfono —aquí, simulado—».

## 4. El semáforo: qué va a salir y cómo decirlo

Con los umbrales de la spec (§8, propuesta), el semáforo dice **«historial insuficiente»** si hay menos de 3 notas cerradas, **menos de 2 bodegas emisoras** o **menos de 60 días** de historial. En una demo en testnet hecha hoy, con notas de una sola bodega, lo esperado es **«historial insuficiente»**, aunque haya cuatro notas pagadas *[CONFIRMAR en el ensayo]*. La spec §12 espera que Bodega B «ve tres notas pagadas a tiempo, un emisor distinto, y decide», lo que concuerda con este resultado, no con un verde.

| Opción | Qué se ve | Qué se dice en el paso 5 | Costo |
|---|---|---|---|
| **B (recomendada)**: umbrales de la spec | «Historial insuficiente» y los contadores | «Dice "historial insuficiente": una sola bodega no basta para pintar de verde. Pero Bodega B ya ve lo que antes no existía: cuatro notas pagadas a tiempo, firmadas por los dos.» | Nada extra. Coherente con la respuesta sobre colusión («un solo emisor cómplice no alcanza»; preguntas del jurado #18) |
| A: umbrales de demostración | Verde, con la leyenda visible «umbrales de demostración» | «Verde: cuatro notas pagadas a tiempo. En producción, el verde exige más bodegas y más tiempo.» | Una variable de entorno en el servidor. Para no contradecir la respuesta sobre colusión, hay que sembrar notas de una **segunda** bodega emisora (una tercera ficticia) |

Decide José con Claude Code *[CONFIRMAR]*. En cualquier caso, **narra lo que se ve**; nunca anuncies un color distinto del que aparece.

---

## 5. Versión «evaluación en vivo en el stand»: el juez co-firma desde su teléfono · OPCIONAL

**Solo si el frontend y el servidor están publicados en una URL HTTPS** que abra en datos móviles *[CONFIRMAR]*. Si no, se usa el teléfono de José como cliente, o esta sección se omite.

**Preparación:** tres a cinco cuentas de cliente de demo ya creadas y fondeadas («Cliente de demo 1…5»), con teléfonos **ficticios**; un QR impreso o en pantalla hacia la vista del cliente de una de ellas *[CONFIRMAR con Claude Code]*. **Nunca** se pide el nombre, el teléfono ni ningún dato del juez.

| Paso | José hace | El juez hace | José dice |
|---|---|---|---|
| 1 | Versión de 60 s del pitch; muestra el QR | Escanea | «¿Quiere ser el cliente? No le pido ningún dato.» |
| 2 | Crea una nota de Bodega A para «Cliente de demo N» (por ejemplo, 2,000 MXN a 7 días; rango 1k–5k) | Ve la nota en su teléfono | «Esta nota todavía no es deuda: falta su firma.» |
| 3 | Espera | Toca **Aceptar** | «Esa segunda firma la acaba de dar usted. Sin ella, la deuda no existiría.» Señala el evento `note_accepted` en el explorador |
| 4 (opcional) | Como Bodega B, consulta sin permiso: rechazado | Toca **Autorizar a Bodega B · 30 días** | «Sin su permiso, el contrato no le entrega el resumen a Bodega B. Con su permiso, ve esto…» |
| 5 (opcional) | Como Bodega B, consulta de nuevo | — | «Con una sola nota dice "historial insuficiente": Cuentas Claras no inventa confianza.» |

**Precisión que se dice si el juez pregunta:** «Cuando usted toca "Aceptar", firma la cuenta de demo que opera nuestro servidor; en producción la firma sería una passkey en su propio teléfono, y el contrato no cambia porque solo ve direcciones.»

Si su teléfono no carga en 10 segundos, usa el de José sin comentarios largos: «Lo hacemos con este».

---

## 6. Plan B

### 6.1 `demo/demo.sh` por línea de comandos

- Ejecuta los mismos pasos con `stellar contract invoke` y las cuentas de `demo/deploy.json`, e imprime el hash y el enlace al explorador de cada paso (spec §10). **Pedir a Claude Code** que incluya también el paso negativo (esperando el error `NoConsent`) y un modo paso a paso que espere una tecla entre pasos *[CONFIRMAR]*.
- Cómo se presenta: terminal a pantalla completa, letra de 20 pt o más, tema claro para proyector. Un paso por tecla; la misma frase de §3 en cada paso; abrir el enlace del explorador en los pasos 2 y 5.
- Guardar la salida del último ensayo exitoso (por ejemplo, `demo/ensayo.log` *[CONFIRMAR]*): sus hashes se pueden verificar en el explorador aunque la red esté lenta en ese momento.

### 6.2 Video de respaldo (2–3 minutos): también es entregable

| Tramo | Contenido |
|---|---|
| 0:00–0:15 | Tarjeta de título «Cuentas Claras — bitácora de fiado co-firmada de la Central de Abasto, en Stellar» y la versión de 30 s del pitch, recortada |
| 0:15–0:40 | Problema, con las diapositivas 1 y 2 |
| 0:40–2:00 | **Flujo real en testnet**: pasos 1, 2, 3, N, 4 y 5, con el explorador y la misma narración de §3 |
| 2:00–2:30 | Diapositiva 6: vive en cadena / vive fuera; la LRSIC y la extorsión |
| 2:30–2:50 | Diapositivas 7 y 10: hoy, lo que sigue, la petición; URL del repositorio |

Reglas: grabar el flujo **real** (no maquetas); **no acelerar** ni cortar dentro de una transacción; voz en off en español con el mejor micrófono disponible; OBS u otra grabadora de pantalla, en 1080p, con el navegador al 125–150 %; letrero permanente «Datos ficticios · Stellar testnet». Subir a YouTube (público o no listado, según pida el formulario *[CONFIRMAR]*), marcado como «no es contenido para niños», con **2 a 3 horas de margen** antes de la entrega. Enlace en el README y en el formulario; copia MP4 en la laptop y en el teléfono. Anotar la marca de tiempo de cada paso:

| Paso | 1 | 2 | 3 | N | 4 | 5 |
|---|---|---|---|---|---|---|
| Minuto en el video | *[CONFIRMAR]* | *[CONFIRMAR]* | *[CONFIRMAR]* | *[CONFIRMAR]* | *[CONFIRMAR]* | *[CONFIRMAR]* |

### 6.3 Árbol de decisión

1. ¿La app responde? → demo en vivo (§3).
2. Un paso no responde en **10 segundos** → frase de rescate (§8) → `demo.sh` si la red responde; si no, el video desde la marca de tiempo de ese paso.
3. ¿Sin internet? → video local. ¿Sin audio? → narra sobre el video en silencio.
4. ¿Sin proyector? → el guion funciona sin diapositivas: pitch hablado y demo en la pantalla de la laptop girada hacia el jurado o en el teléfono; ofrecer la demo completa en el stand.

---

## 7. Checklist previo

**T − 60 min**
- [ ] Contract ID en `demo/deploy.json` y escrito en una nota a la mano *[CONFIRMAR]*.
- [ ] Cuentas de demo fondeadas y con saldo verificado: plataforma, admin, Bodega A, Bodega B, Doña Mary (y clientes de demo del stand, si aplica). Friendbot tiene límite de tasa: fondear temprano.
- [ ] Bodega A y Bodega B están en la lista de emisores.
- [ ] Historial de Doña Mary sembrado: tres notas pagadas a tiempo con Bodega A *[CONFIRMAR]*.
- [ ] **Doña Mary sin permiso vigente para Bodega B.** Si ya se ensayó, el permiso del ensayo sigue vivo 30 días y **el paso negativo no fallaría**. Correr el comando de preparación que crea una Doña Mary nueva con historial y sin permisos, o revocar el permiso *[CONFIRMAR con Claude Code: `demo/seed.sh` o `demo.sh --preparar`]*.
- [ ] Ensayo completo cronometrado (≤ 60 s la demo; ≤ 3:00 el pitch) y `demo.sh` de principio a fin.
- [ ] Video subido; el enlace abre en ventana de incógnito; copia local.
- [ ] Capturas del ensayo pegadas en la diapositiva 4.

**T − 15 min**
- [ ] Ventanas abiertas en el orden de §1; explorador en la página del contrato.
- [ ] Navegador al 125–150 %; contraste legible en el proyector.
- [ ] Formularios precargados: 8,500 MXN, 15 días *[CONFIRMAR]*.
- [ ] Modo «no molestar» en laptop y teléfono; correo, WhatsApp Web y pestañas personales cerrados.
- [ ] Batería: laptop al 80 % o más, con cargador; teléfono al 80 % o más.
- [ ] Internet: Wi-Fi del lugar probado **y** datos móviles con punto de acceso listo como respaldo.
- [ ] Adaptador HDMI / USB-C probado en modo espejo.
- [ ] Si se hará la versión del stand: la URL pública abre en datos móviles y el QR funciona.

**T − 2 min**
- [ ] Deck en la diapositiva 1; app en la vista Bodega A; cronómetro listo; agua.
- [ ] Primera frase en la cabeza. Respira.

## 8. Si algo falla en vivo

**Regla 1: nunca se depura en el escenario.** No se abre la terminal para «ver qué pasó», no se recarga cinco veces y no se explica el error.

**Regla 2: diez segundos.** Si un paso no responde en 10 s, se cambia a plan B.

| Situación | Qué se dice (una vez, sin disculpas largas) | Qué se hace |
|---|---|---|
| Un paso no confirma | «La red de prueba está tardando; les muestro la misma secuencia, ya ejecutada.» | Video en la marca de tiempo del paso, o log de `demo.sh`, o capturas de la diapositiva 4 |
| El paso negativo **no** falla (quedó un permiso del ensayo) | «Aquí el contrato debe rechazar la consulta; quedó vigente un permiso del ensayo. En el video ven el rechazo.» | Seguir con el paso 5. Prevención: checklist T − 60 |
| El semáforo muestra algo inesperado | Narrar lo que se ve, con la verdad | Nunca anunciar un color que no está en pantalla |
| El explorador tarda | «El hash está aquí; en el explorador lo vemos al final.» | Seguir; abrirlo en las preguntas |
| Se acaba el tiempo | — | Saltar el paso 3. Nunca N ni 5. Llegar al cierre a las 2:30 |
| Falla el proyector | «Se los muestro en la laptop.» | §6.3, punto 4 |

Después: ofrecer «Si quiere, se lo muestro en vivo en el stand». Anotar qué falló en `docs/decisiones.md` y corregirlo antes de grabar o de entregar.

## 9. Lista [CONFIRMAR] (depende de la construcción)

- URL de la app y si la vista del cliente abre en un teléfono; URL pública para la versión del stand.
- Contract ID; hashes del ensayo; explorador que usen los enlaces de `demo.sh` y si muestra los eventos de forma legible.
- Nombre del contrato: `cuentas_claras`; tópico de eventos `cclaras` (spec v2, sección 7).
- Texto del error sin permiso en la app y código `NoConsent` en la CLI; que la simulación no envíe transacción.
- Comando de preparación: siembra de tres notas y Doña Mary sin permisos vigentes.
- Formularios precargados; modo paso a paso y paso negativo en `demo.sh`; log del ensayo.
- Estado del semáforo con la opción elegida (§4).
- Tiempo real de confirmación por paso en testnet.
- Enlace del video y marcas de tiempo por paso.
