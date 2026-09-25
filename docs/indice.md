# Índice del repositorio

Mapa para personas y para modelos de lenguaje. Cada archivo trae qué contiene, sus etiquetas, su tamaño en palabras y cuándo conviene leerlo. **Lee solo lo que necesitas**: busca aquí el tema, abre el archivo y ve directo a la sección.

Actualizado: 25-sep-2026, 12:35. Proyecto **Cuentas Claras**; equipo **Palabra**. Si agregas un archivo, agrégalo aquí y en `llms.txt` en el mismo commit (decisión #38).

**Estados:** *vigente* (manda), *borrador* (pendiente de aprobación de José), *bitácora* (registro de cómo se llegó aquí; puede usar nombres anteriores), *superada* (no usar), *materia prima* (notas de investigación).

**Etiquetas:** `#problema` `#solucion` `#contrato` `#privacidad` `#legal` `#datos-ceda` `#adopcion` `#campana` `#marca` `#negocio` `#pitch` `#demo` `#organizador` `#talleres` `#competencia` `#implementacion` `#precedentes` `#stellar` `#rust` `#riesgos` `#decisiones` `#entorno` `#plan` `#mapa` `#investigacion`

## Preguntas frecuentes: dónde está la respuesta

| Pregunta | Dónde |
|---|---|
| ¿Qué es Cuentas Claras, en una página? | `docs/problema-solucion.md` |
| ¿Por qué blockchain y no una base de datos? | `docs/problema-solucion.md`; `README.md`, «Qué hace el contrato» |
| ¿Qué construye Claude Code y con qué reglas? | `spec/2026-09-25_especificacion-tecnica-v2.md`; `CLAUDE.md` |
| ¿Qué garantiza la privacidad y qué no? | spec v2, sección 3b; decisión #29 |
| ¿Qué cifras se pueden decir y con qué fuente? | `docs/hoja-de-hechos.md` (H-01 a H-25) |
| ¿Quién paga? | `docs/modelo-de-negocio.md`; `docs/lean-canvas.md` |
| ¿Es legal? (LRSIC, LFPDPPP, pagaré) | `docs/riesgos.md`; `research/01_historial-crediticio-ceda.md`; `research/notas/ronda-1/marco_legal.md` |
| ¿Qué buscan el organizador y el jurado? | `research/02_que-busca-el-organizador.md`; `research/03_talleres-y-evaluadores.md` |
| ¿Quién más compite? | `research/04_competencia-y-ganadores.md` |
| ¿Cómo se lleva a la Central con la administración? | `docs/plan-maestro.md`, sección 5b; `research/05_implementacion-y-replicabilidad.md` |
| ¿Qué frena la adopción y cómo se vence? | `research/06_barreras-de-adopcion.md`; `docs/campana-marketing.md`, sección 4 |
| ¿Por qué se llama así? | `docs/nombre-y-marca.md`, sección 0 |
| ¿Qué se decidió y cuándo? | `docs/decisiones.md` |
| ¿Qué falta por confirmar? | `docs/preguntas-pendientes.md` |
| ¿Qué se dice en tres minutos? | `pitch/2026-09-25_pitch-3-minutos.md` |
| ¿Cuál es el plan de hoy? | `docs/plan-maestro.md`, sección 4; `docs/guia-codespaces.md`, sección 3 |

## Archivos

### Raíz

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`README.md`](../README.md) | Presentación pública: qué es, el problema con fuentes, qué hace el contrato y por qué no basta una base de datos, navegación, alcance y equipo. | #solucion #problema | 1,164 | Primera lectura de un evaluador | vigente |
| [`llms.txt`](../llms.txt) | Mapa corto del repositorio para modelos de lenguaje (convención llms.txt). | #mapa | 477 | Primera lectura de un modelo | vigente |
| [`CLAUDE.md`](../CLAUDE.md) | Contexto y reglas para Claude Code: qué es el producto, orden de lectura, cómo leer el repo sin gastar de más, reglas duras, comandos y estructura. | #contrato #entorno | 969 | Antes de programar | vigente |
| [`LICENSE`](../LICENSE) | Licencia MIT del código. | #legal | 169 | Al reutilizar el código | vigente |
| [`.devcontainer/devcontainer.json`](../.devcontainer/devcontainer.json) | Entorno de GitHub Codespaces: imagen de Rust, Node 20, GitHub CLI, puertos y extensiones. | #entorno | 82 | Al abrir el Codespace | vigente |
| [`.devcontainer/setup.sh`](../.devcontainer/setup.sh) | Instala el target wasm32v1-none, la CLI de Stellar por binario, la red testnet y Claude Code. | #entorno | 259 | Si el Codespace no quedó listo | vigente |

