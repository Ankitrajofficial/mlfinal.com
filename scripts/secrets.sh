#!/usr/bin/env bash
# ============================================================
# secrets.sh — back up .env.local secrets safely inside git.
# ------------------------------------------------------------
# .env.local holds real secrets (Groq API key, Google webhook
# URL + secret) and is gitignored, so a fresh clone or a lost
# laptop loses it. This script encrypts it with a passphrase
# into .env.local.enc, which IS committed — so "git clone +
# passphrase" fully restores your secrets.
#
# openssl prompts for the passphrase interactively; it is never
# passed on the command line and never printed, so it does not
# land in shell history or logs. Store the passphrase in your
# password manager — WITHOUT IT THE BACKUP CANNOT BE RECOVERED.
#
# Usage:
#   ./scripts/secrets.sh encrypt   # .env.local     -> .env.local.enc  (then commit the .enc)
#   ./scripts/secrets.sh decrypt   # .env.local.enc -> .env.local      (after a fresh clone)
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."

PLAIN=".env.local"
ENC=".env.local.enc"
# AES-256 with PBKDF2 key stretching; decrypt MUST use the same flags.
CIPHER=(-aes-256-cbc -pbkdf2 -iter 300000 -salt)

case "${1:-}" in
  encrypt)
    [ -f "$PLAIN" ] || { echo "error: $PLAIN not found — nothing to encrypt." >&2; exit 1; }
    openssl enc "${CIPHER[@]}" -in "$PLAIN" -out "$ENC"
    echo "✓ Wrote $ENC (safe to commit)."
    echo "  Keep your passphrase in a password manager — it is the only key."
    ;;
  decrypt)
    [ -f "$ENC" ] || { echo "error: $ENC not found — nothing to decrypt." >&2; exit 1; }
    if [ -f "$PLAIN" ]; then
      printf "%s already exists. Overwrite? [y/N] " "$PLAIN"
      read -r reply
      case "$reply" in [yY]*) ;; *) echo "Aborted."; exit 1;; esac
    fi
    openssl enc -d "${CIPHER[@]}" -in "$ENC" -out "$PLAIN"
    echo "✓ Restored $PLAIN"
    ;;
  *)
    echo "Usage: $0 {encrypt|decrypt}" >&2
    exit 1
    ;;
esac
