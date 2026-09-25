# Prompt para Claude Design — presentación de Cuentas Claras

**Estado:** borrador del 25-sep-2026 (15:00). Cópialo completo, desde «Contexto» hasta el final del bloque, en Claude Design. Si tienes capturas reales de la demo o el Contract ID, pégalos también; si no, deja los marcadores [CONFIRMAR].

Base: `docs/lean-canvas.md`, `docs/identidad-visual.md`, `pitch/2026-09-25_deck.md`, `docs/hoja-de-hechos.md`.

**Lámina opcional «La Central, por sectores»:** ya está hecha en `pitch/2026-09-25_lamina-central-por-sectores.png` (y `.svg`). Súbela a Claude Design como imagen y pide que la inserte entre la diapositiva 3 y la 4, sin modificarla. Es un esquema no a escala, sin ubicaciones reales (decisión #40).

---

```
CONTEXTO
Haz una presentación minimalista y elegante, en español de México, para el pitch de
3 minutos de un hackathon universitario de blockchain (GOYA HACK · Hackathon UNAM 2026,
track Blockchain). Proyecto: "Cuentas Claras". Equipo: "Palabra".
Cuentas Claras es una bitácora de fiado co-firmada para la Central de Abasto de la
Ciudad de México, construida en Stellar (testnet): cada nota de crédito la firman la
bodega y el cliente; nadie la altera ni la borra; el historial es del cliente y él
decide quién lo consulta. No es un buró, no mueve dinero, no emite token.

PÚBLICO
Jueces técnicos (Stellar) y de negocio. Deben entender en 10 segundos qué problema
resuelve y por qué hace falta una cadena y no una base de datos.

FORMATO
16:9. Máximo 10 diapositivas. Una idea por diapositiva. Mucho espacio en blanco.
Titulares de 40 pt o más; texto de 28 pt o más; pie de fuente de 12 pt, siempre visible.
Máximo 20 palabras de texto en pantalla por diapositiva (sin contar título ni fuente).
Exportable a PDF.

IDENTIDAD VISUAL "TINTA Y SELLO"
Metáfora: una nota de remisión bien llevada. Papel claro, tinta azul de bolígrafo,
un sello rojo de goma que dice "CUMPLIDA".
Regla 60-30-10: 60 % Papel, 30 % Tinta, 10 % Sello y Kraft.
- Papel  #F5F0E6  fondo
- Tinta  #1E3A8A  titulares, logotipo, fondo de portada y cierre
- Carbón #262626  texto
- Sello  #B3261E  acento: una sola palabra o el sello por diapositiva, nunca más
- Kraft  #D8C3A0  bloques secundarios (celdas del Lean Canvas)
- Niebla #E8EEF9  resaltado suave
- Gris   #5F5F5F  pies de fuente
Verde #236B2A, ámbar #8A5A00 y rojo #B71C1C SOLO para el semáforo de la diapositiva de
demo, siempre con palabra y forma; nunca como color de marca.
Tipografía: Archivo 700-800 (titulares), Atkinson Hyperlegible (texto),
IBM Plex Mono (folios, hashes, fechas), Caveat solo para el trazo de firma.
Logotipo: "Cuentas Claras" en Archivo, color Tinta, con dos trazos de bolígrafo debajo
(las dos firmas). Íconos de línea de 2 px con puntas redondeadas.

NO USAR
Neón, degradados morado/cian, fondos negros con circuitos, monedas, cadenas, eslabones,
cubos 3D, cohetes, candados, gráficas que suben, apretones de manos, fotos de dinero,
rostros, fachadas o números de bodega, logos de CEDA, FICEDA o UNAM, mapas o planos.
Palabras prohibidas en pantalla: "buró", "score", "calificación", "pagaré", "anónimo",
"100 % seguro", "reduce la extorsión". No inventes cifras, testimonios ni logos.

DIAPOSITIVAS
1. Portada (fondo Tinta, texto Papel).
   Grande: "Cuentas claras…"  Pequeño: "Equipo Palabra · desde la Central de Abasto".
   Un sello rojo pequeño, girado, en una esquina.
2. El problema.
   Título: "La palabra se cumple, pero no viaja."
   Texto: "En la Central, el fiado se da de palabra. Fuera de cada bodega, nadie sabe
   quién cumple."
   Dato: "18.4 % de los rechazos de crédito a empresas: falta de historial."
   Fuente: ENAFIN 2024, INEGI.
3. Para quién.
   Dos columnas con ícono: "La bodega que fía" / "El cliente de fiado".
   Dato: "347 bodegas de abarrotes · 1,981 de frutas y legumbres". Fuente: FICEDA.
   Pie: "Primeros usuarios: una bodega de abarrotes y sus clientes recurrentes
   (experiencia del equipo)."
4. La solución.
   Título: "Fiado de palabra, con cuentas claras."
   Tres reglas, una por renglón, con ícono:
   "Ninguna bodega escribe sola una deuda." / "Nadie la borra ni la maquilla." /
   "Tu historial es tuyo."
5. Cómo funciona (demo).
   Cinco pasos en línea horizontal, estilo sellos numerados:
   "Bodega crea la nota" → "Cliente la acepta" → "Pago confirmado" →
   "Cliente da permiso" → "Otra bodega ve su semáforo".
   Debajo, en Sello: "Sin permiso, el contrato no entrega el resumen."
   Pie: "Stellar testnet · datos ficticios · Contract ID [CONFIRMAR]".
6. ¿Por qué blockchain y no una base de datos?
   Título: "No hay un custodio en quien confíen bodegas que compiten."
   Tres viñetas: "Dos firmas o no hay deuda." / "Nadie edita ni borra, ni nosotros." /
   "Cualquiera verifica sin confiar en el operador."
   Pie: "En la cadena no hay nombres, teléfonos ni montos exactos: solo un seudónimo
   y rangos."
7. Lean Canvas (una sola diapositiva, cuadrícula de 9 celdas en Kraft con títulos en
   Tinta; texto corto en cada celda):
   Problema: "La palabra se cumple, pero no viaja."
   Segmentos: "Bodega que fía · cliente de fiado."
   Propuesta de valor (celda central, borde Sello): "Fiado de palabra, con cuentas claras."
   Solución: "Nota firmada por los dos · historial del cliente · permiso."
   Canales: "La bodega · mostrador · WhatsApp."
   Ingresos: "Paga la bodega por su herramienta de cobranza. El cliente, nunca."
   Costos: "Operación · acompañamiento · dictamen legal · auditoría."
   Métricas: "Notas firmadas por los dos cada semana."
   Ventaja injusta: "Operamos dentro de la Central."
8. Qué sigue.
   Línea de tiempo simple: "Hoy: testnet" → "Piloto: 1 bodega, 4 semanas" →
   "Dictamen legal" → "Fondo de Stellar" → "Mainnet, tras auditoría".
9. Equipo Palabra.
   "José Hugo · experiencia operativa en una bodega de la Central."
   "Construido con Claude y Claude Code." Código QR al repositorio [CONFIRMAR URL].
10. Cierre (fondo Tinta, texto Papel).
   Grande: "Cuentas claras, amistades largas."  Pequeño: "Equipo Palabra".
   Sello rojo "CUMPLIDA" con la fecha 25·09·2026.
   Dos QR pequeños: repositorio y video [CONFIRMAR].

NOTAS DEL ORADOR
Agrega en cada diapositiva una nota de 1-2 frases que siga el pitch: abrir diciendo
"Cuentas claras…" y dejar que el público complete la frase; cerrar con
"Cuentas claras, amistades largas. Somos el Equipo Palabra."
```
