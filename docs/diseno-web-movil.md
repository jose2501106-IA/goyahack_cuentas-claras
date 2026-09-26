# Diseño del sitio público para celular — tema dual y «La app en tu mano»

**Estado:** aprobado por José el 26-sep-2026 a las 14:50 (decisiones #52 y #53). Aplica **solo al sitio público** (`web/`, Vercel), que se dirige a académicos, gente cripto y especialistas en Web3. La app local que firma y los materiales para la Central conservan «Tinta y Sello» (`docs/identidad-visual.md`).

**Punto de partida (26-sep, 14:50):**
- `web/` ya existe, con cuatro secciones (Inicio, Pasillo vivo, La demo real, Cómo funciona), la simulación de agentes y la repetición verificable. Tiene 35 pruebas en verde.
- Hoy usa «Tinta y Sello» en claro.
- **Detectado en 390 px:** el mapa se ve pequeño, y la lista de 40 clientes y 20 bodegas alarga mucho la página.
- Capturas en `demo/capturas/web-*.png`.

## 1. Tema dual con interruptor

Dos temas, elegidos por José. Un **interruptor en la barra superior**, a la derecha y siempre visible, cambia entre ellos:

| Token | ☀ Claro · «Papel y cadena» | ☾ Oscuro · «Cempasúchil» |
|---|---|---|
| Fondo | `#F5F0E6` | `#15101F` |
| Superficie | `#FFFFFF` | `#1F1830` |
| Borde / retícula | `#D9D2C3` | `#3A2F52` |
| Texto | `#1B2233` (14.0:1) | `#F7F1E8` (16.6:1) |
| Texto secundario | `#555E6E` (5.8:1) | `#B8AFC6` (8.9:1) |
| **Firma** (primario, acciones, trazos de firma) | `#1E3A8A` (9.1:1) | `#FF9A3C` (8.8:1) |
| **Hash** (todo lo que está en la cadena) | `#0F6E61` (5.4:1) | `#45D6D2` (10.5:1) |
| **Sello** (cumplida; un uso por pantalla) | `#B3261E` (5.8:1) | `#F0508F` (5.6:1) |
| Bodega en el mapa | `#E6DAC3`, borde `#D9D2C3` | `#2A2140`, borde `#3A2F52` |
| Semáforo (solo en el semáforo, con palabra y forma) | `#236B2A` · `#8A5A00` · `#B71C1C` | `#3FD08A` · `#F2C14E` · `#FF6B6B` |

Contrastes medidos sobre el fondo con la fórmula de WCAG 2.x. Todos superan 4.5:1.

**Cómo funciona el interruptor:**
- Por defecto sigue al sistema (`prefers-color-scheme`).
- Al tocarlo, cambia `data-tema` en `<html>` y la elección se recuerda en el navegador. Si el almacenamiento no está disponible, el sitio igual funciona.
- Es un `<button>` con `aria-pressed` y la etiqueta «Tema oscuro» o «Tema claro». Mide 44 × 44 px o más.
- Solo cambian los tokens de CSS, nunca el HTML.

**El sentido de cada color, sin explicación:**
- **Texto:** lo humano, el papel.
- **Firma:** lo que hacen las personas.
- **Hash:** lo que vive en la cadena.
- **Sello:** la palabra cumplida.

## 2. «La app en tu mano»: el teléfono dentro de la página (decisión #53)

**Qué es:** en la sección «La demo real», junto al gemelo del pasillo, la **silueta de un teléfono** muestra la app como la vería el cliente. El jurado ve el producto que una persona tendría en la mano, no solo la infraestructura. Las dos pantallas cuentan una sola historia: lo que pasa en el teléfono se ve al mismo tiempo en el pasillo.

**Pantallas del cliente**, sincronizadas con los 6 pasos reales de `repeticion.json`:

| Paso | Pantalla en el teléfono | En el mapa |
|---|---|---|
| 1 | Aviso: «Bodega A te registró una nota: $5,000–$20,000, vence el [fecha]. ¿Estás de acuerdo?» y botón «Acepto» | Trazo de A-17 a Doña Mary |
| 2 | «Firmada por los dos», con el hash y «Verlo en la cadena» | Segunda firma |
| 3 | Sello CUMPLIDA: «Cumpliste tu palabra: queda firmado a tu favor.» | Sello sobre A-17 |
| 4 | «Bodega B pidió tu resumen sin permiso y no se le entregó.» (sin hash: no se envió transacción) | B-40 parpadea en gris |
| 5 | «¿Das permiso a Bodega B por 30 días?», con «Dar permiso» | Puente punteado |
| 6 | «Bodega B consultó tu resumen. Quedó registrado.» y el hash | Pulso y semáforo |

- **Interruptor «Ver como: Cliente / Bodega B»:** del lado de la bodega, las pantallas muestran el rechazo sin permiso y el semáforo con «historial insuficiente» y su lista de condiciones.
- **La silueta:** dibujada con CSS o SVG, genérica (bordes redondeados, sin muesca ni botones de una marca real), con la barra de estado que dice «testnet».
- **En un celular de verdad** (menos de 900 px), la silueta desaparece y las pantallas ocupan el ancho: el teléfono del jurado se vuelve la app.
- **Letrero fijo:** «Prototipo de la app. Datos ficticios. En este sitio no se firma nada: cada paso enlaza a su transacción real en Stellar testnet.»
- **Lo que nunca aparece:** campos para llaves o frases semilla, pantallas de inicio de sesión, números de teléfono ni nombres reales. No debe parecer una billetera ni pedir datos.

## 3. Experiencia en el celular

- **Portada «Historia en seis pasos»:** texto corto por bloque. El pasillo va fijo arriba y se anima al llegar a cada bloque. Al final, dos botones: «Ver la demo real» y «Entrar al Pasillo vivo».
- **«Pasillo vivo»:**
  - el mapa ocupa el ancho;
  - los controles de tiempo, fijos abajo al alcance del pulgar;
  - una **hoja inferior** con tres pestañas: Qué pasa (feed), Clientes y Bodegas.
  
  Las listas de 40 clientes y 20 bodegas **no se despliegan en la página**: van dentro de la hoja, con búsqueda por nombre y las 10 primeras visibles.
- **«La demo real»:** el teléfono de la sección 2, más el botón «Ver como registro», que muestra los 6 pasos como renglones de un libro (seudónimo, rango, hash y sello).
- **Reglas:**
  - diseño para 390 px primero;
  - botones de 48 px o más;
  - sin desplazamiento horizontal;
  - mapa plano en el celular e isométrico desde 900 px;
  - respeta `prefers-reduced-motion`.

## 4. HTML primero

Todo lo que llega al navegador se puede leer, sea HTML, CSS o JavaScript, y además el repositorio es público. **Esconder no depende del lenguaje.** Lo que protege es que el sitio no tiene llaves ni servidor, y que en la cadena solo hay seudónimo y rangos.

«HTML primero» se elige por robustez, accesibilidad y facilidad de revisión:
- todo el texto va en HTML semántico, **incluidas las 6 pantallas del teléfono**;
- la página se entiende con JavaScript desactivado;
- JavaScript solo para la simulación, las animaciones, el cambio de pasos y el interruptor de tema;
- sin frameworks ni paquetes.

## 5. Tareas para Claude Code (ya están en `docs/cola-de-trabajo.md`, 8 a 10)

Ver la cola. Resumen:
- **8.** Tema dual con interruptor.
- **9.** «La app en tu mano».
- **10.** Experiencia móvil (portada en seis pasos y hoja inferior en Pasillo vivo).
