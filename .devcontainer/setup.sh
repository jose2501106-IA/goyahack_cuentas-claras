#!/usr/bin/env bash
# Entorno de Cuentas Claras en GitHub Codespaces.
# Se ejecuta una sola vez al crear el Codespace (postCreateCommand).
# No instala nada con `cargo install` (tarda muchos minutos): la CLI de Stellar va por binario.
set -euo pipefail

echo "== Rust: target wasm32v1-none (requerido por Soroban, Rust >= 1.84) =="
rustup target add wasm32v1-none
rustc --version
cargo --version

echo "== Stellar CLI por binario (fuente: developers.stellar.org/docs/build/smart-contracts/getting-started/setup) =="
if ! command -v stellar >/dev/null 2>&1; then
  curl -fsSL https://github.com/stellar/stellar-cli/raw/main/install.sh | sh
fi
# el instalador suele dejar el binario en ~/.local/bin o /usr/local/bin
export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
if ! grep -q '.local/bin' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"' >> "$HOME/.bashrc"
fi
stellar --version || { echo "ERROR: stellar CLI no quedó en PATH; revisa la salida del instalador"; exit 1; }

echo "== Red testnet en la CLI =="
stellar network add --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015" || true

echo "== Claude Code (CLI) =="
npm install -g @anthropic-ai/claude-code
claude --version || true

echo "== Node y npm =="
node --version
npm --version

cat <<'MSG'

Listo. Siguientes pasos (ver docs/guia-codespaces.md):
  1. claude            # inicia sesión con tu cuenta cuando lo pida; nunca pegues llaves en el chat
  2. Primer prompt: "Lee CLAUDE.md y spec/2026-09-25_especificacion-tecnica-v2.md. Propón un plan por pasos y espera mi aprobación antes de escribir código."

Versiones fijadas en la spec: soroban-sdk 27.0.6 · Stellar CLI 27.1.0 · JS SDK 16.2.0.
Si `stellar --version` muestra 28.x, anótalo en docs/decisiones.md y NO mezcles 27.x con 28.x entre SDK y CLI.
MSG
