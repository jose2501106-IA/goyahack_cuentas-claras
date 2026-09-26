# CLAUDE.md — contexto para Claude Code

Este repositorio es **Cuentas Claras** (proyecto; equipo **Palabra**; nombres anteriores: Palabra y CREDI-CEDA). Nombre técnico: contrato, crate y carpeta `cuentas_claras`; repositorio `goyahack_cuentas-claras`. Proyecto para GOYA HACK · Hackathon UNAM 2026 (CriptoUNAM × Facultad de Ingeniería). **Entrega: domingo 27 de septiembre** (plazo extendido; decisión #43). Meta interna: entregar el domingo antes de las 20:00; **código congelado el domingo a las 15:00**. Plan del fin de semana y orden de recorte: `docs/plan-maestro.md`, sección 4b. Track: **Blockchain** (el principal según el organizador). Red: **Stellar testnet** (Soroban).

## Qué es el producto (una frase)

La bitácora de fiado co-firmada de la Central de Abasto de la CDMX: cada nota de crédito la firman la bodega y el cliente, ninguna puede alterarla ni borrarla, y el historial de cumplimiento es del cliente, que decide a quién mostrarlo. **No es un buró, no mueve dinero, no emite token.**

## Cómo leer este repo sin gastar de más

1. Ubícate con `llms.txt` (mapa corto) o `docs/indice.md` (qué contiene cada archivo, etiquetas y cuándo leerlo).
2. Busca antes de leer: `grep -rn "H-07" docs/` encuentra un hecho por su ID; `grep -rn "| 36 |" docs/decisiones.md`, una decisión; `grep -rln "privacidad" docs spec` encuentra el tema.
3. Lee solo la sección que necesitas (por ejemplo, `sed -n '/^## 7\./,/^## 8\./p' spec/2026-09-25_especificacion-tecnica-v2.md`), no el documento completo.
4. `research/notas/` es materia prima: no la leas salvo que la tarea lo pida.
5. Si agregas un hecho, una decisión o un documento, actualiza en el mismo commit `docs/hoja-de-hechos.md`, `docs/decisiones.md` o `docs/indice.md` y `llms.txt`.

## Lee en este orden

1. `spec/2026-09-25_especificacion-tecnica-v2.md` — qué construir, interfaz del contrato, invariantes, criterios de aceptación, datos de la demo. **Lee la sección 3b (qué garantiza el diseño y qué no).** (v0 y v1 son historia; no las uses.)
2. `docs/decisiones.md` — decisiones tomadas y su estado (`aprobada` / `propuesta`).
3. `docs/problema-solucion.md` — el porqué, en una página.
4. `research/00_sintesis-estrategica.md` — solo si necesitas el fundamento de una decisión (es largo).

## Reglas duras

- **Solo testnet.** Mainnet únicamente después de entregar y con aprobación explícita de José.
- **Nada personal ni dinero en cadena.** En el contrato solo hay identificadores seudónimos (HMAC), rangos de monto, fechas, estados, contadores, emisores y consentimientos. Nombres, teléfonos, RFC, montos exactos y documentos viven fuera de cadena.
- **Ninguna llave real ni secreto en el repo.** Solo cuentas de testnet fondeadas por Friendbot. Variables de entorno en `.env` (ignorado por git); `.env.example` sí se versiona.
- **Cero crates fuera de `soroban-sdk`.** `Cargo.lock` va en el repo. Verifica cada nombre de crate contra crates.io (ataques de typosquatting en 2025–2026).
- **Versiones fijas** (decisión #41; ver spec, sección 1): soroban-sdk `=28.0.0` (fijada en `contracts/cuentas_claras/Cargo.toml`), Stellar CLI 28.0.0 por binario (la instalada), target `wasm32v1-none`, JS SDK 16.2.0. Si `stellar contract init` genera otra versión, fíjala y anótalo en `docs/decisiones.md`. **No mezclar 27.x con 28.x.**
- **`cargo test` verde antes de `stellar contract build`.** Despliega temprano y guarda el Contract ID en `demo/deploy.json`.
- **Un flujo completo vale más que dos a medias.** Passkeys, relayer, ZK, MXNe, token, integración con ERP o MEGA: fuera del alcance de hoy.
- **Marca:** proyecto **Cuentas Claras**, equipo **Palabra**; contrato, crate y carpeta `cuentas_claras`; tópico de eventos `cclaras` (`symbol_short!` admite máximo 9 caracteres; ver spec v2, sección 7). Microcopy de la interfaz: `docs/campana-marketing.md`, sección 8.
- **Privacidad honesta (spec v2, 3b):** la cadena es pública; el permiso controla la consulta oficial (`read_stats`) y deja constancia, no hace secreto el estado. Nunca escribas en la interfaz "solo lo ve quien tú autorices", "anónimo" ni "nadie puede ver nada".
- **Sin función de actualización del contrato** (nada de `upgrade` ni `update_current_contract_wasm`).
- **Nada que identifique a la bodega del equipo** (nombre ni cifras) en código, datos de demo, commits o capturas. Datos de demo: Bodega A, Bodega B, Doña Mary (ficticios).
- **Vocabulario en la interfaz:** español de México; "nota firmada", "historial", "semáforo", "historial insuficiente". Nunca "pagaré ejecutable", "buró", "score", "calificación". La palabra "blockchain" no aparece en las vistas del bodeguero ni del cliente.
- **Datos de la CEDA:** todo dato lleva fuente o la etiqueta "experiencia de José". Nunca se estima ni se inventa. Los datos de la demo son ficticios.
- **Plano de la CEDA:** solo la versión que José apruebe (carpeta `plano/`); ante duda, versión simplificada o nada.
- **No edites `research/`**: es bitácora. Si encuentras un error, anótalo en `docs/decisiones.md`.
- Commits frecuentes y descriptivos, en español. Cada commit que cambie una decisión la registra en `docs/decisiones.md`.

## Comandos de referencia (testnet)

```bash
# CLI por binario (no cargo install)
curl -fsSL https://github.com/stellar/stellar-cli/raw/main/install.sh | sh   # fuente: developers.stellar.org/docs/build/smart-contracts/getting-started/setup (verificar versión instalada: stellar --version)
rustup target add wasm32v1-none
stellar network add --global testnet --rpc-url https://soroban-testnet.stellar.org:443 --network-passphrase "Test SDF Network ; September 2015"
stellar keys generate --global plataforma --network testnet --fund
stellar contract init contracts/cuentas_claras
cd contracts/cuentas_claras && cargo test && stellar contract build
stellar contract deploy --wasm target/wasm32v1-none/release/cuentas_claras.wasm --source plataforma --network testnet
# (bindings TS: no se usan en el MVP; decisión #45)
```

Friendbot tiene límite de tasa: fondea todas las cuentas de demo al inicio y guarda sus claves públicas en `demo/deploy.json`. Próximo reset de testnet: 16-dic-2026.

## Estructura

```
contracts/cuentas_claras/   contrato Soroban
backend/                servidor Node sin dependencias sobre el Stellar CLI (subject_id por HMAC, datos fuera de cadena en JSON local, semáforo); decisión #45
frontend/               HTML, CSS y JS sin framework ni paquetes; cuatro vistas (spec 2026-09-26)
demo/                   demo.sh (plan B), deploy.json, capturas
docs/                   problema-solución, decisiones, riesgos, hoja de hechos, preguntas pendientes, plan de tiempo
research/               investigación con fuentes (no editar)
spec/                   especificaciones para Claude Code
pitch/                  guion, pitch de 3 minutos, deck
plano/                  plano de la CEDA (solo versión aprobada)
```

## División del trabajo

- **Claude Code (este repo, Codespaces):** contrato, backend, frontend, `demo.sh`, despliegue, README técnico.
- **Claude (chat con José):** investigación, definición del problema, documentos, especificaciones, pitch, deck y guion de demo. No escribe código.
- **José:** decisiones, datos de la CEDA (etiquetados como experiencia), aprobación del plano, entrega en el dashboard.

## Modo automático (auto mode): límites que no se cruzan

José trabaja con aprobación automática. Estas reglas valen aunque nadie esté mirando:

- **Nunca:** mainnet; `git push --force` o reescribir historial; borrar ramas; tocar `research/` o `privado/`; subir `.env`, llaves, `identity/` o semillas; instalar crates o paquetes npm que no pida la spec; cambiar la configuración de GitHub, de la cuenta o del Codespace.
- **Antes de cada push:** `git pull --rebase origin main`; si hay conflicto en `docs/`, conserva ambas versiones y avisa. Nunca resuelvas un conflicto borrando trabajo ajeno.
- **Alcance del fin de semana:** lo que pide `spec/2026-09-26_especificacion-frontend.md` (servidor sin dependencias, semáforo y cuatro vistas; decisiones #43–#45). El contrato no se toca salvo error de seguridad, y cualquier redespliegue lo aprueba José. Nada fuera de esa spec sin que José lo pida.
- **Si algo falla dos veces seguidas,** detente: explica el error exacto y propone la corrección más pequeña. No improvises cambios grandes para "hacerlo pasar".
- **Agentes en paralelo:** solo para tareas que no tocan los mismos archivos (por ejemplo, uno escribe el contrato y otro `demo/demo.sh` sobre la interfaz ya acordada). Un solo agente hace commits.
- **Cada commit:** mensaje en español, `cargo test` en verde si tocó el contrato, y registro en `docs/decisiones.md` si cambió una decisión.
