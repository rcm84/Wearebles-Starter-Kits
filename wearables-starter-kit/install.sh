#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker no está instalado."
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Archivo .env creado desde .env.example"
fi

docker compose -f infra/docker-compose.yml up -d --build
./infra/scripts/wait-for-db.sh
./infra/scripts/migrate.sh
./infra/scripts/seed.sh

cat <<URLS

✅ Instalación completada.
Backend: http://localhost:8000
Dashboard: http://localhost:3000
Demo App: http://localhost:3001
API Docs: http://localhost:8000/docs
URLS
