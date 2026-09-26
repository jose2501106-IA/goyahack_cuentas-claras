# Prompt para Claude Design — app móvil de Cuentas Claras (tema dual)

**Uso:** copia el bloque completo en Claude Design. Si quieres, sube también `demo/capturas/2026-09-26_paletas-movil.png` como referencia de color y `demo/capturas/web-inicio-390.png` como referencia del estado actual. El diseño que salga sirve de guía para la tarea 9 de `docs/cola-de-trabajo.md` («La app en tu mano») y para el deck. Base: `docs/diseno-web-movil.md` (decisiones #52 y #53).

---

```
CONTEXTO
Diseña las pantallas móviles de "Cuentas Claras", la bitácora de fiado co-firmada
de la Central de Abasto de la Ciudad de México, construida en Stellar (testnet).
Cada nota de fiado la firman la bodega y el cliente; nadie la altera ni la borra;
el historial es del cliente y él decide a qué bodega le da permiso de consultarlo;
cada consulta queda registrada. No mueve dinero ni emite token.
Equipo: "Palabra". Idioma: español de México.

PÚBLICO DE ESTE DISEÑO
Jurado de un hackathon de blockchain: académicos, gente cripto y especialistas en
Web3. Al primer vistazo deben leer "libro abierto firmado por personas": lo humano
del mostrador (papel, firma, sello) junto a lo verificable de la cadena (hashes en
monoespaciada).

FORMATO
Pantallas de 390 × 844 px. Cada pantalla en DOS temas, lado a lado: claro y oscuro.
Un interruptor de tema (sol / luna) arriba a la derecha en todas las pantallas.
Texto de 16 px o más; botones de 48 px de alto o más, en la mitad inferior.

TEMA CLARO · "Papel y cadena"
Fondo #F5F0E6 · Superficie #FFFFFF · Borde #D9D2C3 · Texto #1B2233 ·
Texto secundario #555E6E · Firma (acciones) #1E3A8A · Hash (todo lo que está en la
cadena) #0F6E61 · Sello (cumplida, una vez por pantalla) #B3261E.

TEMA OSCURO · "Cempasúchil"
Fondo #15101F · Superficie #1F1830 · Borde #3A2F52 · Texto #F7F1E8 ·
Texto secundario #B8AFC6 · Firma (acciones) #FF9A3C · Hash #45D6D2 ·
Sello #F0508F.

SEMÁFORO (solo dentro del semáforo, siempre con palabra y forma)
Claro: verde #236B2A ● · ámbar #8A5A00 ▲ · rojo #B71C1C ■ · gris ○ "Historial insuficiente".
Oscuro: verde #3FD08A ● · ámbar #F2C14E ▲ · rojo #FF6B6B ■ · gris ○.

TIPOGRAFÍA
Archivo 700-800 para titulares; Atkinson Hyperlegible para texto; IBM Plex Mono
para hashes, seudónimos, fechas y montos; Caveat solo para el trazo de firma.

SIGNIFICADO DE CADA COLOR (úsalo con disciplina)
Texto = lo humano. Firma = lo que hacen las personas. Hash = lo que vive en la
cadena (siempre en monoespaciada, con "↗ Verlo en la cadena"). Sello = la palabra
cumplida (sello circular girado, "CUMPLIDA", una vez por pantalla).

PANTALLAS · APP DEL CLIENTE (Doña Mary, personaje ficticio)
1. Aviso de nota: "Bodega A te registró una nota: $5,000–$20,000, vence el 11 oct.
   ¿Estás de acuerdo?" Botón principal "Acepto"; secundario "No reconozco esta nota".
2. Firmada: "Firmada por los dos." Dos trazos de firma. Seudónimo "fe1b5cfb…" y hash
   "a1e0…793d ↗" (hash real del paso 2 en testnet).
3. Cumplida: sello CUMPLIDA grande. "Cumpliste tu palabra: queda firmado a tu favor."
4. Aviso: "Bodega B pidió tu resumen sin tu permiso y no se le entregó." Sin hash
   (no hubo transacción).
5. Permiso: "¿Das permiso a Bodega B por 30 días para consultar tu resumen?" Qué
   verá (notas cumplidas, en cuántas bodegas, rango máximo) y qué no verá (montos
   exactos, productos, tus datos). Botones "Dar permiso" / "No, gracias".
6. Constancia: "Bodega B consultó tu resumen. Quedó registrado." Hash "a843…183c ↗" (real). Lista
   "Quién ha consultado mi historial".
Texto fijo al pie de la app: "En la cadena no va tu nombre, tu teléfono ni el monto
exacto. Tú decides a qué bodega le das permiso de pedir tu resumen; cada consulta
queda registrada."

PANTALLAS · APP DE LA BODEGA (Bodega B, ficticia)
7. Consulta sin permiso: "Doña Mary no te ha dado permiso. Sin permiso no se
   entrega su resumen. Pídeselo en el mostrador."
8. Consulta con permiso: semáforo "○ Historial insuficiente" con la lista de
   condiciones (✓ 3 notas cerradas · ✓ 2 bodegas · ✗ 60 días), contadores y hash ↗.
   Nota: "La decisión de fiar es tuya; el semáforo solo resume lo firmado."
9. Tarjeta aparte, borde punteado: "Ejemplo con datos ficticios, no es una
   consulta": semáforo ● Verde con 4 meses de historial en 3 bodegas.

PANTALLA WEB DE ESCRITORIO (1 lámina, 1440 × 900)
La sección "La demo real" del sitio: a la izquierda, el mapa isométrico del Pasillo
A-B (dos filas de bodegas con volumen, un corredor en medio, trazos de tinta entre
bodegas); a la derecha, la silueta de un teléfono GENÉRICO (sin marca, sin muesca de
un modelo real) con la pantalla 1 dentro; debajo, "Paso 1 de 6" y "Siguiente".
Letrero: "Prototipo de la app. Datos ficticios. En este sitio no se firma nada:
cada paso enlaza a su transacción real en Stellar testnet."

NO USAR
Campos de llave privada, frase semilla o contraseña; pantallas de inicio de sesión;
logos de bancos, de la Central, de FICEDA, de Stellar o de la UNAM; monedas, cadenas,
candados, cohetes, neón, degradados morado-cian; rostros o fotos de personas;
números de teléfono o nombres reales. Palabras prohibidas: "buró", "score",
"calificación", "pagaré", "anónimo", "nadie puede verlo", "metaverso".
La palabra "blockchain" no aparece en las pantallas del cliente ni de la bodega
(solo en la lámina web, si hace falta).
```
