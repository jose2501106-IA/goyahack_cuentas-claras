# Cola de trabajo de Claude Code

**Cómo se usa (decisión #51):**
- Claude Code toma la primera tarea `[ ]`, la hace, cumple su criterio, cambia `[ ]` por `[x]` con la hora y el hash del commit, hace `git pull --rebase` y push, y sigue con la siguiente **sin esperar a José**.
- Vercel publica solo cada push a `main`, así que José puede seguir el avance desde el teléfono.
- **Paradas obligatorias** (spec web §6): algo falla dos veces; necesita instalar algo, una llave, tocar fuera de `web/`, `docs/`, `README.md` o `demo/capturas/web-*` (capturas del sitio, permitidas desde el 26-sep 15:00), o desplegar un contrato; o ya son más de las 15:00 del domingo 27. En esos casos marca la tarea con `[!]`, escribe el motivo debajo y se detiene.
- José agrega o reordena tareas cuando quiera; Claude (chat) también, con su aprobación.

**Entorno:** Claude Code en la web (claude.ai/code), conectado al repositorio. Aquí no hay llaves de testnet y no hacen falta. **Trabaja directo en `main`** (o en una rama con PR que José fusiona): Vercel publica `main`.

## Cola

- [x] **1. Base del sitio.** `web/` con `index.html`, `estilos.css` y `app.js`, navegación de las cuatro secciones, identidad «Tinta y Sello» y las secciones Inicio y Cómo funciona con su texto. *Criterio:* abre sin instalar nada y se ve bien en 390 px y 1920 px.
- [x] **2. Gemelo en `web/`.** `gemelo.js` dibuja la copia idéntica de `plano/pasillo-a-b.json` (trazos + 96 bodegas), en isométrico y en vista plana. *Criterio:* prueba de copia idéntica en verde; se ve igual que la portada de la app local.
- [x] **3. La demo real, verificable.** `repeticion.json` sacado de `demo/salida-demo.txt` y `demo/deploy.json`, más la pantalla de pasos con «Verlo en la cadena». *Criterio:* la prueba de hashes está en verde y ningún hash es inventado.
- [x] **4. Motor de la simulación.** `simulacion/motor.js` con las reglas y el semáforo. *Criterio:* pruebas del motor en verde, incluida la equivalencia con `backend/semaforo.js`.
- [x] **5. Agentes y vista.** `agentes.js` y `vista.js`: 20 bodegas y 40 clientes, controles de tiempo, fichas, trazos, sellos, feed, tarjeta de «pensamiento» y rótulo de simulación. *Criterio:* a los 90 días simulados hay semáforos de los tres colores y el rótulo del día 60 aparece.
- [x] **6. Pulido y accesibilidad.** `prefers-reduced-motion`, pausa, contraste y textos. *Criterio:* criterios 3, 4 y 6 de la spec web.
- [x] **7. Cierre.** Terminada por Claude (chat) el 26-sep a las 15:00: capturas `demo/capturas/web-*.png` (390 y 1920 px; Inicio, Pasillo vivo, La demo real y Cómo funciona) y `llms.txt` al día. Falta solo pegar la URL de Vercel en el README (José).
- [x] **8. Tema dual con interruptor.** Aplica `docs/diseno-web-movil.md` §1: tokens de «Papel y cadena» (claro) y «Cempasúchil» (oscuro) en `web/estilos.css` bajo `html[data-tema]`, interruptor en la barra superior (`<button aria-pressed>`, 44 px o más), por defecto `prefers-color-scheme`, elección recordada con try/catch. Hashes siempre en monoespaciada y en el token «hash»; el semáforo solo en el semáforo. *Criterio:* prueba en `web/pruebas/` que calcula el contraste de cada par de tokens de los dos temas (4.5:1 o más); el sitio se ve bien en ambos temas en 390 y 1920 px.
- [ ] **9. «La app en tu mano».** `docs/diseno-web-movil.md` §2: silueta de teléfono genérica en «La demo real», 6 pantallas del cliente escritas en HTML y sincronizadas con `repeticion.json` y con el gemelo; interruptor «Ver como: Cliente / Bodega B»; en menos de 900 px sin silueta y a todo el ancho; letrero de prototipo. Nunca campos de llaves, inicio de sesión ni datos reales. *Criterio:* con JavaScript desactivado se leen las 6 pantallas en orden; cada hash coincide con `repeticion.json`; el paso 4 va sin hash.
- [ ] **10. Experiencia móvil.** `docs/diseno-web-movil.md` §3: portada «Historia en seis pasos», hoja inferior en Pasillo vivo (Qué pasa / Clientes / Bodegas, con las listas plegadas y búsqueda) y «Ver como registro» en La demo real. *Criterio:* en 390 px la sección Pasillo vivo mide menos de 2 pantallas de alto con la hoja cerrada; sin desplazamiento horizontal; botones de 48 px o más; `node --test web/pruebas/` en verde.

## Hechas

*(Claude Code mueve aquí cada tarea terminada, con hora y commit.)*
- **1.** sáb 26-sep 13:52 · `f57538c` · Base del sitio en `web/`: cuatro secciones, Inicio y Cómo funciona con texto; scripts clásicos para que abra también desde `file://`. Revisado en 390 px y 1920 px (Chromium sin interfaz).
- **2.** sáb 26-sep 13:54 · `434e4f7` · `gemelo.js` y `datos/pasillo-a-b.json` (copia byte por byte) más `datos/pasillo-a-b.js` para `file://`. Isométrico y plano revisados en 1920 px. 6 pruebas en verde con `node --test web/pruebas/`.
- **3.** sáb 26-sep 13:57 · `647082a` · `datos/repeticion.json` generado con `web/herramientas/generar-repeticion.js` (solo salida y deploy) y pantalla de 6 pasos con «Verlo en la cadena». Prueba de hashes en verde: 5 de 5 coinciden con la salida, el paso 4 va sin enlace. 11 pruebas en verde.
- **4.** sáb 26-sep 13:59 · `08f4c0d` · `simulacion/motor.js` con reglas, tiempo en días y azar con semilla. 12 pruebas del motor en verde (23 en total), incluida la equivalencia con `backend/semaforo.js`. Simplificación declarada en el archivo: una nota vencida que se paga antes de la gracia cuenta como pagada tarde (en el contrato eso pasa por aclaración).
- **5.** sáb 26-sep 14:04 · `9c01b32` · `simulacion/agentes.js` y `simulacion/vista.js`. Con la semilla fija, al día 90 hay 28 verdes, 8 amarillos, 1 rojo y 3 insuficientes; antes del día 60, todos insuficientes. El rótulo del día 60 aparece (revisado en Chromium). 30 pruebas en verde.
- **6.** sáb 26-sep 14:07 · `10ddf53` · Criterio 3: el grep de vocabulario vetado no devuelve nada. Criterio 4: sin llaves `S…` ni `fetch`. Criterio 6: sin desplazamiento horizontal en 390 px ni en 1920 px (Chromium sin interfaz). `prefers-reduced-motion`, pausa y contraste AA verificados. 35 pruebas en verde.
- **8.** sáb 26-sep 15:03 · `1b4e4b3` · Tema dual con interruptor. `web/pruebas/tema.test.js`: todos los pares de texto sobre fondo ≥ 4.5:1 en los dos temas. Revisado en 390 y 1920 px, claro y oscuro; el interruptor recuerda la elección y funciona sin almacenamiento. 41 pruebas en verde.