### docs/ — documentos vivos

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`docs/problema-solucion.md`](problema-solucion.md) | El proyecto en una página: problema, solución, por qué blockchain, por qué Stellar, qué se construye hoy, implementación. | #problema #solucion | 1,136 | Antes de explicar el proyecto | vigente |
| [`docs/plan-maestro.md`](plan-maestro.md) | Qué busca el organizador, tesis, método en fases, plan de hoy (entrega antes de las 20:00), plan posterior P0–P7, ruta con la administración (5b), presentación y métricas. | #plan #implementacion #organizador | 3,222 | Para ubicar el proyecto completo | vigente |
| [`docs/lean-canvas.md`](lean-canvas.md) | Lean Canvas en 9 bloques con IDs de hechos, supuestos más riesgosos y versión de una diapositiva. | #negocio #pitch | 758 | Mentoría y deck | borrador |
| [`docs/modelo-de-negocio.md`](modelo-de-negocio.md) | Quién paga y por qué: principios con fuente, opciones A–E, cautela por la LRSIC, qué mide el piloto, preguntas para mentores. Recomendación A + D (propuesta). | #negocio #legal | 681 | Mentoría y pregunta «¿quién paga?» | borrador |
| [`docs/nombre-y-marca.md`](nombre-y-marca.md) | Por qué el proyecto se llama Cuentas Claras y el equipo Palabra: evidencia, riesgos verificados, cómo se usa cada nombre; candidatos anteriores y sistema de nombres del producto. | #marca | 2,145 | Al escribir cualquier pieza pública | vigente |
| [`docs/campana-marketing.md`](campana-marketing.md) | Campaña «Tu palabra vale»: audiencias, 12 barreras con táctica y métrica, paradoja de la portabilidad, fases 0–3, ecosistema (Círculo, Guardianes), principios de comportamiento con fuente, piezas listas, métricas y 12 decisiones pendientes. | #campana #adopcion #marca | 16,684 | Al diseñar el piloto o una pieza | borrador v1 |
| [`docs/decisiones.md`](decisiones.md) | Bitácora de decisiones #1–#38 con fecha, motivo y estado; retroalimentación de mentores; lo descartado. | #decisiones | 2,301 | Antes de cambiar cualquier cosa | vigente |
| [`docs/hoja-de-hechos.md`](hoja-de-hechos.md) | 25 hechos citables con ID (H-01…H-25), fuente y estatus; forma pública de la cifra de la bodega; vocabulario vetado; cómo se dice. | #datos-ceda #pitch | 1,235 | Antes de afirmar una cifra | vigente |
| [`docs/riesgos.md`](riesgos.md) | Riesgos legales, técnicos, de adopción y de marca, con mitigación y la respuesta para el Q&A; qué validar con un abogado. | #riesgos #legal | 1,568 | Antes de las preguntas del jurado | vigente |
| [`docs/preguntas-pendientes.md`](preguntas-pendientes.md) | Lo que falta confirmar con José y las respuestas registradas con fecha. | #datos-ceda #decisiones | 1,632 | Al planear con José | vigente |
| [`docs/guia-codespaces.md`](guia-codespaces.md) | Cómo dirigir a Claude Code en Codespaces: prompt de arranque, puntos de control de hoy con recorte de alcance, reglas y qué hacer si algo se rompe. | #entorno #plan | 900 | Al construir | vigente |
| [`docs/indice.md`](indice.md) | Este mapa: qué contiene cada archivo, etiquetas, tamaño y cuándo leerlo. | #mapa | 2,238 | Para ubicar un tema | vigente |
| [`docs/plan-de-tiempo.md`](plan-de-tiempo.md) | Plan del día original, superado por el plan maestro (sección 4). | #plan | 468 | Solo como bitácora | bitácora |

