# Especificación — gemelo digital del Pasillo A-B

**Estado:** vigente para el fin de semana (decisiones #47 y #48). Desde el 26-sep a las 08:30 el pasillo se dibuja con su **forma real**, a partir de `plano/pasillo-a-b.json`, que José autorizó publicar (#48). Sustituye al esquema genérico de las 08:05. Complementa `spec/2026-09-26_especificacion-frontend.md` y no cambia su API.

## 0. Qué es

Una vista nueva, **«Pasillo A-B»**, que muestra el pasillo como una maqueta isométrica de papel y tinta. Cada firma real en Stellar testnet se ve moverse entre bodegas. Es la portada de la app y el centro de la vista del jurado. El MVP cubre solo el Pasillo A-B; los demás pasillos aparecen como pestañas grises, «próximamente», porque el padrón está pensado para crecer.

**Nombre:** «gemelo digital del pasillo». **Nunca** «metaverso».

## 1. Reglas

1. **La ubicación nunca va a la cadena.** Qué cuenta de testnet corresponde a qué posición del pasillo vive solo en `backend/datos/` (o en una constante del frontend) y nunca en el contrato.
2. **Posiciones ilustrativas.** Las bodegas de la demo ocupan posiciones del pasillo solo para mostrar el flujo. En pantalla va siempre: «Posiciones ilustrativas. Ninguna bodega real participa en esta demo.» La posición de cada bodega de la demo se define en una sola constante, para cambiarla sin tocar nada más.
3. **Del plano, solo lo autorizado (#48):** los trazos del Pasillo A-B (bloques, acceso central, locales de esquina, estacionamiento, escaleras, contenedores) **sin ningún rótulo ni uso** y las bodegas con su número. La app no agrega nombres, giros ni usos de ningún local. En pantalla va siempre: «Forma del Pasillo A-B; no a escala. Posiciones de la demo ilustrativas.»
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

- **`plano/pasillo-a-b.json`** (autorizado por José, #48). No se modifica. Trae:
  - `bodegas`: `id`, `lado`, `numero`, `x` y `w` de cada una de las 96;
  - `filas`: el `y` y el `alto` de A y B;
  - `corredor`;
  - `trazos`: unos 5,000 segmentos `[x1, y1, x2, y2]` con el contorno completo del pasillo;
  - `otros_pasillos`.

  Las unidades son del plano. El origen está en el borde izquierdo del primer bloque y en la base de la fila B.
- **Cómo se dibuja:**
  1. Capa base: los `trazos` en Tinta al 45 % de opacidad, como dibujo de arquitecto sobre papel.
  2. Encima, cada bodega como bloque de Kraft con volumen (sección 2) en su `x` y `w` reales. Las de la demo se elevan.
  3. Todo en perspectiva isométrica con `transform` de CSS sobre un solo SVG, con «Vista plana» disponible.
  4. Los trazos van en un solo `<path>` para que cargue rápido.
- **Posiciones de la demo:** `POSICIONES_DEMO = { bodega_a: 'A-17', bodega_b: 'B-40', bodega_c: 'A-73' }`, aprobadas el 26-sep a las 08:05.
- **Crecimiento:** los demás pasillos aparecen como pestañas grises, «próximamente». Agregar uno es agregar su JSON con la misma forma. Mientras no exista, la función `generarPasillo` del esquema genérico sirve de respaldo.

## 5. Criterios de aceptación

1. La vista «Pasillo A-B» dibuja los trazos y las 96 bodegas de `plano/pasillo-a-b.json` en su posición real, con el rótulo de la regla 3.
2. El flujo completo de la spec del frontend (§7.4) se ve en el mapa con los eventos de la sección 3, y cada uno lleva su hash.
3. Se ve el aviso de posiciones ilustrativas.
4. Con `prefers-reduced-motion` no hay animaciones, y el botón «Vista plana» funciona.
5. `grep -rni "metaverso" frontend/` no devuelve nada, en `frontend/` no aparece ningún nombre de negocio ni de banco, y en el repo no hay más datos del plano que `plano/pasillo-a-b.json`.
6. No se instalan paquetes. `node --test backend/` y `cargo test` siguen en verde.
7. Hay una captura de la vista en `demo/capturas/`.

## 6. Prompt para Claude Code

```
git pull --rebase origin main. Lee docs/decisiones.md (#46, #47 y #48) y
spec/2026-09-26_especificacion-gemelo-digital.md completa.
Construye la vista «Pasillo A-B» (secciones 1 a 5) en frontend/, sin paquetes, con el
forma real de plano/pasillo-a-b.json (sección 4; no modifiques ese archivo). Conéctala a
los eventos que ya devuelve la API. Hazla la portada de la app y agrégala a la vista del jurado.
Verifica que la app funciona con el contrato vigente de demo/deploy.json (bodega_c incluida).
No toques contracts/, research/ ni privado/.
Al terminar cada bloque, commit y push con 5 renglones en el mensaje. Detente y deja escrito
el motivo si algo falla dos veces o si necesitas algo fuera de la spec.
```
