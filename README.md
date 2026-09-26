# Cuentas Claras

**Fiado de palabra, con cuentas claras.** Un proyecto del **Equipo Palabra**, desde la Central de Abasto. *(Nombres anteriores: «Palabra» y, como nombre de trabajo, «CREDI-CEDA», hasta el 25-sep-2026.)*

**Cuentas Claras es la bitácora de fiado co-firmada de la Central de Abasto de la Ciudad de México.** En la Central el fiado se da de palabra; Cuentas Claras hace que esa palabra quede firmada por los dos y viaje con quien la cumple. Cada nota de crédito la firman la bodega y el cliente desde su teléfono; ninguna de las dos puede alterarla ni borrarla; y el historial de cumplimiento es del cliente, que decide a quién mostrarlo. Registrado en Stellar (Soroban, testnet).

Proyecto para **GOYA HACK · Hackathon UNAM 2026** (CriptoUNAM × Facultad de Ingeniería, Semana DIE 2026), track **Blockchain**. Evento del 22 al 26 de septiembre de 2026.

> Estado (25-sep-2026, 17:40): contrato `cuentas_claras` desplegado en testnet con 11 pruebas en verde y `demo/demo.sh` corriendo el flujo completo contra la red (salida en `demo/salida-demo.txt`). Investigación cerrada en siete documentos (`research/00`–`06`), especificación v2 vigente, campaña, modelo de negocio, Lean Canvas y borradores de pitch. Para ubicar cualquier tema sin leer todo, empieza por [`llms.txt`](llms.txt) o [`docs/indice.md`](docs/indice.md). Este README se completa al entregar (enlaces al video, la app y los contratos en testnet).

## En vivo en Stellar testnet