### spec/ — especificaciones para Claude Code

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`spec/README.md`](../spec/README.md) | Qué especificación está vigente y la convención de versiones. | #contrato | 167 | Antes de abrir una spec | vigente |
| [`spec/2026-09-25_especificacion-tecnica-v2.md`](../spec/2026-09-25_especificacion-tecnica-v2.md) | Especificación vigente: versiones fijas, estructura, modelo en cadena, parámetros, interfaz del contrato, 11 invariantes y pruebas, eventos (`cclaras`), backend, frontend, guion de demo con plan B, criterios de aceptación y datos ficticios. Sección 3b: qué garantiza la privacidad y qué no. | #contrato #privacidad #demo #stellar | 3,720 | Antes de programar | vigente |
| [`spec/2026-09-25_especificacion-rag.md`](../spec/2026-09-25_especificacion-rag.md) | Búsqueda en el conocimiento del repo (RAG): trocear los `.md`, BM25 sin dependencias, modo vectorial opcional y criterios de aceptación. | #mapa #entorno | 382 | Después de la demo | para después |
| [`spec/2026-09-25_especificacion-tecnica-v1.md`](../spec/2026-09-25_especificacion-tecnica-v1.md) | Versión anterior; tiene un error de privacidad corregido en la v2. | #contrato | 2,718 | Solo como bitácora | superada |
| [`spec/2026-09-25_especificacion-tecnica-v0.md`](../spec/2026-09-25_especificacion-tecnica-v0.md) | Borrador original de la especificación. | #contrato | 2,222 | Solo como bitácora | superada |

### pitch/ — presentación (borradores)

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`pitch/README.md`](../pitch/README.md) | Índice de los borradores de presentación y lo que falta confirmar. | #pitch | 213 | Antes de ensayar | borrador |
| [`pitch/2026-09-25_pitch-3-minutos.md`](../pitch/2026-09-25_pitch-3-minutos.md) | Guion palabra por palabra con tiempos, cinco datos que se dicen, versiones de 60 y 30 segundos, variante con el refrán, notas de entrega. | #pitch | 2,624 | Ensayo y video | borrador |
| [`pitch/2026-09-25_deck.md`](../pitch/2026-09-25_deck.md) | Diez diapositivas: texto en pantalla, visual sugerido, notas del orador y fuente de cada dato. | #pitch | 3,371 | Al armar el deck | borrador |
| [`pitch/2026-09-25_guion-demo.md`](../pitch/2026-09-25_guion-demo.md) | Pasos de la demo con lo que se dice, plan B (`demo.sh` y video), versión de stand y lista de verificación. | #demo #pitch | 3,044 | Ensayo de la demo | borrador |
| [`pitch/2026-09-25_mentoria-5-minutos.md`](../pitch/2026-09-25_mentoria-5-minutos.md) | Guía de cinco minutos para la mentoría, preguntas para el mentor y plantilla de notas. | #pitch #organizador | 1,591 | Antes de la mentoría | borrador |
| [`pitch/2026-09-25_preguntas-jurado.md`](../pitch/2026-09-25_preguntas-jurado.md) | Banco de preguntas del jurado con respuesta y fuente (legal, privacidad, Stellar, adopción, negocio). | #pitch #riesgos | 2,249 | Antes del Q&A | borrador |

