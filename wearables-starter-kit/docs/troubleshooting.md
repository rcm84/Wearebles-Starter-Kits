# Troubleshooting

## Docker no responde
- Verifica `docker --version`.
- Reinicia Docker Desktop/daemon.

## Puerto ocupado
- Cambia puertos en `infra/docker-compose.yml`.

## Seed no carga
- Reintenta:
  ```bash
  ./infra/scripts/migrate.sh
  ./infra/scripts/seed.sh
  ```