| | |
|---|---|
| Contrato | [`CBNBVFY2BXFC7GGMCK7SWXSWHMWWNXS5U4XRNBSX6FRFIVZBZDYBCCD3`](https://stellar.expert/explorer/testnet/contract/CBNBVFY2BXFC7GGMCK7SWXSWHMWWNXS5U4XRNBSX6FRFIVZBZDYBCCD3) |
| Estado | Desplegado e inicializado el 25-sep-2026 (16:52 CDMX) · 11 pruebas en verde (`cargo test`) |
| Toolchain | Stellar CLI 28.0.0 · soroban-sdk 28.0.0 · `wasm32v1-none` (decisión #41) |
| Datos | Solo claves públicas y datos ficticios de demo en [`demo/deploy.json`](demo/deploy.json) |

## El problema, en tres líneas

En la Central de Abasto el fiado se pacta de palabra y se cobra en efectivo, así que cumplir no deja huella fuera de esa bodega. Con casi 2,000 bodegas de frutas y legumbres y 347 de abarrotes ([FICEDA](https://ficeda.com.mx/sectores-de-actividad/), página sin fecha), la reputación no viaja y el crédito se raciona a los desconocidos. El cliente sin historial queda entre el rechazo formal (18.4 % de los rechazos de crédito a empresas son por falta de historial, [ENAFIN 2024](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2025/enafin/ENAFIN_24.pdf)) y el "gota a gota" que opera dentro de la propia central ([ADN40, 2022](https://www.adn40.mx/seguridad/detectan-banda-colombiana-de-gota-a-gota-central-de-abasto-jap-especial)). En abarrotes el dato ya existe: una bodega del equipo otorga cientos de miles de pesos de crédito diario y lo administra en un ERP que nadie más puede verificar *(experiencia del equipo, sin fuente externa)*.

## Qué hace el contrato (y por qué no basta una base de datos)

1. **Ninguna bodega puede escribir sola una deuda**: la nota solo existe cuando el cliente la acepta (dos firmas, en pasos separados).
2. **Nadie, ni la plataforma, puede borrar ni maquillar el historial**: cada corrección es un evento nuevo que referencia al anterior; "incumplida" solo existe después de vencer más un periodo de gracia.
3. **El cliente se lleva su historial** a cualquier bodega o banco: un tercero solo lee el agregado si el cliente firmó un consentimiento con vigencia, y cada lectura deja rastro.
4. **Un tercero verifica sin confiar en el operador.**

En la cadena solo hay identificadores seudónimos, rangos de monto, fechas y estados. **En la cadena no hay nombres, teléfonos ni montos exactos: solo un seudónimo y rangos. El permiso del cliente controla la consulta oficial de su historial y deja constancia; no vuelve secreto lo que ya es público en la cadena.** No es una sociedad de información crediticia, no mueve dinero, no emite token, no califica personas.

## Cómo navegar este repositorio

| Carpeta | Qué hay |
|---|---|
| [`llms.txt`](llms.txt) · [`docs/indice.md`](docs/indice.md) | **Mapa del repositorio**: qué contiene cada archivo, etiquetas y cuándo leerlo (sirve a personas y a modelos de lenguaje) |
| [`docs/plan-maestro.md`](docs/plan-maestro.md) | **Empieza aquí.** Qué busca el organizador, tesis, cómo se desarrolló el proyecto (método replicable), plan del día, plan posterior paso a paso, presentación, métricas |
| [`docs/problema-solucion.md`](docs/problema-solucion.md) | El proyecto en una página: problema, solución, por qué blockchain, por qué Stellar, qué se construye hoy, estrategia de implementación |
| [`docs/campana-marketing.md`](docs/campana-marketing.md) | Campaña «Tu palabra vale» (borrador v1): plataforma de marca, audiencias, barreras de entrada y cómo se vencen, fases alineadas al plan, ecosistema y comunidad, principios de comportamiento con fuente, piezas listas, embudo y métricas |
| [`docs/lean-canvas.md`](docs/lean-canvas.md) | Lean Canvas: el modelo en nueve bloques y los supuestos que mide el piloto (borrador) |
| [`docs/modelo-de-negocio.md`](docs/modelo-de-negocio.md) | Quién paga y por qué: opciones, riesgos legales y recomendación (borrador para decidir) |
| [`docs/nombre-y-marca.md`](docs/nombre-y-marca.md) | Por qué **Cuentas Claras** (proyecto) y **Palabra** (equipo), con evidencia y riesgos; sistema de nombres del producto |
| [`docs/guia-codespaces.md`](docs/guia-codespaces.md) | Cómo se dirige la construcción con Claude Code en GitHub Codespaces (prompts, checkpoints, reglas) |
| [`docs/decisiones.md`](docs/decisiones.md) | Bitácora de decisiones con su estado (`aprobada` / `propuesta`) y lo descartado |
| [`docs/hoja-de-hechos.md`](docs/hoja-de-hechos.md) | Los datos que se pueden decir, con fuente y estatus; vocabulario vetado |
| [`docs/riesgos.md`](docs/riesgos.md) | Registro de riesgos legales, técnicos y de adopción, con mitigaciones y respuestas para el Q&A |
| [`docs/preguntas-pendientes.md`](docs/preguntas-pendientes.md) | Lo que solo la experiencia operativa puede confirmar, ordenado por lo que decide |
| [`docs/plan-de-tiempo.md`](docs/plan-de-tiempo.md) | Plan del día original (superado por el plan maestro, sección 4) |
| [`spec/`](spec/) | Especificación técnica para construir el MVP (contrato, backend, frontend, demo, criterios de aceptación) |
| [`research/`](research/) | Investigación con fuentes: síntesis estratégica (143 fuentes), marco legal, qué busca el organizador, talleres y evaluadores, competencia y ganadores, implementación con la administración y replicabilidad, barreras de adopción, más 19 notas de investigación. Empieza por [`research/README.md`](research/README.md) |
| [`pitch/`](pitch/) | Borradores v1: pitch de 3 minutos (y versiones de 60 y 30 s), deck de 10 diapositivas, guion de demo con plan B, guía de mentoría y 20 preguntas del jurado |
| [`demo/`](demo/) | `demo.sh` (plan B por CLI), `deploy.json`, capturas del explorador (en construcción) |
| [`plano/`](plano/) | Plano de la CEDA como capa visual, solo en versión aprobada |
| [`CLAUDE.md`](CLAUDE.md) | Contexto y reglas para Claude Code |
| [`.devcontainer/`](.devcontainer/) | Entorno de GitHub Codespaces: Rust + `wasm32v1-none`, Stellar CLI, Node 20, Claude Code |

Convención de nombres: documentos vivos con nombre estable (`decisiones.md`); entregables puntuales con fecha (`2026-09-25_especificacion-tecnica-v0.md`).

## Regla de honestidad

Todo dato sobre la CEDA lleva fuente, o se marca como *experiencia del equipo* o *plano*. Sin fuente, se dice. Nunca se estima ni se inventa. Las cifras autodeclaradas por empresas se marcan como tales. Lo que la investigación no encontró está listado en [`research/README.md`](research/README.md).

## Alcance y limitaciones (MVP)

- Testnet únicamente; cuentas de demo custodiadas; datos ficticios.
- Sin passkeys, sin relayer, sin pruebas ZK, sin dinero en cadena, sin token. Todo eso es hoja de ruta (ver `research/00_sintesis-estrategica.md`, sección "Hoja de ruta").
- La mecánica del fiado bodega → cliente en la CEDA no tiene fuente pública; descansa en la experiencia operativa del equipo y la validará un piloto.

## Equipo Palabra

- José Hugo — experiencia operativa en la Central de Abasto (bodega de abarrotes), decisiones y datos de campo.
- Claude (chat) — investigación, documentos, especificaciones, pitch.
- Claude Code — contrato, backend, frontend, demo.

## Cómo correrlo

En GitHub Codespaces el devcontainer ya trae Rust con el target `wasm32v1-none` y la Stellar CLI 28.

```bash
# 1) Clonar
git clone https://github.com/jose2501106-IA/goyahack_cuentas-claras.git
cd goyahack_cuentas-claras

# 2) Variables locales (el .env no se versiona; solo demo/testnet)
cp .env.example .env
openssl rand -hex 32          # copia el resultado en DEMO_HMAC_KEY dentro de .env

# 3) Pruebas del contrato (11 invariantes de la spec §6)
cd contracts/cuentas_claras && cargo test && cd ../..

# 4) Demo por CLI contra el contrato ya desplegado en testnet (lee demo/deploy.json)
./demo/demo.sh                 # corrido
./demo/demo.sh --paso-a-paso   # títulos grandes y pausa con Enter, para el video
```

`cargo test` corre en cualquier máquina. `demo/demo.sh` firma con las identidades de
testnet `plataforma`, `bodega_a`, `bodega_b` y `dona_mary`: sus **claves públicas** están
en [`demo/deploy.json`](demo/deploy.json), pero las secretas viven fuera del repo (en
`~/.config/stellar/identity`). Para recrearlas y desplegar un contrato propio desde cero,
sigue «Comandos de referencia» en [`CLAUDE.md`](CLAUDE.md).

## Criterios de aceptación (spec v2 §11)

Cumplido hoy:

- ✅ `cargo test` en verde con las pruebas de la sección 6 (11 invariantes).
- ✅ Contrato desplegado **e inicializado** en testnet; [`demo/deploy.json`](demo/deploy.json) con Contract ID, cuentas públicas y hashes de transacción.
- ✅ `demo/demo.sh` corre el flujo completo (camino feliz + paso negativo sin permiso) contra testnet, con enlaces al explorador en cada paso.
- ✅ Ningún dato personal real, ninguna llave real, ningún dato de la CEDA sin fuente; datos de demo ficticios.

Siguiente paso (no bloquea la entrega de hoy):

- ⏳ Backend mínimo: HMAC del teléfono → `subject_id`, datos fuera de cadena y semáforo (spec §8).
- ⏳ Frontend con el flujo 1–5 y enlaces al explorador (spec §9).
- ⏳ Video de la demo.

## Licencia

Código bajo licencia MIT (ver `LICENSE`). Los documentos de `research/` y `docs/` citan sus fuentes; las cifras pertenecen a sus autores.
