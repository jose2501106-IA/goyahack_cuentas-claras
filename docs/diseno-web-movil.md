# Diseño del sitio público para celular — propuestas y paleta

**Estado:** propuesta del 26-sep-2026, 14:30, pendiente de que José elija (decisión #52). Aplica **solo al sitio público** (`web/`, Vercel), que se dirige a académicos, gente cripto y especialistas en Web3. La app local que firma y los materiales para la Central conservan «Tinta y Sello» (`docs/identidad-visual.md`).

## 1. Por qué cambia la paleta en el sitio público

El sitio lo verán jurados y gente de Web3, no bodegueros. Tiene que decir en el primer vistazo, sin texto, tres cosas:
1. **Es un libro abierto:** fondo oscuro con retícula de registro y hashes en tipografía monoespaciada. Es el código visual que un público cripto reconoce al instante.
2. **Lo firman personas:** la tipografía y el color «papel» del texto, más el sello, conservan lo humano del mostrador.
3. **Es de la Central y es serio:** nada de neón, degradados morado-cian ni monedas. Futurista, pero pragmático.

Todas las combinaciones de abajo se verificaron con la fórmula de contraste de WCAG 2.x y superan 4.5:1 (nivel AA). La maqueta está en `demo/capturas/2026-09-26_paletas-movil.png`.

## 2. Tres paletas

| Token | 1 · Libro abierto (oscuro, **recomendada**) | 2 · Papel y cadena (claro) | 3 · Cempasúchil (oscuro, más mexicano) |
|---|---|---|---|
| Fondo | `#0B1220` | `#F5F0E6` | `#15101F` |
| Superficie | `#131C2E` | `#FFFFFF` | `#1F1830` |
| Borde / retícula | `#26324A` | `#D9D2C3` | `#3A2F52` |
| Texto | `#F2EDE3` (16.0:1) | `#1B2233` (14.0:1) | `#F7F1E8` (16.6:1) |
| Texto secundario | `#A9B3C4` (8.9:1) | `#555E6E` (5.8:1) | `#B8AFC6` (8.9:1) |
| **Firma** (primario, acciones) | `#7AA7FF` (7.8:1) | `#1E3A8A` (9.1:1) | `#FF9A3C` (8.8:1) |
| **Hash** (todo lo que está en la cadena) | `#6FE3C1` (12.0:1) | `#0F6E61` (5.4:1) | `#45D6D2` (10.5:1) |
| **Sello** (cumplida, un uso por pantalla) | `#FF6F61` (6.9:1) | `#B3261E` (5.8:1) | `#F0508F` (5.6:1) |
| Semáforo (solo en el semáforo, con palabra y forma) | `#3FD08A` · `#F2C14E` · `#FF6B6B` | `#236B2A` · `#8A5A00` · `#B71C1C` | `#3FD08A` · `#F2C14E` · `#FF6B6B` |

Contrastes medidos sobre el fondo.

- **1 · Libro abierto (recomendada).** Es la tinta azul de «Tinta y Sello» llevada a la noche. El verde menta de los hashes marca lo que vive en la cadena y el texto color papel marca lo humano. Un público Web3 lo reconoce sin explicación y no se parece a la estética cripto genérica. Además es continuidad de marca, no una marca nueva.
- **2 · Papel y cadena.** Es la identidad actual con una capa de «cadena» (hashes en verde azulado). Es la más legible en un proyector con mucha luz y en papel. Conviene como **modo claro** de la 1, con los mismos tokens.
- **3 · Cempasúchil.** Es la más memorable y la más mexicana. El riesgo: el fondo violeta y el rosa se acercan a la estética cripto de moda y compiten con el semáforo.

**Recomendación:** la 1 como tema por defecto y la 2 como modo claro automático (`prefers-color-scheme`). Solo cambian los tokens de CSS, no el HTML.

## 3. Tres propuestas de experiencia en el celular

| | A · «Historia en seis pasos» (**recomendada** para la portada) | B · «Mapa primero» | C · «Libro abierto» |
|---|---|---|---|
| Idea | Se lee bajando la pantalla: cada bloque es un paso de la demo real, y el mapa del pasillo, fijo arriba, se anima al llegar a cada paso | El pasillo ocupa la pantalla; una hoja inferior deslizable trae Demo real, Pasillo vivo y Cómo funciona | Un registro vertical, como un explorador de bloques pero humano: cada renglón es un evento con seudónimo, rango, hash y sello |
| Para quién | El juez que abre el enlace en el teléfono por primera vez | Quien ya entendió y quiere explorar | El público técnico que quiere ver «la cadena» |
| Fuerte en | Cuenta la historia sola, sin presentador | Se ve espectacular | Es el más «Web3» |
| Riesgo | Más texto que editar | En pantallas chicas el mapa se ve pequeño | Frío si es lo primero que se ve |
| JavaScript | Mínimo: un observador de desplazamiento | Medio | Mínimo |

**Recomendación: A en la portada, B en «Pasillo vivo» y C en «La demo real»** como vista alternativa («ver como registro»). Así cada público encuentra su puerta.

**Reglas de celular:**
- diseño para 390 px de ancho primero;
- botones de 48 px de alto o más, alcanzables con el pulgar en la mitad inferior;
- mapa en vista plana en el celular e isométrica desde 900 px;
- nada de desplazamiento horizontal;
- respeta `prefers-reduced-motion`.

## 4. HTML primero: qué sí protege y qué no

**Lo que hay que saber:** todo lo que llega al navegador se puede leer, sea HTML, CSS o JavaScript. Cualquiera lo ve con «ver código fuente». Escribir en HTML en lugar de JavaScript **no** esconde nada. Además, el repositorio es público. La protección real ya está en el diseño:
- el sitio no tiene llaves ni servidor;
- en la cadena solo hay seudónimo y rangos;
- los datos personales nunca salen del backend privado.

**Por qué sí conviene «HTML primero»:**
- **Robusto:** si falla el JavaScript, el sitio se sigue leyendo completo.
- **Accesible y rápido.**
- **Fácil de revisar:** el contenido está a la vista en un solo lugar.

**Regla para Claude Code:**
- Todo el texto y la estructura van en HTML semántico, y la página se entiende con JavaScript desactivado.
- JavaScript solo para lo que no se puede hacer de otra forma:
  - la simulación de agentes;
  - las animaciones del mapa;
  - el cambio de pasos.
- Sin frameworks ni paquetes.
- Nada de datos ni textos importantes generados solo por JavaScript. En `repeticion.json` los pasos también quedan escritos en el HTML.

## 5. Prompt para Claude Code (pegar **después** de que José elija)

Agrega a `docs/cola-de-trabajo.md`, antes de la tarea 6, estas dos tareas, y sigue la cola:

```
6a. Paleta del sitio: aplica en web/estilos.css la paleta elegida por José en la decisión
    #52 (docs/diseno-web-movil.md §2) como tokens de CSS; la segunda paleta como modo claro
    con prefers-color-scheme. Hashes siempre en monoespaciada y en el token «hash»; el sello,
    un uso por pantalla; el semáforo solo en el semáforo, con palabra y forma.
    Criterio: contraste AA verificado con un script en web/pruebas/.
6b. Experiencia móvil: portada como «Historia en seis pasos» (propuesta A), «Pasillo vivo»
    con mapa y hoja inferior (B) y, en «La demo real», el botón «ver como registro» (C).
    HTML primero (§4): todo el texto en HTML semántico, legible sin JavaScript; JavaScript solo
    para simulación, animaciones y cambio de pasos.
    Criterio: se entiende completo con JavaScript desactivado; en 390 px no hay desplazamiento
    horizontal y los botones miden 48 px o más; capturas en demo/capturas/web-movil-*.png.
```
