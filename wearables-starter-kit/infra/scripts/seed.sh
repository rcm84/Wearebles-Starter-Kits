#!/usr/bin/env bash
set -euo pipefail
docker compose -f infra/docker-compose.yml exec -T backend npm run seed