### research/ — investigación con fuentes

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`research/README.md`](../research/README.md) | Índice de la investigación, correcciones posteriores, lo que no se encontró y cómo citar. | #investigacion | 1,338 | Antes de citar investigación | vigente |
| [`research/00_sintesis-estrategica.md`](../research/00_sintesis-estrategica.md) | Síntesis de las rondas 1 y 2: diagnóstico sistémico, precedentes, Stellar, Rust, diseño del producto, implementación, riesgos, pitch y hoja de ruta; 143 fuentes. | #problema #solucion #stellar #adopcion | 13,858 | Para el fundamento de una decisión (es largo) | bitácora |
| [`research/01_historial-crediticio-ceda.md`](../research/01_historial-crediticio-ceda.md) | Ronda 1: marco legal (LRSIC, LFPDPPP, pagaré electrónico, Ley Fintech), crédito en la CEDA, precedentes y herramientas de Stellar. | #legal #datos-ceda | 3,224 | Dudas legales | bitácora |
| [`research/02_que-busca-el-organizador.md`](../research/02_que-busca-el-organizador.md) | Qué ganan CriptoUNAM, Stellar y Avalanche; correos del organizador (resumen); criterios del SCF; checklist de entrega. | #organizador | 1,895 | Antes de entregar | bitácora |
| [`research/03_talleres-y-evaluadores.md`](../research/03_talleres-y-evaluadores.md) | Cada taller «como si hubiéramos asistido»; Pollar, Tangem, GrantFox, APEX, BAF y Avalanche; checklist para la evaluación en vivo. | #talleres #organizador | 5,457 | Antes de la mentoría y de la entrega | bitácora |
| [`research/04_competencia-y-ganadores.md`](../research/04_competencia-y-ganadores.md) | Repos de otros equipos, ganadores de Stellar en México y LatAm, proyectos parecidos y posicionamiento. | #competencia | 3,545 | Antes del pitch | bitácora |
| [`research/05_implementacion-y-replicabilidad.md`](../research/05_implementacion-y-replicabilidad.md) | Operación real de la Central, administración y actores, bancos, plan de 16 semanas y replicabilidad en otras centrales. | #implementacion #datos-ceda | 7,169 | Propuesta a la administración | bitácora |
| [`research/06_barreras-de-adopcion.md`](../research/06_barreras-de-adopcion.md) | Barreras del micro comercio con evidencia (fisco, fraude por enlaces, estigma cripto, extorsión, brecha digital) y qué ha funcionado. | #adopcion #campana | 5,667 | Diseño del piloto y de la campaña | bitácora |

### demo/ y plano/

| Archivo | Qué contiene | Etiquetas | Palabras | Cuándo leerlo | Estado |
|---|---|---|---|---|---|
| [`demo/README.md`](../demo/README.md) | Qué contendrá `demo/`: `demo.sh`, `deploy.json` y capturas del explorador. | #demo | 84 | Al preparar la demo | en construcción |
| [`plano/README.md`](../plano/README.md) | Regla del plano de la CEDA: solo como capa visual y solo en la versión que José apruebe. | #datos-ceda | 96 | Antes de mostrar el plano | vigente |

### research/notas/ — materia prima (no leer salvo que la tarea lo pida)

Cada nota sigue el formato *takeaway → hallazgos citados → inferencias → huecos*. Usan los nombres anteriores del proyecto.

