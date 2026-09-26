# Especificación — sitio público en Vercel y «Pasillo vivo» (agentes simulados)

**Estado:** vigente (decisiones #49, #50 y #51, aprobadas por José el 26-sep a las 13:11). Se construye en la carpeta **`web/`** y **no toca** `backend/`, `frontend/`, `contracts/` ni `demo/`, que forman la demo local que firma en testnet y que ya funciona.

## 0. Qué se construye

Un sitio **estático y público** en Vercel, sin llaves ni servidor, con cuatro secciones:

1. **Inicio:** qué es Cuentas Claras en 30 segundos, el refrán y las tres reglas.
2. **Pasillo vivo:** simulación con agentes ficticios sobre el gemelo digital del Pasillo A-B (sección 3).
3. **La demo real, verificable:** repetición paso a paso del flujo que sí corrió en Stellar testnet. Cada paso enlaza a su transacción en stellar.expert (sección 4).
4. **Cómo funciona:** qué va en la cadena y qué no, por qué blockchain y no una base de datos, los dos huecos cerrados (#42, #46), y enlaces al repositorio y al contrato.

## 1. Reglas

1. **Sin llaves, sin servidor, sin firmas.**
   - No hay rutas de API, funciones serverless ni variables de entorno.
   - El sitio **no envía transacciones**.
   - Nunca se sube una llave, ni de testnet.
2. **Sin paquetes** (#45): HTML, CSS y JavaScript sin framework ni paso de compilación. En Vercel: preset «Other», sin comando de build, con `web/` como directorio raíz.
3. **Simulación rotulada siempre.**
   - Letrero fijo en la sección 2: «Simulación con personajes ficticios. No es la cadena. Los parámetros son inventados para ilustrar las reglas; no son datos de la Central.»
   - **Un agente nunca firma por una persona real.** Todo es ficticio y fuera de la cadena.
4. **Del plano, solo `plano/pasillo-a-b.json`** (#48). Se copia tal cual a `web/datos/`, sin modificarlo; `scripts` o una prueba verifican que la copia es idéntica. Nada más del plano.
5. **Vocabulario:** el de siempre. En este sitio sí puede aparecer «blockchain». Nunca «metaverso», «buró», «score», «calificación», «anónimo» ni «nadie puede verlo».
6. **Identidad «Tinta y Sello»** (`docs/identidad-visual.md`). Nada de neón ni de estética cripto.
7. **Accesible:** `prefers-reduced-motion` respetado, control de pausa en la simulación, texto de 16 px o más y contraste AA.

## 2. Estructura

```
web/
  index.html        una sola página con las cuatro secciones y navegación por ancla
  estilos.css
  app.js            navegación y montaje
  gemelo.js         dibuja el Pasillo A-B (trazos + bodegas) en SVG; vista isométrica y plana
  simulacion/
    motor.js        reglas del contrato y del semáforo, tiempo simulado, azar con semilla
    agentes.js      perfiles, decisiones y frases de plantilla
    vista.js        conecta el motor con el gemelo y el feed
  repeticion.js     sección 4
  datos/
    pasillo-a-b.json   copia idéntica de plano/pasillo-a-b.json
    repeticion.json    pasos reales (sección 4)
  pruebas/*.test.js    node:test
vercel.json         (en la raíz del repo, solo si hace falta) o configuración en el panel de Vercel
```

## 3. «Pasillo vivo»: la simulación con agentes

**Actores** (todos ficticios, generados con una semilla fija para que la demo sea reproducible):
- **20 bodegas** en posiciones del Pasillo A-B tomadas de `pasillo-a-b.json`, con nombres genéricos («Bodega 1»… o «Abarrotes Norte»…, inventados).
- **40 clientes** con nombres genéricos inventados y uno de cuatro perfiles. Las probabilidades son parámetros de simulación, editables y mostrados en pantalla:

| Perfil | Paga a tiempo | Paga tarde | No paga |
|---|---|---|---|
| Cumplido | 0.95 | 0.05 | 0 |
| A veces tarde | 0.70 | 0.28 | 0.02 |
| Olvidadizo | 0.50 | 0.40 | 0.10 |
| Moroso | 0.30 | 0.20 | 0.50 |

**Reglas**, las mismas del contrato y del semáforo, reimplementadas en `motor.js` con pruebas:
- **Nota:** la crea la bodega y solo cuenta cuando el cliente la acepta. Plazo de 7, 15 o 30 días.
- **Estados:**
  - pagada a tiempo o tarde;
  - vencida (pasó el plazo);
  - incumplida (solo después de 30 días de gracia).
- **Permiso:** para ver el resumen de un cliente, una bodega nueva le pide permiso; el cliente lo da con una probabilidad por perfil y dura 30 días. Sin permiso no hay resumen, **tampoco para la bodega que ya le fió** (#46).
- **Semáforo:** la función de la spec del frontend §4. «Historial insuficiente» con menos de 3 notas cerradas, 2 bodegas o 60 días; después, verde, ámbar o rojo con los mismos umbrales. Debe dar **los mismos resultados** que `backend/semaforo.js`; una prueba compara los dos con los mismos casos.
- **Decisión de la bodega** (el «agente»):
  - verde → fía el monto pedido;
  - ámbar → fía la mitad;
  - rojo → no fía;
  - insuficiente o sin permiso → fía poco (rango 1k–5k) para empezar a conocerlo.

**Tiempo:** un día simulado dura 2 segundos, con controles de pausa, 1×, 4× y reiniciar. Hay un ciclo de día y noche sutil (el Papel se oscurece un poco de noche) y un contador «Día N».

**Qué se ve:**
- las fichas de los clientes se mueven por el corredor entre bodegas;
- trazo de tinta al firmar, sello CUMPLIDA al pagar, marca gris al incumplir, puente punteado al dar permiso;
- el color de cada bodega indica cuánto ha fiado (tono de Kraft, sin colores del semáforo);
- los semáforos aparecen en la ficha del cliente, siempre con palabra y forma.

**Pensamiento del agente:** al tocar una bodega o un cliente se abre una tarjeta con su perfil, su historial y la última decisión explicada en una frase de plantilla:
- «Le fío $4,000: tiene 5 notas cumplidas en 3 bodegas (verde).»
- «Sin su permiso no veo su resumen; le fío poco para empezar.»

No se usa ningún modelo de lenguaje.

**Feed de actividad:** lista de texto con los últimos 30 eventos (por ejemplo, «Día 12 · Bodega 7 fió a Cliente 23 · $5k–$20k»). Es la alternativa accesible al mapa.

**El momento clave:** a partir del día 60 los semáforos empiezan a pintarse. Un rótulo lo explica: «Desde el día 60 hay historial suficiente para juzgar. Antes, el semáforo dice "historial insuficiente" a propósito.»

## 4. «La demo real, verificable»

- **`web/datos/repeticion.json`**, construido **solo** a partir de `demo/salida-demo.txt` y `demo/deploy.json`: por cada paso, el número, la acción, quién firma, el hash y la URL de stellar.expert. El paso sin permiso aparece con «No se envió transacción: el contrato lo rechazó».
- **Pantalla:** los 6 pasos sobre el gemelo, reproducibles con «Siguiente». Cada paso muestra la misma animación que la app local y un botón «Verlo en la cadena» que abre la transacción real.
- **Encabezado:** Contract ID con su enlace, «Stellar testnet», y una aclaración: «Esta es la repetición de una corrida real. Para firmar en vivo usamos la app local; este sitio no firma nada.»
- **No se inventa ningún hash.** Si un paso no tiene hash en la salida, se muestra sin enlace y con la razón.

## 5. Criterios de aceptación

1. El sitio abre con `npx serve`, `python3 -m http.server` o solo abriendo `web/index.html`. No necesita instalación.
2. `node --test web/pruebas/` en verde, con al menos:
   - reglas del motor (dos firmas, gracia de 30 días, permiso obligatorio para cualquier bodega);
   - semáforo igual al de `backend/semaforo.js`;
   - `repeticion.json` coincide con los hashes de `demo/salida-demo.txt`;
   - copia idéntica de `pasillo-a-b.json`.
3. `grep -rniE "metaverso|buró|score|calificaci|anónim|nadie puede ver" web/` no devuelve nada.
4. `grep -rE "S[A-Z2-7]{55}" web/` no devuelve nada, y no hay `fetch` a rutas propias ni a servicios que requieran llave.
5. `git diff --stat main -- backend frontend contracts demo plano` vacío respecto al inicio del trabajo.
6. Se ve bien en un teléfono (390 px) y en un proyector (1920 px).
7. Capturas del sitio en `demo/capturas/web-*.png`.
8. README: sección «Sitio público» con la URL de Vercel (la pega José) y qué hace y qué no.

## 6. Cola de trabajo y paradas

El orden y el estado viven en `docs/cola-de-trabajo.md`. Claude Code la recorre de arriba hacia abajo, marca cada tarea al terminarla, hace commit y push, y sigue con la siguiente sin esperar. **Se detiene** y deja escrito el motivo en la cola si:
- algo falla dos veces;
- necesita instalar algo, una llave, tocar fuera de `web/`, `docs/` o `README.md`, o desplegar un contrato;
- son más de las 15:00 del domingo (código congelado).
