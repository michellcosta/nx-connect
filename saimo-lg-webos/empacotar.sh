#!/bin/bash
# Gera o IPK da Saimo TV para instalar na LG (webOS).
#
#   ./empacotar.sh              # sai em dist/
#   ./empacotar.sh /tmp/ipk     # pasta de saída
#
# Precisa do CLI: npm i -g @webosose/ares-cli
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-dist}"
mkdir -p "$OUT"

if ! command -v ares-package >/dev/null 2>&1; then
  echo "Instale o CLI da webOS: npm i -g @webosose/ares-cli" >&2
  exit 1
fi

if command -v npm >/dev/null 2>&1; then
  echo "Transpilando para webOS 3.x+..."
  (cd .. && npm run build) || true
fi

ares-package . -o "$OUT" \
  -e "worker" \
  -e "dist" \
  -e ".git" \
  -e "*.py" \
  -e "__pycache__" \
  -e "*.md" \
  -e "empacotar.sh"

echo "IPK em $OUT"
ls -lh "$OUT"/*.ipk 2>/dev/null || true
