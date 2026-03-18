# Architecture

- `postgres`: persistencia principal.
- `backend`: API REST para users/workouts/sleep/activity.
- `dashboard`: UI para explorar datos demo.
- `demo-app`: ejemplo de integración usando SDK.
- `sdk/js`: wrapper ligero para consumir API.

Flujo:
Dashboard y Demo App -> Backend -> PostgreSQL.
