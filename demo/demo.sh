#!/usr/bin/env bash
#
# Cuentas Claras — demo del camino feliz + el paso negativo, contra el contrato
# ya desplegado en Stellar testnet. Plan B del pitch (spec v2, §10).
#
# Qué muestra, paso a paso:
#   1) Bodega A-17 crea una nota de fiado para Doña Mary (15 días, rango 5k–20k).
#   2) Doña Mary la acepta (co-firma): la deuda no existe sin su firma.
#   3) Bodega A-17 confirma el pago.
#   4) Bodega B-40 pide el resumen SIN permiso -> el contrato lo rechaza (NoConsent).
#   5) Doña Mary autoriza a Bodega B-40 por 30 días.
#   6) Bodega B-40 consulta con permiso y ve el resumen.
#
# Idempotente: cada corrida usa un note_id nuevo y revoca el permiso de Bodega B-40
# antes del paso 4, así el paso negativo siempre falla como se espera. El
# subject_id (seudónimo) es determinista: HMAC-SHA256 del teléfono con
# DEMO_HMAC_KEY, de modo que el historial de Doña Mary se acumula bajo un mismo id.
#
# Requisitos: stellar CLI 28, identidades locales plataforma/bodega_a/bodega_b/
# dona_mary (fondeadas), demo/deploy.json y un .env con DEMO_HMAC_KEY.
# Solo claves PÚBLICAS viven en el repo; las secretas están en ~/.config/stellar.
#
# Uso:
#   ./demo/demo.sh                 # corrido, para captura de salida
#   ./demo/demo.sh --paso-a-paso   # títulos grandes y pausa con Enter, para el video

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY="$ROOT/demo/deploy.json"
ENV_FILE="$ROOT/.env"
NET="testnet"
EXPLORER="https://stellar.expert/explorer/testnet"

# Modo presentación: --paso-a-paso muestra títulos grandes y espera Enter entre
# pasos (para grabar el video). Sin la opción, corre de corrido.
STEP_BY_STEP=0
case "${1:-}" in
  --paso-a-paso|-p) STEP_BY_STEP=1 ;;
  "") ;;
  *) echo "Uso: $(basename "$0") [--paso-a-paso]"; exit 1 ;;
esac

# --- Configuración -----------------------------------------------------------

[ -f "$DEPLOY" ] || { echo "❌ Falta $DEPLOY (¿desplegaste el contrato?)"; exit 1; }
[ -f "$ENV_FILE" ] || { echo "❌ Falta .env. Copia .env.example a .env y pon DEMO_HMAC_KEY."; exit 1; }

# Cargar DEMO_HMAC_KEY sin volcar el resto del entorno.
set -a; . "$ENV_FILE"; set +a
: "${DEMO_HMAC_KEY:?Falta DEMO_HMAC_KEY en .env}"

# Leer los datos públicos del despliegue desde deploy.json (sin depender de jq).
eval "$(python3 - "$DEPLOY" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
c = d["cuentas_publicas"]
print(f'CONTRACT_ID={d["contract_id"]}')
print(f'BODEGA_A={c["bodega_a"]}')
print(f'BODEGA_B={c["bodega_b"]}')
print(f'DONA_MARY={c["dona_mary"]}')
PY
)"

# Teléfono ficticio de Doña Mary (prefijo reservado para pruebas; nada real).
DONA_MARY_PHONE="+525599990001"
SUBJECT_ID="$(printf '%s' "$DONA_MARY_PHONE" | openssl dgst -sha256 -hmac "$DEMO_HMAC_KEY" | awk '{print $NF}')"

NOTE_ID="$(openssl rand -hex 32)"          # note_id nuevo por corrida (idempotencia)
NOW="$(date -u +%s)"
DUE_TS="$(( NOW + 15 * 86400 ))"           # plazo de 15 días (perfil de Doña Mary)
EXP_TS="$(( NOW + 30 * 86400 - 3600 ))"    # permiso ~30 días (bajo el tope consent_ttl)

# --- Utilidades --------------------------------------------------------------

# Ejecuta una llamada al contrato firmada por <alias>, imprime el enlace de la
# transacción en stellar.expert y deja el valor de retorno en la variable RET.
RET=""
call() {  # call <alias-firmante> <función y args...>
  local signer="$1"; shift
  local errf outf
  errf="$(mktemp)"; outf="$(mktemp)"
  stellar contract invoke --id "$CONTRACT_ID" --source "$signer" --network "$NET" \
    --send=yes -- "$@" >"$outf" 2>"$errf"
  _link "$errf"
  RET="$(cat "$outf")"
  rm -f "$errf" "$outf"
}

_link() {  # imprime "   ↳ <url>" a partir del stderr de la CLI
  local url hash
  url="$(grep -oE 'https://stellar\.expert/explorer/testnet/tx/[0-9a-f]+' "$1" | head -1 || true)"
  if [ -z "$url" ]; then
    hash="$(grep -oiE 'Signing transaction: [0-9a-f]+' "$1" | head -1 | awk '{print $NF}' || true)"
    [ -n "$hash" ] && url="$EXPLORER/tx/$hash"
  fi
  [ -n "$url" ] && echo "   ↳ $url"
}

