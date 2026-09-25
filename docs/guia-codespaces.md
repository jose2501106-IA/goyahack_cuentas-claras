# Guía: dirigir a Claude Code desde GitHub Codespaces (sin tocar tu computadora)

Para José. Objetivo: que todo el desarrollo ocurra en el navegador, en un Codespace de GitHub, con Claude Code ejecutando y tú dirigiendo. Tiempo estimado de arranque: 10 minutos.

## 0. Antes de empezar (una sola vez)

1. **Repositorio.** El repo público es `goyahack_cuentas-claras` en github.com (sin README, sin licencia: ya existen en la carpeta). Dime tu usuario y yo subo todo desde aquí.
2. **Cuenta de Claude.** Claude Code se inicia con tu cuenta de Claude (suscripción) o con una API key de Anthropic. Eso lo haces tú en la terminal del Codespace; nunca pegues llaves en este chat.
3. **Codespaces.** Necesitas una cuenta de GitHub con Codespaces (el plan gratuito incluye horas mensuales; una máquina de 4 núcleos consume más rápido; si te quedas sin horas, baja a 2 núcleos).

## 1. Abrir el Codespace

1. En el repo, botón verde **Code → Codespaces → Create codespace on main**.
2. Espera a que termine `postCreateCommand` (instala Rust para Wasm, la CLI de Stellar, Node y Claude Code). Verás en la terminal el mensaje "Listo".
3. Si la terminal no muestra `stellar --version`, ejecuta `bash .devcontainer/setup.sh` de nuevo.

## 2. Iniciar Claude Code

En la terminal del Codespace:

```bash
claude
```

La primera vez te pedirá iniciar sesión (abre un enlace y pega el código que te dé). Después queda guardado en el Codespace.

## 3. Cómo se dirige (el ciclo de trabajo)

La regla del proyecto aplica igual con Claude Code: **plan corto → tú apruebas → ejecuta → commit**. Nunca le pidas "hazlo todo". Cada bloque termina con `cargo test` verde o con algo visible.

**Prompt de arranque (cópialo tal cual):**

```
Lee llms.txt, CLAUDE.md, spec/2026-09-25_especificacion-tecnica-v2.md y
docs/decisiones.md (solo las decisiones 29 a 38). Respeta la sección 3b de la spec
y la regla de no incluir función de actualización del contrato.
La entrega es HOY antes de las 20:00. Propón un plan por pasos en este orden:
(1) contrato cuentas_claras con pruebas, (2) despliegue a testnet y demo/deploy.json,
(3) demo/demo.sh con el flujo 1-5 y la consulta sin permiso que falla,
(4) backend mínimo, (5) frontend con el flujo 1-5.
Los pasos 4 y 5 solo si el 3 está verde a las 16:30. Para demo.sh no hace falta
el backend: los subject_id de la demo se calculan con openssl o se fijan en deploy.json.
Para cada paso di qué archivos crearás y cómo verificarás que funciona.
Espera mi aprobación antes de escribir código. Español de México.
```

**Después de cada paso, pídele siempre lo mismo:**

```
Muéstrame: qué hiciste, cómo lo verificaste (salida de cargo test o hash de la
transacción), qué falta y qué riesgo ves. Luego haz commit con un mensaje descriptivo.
```

**Cuando algo falle**, no le pidas que "lo arregle"; pídele que **diagnostique primero**:

```
Antes de cambiar nada: ¿cuál es el error exacto, en qué archivo y por qué ocurre?
Propón la corrección más pequeña posible.
```

**Puntos de control de hoy** (entrega antes de las 20:00; si uno no se cumple, se recorta alcance, no se estira el reloj):

| Hora | Debe existir | Si no se cumple |
|---|---|---|
| 15:00 | `cargo test` verde con las invariantes de la spec (sección 6) | Recortar pruebas secundarias (disputa, incumplida) y seguir con el camino feliz |
| 15:45 | Contrato desplegado en testnet; `demo/deploy.json` con Contract ID | Pedir diagnóstico antes de reintentar; el video de `cargo test` queda como nivel 3 |
| 16:30 | `demo/demo.sh` corre el flujo 1–5 y la consulta sin permiso que falla, con enlaces al explorador | No se empieza el frontend; se pulen `demo.sh`, README y capturas |
| 17:45 | Frontend con el flujo 1–5 (aunque sea sencillo), solo si 16:30 estuvo verde | Se entrega con `demo.sh` (nivel 2) |
| 18:00 | Código congelado. Solo se corrigen errores de la demo | — |

## 4. Reglas para Claude Code (ya están en `CLAUDE.md`, aquí como recordatorio)

- Solo testnet. Nada de llaves reales. `.env` no se sube; `.env.example` sí.
- Cero crates fuera de `soroban-sdk`. Versiones fijas. `cargo test` antes de compilar a Wasm.
- Nada personal ni dinero en cadena. Datos de demo ficticios.
- Español de México en la interfaz; sin la palabra "blockchain" en las vistas del bodeguero o del cliente.
- Un flujo completo antes que dos a medias.

## 5. Qué hago yo (chat) mientras tanto

Deck final, README con Contract ID y enlaces, pitch ajustado a lo que funcione y actualización de `docs/`. Cuando Claude Code termine un paso, pégame su resumen y actualizo la bitácora; cuando tengas el Contract ID y los hashes, los pongo en el README y en el deck.

## 6. Si algo se rompe

- **Friendbot dice "rate limit"**: espera un minuto; las cuentas ya fondeadas siguen sirviendo. No generes cuentas nuevas sin necesidad.
- **La CLI se instaló en 28.x**: no pasa nada si el SDK del contrato también es 28.x; lo que no se hace es mezclar 27 y 28. Anótalo en `docs/decisiones.md`.
- **El Codespace se apaga**: se reanuda desde GitHub; el trabajo con commit está a salvo. Haz commit cada 20–30 minutos.
- **Claude Code se pone a agregar cosas**: recuérdale la spec y el checkpoint. Pídele que registre la idea en `docs/decisiones.md` como "siguiente paso" y siga.
