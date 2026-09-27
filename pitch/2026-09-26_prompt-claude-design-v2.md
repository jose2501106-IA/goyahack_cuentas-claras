# Prompt para Claude Design — presentación de Cuentas Claras (v2: la historia de Doña Mary)

**Estado:** borrador del 26-sep-2026 (23:55), pendiente de aprobación de José. Sustituye a `2026-09-25_prompt-claude-design.md`. Sigue el pitch v3 (`2026-09-26_pitch-3-minutos-v3.md`): son 8 diapositivas en orden cronológico, sin permiso (#57) y con el contrato v5.

**Cómo usarlo:**
1. Copia completo el bloque de abajo en Claude Design.
2. Sube `demo/capturas/pasillo-a-b-plana.png` (o una captura tuya del gemelo en la app) para la diapositiva 5, y pide que se use tal cual, sin redibujarla.
3. Si ya tienes la liga del video, reemplaza [CONFIRMAR].

---

```
CONTEXTO
Haz una presentación minimalista y elegante, en español de México, para el pitch de
3 minutos de un hackathon universitario de blockchain (GOYA HACK · Hackathon UNAM 2026,
track Blockchain). Proyecto: "Cuentas Claras". Equipo: "Palabra".
Cuentas Claras es la libreta de fiado firmada por los dos para la Central de Abasto de
la Ciudad de México, en Stellar (testnet). Cada nota la firman la bodega y el cliente,
y nadie la altera ni la borra. El historial es público y verificable, sin nombre ni
monto exacto. El cliente decide a qué bodega le enseña su código. No es un buró, no
mueve dinero, no emite token.

LA PRESENTACIÓN ES UNA HISTORIA
Un día de Doña Mary, personaje ficticio, dueña de una fonda. Cada diapositiva es un
momento del día, en orden. Una idea por diapositiva.

PÚBLICO
Jueces técnicos (Stellar, Web3) y de negocio. Deben entender en 10 segundos el problema
y por qué hace falta una cadena y no una base de datos.

FORMATO
16:9. Exactamente 8 diapositivas. Mucho espacio en blanco.
Titulares de 40 pt o más, texto de 28 pt o más y pie de fuente de 12 pt, siempre visible.
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
- Kraft  #D8C3A0  bloques secundarios
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
rostros, fotos de fachadas, logos de CEDA, FICEDA o UNAM, y ningún mapa o plano salvo la imagen del gemelo digital que se adjunta y el esquema
de dos bodegas de la diapositiva 3.
Palabras prohibidas en pantalla: "buró", "score", "calificación", "pagaré", "anónimo",
"100 % seguro", "reduce la extorsión". No inventes cifras, testimonios ni logos.

DIAPOSITIVAS
1. Gancho (fondo Tinta, texto Papel).
   Grande: "Cuentas claras…"  Pequeño: "Equipo Palabra · desde la Central de Abasto".
   Un sello rojo pequeño, girado, en una esquina.
2. El mundo de hoy.
   Título: "Años de palabra cumplida… en una sola libreta."
   Ilustración de línea (2 px): una libreta de fiado abierta sobre un mostrador, sin
   rostros ni fachadas.
   Dato: "Más de 2,300 bodegas en la Central." Fuente: FICEDA (1,981 + 347).
3. El conflicto.
   Título: "La palabra no viaja."
   Esquema simple: dos bodegas, "A-17" y "B-40", a los lados de un pasillo, con una
   flecha punteada que no llega de una a la otra.
   Dato: "18.4 % de los rechazos de crédito a empresas: falta de historial."
   Fuente: ENAFIN 2024, INEGI.
4. La idea.
   Título: "La libreta de fiado, firmada por los dos."
   Tres reglas, una por renglón, con ícono (aparecen una por clic):
   "Ninguna bodega escribe sola una deuda." / "Nadie borra ni maquilla una nota." /
   "Tu historial es tuyo: tú decides a qué bodega le enseñas tu código."
   Abajo, en Tinta: "¿Por qué blockchain? Bodegas que compiten no confían en la base
   de datos de otra."
5. Vamos a vivir su día (demo).
   Título: "Cada firma, en su pasillo."
   La imagen adjunta del gemelo digital ocupa casi toda la diapositiva.
   Debajo, cinco sellos numerados en línea:
   "Bodega crea la nota" → "Doña Mary la acepta" → "Pago confirmado" →
   "Enseña su código" → "Otra bodega consulta".
   Pie: "Stellar testnet · datos ficticios · posiciones ilustrativas · Contract ID
   CD4DJQ…Q37WL".
6. Lo que cambiamos en el camino.
   Título: "Ni nosotros cambiamos las reglas en silencio."
   Tres renglones con ícono de sello:
   "Atacamos nuestro contrato: una bodega podía aceptar su propia nota. Cerrado."
   "Un mentor: pedir permiso sobraba, la cadena es pública. Quitado."
   "Cada cambio, un contrato nuevo, a la vista."
   Pie: "En la cadena no hay nombres, teléfonos ni montos exactos: un código y rangos."
7. Entrada al mercado.
   Línea de tiempo simple: "Piloto: 1 bodega de abarrotes" → "Dictamen legal" →
   "Segunda bodega" → "Primer banco lector" → "Mainnet, tras auditoría".
   Abajo: "Paga la bodega por su herramienta de cobranza. El cliente, nunca."
8. Cierre (fondo Tinta, texto Papel).
   Grande: "Cuentas claras, amistades largas."
   Pequeño: "Mañana, cuando Doña Mary cruce el pasillo, su palabra va con ella."
   Sello rojo "CUMPLIDA" con la fecha 27·09·2026.
   Pide: "Buscamos un piloto."
   Dos QR pequeños: sitio (https://cuentas-claras-lemon.vercel.app) y repositorio
   (https://github.com/jose2501106-IA/goyahack_cuentas-claras).
   "José Hugo · Equipo Palabra · construido con Claude y Claude Code."

NOTAS DEL ORADOR
Pon en cada diapositiva una nota de 1-2 frases que siga el guion: abrir con
"Cuentas claras…" y dejar que el público complete la frase; decir siempre "Doña Mary",
nunca "el usuario"; cerrar con "Cuentas claras, amistades largas. Somos el Equipo
Palabra."
```