# Título de un paso. Con --paso-a-paso: banner grande y espera Enter; si no, una línea.
paso() {  # paso <numero> <texto>
  if [ "$STEP_BY_STEP" = 1 ]; then
    echo
    echo "════════════════════════════════════════════════════════════════════"
    echo "   PASO $1"
    echo "   $2"
    echo "════════════════════════════════════════════════════════════════════"
    read -rp "   ⏎  Enter para ejecutar este paso… " _ </dev/tty || true
    echo
  else
    echo "$1) $2"
  fi
}

# --- Encabezado --------------------------------------------------------------

echo "════════════════════════════════════════════════════════════════════"
echo " Cuentas Claras — demo en Stellar testnet"
echo "   Contrato:   $CONTRACT_ID"
echo "   Explorer:   $EXPLORER/contract/$CONTRACT_ID"
echo "   Seudónimo de Doña Mary (subject_id): ${SUBJECT_ID:0:16}…"
echo "   Nota de esta corrida (note_id):      ${NOTE_ID:0:16}…"
echo "════════════════════════════════════════════════════════════════════"
echo

# --- 1) Bodega A-17 crea la nota ------------------------------------------------

paso 1 "Bodega A-17 registra una nota de fiado para Doña Mary (15 días, rango 5k–20k)."
call bodega_a create_note \
  --issuer "$BODEGA_A" --note_id "$NOTE_ID" --subject_id "$SUBJECT_ID" \
  --amount_bucket B5k_20k --due_ts "$DUE_TS"
echo

# --- 2) Doña Mary acepta -----------------------------------------------------

paso 2 "Doña Mary acepta la nota: sin su firma la deuda no existe."
call dona_mary accept_note --subject "$DONA_MARY" --note_id "$NOTE_ID"
echo

# --- 3) Bodega A-17 confirma el pago --------------------------------------------

paso 3 "Doña Mary paga y Bodega A-17 confirma el pago."
call bodega_a confirm_paid --issuer "$BODEGA_A" --note_id "$NOTE_ID"
echo

# --- 4) Bodega B-40 consulta SIN permiso (debe fallar) --------------------------

# Idempotencia: garantizar que Bodega B-40 no tenga un permiso de una corrida previa.
stellar contract invoke --id "$CONTRACT_ID" --source dona_mary --network "$NET" --send=yes -- \
  revoke_consent --subject "$DONA_MARY" --reader "$BODEGA_B" >/dev/null 2>&1 || true

paso 4 "Bodega B-40 pide el resumen de Doña Mary SIN permiso."
errf="$(mktemp)"
if stellar contract invoke --id "$CONTRACT_ID" --source bodega_b --network "$NET" --send=yes -- \
     read_stats --reader "$BODEGA_B" --subject_id "$SUBJECT_ID" >/dev/null 2>"$errf"; then
  echo "   ⚠️ INESPERADO: el contrato entregó el resumen sin permiso."
  cat "$errf"; rm -f "$errf"; exit 1
elif grep -qiE 'NoConsent|Contract, #10|#10\b' "$errf"; then
  echo "   ✅ esperado: NoConsent — el contrato no entrega el resumen sin permiso (no se envía transacción)"
else
  echo "   ⚠️ Falló por otra razón:"; cat "$errf"; rm -f "$errf"; exit 1
fi
rm -f "$errf"
echo

# --- 5) Doña Mary autoriza a Bodega B-40 ----------------------------------------

paso 5 "Doña Mary autoriza a Bodega B-40 a leer su resumen por 30 días."
call dona_mary grant_consent \
  --subject "$DONA_MARY" --reader "$BODEGA_B" --exp_ts "$EXP_TS" --nonce "$NOW"
echo

# --- 6) Bodega B-40 consulta con permiso ----------------------------------------

paso 6 "Bodega B-40 consulta con permiso vigente y ve el resumen de cumplimiento."
call bodega_b read_stats --reader "$BODEGA_B" --subject_id "$SUBJECT_ID"
echo "   Esta consulta queda registrada (evento aggregate_read)."
STATS_JSON="$RET"
python3 - <<PY
import json
s = json.loads('''$STATS_JSON''')
print("   ── Resumen de Doña Mary ──────────────────────────────")
print(f"   Notas aceptadas:      {s['accepted']}")
print(f"   Pagadas a tiempo:     {s['paid_on_time']}")
print(f"   Pagadas tarde:        {s['paid_late']}")
print(f"   Vencidas abiertas:    {s['overdue_open']}")
print(f"   Incumplidas:          {s['defaulted']}")
print(f"   Emisores distintos:   {s['issuers_count']}")
print(f"   Rango máximo visto:   {s['max_bucket']}")
PY
echo
echo "✅ Demo completa. Las transacciones enviadas (pasos 1, 2, 3, 5 y 6) quedaron"
echo "   registradas en la cadena (enlaces arriba). El paso 4 se rechazó en"
echo "   simulación: no se envió transacción."
echo "   La cadena es pública; el permiso controla la consulta oficial y deja"
echo "   constancia. En cadena no van nombre, teléfono ni monto exacto (spec v2, §3b)."
