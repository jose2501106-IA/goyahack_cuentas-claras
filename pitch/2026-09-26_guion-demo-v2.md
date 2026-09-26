# Guion de demo — Cuentas Claras (v2: app y gemelo digital)

> **Borrador v2 — pendiente de aprobación de José** · 26-sep-2026. Sustituye a `2026-09-25_guion-demo.md` (v1, bitácora).
> **Demo principal (nivel 1):** la app local con el gemelo digital del Pasillo A-B como portada.
> **Contrato:** [`CDPFZNYZEBTEBB3GLOW62I32CV3LD3QI7KV4YQPFVMZXWC2XRFIGBDTW`](https://stellar.expert/explorer/testnet/contract/CDPFZNYZEBTEBB3GLOW62I32CV3LD3QI7KV4YQPFVMZXWC2XRFIGBDTW), en Stellar testnet.
> **Respaldos:** `demo/demo.sh` (nivel 2) y el video. Lo que depende del ensayo está marcado **[CONFIRMAR]**.

## 0. Qué prueba la demo

1. **Dos firmas:** una deuda solo existe con la firma de la bodega y la del cliente, en transacciones separadas.
2. **Privacidad:** en la cadena no va nombre ni monto exacto; va un seudónimo y un rango.
3. **Permiso:** sin permiso del cliente, el contrato no entrega el resumen a **ninguna** bodega, ni siquiera a la que ya le fió (#46).
4. **Constancia:** con permiso, la consulta funciona y queda registrada.
5. **Semáforo prudente:** dice «historial insuficiente» mientras no haya 3 notas cerradas, 2 bodegas y 60 días.

**No prueba** que el pago ocurrió (el efectivo se entrega fuera de la cadena), ni adopción, ni validez legal. El piloto no ha empezado.

**Privacidad honesta (spec v2 §3b):** nunca digas «nadie puede verlo». Di: «sin permiso, el contrato no entrega el resumen».

## 1. Pantallas y roles

| Ventana | Qué muestra |
|---|---|
| 1 | Deck en la diapositiva 3 |
| 2 | App, portada **«Pasillo A-B»**: el gemelo digital, con Bodega A-17, Bodega B-40 y Bodega A-73. Las posiciones son ilustrativas |
| 3 | App, vista **«Teléfono de Doña Mary»**: en un teléfono si se puede; si no, en la laptop |
| 4 | Explorador de testnet en la página del contrato |
| 5 | Terminal con `./demo/demo.sh --paso-a-paso` (plan B) |
| 6 | Video de respaldo, copia local en MP4 |

**Bodega A-73** es el segundo emisor: ya le fió y le cobró una nota a Doña Mary (`demo/sembrar.sh`). Por eso el semáforo puede marcar «2 bodegas ✓». La que no la conoce es **Bodega B-40**.

## 2. Pasos (unos 70 s en el pitch)

| # | Acción · quién firma | Qué se dice | Qué pasa en el mapa | En el explorador |
|---|---|---|---|---|
| 0 | — | «Este es el Pasillo A-B, con su forma real. Datos ficticios, Stellar testnet.» | Portada con el pasillo y el rótulo «no a escala; posiciones ilustrativas» | — |
| 1 | Bodega A-17 **crea** la nota (8,500 MXN, 15 días) | «Sale la nota; todavía no es deuda.» | Trazo de tinta de A-17 a la ficha de Doña Mary; papelito «Esperando firma» | `note_created`: rango `5k–20k`, sin nombre ni monto |
| 2 | Doña Mary **acepta** | «Segunda firma: ahora existe. En la cadena no va su nombre ni el monto.» | Segundo trazo de regreso; «Firmada por los dos» | `note_accepted`, firmado por **otra** dirección |
| 3 | Bodega A-17 **confirma el pago** **[CORTABLE]** | «Cumplida.» | Cae el sello CUMPLIDA sobre A-17 | `paid_confirmed` |
| N | Bodega B-40 **consulta sin permiso** | «Bodega B-40, que no la conoce, pide su historial: rechazado.» *(pausa de dos segundos)* | B-40 parpadea en gris: «Sin permiso: no se entrega el resumen». Ningún trazo | **Nada**: la simulación lo rechaza y no se envía transacción |
| 4 | Doña Mary **da permiso** por 30 días | «Le da permiso por 30 días, y lo puede quitar cuando quiera.» | Puente punteado de Doña Mary a B-40 | `consent_granted` |
| 5 | Bodega B-40 **consulta otra vez** | «Ve sus notas cumplidas y en cuántas bodegas… y dice "historial insuficiente". Es a propósito: con menos de dos meses de historial, no juzgamos.» | Pulso de ida y vuelta; semáforo ○ «Historial insuficiente» con la lista de condiciones; hash | `aggregate_read` |

Nunca saltes N ni 5: son la prueba. Si vas tarde, salta el 3.

**Si preguntan por qué dice «historial insuficiente» con notas cumplidas:** «Son tres condiciones: notas cerradas, dos bodegas y 60 días. En testnet no podemos fabricar 60 días, y no bajamos la regla para que salga verde.» Si quieren ver el verde, abre la tarjeta «Ejemplo con datos ficticios, no es una consulta».

## 3. Checklist antes de presentar

**T − 60 min**
- [ ] `node backend/server.js` corriendo en el Codespace y la app abierta en el navegador (puerto 8080, **privado**).
- [ ] **Doña Mary sin permiso vigente para Bodega B-40.** Si ya ensayaste, en «Teléfono de Doña Mary» toca **«Quitar permiso»**. Si no, el paso N no fallaría.
- [ ] Un ensayo completo con cronómetro: demo de 70 s o menos y pitch de 3:00 o menos.
- [ ] `./demo/demo.sh --paso-a-paso` probado (plan B).
- [ ] Video subido; el enlace abre en ventana de incógnito; copia local.
- [ ] Anotar el tiempo real de confirmación por paso **[CONFIRMAR]**.

**T − 15 min**
- [ ] Navegador al 125–150 %, pestañas personales cerradas, modo «no molestar».
- [ ] Wi-Fi probado y datos del teléfono listos como respaldo.
- [ ] Formulario precargado: 8,500 MXN, 15 días **[CONFIRMAR con la app]**.

## 4. Plan B

1. **La app no responde en 10 segundos** → «La red de prueba está tardando; les muestro la misma secuencia.» → `demo.sh --paso-a-paso` (mismas frases).
2. **Sin internet** → video local, desde la marca de tiempo del paso.
3. **El paso N no falla** (quedó un permiso) → «Aquí el contrato debe rechazar; quedó un permiso del ensayo. En el video ven el rechazo.» Sigue con el paso 5.
4. **Nunca se depura en el escenario.** Narra lo que se ve; nunca anuncies un color que no aparece.

## 5. Video (2–3 min; también es entregable)

| Tramo | Contenido |
|---|---|
| 0:00–0:15 | Título y versión de 30 s del pitch |
| 0:15–0:35 | Problema (diapositivas 1 y 2) |
| 0:35–1:55 | **Flujo real en el gemelo digital**: pasos 0, 1, 2, 3, N, 4 y 5, con el explorador en los pasos 2 y 5 |
| 1:55–2:20 | Los dos huecos que cerramos y por qué el contrato no se actualiza (diapositiva 6) |
| 2:20–2:40 | Qué sigue, petición y URL del repositorio |

Reglas:
- Graba el flujo **real**, sin acelerar ni cortar dentro de una transacción.
- En 1080p, con el letrero «Datos ficticios · Stellar testnet» visible.
- Anota el minuto de cada paso:

| Paso | 0 | 1 | 2 | 3 | N | 4 | 5 |
|---|---|---|---|---|---|---|---|
| Minuto | **[CONFIRMAR]** | | | | | | |
