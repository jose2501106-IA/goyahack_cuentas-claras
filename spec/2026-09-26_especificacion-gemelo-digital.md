# Especificación — gemelo digital del Pasillo A-B

**Estado:** vigente para el fin de semana (decisión #47). La geometría pública del pasillo, `plano/pasillo-a-b.json`, la entrega Claude (chat) **solo después** de que José autorice por escrito publicarla. Sin ese archivo no se construye la sección 3. Complementa `spec/2026-09-26_especificacion-frontend.md` y no cambia su API.

## 0. Qué es

Una vista nueva, **«Pasillo A-B»**, que muestra el pasillo como una maqueta isométrica de papel y tinta. Cada firma real en Stellar testnet se ve moverse entre bodegas. Es la portada de la app y el centro de la vista del jurado. El MVP cubre solo el Pasillo A-B; los demás pasillos aparecen como pestañas grises, «próximamente», porque el padrón está pensado para crecer.

**Nombre:** «gemelo digital del pasillo». **Nunca** «metaverso».

## 1. Reglas

1. **La ubicación nunca va a la cadena.** Qué cuenta de testnet corresponde a qué posición del pasillo vive solo en `backend/datos/` (o en una constante del frontend) y nunca en el contrato.
2. **Posiciones ilustrativas.** Las bodegas de la demo ocupan posiciones del pasillo solo para mostrar el flujo. En pantalla va siempre: «Posiciones ilustrativas. Ninguna bodega real participa en esta demo.» La posición de cada bodega de la demo se define en una sola constante, para cambiarla sin tocar nada más.
3. **Sin nombres ni infraestructura.** Solo bodegas numeradas, el corredor y el rótulo del pasillo. Nada de bancos, negocios, accesos, escaleras, rampas ni estacionamiento.
4. **Sin paquetes** (decisión #45): SVG y CSS. La perspectiva isométrica se logra con `transform` de CSS; las animaciones, con `@keyframes` y `stroke-dashoffset`.
5. **Accesibilidad:**
   - con `prefers-reduced-motion`, no hay animaciones: los cambios aparecen de golpe;
   - hay un botón «Vista plana»;
   - cada evento se anuncia en una lista de texto con su enlace al explorador, así que el mapa nunca es la única forma de enterarse.
6. **Vocabulario:** el de siempre. «Blockchain» solo aparece en la vista del jurado.

## 2. Estética «maqueta de papel»

- **Fondo:** Papel `#F5F0E6`.
- **Bodegas:**
  - bloques de Kraft `#D8C3A0` con dos caras laterales un tono más oscuro, para dar volumen;
  - borde de Tinta `#1E3A8A` de 1 px;
  - el número en IBM Plex Mono.
- **Bodegas de la demo:** se elevan un poco, llevan borde Tinta de 2 px y su etiqueta («Bodega A», «Bodega B», «Bodega C»).
- **Corredor:** franja de Niebla `#E8EEF9` con el rótulo «Pasillo A-B».
- **Doña Mary:** una ficha redonda en el corredor, con sus iniciales. No es un avatar ni una cara.
- **Trazos de tinta:** líneas de Tinta de 2 px que se dibujan solas en unos 900 ms.
- **Sello CUMPLIDA:** Sello `#B3261E`. Cae con un leve giro y aparece una sola vez por pantalla.
- **Prohibido:** neón, glow, partículas, cubos 3D brillantes, cadenas y monedas.

## 3. Qué se ve con cada evento (solo con transacciones reales)

| Evento de la API | En el mapa |
|---|---|
| Nota creada | Trazo de la bodega emisora a la ficha de Doña Mary. La nota aparece como papelito «Esperando firma». |
| Nota aceptada | Segundo trazo de Doña Mary a la bodega: las dos firmas. El papelito dice «Firmada por los dos». |
| Pago confirmado | El sello CUMPLIDA cae sobre la bodega emisora. |
| Permiso dado | Puente punteado de Doña Mary a Bodega B, con la vigencia. |
| Permiso quitado | El puente se borra. |
| Consulta sin permiso | Bodega B parpadea en gris con el texto «Sin permiso: no se entrega el resumen». No sale ningún trazo (no hay transacción). |
| Consulta con permiso | Pulso de Bodega B a Doña Mary y de regreso. Aparece el semáforo real («Historial insuficiente» y sus condiciones) y el hash, que abre el explorador. |

Cada animación ocurre **después** de que la API responde con `tx_hash`, nunca antes: el mapa no promete nada que la cadena no haya registrado. Un contador discreto muestra «Notas firmadas en este pasillo: N».

## 4. Datos

- **Geometría:** `plano/pasillo-a-b.json`, con la lista de bodegas (`id`, `lado`, `numero`, `x`, `w`), las filas, el corredor, el largo y la lista de los demás pasillos. Las unidades son del plano y no tienen escala verificada: la vista la ajusta al ancho de la pantalla.
- **Posiciones de la demo:** constante `POSICIONES_DEMO = { bodega_a: 'A-17', bodega_b: 'B-40', bodega_c: 'A-73' }`. José puede cambiarlas.
- **Crecimiento:** agregar un pasillo es agregar su JSON. El código no asume que solo existe A-B.

## 5. Criterios de aceptación

1. La vista «Pasillo A-B» carga desde `plano/pasillo-a-b.json` y dibuja todas las bodegas del archivo.
2. El flujo completo de la spec del frontend (§7.4) se ve en el mapa con los eventos de la sección 3, y cada uno lleva su hash.
3. Se ve el aviso de posiciones ilustrativas.
4. Con `prefers-reduced-motion` no hay animaciones, y el botón «Vista plana» funciona.
5. `grep -rni "metaverso" frontend/` no devuelve nada, y en `frontend/` y `plano/` no aparece ningún nombre de negocio ni de banco. La lista para revisarlo la tiene José en `privado/` y no se publica.
6. No se instalan paquetes. `node --test backend/` y `cargo test` siguen en verde.
7. Hay una captura de la vista en `demo/capturas/`.

## 6. Prompt para Claude Code (cuando ya exista `plano/pasillo-a-b.json`)

```
git pull --rebase origin main. Lee docs/decisiones.md (#47) y
spec/2026-09-26_especificacion-gemelo-digital.md completa.
Construye la vista «Pasillo A-B» (secciones 1 a 5) en frontend/, sin paquetes, con los
datos de plano/pasillo-a-b.json; conéctala a los eventos que ya devuelve la API.
Hazla la portada de la app y agrégala a la vista del jurado. No toques contracts/,
research/ ni privado/, y no modifiques plano/pasillo-a-b.json.
Al terminar cada bloque, commit y push con 5 renglones en el mensaje. Detente y deja escrito
el motivo si algo falla dos veces o si necesitas algo fuera de la spec.
```