| Nota | Qué contiene | Etiquetas | Palabras |
|---|---|---|---|
| [`research/notas/ronda-1/marco_legal.md`](../research/notas/ronda-1/marco_legal.md) | LRSIC, LFPDPPP 2025, pagaré digital (tesis 2031391), Código de Comercio, Ley Fintech y Banxico. | #legal | 3,124 |
| [`research/notas/ronda-1/credito_en_la_ceda.md`](../research/notas/ronda-1/credito_en_la_ceda.md) | Lo poco publicado sobre crédito en la CEDA; cifras de FICEDA; gota a gota; plataforma MEGA. | #datos-ceda | 2,791 |
| [`research/notas/ronda-1/precedentes.md`](../research/notas/ronda-1/precedentes.md) | Kiva Protocol, Bloom, BanQu, Tienda Pago, TReDS y otros precedentes de historial para micro comercio. | #precedentes | 1,795 |
| [`research/notas/ronda-1/stellar_tecnico.md`](../research/notas/ronda-1/stellar_tecnico.md) | Protocolo 27, versiones de SDK y CLI, storage y TTL, passkeys, OpenZeppelin Channels, riesgos de construcción. | #stellar #contrato | 3,441 |
| [`research/notas/ronda-2/economia_mercados_informales.md`](../research/notas/ronda-2/economia_mercados_informales.md) | Precios, confianza y crédito en mercados mayoristas (Geertz, Fafchamps, McMillan y Woodruff, Ostrom); informalidad en México; comparativo de centrales. | #problema #datos-ceda | 6,959 |
| [`research/notas/ronda-2/mapa_sistemico_ceda.md`](../research/notas/ronda-2/mapa_sistemico_ceda.md) | Actores, incentivos, flujos y gobernanza de la CEDA; problemas documentados; digitalización. | #datos-ceda #implementacion | 6,244 |
| [`research/notas/ronda-2/casos_blockchain.md`](../research/notas/ronda-2/casos_blockchain.md) | Fracasos de consorcios y éxitos con métricas; agro y comercio informal; lecciones. | #precedentes | 5,560 |
| [`research/notas/ronda-2/aplicaciones_latam_agro_comercio.md`](../research/notas/ronda-2/aplicaciones_latam_agro_comercio.md) | Agrotoken, Drex, CPR tokenizada, LACChain, Twiga, Account Aggregator, postura de Banxico. | #precedentes | 4,767 |
| [`research/notas/ronda-2/stellar_historia_casos.md`](../research/notas/ronda-2/stellar_historia_casos.md) | Historia de Stellar, métricas, casos con números, programas (SCF, Meridian), huella en México. | #stellar | 5,852 |
| [`research/notas/ronda-2/rust.md`](../research/notas/ronda-2/rust.md) | Historia, filosofía, fortalezas y debilidades de Rust; Rust y Wasm en Soroban; errores típicos. | #rust #contrato | 6,222 |
| [`research/notas/ronda-2/adopcion_y_marketing.md`](../research/notas/ronda-2/adopcion_y_marketing.md) | Teoría de adopción, casos (Pix, UPI, M-Pesa, CoDi), comerciante mexicano, marketing Web3, GTM de fintech B2B con tienditas. | #adopcion #negocio | 5,878 |
| [`research/notas/ronda-2/diseno_reputacion.md`](../research/notas/ronda-2/diseno_reputacion.md) | Sistemas de reputación, atestaciones, scoring descentralizado, privacidad (HMAC, ZK), resistencia Sybil. | #privacidad #contrato | 6,329 |
| [`research/notas/ronda-2/hackathon_que_gana.md`](../research/notas/ronda-2/hackathon_que_gana.md) | CriptoUNAM y GOYA HACK; hackathons de Stellar; rúbricas; pitch, demo, video y README. | #organizador #pitch | 5,163 |
| [`research/notas/ronda-2/por_que_hackathons_organizador.md`](../research/notas/ronda-2/por_que_hackathons_organizador.md) | Por qué organizan y patrocinan hackathons; qué miden y qué premian. | #organizador | 5,295 |
| [`research/notas/ronda-3/talleres_patrocinadores.md`](../research/notas/ronda-3/talleres_patrocinadores.md) | Talleres, patrocinadores y herramientas (versión pública). | #talleres | 6,173 |
| [`research/notas/ronda-3/competencia_ganadores.md`](../research/notas/ronda-3/competencia_ganadores.md) | Competencia en GOYA HACK y ganadores de Stellar en México y LatAm. | #competencia | 3,511 |
| [`research/notas/ronda-3/implementacion_replicabilidad.md`](../research/notas/ronda-3/implementacion_replicabilidad.md) | Logística de la Central, administración, bancos y otras centrales. | #implementacion | 5,186 |
| [`research/notas/ronda-3/barreras_adopcion.md`](../research/notas/ronda-3/barreras_adopcion.md) | Barreras de adopción con evidencia. | #adopcion | 5,600 |
| [`research/notas/ronda-3/campana_fuentes_comportamiento.md`](../research/notas/ronda-3/campana_fuentes_comportamiento.md) | Verificación de las fuentes de comportamiento de la campaña. | #campana | 1,990 |

## Qué no está en el repositorio

Los correos del organizador (con enlaces a grupos), el nombre y la cifra exacta de la bodega del equipo y cualquier dato personal viven fuera del repo (carpeta local `privado/`, excluida en `.gitignore`). El plano de la CEDA solo entra en la versión que José apruebe.
