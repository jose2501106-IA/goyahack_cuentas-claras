# Plan maestro — Cuentas Claras

**Para quién es:** para José (dirección), para el jurado y los organizadores (cómo se desarrolló el proyecto y por qué), y para cualquier persona que quiera replicar el método.
**Estado:** v1, 25 de septiembre de 2026, 09:20 CDMX. Aprobado en su estructura (plan A–E) por José a las 08:35. Se actualiza durante el día; los cambios quedan en la sección final.
**Regla del documento:** cada afirmación sobre la CEDA lleva fuente o la etiqueta *experiencia del equipo*. Lo que es propuesta se marca *(propuesta)*.

---

## 1. Qué busca el organizador y cómo lo satisfacemos

GOYA HACK es el hackathon oficial de CriptoUNAM, "enfocado en construir soluciones innovadoras que combinan blockchain con impacto social y educación" ([fuente](https://github.com/MarxMad/MarxMad/pull/2)). Stellar dio el taller y es la red del track; su fondo comunitario exige que la red "meaningfully improve core features, not as a superficial integration, or for data storage", contratos abiertos y una necesidad validada por alguien con experiencia relevante ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria)). Los jueces de hackathon, en general, premian demo funcional, problema real, cumplimiento de requisitos y storytelling ([Devpost](https://info.devpost.com/blog/hackathon-judging-tips)). Análisis completo y pendientes en `research/02_que-busca-el-organizador.md`.

Lo que dejan ver los talleres y la competencia (`research/03`, `research/04`): se enseñó Stellar (contratos, wallets, testnet), Pollar (wallets), modelo de negocio, Avalanche L1, APEX y GrantFox; el co-anfitrión BAF ha premiado "integraciones reales" y "sistemas del mundo real"; los mentores puntúan modelo de negocio y pitch; los dos equipos con repo público no usan Soroban de verdad ni tienen demo publicada.

Lo que eso exige de nosotros, en siete puntos: problema mexicano real con evidencia; contrato que **hace cumplir reglas**; evidencia pública en testnet; repositorio abierto y replicable; impacto social y valor educativo explícitos; continuidad creíble; entrega completa y puntual.

## 2. Tesis del proyecto en cinco líneas

1. En la Central de Abasto el fiado se pacta de palabra y se cobra en efectivo ([Bakić Hayden, 2022](https://www.redalyc.org/journal/747/74772617003/)); hoy **no existe ningún registro ni custodio del crédito y las bodegas no se pasan referencias** (experiencia del equipo, 25-sep). Cumplir no deja huella fuera de cada relación.
2. Por eso el crédito es un privilegio de la relación larga: se fía a quien compra mucho y lleva años (experiencia del equipo); el cliente nuevo o pequeño queda entre el rechazo formal (18.4 % de rechazos por falta de historial, [ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)) y el gota a gota que opera dentro de la propia central ([ADN40, 2022](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)).
3. **Cuentas Claras** es la bitácora de fiado co-firmada: cada nota la firman bodega y cliente; nadie la altera ni la borra; el historial es del cliente y lo comparte con quien él autorice.
4. Va en Stellar porque un contrato Soroban hace cumplir lo que hoy nadie puede hacer cumplir en la CEDA: dos firmas para que exista una deuda, vencimiento mecánico, gracia antes de "incumplida", lectura solo con consentimiento firmado. Una base de datos exigiría un custodio neutral que no existe; un consorcio entre bodegas repetiría el modelo que enterró a TradeLens.
5. No es un buró, no mueve dinero, no emite token. En cadena no hay nombres, teléfonos ni montos exactos: solo seudónimos y rangos; el permiso controla la consulta oficial y deja constancia.

Detalle: `docs/problema-solucion.md`. Fundamento: `research/00_sintesis-estrategica.md`.

## 3. Cómo se desarrolló (método replicable)

| Fase | Qué se hizo | Cómo | Resultado | Cuándo |
|---|---|---|---|---|
| 0. Reglas | Fijar reglas antes de investigar: todo dato con fuente, filtro "¿por qué blockchain?", plan antes de ejecutar, testnet primero. | Instrucciones del proyecto | `CLAUDE.md`, `README.md` | 24-sep, 19:00 |
| 1. Elegir problema | Seis preguntas de operación; tres candidatos (historial compartido, consignación, pagaré transferible); filtro "¿por qué blockchain?" a cada uno. | Búsqueda web + experiencia del equipo | Crédito comercial elegido | 24-sep, 19:10–23:20 |
| 2. Investigación ronda 1 | Marco legal (LRSIC, LFPDPPP, pagaré electrónico, Ley Fintech), crédito en la CEDA, precedentes blockchain, herramientas Stellar. | Cuatro investigadores en paralelo, fuentes primarias, huecos declarados | `research/01_…`, 4 notas | 25-sep, 00:07–00:16 |
| 3. Reencuadre | De "historial consultable" a "bitácora co-firmada propiedad del cliente". | Riesgo LRSIC + criterio del SCF | `docs/decisiones.md` #3 | 25-sep, 00:20 |
| 4. Investigación ronda 2 | Economía de mercados mayoristas, mapa sistémico de la CEDA, casos blockchain, precedentes LatAm, Stellar, Rust, adopción y marketing, reputación y privacidad, hackathon, organizador. | Diez investigadores; síntesis con 143 fuentes | `research/00_…`, `research/02_…`, 10 notas | 25-sep, 01:00–09:00 |
| 5. Redefinición | Problema y solución en una página; decisiones; riesgos; hoja de hechos; preguntas para el equipo. | Síntesis + respuestas de José | `docs/` | 25-sep, 02:00–09:00 |
| 5b. Ronda 3 y campaña | Talleres y patrocinadores, competencia y ganadores, implementación con la administración y replicabilidad, barreras de adopción; campaña «Tu palabra vale»; corrección de privacidad | Cinco investigadores en paralelo y revisión cruzada | `research/03`–`06`, `docs/campana-marketing.md`, spec v2 | 25-sep, 11:00–11:50 |
| 6. Especificación | Contrato (máquina de estados, invariantes, eventos, consentimiento), backend, frontend, demo, criterios de aceptación. | Derivada de la investigación; parámetros con los plazos reales | `spec/…v1.md` | 25-sep, 03:00 / 09:00 |
| 7. Construcción | Claude Code en GitHub Codespaces, dirigido por José, con la spec como contrato. | `docs/guia-codespaces.md` | Contrato en testnet, `demo.sh`, app si alcanza | 25-sep, 13:30–18:00 |
| 8. Demostración | Camino feliz ensayado, plan B por CLI, video grabado. | `pitch/` | Video público, capturas | 25-sep, 18:00–18:45 |
| 9. Presentación y entrega | Pitch de 3 minutos, deck ≤10 diapositivas, README final, formulario. | `pitch/`, dashboard oficial | Entrega | 25-sep, 17:00–19:15 (límite: 20:00) |
| 10. Después | Piloto, dictamen legal, SCF, mainnet. | Sección 5 | — | oct-2026 → feb-2027 |

Lo que hace replicable el método: cada fase deja un archivo en el repositorio, cada decisión tiene fecha y motivo, cada dato tiene estatus (primaria / secundaria / autodeclarada / experiencia del equipo), y lo que no se encontró se dice.

## 4. Plan de hoy (25 de septiembre): entrega antes de las 20:00

> **Superado por la sección 4b** (plazo extendido al domingo 27, decisión #43). Se conserva como bitácora del viernes.

**Plazo:** José confirmó a las 12:15 que se puede entregar «al menos hasta las 8pm» de hoy (decisión #37). Se planea para tener **todo listo a las 19:00** y entregar antes de las 19:15; lo que quede después es margen. El objetivo del sábado 26 queda sin efecto.

**La mentoría puntúa:** los mentores asignan un puntaje que cuenta para elegir ganadores (correo del 22-sep). Hoy es la última jornada presencial en el CIA (hasta las 17:00); también hay mentoría por Discord, equipo por equipo. Son sesiones cortas: entre una y otra, José aprueba los pasos de Claude Code desde la laptop.

| Hora | Quién | Qué | Listo cuando |
|---|---|---|---|
| 12:15–13:15 | Claude (chat) | Renombre a Cuentas Claras, índice del repo (`llms.txt`, `docs/indice.md`), este plan, opciones de modelo de negocio; instantánea limpia lista para publicar. | Todo en la carpeta y en el proyecto de Claude |
| 12:15–13:30 | José | Traslado a la UNAM. Desde el teléfono: crear el repo público (hoy `goyahack_cuentas-claras`, decisión #39) y registrar «Equipo Palabra» en el dashboard. | Repo creado; equipo registrado |
| En cuanto exista el repo | Claude (chat) | Publicar la instantánea limpia (sin historial viejo ni `privado/`). | Repo público con los documentos |
| 13:30–14:00 | José | Abrir el Codespace y dar a Claude Code el prompt de arranque (`docs/guia-codespaces.md`, sección 3). Mientras se instala el entorno (unos 10 minutos), primera visita a mentoría. | Plan de Claude Code aprobado |
| 13:30–17:00 | José | **Mentoría** (CIA o Discord) con `pitch/2026-09-25_mentoria-5-minutos.md` y `docs/modelo-de-negocio.md`. Cada comentario, a `docs/decisiones.md` (sección «Retroalimentación de mentores»). | Comentarios registrados |
| 14:00–16:30 | José + Claude Code | **Bloque 1 (obligatorio):** contrato con pruebas → despliegue en testnet → `demo.sh` con el flujo 1–5 y la consulta sin permiso que falla. | Puntos de control 15:00, 15:45 y 16:30 |
| 16:30–18:00 | José + Claude Code | **Bloque 2 (solo si el 1 está verde a las 16:30):** frontend mínimo con el flujo 1–5. Si no, se pulen `demo.sh`, el README y las capturas. | Código congelado a las 18:00 |
| 17:00–18:30 | Claude (chat) | Deck final, README con Contract ID y enlaces, pitch ajustado a lo que funcione. José pega aquí el resumen de Claude Code. | Deck (PDF) y README |
| 18:00–18:45 | José | Video de 2–3 minutos con el flujo real (app o `demo.sh`), subido y público. Un ensayo del pitch con cronómetro. | Enlace del video |
| 18:45–19:15 | José | **Entrega** en el dashboard: repo, video, deck, descripción, track Blockchain. | Confirmación de entrega |
| 19:15–20:00 | — | Margen. Solo se corrigen errores de la entrega. | — |

**Tres niveles de demo (se entrega el más alto que esté verde):**
1. App con el flujo 1–5 en testnet.
2. `demo.sh` en testnet, con enlaces al explorador (plan B).
3. Pruebas del contrato en verde (`cargo test`) y video de las pruebas. El pitch tiene la frase para cada nivel (`pitch/2026-09-25_pitch-3-minutos.md`, cierre).

Reglas: un flujo completo vale más que dos a medias; lo que no esté verde a las 18:00 pasa a «siguientes pasos»; nunca se depura en el escenario; el plano solo en versión aprobada; nada privado en el repo público.

## 4b. Plan del fin de semana (26 y 27 de septiembre): entrega el domingo

**Plazo:** José informó el 25-sep a las 17:41 que el plazo se extendió «hasta las 12:00 de la noche del domingo» (decisión #43; hora exacta por confirmar en el dashboard). **Meta interna: entregar el domingo antes de las 20:00.** El código se congela el domingo a las 15:00.

**Dónde estamos (sábado 00:45):** contrato en testnet con 12 pruebas en verde, `get_stats` retirado y contrato redesplegado (decisión #42); `demo.sh` completo en verde (nivel 2 de demo). Falta: interfaz, evidencia de usuarios y los materiales finales.

### Sábado 26

| Hora | Quién | Qué | Listo cuando |
|---|---|---|---|
| Viernes 01:20 | José | Pegar a Claude Code el prompt de la spec del frontend (§9) en modo automático para que construya de noche (#44 y #45 aprobadas a las 00:53). | Claude Code trabajando |
| 08:00–08:30 | José | Revisar los commits de la noche. **Entrega preliminar** en el dashboard con lo que ya hay (repo, `demo.sh`, descripción) para no depender del domingo. Confirmar ahí la hora exacta del plazo. | Entrega preliminar hecha |
| 09:00–13:00 | José | **Solo si da tiempo** (José, 00:53): entrevistas a 3–5 bodegueros con `docs/guia-entrevista-bodegueros.md`. Entre una y otra, revisar los puntos de control de Claude Code desde el teléfono. | Hoja de registro con 3 a 5 entrevistas |
| 09:00–13:00 | José + Claude Code | Revisar en el navegador lo construido de noche y corregir. | Flujo completo en el navegador |
| 13:00–14:30 | José + Claude (chat) | Si hubo entrevistas, José pasa las notas; Claude las convierte en hechos H-26 en adelante (anónimos, con la etiqueta «entrevistas de José») y ajusta pitch, deck y Lean Canvas. | Hechos y pitch v2 |
| 14:30–18:00 | José + Claude Code | Revisión de la app en el navegador; correcciones; segundo emisor en la demo (`demo/sembrar.sh`). | App lista para grabar |
| 18:00–20:00 | José | Deck en Claude Design con el prompt actualizado. | Deck v1 |

### Domingo 27

| Hora | Quién | Qué | Listo cuando |
|---|---|---|---|
| 09:00–12:00 | Claude Code | **Solo si la app quedó verde el sábado:** sello de IA, buscador sobre el repo (`spec/2026-09-25_especificacion-rag.md`). Si no, se pule la app. | Buscador o app pulida |
| 12:00–15:00 | José | Video de 2–3 minutos con la app real en testnet; capturas para el README. **15:00: código congelado.** | Video público |
| 15:00–18:00 | José + Claude (chat) | Deck final (PDF), pitch ajustado a lo que funcione, tres ensayos con cronómetro. | Deck y pitch |
| 18:00–20:00 | José | **Entrega final** en el dashboard: repo, video, deck, descripción, track Blockchain. | Confirmación de entrega |
| 20:00–23:59 | — | Margen. Solo se corrigen errores de la entrega. | — |

**Gemelo digital del Pasillo A-B (decisión #47):** entra el sábado después de resolver el bloqueo #46 y antes del sello de IA.

**Lo que se recorta primero, en este orden:** sello de IA → gemelo digital (si no está listo el domingo a las 12:00, el video usa las cuatro vistas) → segundo emisor. La app de tres vistas y el video no se recortan: si la app falla, se entrega el nivel 2 (`demo.sh`).

**Cambios que conviene saber:** el semáforo real de la demo dirá «historial insuficiente» (decisión #44); el frontend no instala paquetes (decisión #45); las entrevistas son opcionales y, si no se hacen, el pitch presenta los supuestos como «por validar en el piloto», sin inventar respuestas.

## 5. Plan posterior: del testnet al piloto real, paso a paso

Cada fase tiene entregable, criterio de salida y responsable. Es hoja de ruta *(propuesta)*; se presenta como tal.

| Fase | Cuándo | Qué se hace | Criterio de salida | Responsable |
|---|---|---|---|---|
| **P0. Entrega y retroalimentación** | 25–30 sep | Entregar; recoger retroalimentación del jurado y de Stellar; publicar bitácora. | Comentarios registrados en `docs/decisiones.md` | José |
| **P1. Piloto interno en la bodega ancla** | 4 semanas (oct) | Una bodega de abarrotes con ERP y 20–30 clientes recurrentes; la nota que ya sale del ERP como origen del `doc_commit`; co-firma por enlace de WhatsApp; comisiones pagadas por la bodega; datos reales solo con consentimiento y aviso de privacidad. Métricas de uso, no de cuentas. | ≥100 notas co-firmadas; ≥70 % de notas con pago confirmado por ambas partes; ≥10 clientes con dos ciclos cerrados; minutos-hasta-firma medidos *(metas propuestas)* | José (operación), Claude Code (ajustes) |
| **P2. Dictamen legal** | oct–nov | Abogado: LRSIC (¿la bodega como Empresa Comercial puede reportar y consultar?, ¿la plataforma es proveedor tecnológico o SIC?), LFPDPPP (consentimiento, transferencia, cancelación con borrado fuera de cadena), vocabulario de títulos de crédito. | Dictamen escrito; diseño del consentimiento ajustado | José + abogado |
| **P3. Financiamiento y comunidad** | oct–nov | Postular a Stellar Community Fund (Instawards → Build Award) con `research/`, arquitectura y datos del piloto; HackMeridian "Genesis" (25–26 oct). | Postulación enviada | José + Claude (documentos) |
| **P4. Segunda bodega y primer lector** | nov–dic | Una segunda bodega de abarrotes acepta historial ajeno con autorización del cliente; primer banco o financiera con presencia en la central como lector (esquema Corabastos–Banco Agrario). | ≥1 cliente que obtiene crédito en la segunda bodega gracias a su historial | José |
| **P5. Producción 1 (mainnet)** | 3–6 meses | Passkeys y cuentas inteligentes; relayer para comisiones; árbitro de disputas; registro de emisores con múltiples firmas; rotación de identificadores; cron de TTL; RPC de mainnet de terceros; auditoría vía SCF Audit Bank. Mainnet **solo después** de auditoría. | Auditoría cerrada; contrato en mainnet | Claude Code + auditor |
| **P6. Producción 2** | 6–18 meses | Capital en riesgo del emisor; exportación SD-JWT; pruebas ZK de "≥N pagadas, 0 incumplidas"; convenio con una SIC autorizada; e.firma + NOM-151 para quien quiera título de crédito; liquidación opcional en MXNe vía tercero autorizado; extensión a frutas y legumbres (foto de nota + co-firma). | Convenio con SIC o dictamen que lo haga innecesario | Equipo ampliado |
| **P7. Institucional** | ventana feb-2027 | Propuesta a FICEDA/SEDECO de un estándar abierto de registro de crédito comercial, independiente del proveedor de servicios de la central (contratos privados vencen el 1-feb-2027, [MVS](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html)). | Reunión con datos del piloto | José |

Riesgos de la ruta y mitigaciones: `docs/riesgos.md`. Los tres mayores: adopción (por eso una sola bodega ancla y beneficio inmediato), legal (por eso dictamen antes de la segunda bodega) y seguridad de la información en la CEDA (por eso seudónimos, rangos y consentimiento).

### 5b. Ruta con la administración de la Central (contactos de José)

José tiene contactos dentro de la administración de la CEDA (experiencia del equipo). Eso acelera la ruta, pero con una regla: **la administración avala, valida emisores y abre puertas; no custodia los datos.** Si la administración custodiara el registro, el argumento "¿por qué blockchain?" se debilita (ver `docs/riesgos.md`) y, además, la evidencia pública muestra que su titularidad cambia con cada gobierno (2018, 2024) y que opera con contratos privados hasta febrero de 2027. Un registro público y co-firmado sobrevive a esos cambios; uno custodiado, no.

| Periodo | Qué se le propone a la administración | Qué pedimos | Qué NO pedimos | Entregable |
|---|---|---|---|---|
| **Semana 1–2 (oct)** | Presentación de 20 minutos: problema con evidencia, demo en testnet, resultados del hackathon. | Validación del problema desde su punto de vista; nombres de 2–3 bodegas de abarrotes "amigas" para la segunda fase; un espacio (sala del CIA de la central o similar) para sesiones de onboarding. | Datos de locatarios, acceso a sistemas de la central, custodia del registro. | Minuta con acuerdos; carta de intención (no compromete recursos). |
| **Semana 3–6 (oct–nov)** | Piloto en la bodega ancla (fase P1) con **observador de la administración** invitado a ver métricas de uso semanales (notas co-firmadas, pagos confirmados, minutos hasta firma). | Que un área de la administración (desarrollo comercial, por ejemplo) actúe como **validador de emisores**: confirma que una bodega existe y opera en la central antes de entrar a la lista de emisores. Es la única función semicentralizada del diseño y le da a la administración un rol real sin custodiar datos. | Que impongan la herramienta a nadie. | Acuerdo de validación de emisores; primeras 100 notas. |
| **Semana 7–10 (nov–dic)** | Segunda bodega (P4) elegida de las "amigas" sugeridas por la administración; sesión de onboarding conjunta bodega + clientes en el espacio prestado. | Difusión en canales de la central (boletín, redes) como "iniciativa de locatarios", no de la administración. | Exclusividad. | Primer cliente con crédito en la segunda bodega por su historial. |
| **Semana 11–16 (dic–feb)** | Con datos de piloto: propuesta de **estándar abierto** de registro de crédito comercial para la Central, independiente del proveedor de servicios (contratos vencen 1-feb-2027). Invitación a un banco con sucursal en la central como primer lector. | Mesa de trabajo con desarrollo comercial y, si aplica, SEDECO. | Financiamiento público en esta etapa. | Documento de propuesta; carta de un banco lector. |

Logística concreta (propuesta; José confirma): según la coordinadora de la Central, los abarroteros venden de 04:00 a 15:00 ([Chilango, 2-oct-2025](https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/)), así que las sesiones con el personal de la bodega se hacen **de 13:00 a 15:00 o de 15:00 a 17:00**, y **la primera firma del cliente ocurre en persona, en el mostrador, durante su compra**, nunca con un enlace en frío (hay una ola de fraudes por enlaces: `research/06_barreras-de-adopcion.md`). Los accesos vehiculares cierran de 18:00 a 22:00. Cada sesión dura 30 minutos por bodega y deja un cartel de una página («Tu palabra vale») con un QR al aviso de privacidad. El plan semana a semana (5-oct-2026 a 24-ene-2027), la **constancia de emisor** que emite la administración, el acercamiento a los representantes de Abarrotes y Víveres y a la UNCOFYL en la semana 3, y los primeros lectores propuestos (Santander y BBVA; FONDESO como conversación exploratoria) están en `research/05_implementacion-y-replicabilidad.md`. Cada sesión termina con un registro en `docs/bitacora-piloto.md` (fecha, bodega, clientes, notas creadas, problemas).

## 6. Presentación

- **Pitch de 3 minutos** (≈400 palabras): apertura con el hecho (gota a gota dentro de la Central, "sin requisitos"); problema en 20 segundos (fiado de palabra, sin registro ni referencias, reputación que no viaja); producto con tres mensajes: *ninguna bodega escribe sola una deuda*, *nadie borra ni maquilla el historial*, *el historial es del cliente y se lo lleva*; demo de un minuto; cierre que nombra la LRSIC y la extorsión antes que el jurado, dice qué funciona hoy y pide un piloto.
- **Deck ≤10 diapositivas**: gancho · para quién y cuánto cuesta el problema · solución en una frase · demo · por qué blockchain y por qué Stellar (una diapositiva, tres viñetas) · arquitectura "vive en cadena / vive fuera" · qué funciona hoy y qué sigue · equipo y experiencia en la CEDA · cierre con la petición.
- **Demo**: bodega A crea nota → cliente acepta → bodega A confirma pago → cliente autoriza a bodega B → bodega B consulta y ve el semáforo; y, si alcanza, la misma consulta sin consentimiento falla. Plan B: `demo.sh` + video.
- **Datos que se dicen en voz alta**: máximo cinco (`docs/hoja-de-hechos.md`).
- **Borradores listos para aprobación** en `pitch/`: pitch de 3 minutos (más versiones de 60 y 30 s), deck de 10 diapositivas, guion de demo con plan B, guía de mentoría y 20 preguntas del jurado.
- **Campaña y marca:** `docs/campana-marketing.md` — «Tu palabra vale», revelada por fases alineadas a P0–P7, con piezas listas (guion de mostrador, mensajes de WhatsApp, cartel, distintivo, publicaciones).

## 7. Cómo replicar este proyecto (para otro equipo)

1. Elige un problema donde tengas experiencia operativa directa; sin eso, no hay evidencia que el jurado no pueda refutar.
2. Antes de programar, responde por escrito "¿por qué blockchain y no una base de datos?" y descarta lo que no pase.
3. Investiga en rondas con fuentes primarias; separa hechos, inferencias y huecos; escribe lo que no encontraste.
4. Busca el riesgo legal principal y conviértelo en tesis de diseño (aquí: LRSIC → el historial es del cliente).
5. Escribe la especificación como contrato con quien programa (aquí, Claude Code): máquina de estados, invariantes, criterios de aceptación.
6. Construye un solo flujo completo en testnet; deja el resto en "siguientes pasos".
7. Documenta todo en el repositorio con fechas: es el entregable que sobrevive al hackathon.

## 8. Métricas de éxito

- **Hoy**: contrato desplegado en testnet con pruebas verdes; flujo 1–5 funcionando; video público; README completo; entrega puntual.
- **Piloto**: notas co-firmadas por semana; porcentaje con pago confirmado por ambas partes; clientes con dos ciclos cerrados; consultas autorizadas por una segunda bodega; disputas por nota; **nunca** "cuentas creadas".

## 9. Registro de cambios de este documento

| Fecha | Cambio |
|---|---|
| 2026-09-25 09:20 | v1 tras la aprobación del plan A–E y las respuestas de José. |
| 2026-09-25 11:50 | Nombre Palabra (proyecto y equipo); ventana de capacitación corregida con horarios reales; talleres, competencia, implementación, barreras y campaña enlazados; sin identificar a la bodega del equipo; corrección de privacidad (spec v2). |
| 2026-09-25 12:35 | Proyecto **Cuentas Claras**, equipo **Palabra** (decisión #36); entrega hoy antes de las 20:00 y plan del día rehecho con dos bloques de construcción y tres niveles de demo (#37); repo como base de conocimiento con `llms.txt` e índice (#38); opciones de modelo de negocio (`docs/modelo-de-negocio.md`). |
| 2026-09-26 00:55 | Plazo extendido al domingo 27 (decisión #43): §4 queda como bitácora y se agrega §4b con el plan del fin de semana, entrevistas, frontend y orden de recorte. |
