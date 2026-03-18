# Wearables Starter Kit

Starter kit instalable para developers basado en la idea de **open-wearables** y orientado a demos rápidas de datos de wearables (workouts, sleep, activity y resumen de ritmo cardiaco).

## ¿Qué incluye?

- Backend Node.js + PostgreSQL listo para local (`/backend`).
- Dashboard React (`/dashboard`).
- Demo app React usando SDK (`/demo-app`).
- SDK JavaScript (`/sdk/js`).
- Scripts de instalación y operación de 1 comando.
- Seed data realista para demo inmediata.

## Instalación rápida

```bash
cd wearables-starter-kit
./install.sh
```

URLs esperadas:

- Backend: http://localhost:8000
- Dashboard: http://localhost:3000
- Demo App: http://localhost:3001
- API Docs: http://localhost:8000/docs

## Endpoints principales

- `GET /health`
- `GET /users`
- `GET /users/{id}/workouts`
- `GET /users/{id}/sleep`
- `GET /users/{id}/activity`

## Uso del SDK

```js
const { WearablesClient } = require('./sdk/js');

const client = new WearablesClient({
  baseUrl: 'http://localhost:8000',
  apiKey: 'demo'
});

await client.getUsers();
await client.getWorkouts(1);
await client.getSleep(1);
await client.getActivity(1);
```

## Estructura

```text
wearables-starter-kit/
  README.md
  .env.example
  install.sh
  start.sh
  stop.sh
  reset.sh
  healthcheck.sh
  infra/
  backend/
  dashboard/
  demo-app/
  sdk/
  seed-data/
  docs/
```

## Comandos útiles

- `./start.sh`: levanta contenedores.
- `./stop.sh`: apaga contenedores.
- `./reset.sh`: reinicia todo con volumen limpio.
- `./healthcheck.sh`: prueba backend.
