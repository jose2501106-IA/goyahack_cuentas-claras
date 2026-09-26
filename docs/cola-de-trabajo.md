# Cola de trabajo de Claude Code

**Cómo se usa (decisión #51):**
- Claude Code toma la primera tarea `[ ]`, la hace, cumple su criterio, cambia `[ ]` por `[x]` con la hora y el hash del commit, hace `git pull --rebase` y push, y sigue con la siguiente **sin esperar a José**.
- Vercel publica solo cada push a `main`, así que José puede seguir el avance desde el teléfono.
- **Paradas obligatorias** (spec web §6): algo falla dos veces; necesita instalar algo, una llave, tocar fuera de `web/`, `docs/` o `README.md`, o desplegar un contrato; o ya son más de las 15:00 del domingo 27. En esos casos marca la tarea con `[!]`, escribe el motivo debajo y se detiene.
- José agrega o reordena tareas cuando quiera; Claude (chat) también, con su aprobación.

**Entorno:** Claude Code en la web (claude.ai/code), conectado al repositorio. Aquí no hay llaves de testnet y no hacen falta.

## Cola

- [x] **1. Base del sitio.** `web/` con `index.html`, `estilos.css` y `app.js`, navegación de las cuatro secciones, identidad «Tinta y Sello» y las secciones Inicio y Cómo funciona con su texto. *Criterio:* abre sin instalar nada y se ve bien en 390 px y 1920 px.
- [x] **2. Gemelo en `web/`.** `gemelo.js` dibuja la copia idéntica de `plano/pasillo-a-b.json` (trazos + 96 bodegas), en isométrico y en vista plana. *Criterio:* prueba de copia idéntica en verde; se ve igual que la portada de la app local.
- [x] **3. La demo real, verificable.** `repeticion.json` sacado de `demo/salida-demo.txt` y `demo/deploy.json`, más la pantalla de pasos con «Verlo en la cadena». *Criterio:* la prueba de hashes está en verde y ningún hash es inventado.
- [x] **4. Motor de la simulación.** `simulacion/motor.js` con las reglas y el semáforo. *Criterio:* pruebas del motor en verde, incluida la equivalencia con `backend/semaforo.js`.
- [x] **5. Agentes y vista.** `agentes.js` y `vista.js`: 20 bodegas y 40 clientes, controles de tiempo, fichas, trazos, sellos, feed, tarjeta de «pensamiento» y rótulo de simulación. *Criterio:* a los 90 días simulados hay semáforos de los tres colores y el rótulo del día 60 aparece.
- [x] **6. Pulido y accesibilidad.** `prefers-reduced-motion`, pausa, contraste y textos. *Criterio:* criterios 3, 4 y 6 de la spec web.
- [x] **7. Cierre.** Capturas en `demo/capturas/web-*.png`, sección «Sitio público» en el README, índice y `llms.txt` al día. *Criterio:* criterios 1 a 8 de la spec web.
  - Se detuvo el sáb 26-sep por la parada «tocar fuera de `web/`, `docs/` o `README.md`»; José dio permiso para `demo/capturas/` y `llms.txt` y se terminó.

## Hechas

*(Claude Code mueve aquí cada tarea terminada, con hora y commit.)*
- **1.** sáb 26-sep 13:52 · `f57538c` · Base del sitio en `web/`: cuatro secciones, Inicio y Cómo funciona con texto; scripts clásicos para que abra también desde `file://`. Revisado en 390 px y 1920 px (Chromium sin interfaz).
- **2.** sáb 26-sep 13:54 · `434e4f7` · `gemelo.js` y `datos/pasillo-a-b.json` (copia byte por byte) más `datos/pasillo-a-b.js` para `file://`. Isométrico y plano revisados en 1920 px. 6 pruebas en verde con `node --test web/pruebas/`.
- **3.** sáb 26-sep 13:57 · `647082a` · `datos/repeticion.json` generado con `web/herramientas/generar-repeticion.js` (solo salida y deploy) y pantalla de 6 pasos con «Verlo en la cadena». Prueba de hashes en verde: 5 de 5 coinciden con la salida, el paso 4 va sin enlace. 11 pruebas en verde.
- **4.** sáb 26-sep 13:59 · `08f4c0d` · `simulacion/motor.js` con reglas, tiempo en días y azar con semilla. 12 pruebas del motor en verde (23 en total), incluida la equivalencia con `backend/semaforo.js`. Simplificación declarada en el archivo: una nota vencida que se paga antes de la gracia cuenta como pagada tarde (en el contrato eso pasa por aclaración).
- **5.** sáb 26-sep 14:04 · `9c01b32` · `simulacion/agentes.js` y `simulacion/vista.js`. Con la semilla fija, al día 90 hay 28 verdes, 8 amarillos, 1 rojo y 3 insuficientes; antes del día 60, todos insuficientes. El rótulo del día 60 aparece (revisado en Chromium). 30 pruebas en verde.
- **6.** sáb 26-sep 14:07 · `10ddf53` · Criterio 3: el grep de vocabulario vetado no devuelve nada. Criterio 4: sin llaves `S…` ni `fetch`. Criterio 6: sin desplazamiento horizontal en 390 px ni en 1920 px (Chromium sin interfaz). `prefers-reduced-motion`, pausa y contraste AA verificados. 35 pruebas en verde.
- **7.** sáb 26-sep 14:20 · `16288f9` · 8 capturas `web-*.png` (1920 y 390 px), `llms.txt`, índice y README. (`vercel.json` se agregó y luego se quitó: el proyecto de Vercel se creó con *Root Directory* `web`.) Criterios 1 a 8 cumplidos: sitio en https://cuentas-claras-lemon.vercel.app (proyecto creado el 26-sep por el conector de Vercel).
