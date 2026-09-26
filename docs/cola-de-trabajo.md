# Cola de trabajo de Claude Code

**Cómo se usa (decisión #51):**
- Claude Code toma la primera tarea `[ ]`, la hace, cumple su criterio, cambia `[ ]` por `[x]` con la hora y el hash del commit, hace `git pull --rebase` y push, y sigue con la siguiente **sin esperar a José**.
- Vercel publica solo cada push a `main`, así que José puede seguir el avance desde el teléfono.
- **Paradas obligatorias** (spec web §6): algo falla dos veces; necesita instalar algo, una llave, tocar fuera de `web/`, `docs/` o `README.md`, o desplegar un contrato; o ya son más de las 15:00 del domingo 27. En esos casos marca la tarea con `[!]`, escribe el motivo debajo y se detiene.
- José agrega o reordena tareas cuando quiera; Claude (chat) también, con su aprobación.

**Entorno:** Claude Code en la web (claude.ai/code), conectado al repositorio. Aquí no hay llaves de testnet y no hacen falta.

## Cola

- [ ] **1. Base del sitio.** `web/` con `index.html`, `estilos.css` y `app.js`, navegación de las cuatro secciones, identidad «Tinta y Sello» y las secciones Inicio y Cómo funciona con su texto. *Criterio:* abre sin instalar nada y se ve bien en 390 px y 1920 px.
- [ ] **2. Gemelo en `web/`.** `gemelo.js` dibuja la copia idéntica de `plano/pasillo-a-b.json` (trazos + 96 bodegas), en isométrico y en vista plana. *Criterio:* prueba de copia idéntica en verde; se ve igual que la portada de la app local.
- [ ] **3. La demo real, verificable.** `repeticion.json` sacado de `demo/salida-demo.txt` y `demo/deploy.json`, más la pantalla de pasos con «Verlo en la cadena». *Criterio:* la prueba de hashes está en verde y ningún hash es inventado.
- [ ] **4. Motor de la simulación.** `simulacion/motor.js` con las reglas y el semáforo. *Criterio:* pruebas del motor en verde, incluida la equivalencia con `backend/semaforo.js`.
- [ ] **5. Agentes y vista.** `agentes.js` y `vista.js`: 20 bodegas y 40 clientes, controles de tiempo, fichas, trazos, sellos, feed, tarjeta de «pensamiento» y rótulo de simulación. *Criterio:* a los 90 días simulados hay semáforos de los tres colores y el rótulo del día 60 aparece.
- [ ] **6. Pulido y accesibilidad.** `prefers-reduced-motion`, pausa, contraste y textos. *Criterio:* criterios 3, 4 y 6 de la spec web.
- [ ] **7. Cierre.** Capturas en `demo/capturas/web-*.png`, sección «Sitio público» en el README, índice y `llms.txt` al día. *Criterio:* criterios 1 a 8 de la spec web.

## Hechas

*(Claude Code mueve aquí cada tarea terminada, con hora y commit.)*
