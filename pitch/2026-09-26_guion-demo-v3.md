# Guion de demo — Cuentas Claras (v3: 5 pasos, sin permiso)

> **Borrador v3 — pendiente de aprobación de José** · 26-sep-2026, 23:55. Sustituye a `2026-09-26_guion-demo-v2.md`.
> **Contrato:** v5 [`CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL`](https://stellar.expert/explorer/testnet/contract/CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL) en Stellar testnet (#57).
> **Demo principal:** la app local, con el gemelo del Pasillo A-B como portada.
> **Respaldos:**
> - el sitio público https://cuentas-claras-lemon.vercel.app, sección «La demo real» (la corrida real de la v5, sin llaves);
> - `demo/demo.sh --paso-a-paso`;
> - el video.
>
> Lo que depende del ensayo está marcado **[CONFIRMAR]**.

## 0. Qué prueba la demo

1. **Dos firmas:** la deuda existe solo con la firma de la bodega y la del cliente, en transacciones separadas.
2. **En la cadena no hay datos personales:** no va el nombre ni el monto exacto, solo un código y un rango.
3. **El historial viaja con el cliente:** Bodega B-40, que no la conoce, ve su historial con el código que ella le enseña.
4. **Constancia:** la consulta queda registrada en la cadena, con la bodega que preguntó.
5. **Semáforo prudente:** dice «historial insuficiente» mientras no haya 3 notas cerradas, 2 bodegas y 60 días.

**No prueba:**
- que el pago ocurrió (el efectivo se entrega fuera de la cadena);
- adopción ni validez legal. El piloto no ha empezado.

**Privacidad honesta:** di «es público y verificable, sin su nombre ni el monto exacto». Nunca digas «anónimo» ni «nadie puede verlo».

## 1. Los 5 pasos (unos 55 s en el pitch)

| # | Acción · quién firma | Qué se dice (pitch v3) | Qué pasa en la app | En el explorador |
|---|---|---|---|---|
| 0 | — | «Vamos a vivir su día, en vivo, en el Pasillo A-B. Datos ficticios; todo corre en Stellar testnet.» | Portada con el pasillo y el rótulo «posiciones ilustrativas» | — |
| 1 | Bodega A-17 **crea** la nota (8,500 MXN, 15 días) | «Sale la nota; todavía no es deuda.» | Trazo de A-17 a Doña Mary; «Esperando firma» | `note_created`: rango `5k–20k`, sin nombre ni monto |
| 2 | Doña Mary **acepta** | «Segunda firma: ahora sí existe. […] un código y un rango.» | Segundo trazo; «Firmada por los dos» | `note_accepted`, firmada por **otra** dirección |
| 3 | Bodega A-17 **confirma el pago** **[CORTABLE]** | «Cumplida.» | Sello CUMPLIDA sobre A-17 | `paid_confirmed` |
| 4 | Doña Mary **enseña su código** a Bodega B-40 | «Ahora cruza a B-40 y le enseña su código.» | Teléfono: «Mi código». Bodega B-40: botón «Doña Mary me enseñó su código» | **Nada**: pasa en el mostrador, no es una transacción |
| 5 | Bodega B-40 **consulta** | «…ve sus notas cumplidas, en dos bodegas distintas. La consulta queda registrada. […] "historial insuficiente". Es a propósito.» | «Consultar historial»; semáforo ○ «Historial insuficiente» con sus condiciones; enlace a la transacción | `aggregate_read`, con la dirección de B-40 |

**Nunca te saltes el paso 5:** es la prueba. Si vas tarde, salta el 3.

**Si preguntan por qué dice «historial insuficiente» con notas cumplidas:** «Son tres condiciones: notas cerradas, dos bodegas y 60 días. En testnet no podemos fabricar 60 días, y no bajamos la regla para que salga verde.»

**Si preguntan cómo protegen al cliente si todo es público:**
- En la cadena no va su nombre, ni su teléfono, ni el monto exacto.
- Sin su código, nadie liga ese historial con ella.
- Cada consulta formal deja constancia de quién preguntó.

## 2. Checklist

**T − 60 min**
- [ ] Codespace encendido, `node backend/server.js` corriendo y la app abierta (puerto 8080, **privado**).
- [ ] Un ensayo completo con cronómetro: demo de 60 s o menos y pitch de 3:00 o menos.
- [ ] `./demo/demo.sh --paso-a-paso` probado (plan B).
- [ ] «La demo real» abre en el teléfono y en la laptop (plan 0).
- [ ] Video subido; el enlace abre en ventana de incógnito; copia local.
- [ ] Anota el tiempo real de confirmación de cada paso **[CONFIRMAR]**.

**T − 15 min**
- [ ] Navegador al 125–150 %, pestañas personales cerradas y modo «no molestar».
- [ ] Wi-Fi probado y datos del teléfono listos como respaldo.
- [ ] Formulario precargado: 8,500 MXN, 15 días **[CONFIRMAR con la app]**.

*(Ya no hace falta «Quitar permiso» antes de presentar: la v5 no tiene permisos.)*

## 3. Plan B

0. **Sin Codespace:** haz la demo en el sitio público, sección «La demo real». Di: «Esta es la corrida real en testnet, paso a paso; cada enlace abre su transacción».
1. **La app no responde en 10 segundos:** di «La red de prueba está tardando; les muestro la misma secuencia» y corre `demo.sh --paso-a-paso`, con las mismas frases.
2. **Sin internet:** pon el video local desde la marca del paso.
3. **Nunca depures en el escenario.** Narra lo que se ve y nunca anuncies un color que no aparece.

## 4. Video (2–3 min; también es entregable)

| Tramo | Contenido |
|---|---|
| 0:00–0:55 | Gancho, el mundo de hoy y el conflicto (diapositivas 1 a 3, con voz del pitch v3) |
| 0:55–1:20 | Las tres reglas (diapositiva 4) |
| 1:20–2:15 | **El flujo real en el gemelo:** pasos 0 a 5, con el explorador abierto en los pasos 2 y 5 |
| 2:15–2:50 | Lo que cambiamos en el camino y qué sigue (diapositivas 6 y 7) |
| 2:50–3:00 | Cierre, con la URL del sitio y del repositorio (diapositiva 8) |

**Reglas:**
- Graba el flujo **real**, sin acelerar ni cortar dentro de una transacción.
- En 1080p, con el letrero «Datos ficticios · Stellar testnet» visible.
- Si no hay Codespace, graba «La demo real» del sitio, que es la corrida real de la v5.
- Anota el minuto de cada paso:

| Paso | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Minuto | **[CONFIRMAR]** | | | | | |
