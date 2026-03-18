#!/usr/bin/env bash
set -euo pipefail

DB_CONTAINER="${DB_CONTAINER:-wearables-postgres}"

until docker compose -f infra/docker-compose.yml exec -T postgres pg_isready -U "${POSTGRES_USER:-wearables}" -d "${POSTGRES_DB:-wearables}" >/dev/null 2>&1; do
  echo "Esperando a PostgreSQL..."
  sleep 2
done

echo "PostgreSQL listo"
