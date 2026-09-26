#!/usr/bin/env bash
#
# Cuentas Claras — segundo emisor para la demo (spec 2026-09-26, §6).
#
# Una sola ejecución, antes de grabar: Bodega C crea una nota para Doña Mary,
# ella la acepta y Bodega C confirma el pago. Resultado: issuers_count = 2 y la
# condición «2 bodegas» del semáforo en ✓. Si Doña Mary ya tiene 2 o más
# bodegas en su historial, no envía nada.
#
# Usa la misma configuración y la misma forma de llamar al contrato que
# demo/demo.sh (deploy.json, .env con DEMO_HMAC_KEY, identidades locales del
# stellar CLI). No modifica demo.sh.
#
# El segundo emisor es Bodega C, nunca Bodega B: Bodega B es la que consulta en
# la demo y no debe tener notas de Doña Mary (decisión #46).
#
# Uso: ./demo/sembrar.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOY="$ROOT/demo/deploy.json"
ENV_FILE="$ROOT/.env"
NET="testnet"
EXPLORER="https://stellar.expert/explorer/testnet"

[ -f "$DEPLOY" ] || { echo "❌ Falta $DEPLOY (¿desplegaste el contrato?)"; exit 1; }
[ -f "$ENV_FILE" ] || { echo "❌ Falta .env. Copia .env.example a .env y pon DEMO_HMAC_KEY."; exit 1; }

set -a; . "$ENV_FILE"; set +a
: "${DEMO_HMAC_KEY:?Falta DEMO_HMAC_KEY en .env}"

eval "$(python3 - "$DEPLOY" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
c = d["cuentas_publicas"]
print(f'CONTRACT_ID={d["contract_id"]}')
print(f'BODEGA_C={c["bodega_c"]}')
print(f'DONA_MARY={c["dona_mary"]}')
PY
)"

# Mismo teléfono ficticio y mismo HMAC que demo.sh: un solo historial.
DONA_MARY_PHONE="+525599990001"
SUBJECT_ID="$(printf '%s' "$DONA_MARY_PHONE" | openssl dgst -sha256 -hmac "$DEMO_HMAC_KEY" | awk '{print $NF}')"

NOTE_ID="$(openssl rand -hex 32)"
NOW="$(date -u +%s)"
DUE_TS="$(( NOW + 7 * 86400 ))"            # plazo de 7 días

# --- Utilidades (las mismas de demo.sh) --------------------------------------

RET=""
call() {  # call <alias-firmante> <función y args...>
  local signer="$1"; shift
  local errf outf
  errf="$(mktemp)"; outf="$(mktemp)"
  if ! stellar contract invoke --id "$CONTRACT_ID" --source "$signer" --network "$NET" \
      --send=yes -- "$@" >"$outf" 2>"$errf"; then
    echo "   ❌ Falló $1:"; grep -E 'Error|error' "$errf" | head -3 || true
    rm -f "$errf" "$outf"; exit 1
  fi
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

# Cuántas bodegas distintas tiene hoy Doña Mary. Lectura del propio sujeto,
# simulada (--send=no): no envía transacción.
issuers_count() {
  stellar contract invoke --id "$CONTRACT_ID" --source dona_mary --network "$NET" --send=no -- \
    read_stats --reader "$DONA_MARY" --subject_id "$SUBJECT_ID" 2>/dev/null \
    | python3 -c 'import json,sys
v=0
for l in sys.stdin:
    try: v=json.loads(l)["issuers_count"]
    except Exception: pass
print(v)'
}

# --- Sembrar -----------------------------------------------------------------

echo "Cuentas Claras — segundo emisor (Bodega C) · contrato $CONTRACT_ID"
ANTES="$(issuers_count)"
if [ "$ANTES" -ge 2 ]; then
  echo "✅ Doña Mary ya tiene $ANTES bodegas distintas en su historial. No se envía nada."
  exit 0
fi
echo

echo "1) Bodega C registra una nota de fiado para Doña Mary (7 días, rango 1k–5k)."
call bodega_c create_note \
  --issuer "$BODEGA_C" --note_id "$NOTE_ID" --subject_id "$SUBJECT_ID" \
  --amount_bucket B1k_5k --due_ts "$DUE_TS"

echo "2) Doña Mary acepta la nota."
call dona_mary accept_note --subject "$DONA_MARY" --note_id "$NOTE_ID"

echo "3) Bodega C confirma el pago."
call bodega_c confirm_paid --issuer "$BODEGA_C" --note_id "$NOTE_ID"

echo
echo "✅ Listo. Bodegas distintas en el historial de Doña Mary: $(issuers_count) (antes: $ANTES)."
