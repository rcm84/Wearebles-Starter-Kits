require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch {
    res.status(500).json({ status: 'error' });
  }
});

app.get('/users', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, username, device_provider FROM users ORDER BY id');
  res.json(rows);
});

app.get('/users/:id/workouts', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, workout_type, duration_minutes, calories, workout_date FROM workouts WHERE user_id = $1 ORDER BY workout_date DESC',
    [req.params.id]
  );
  res.json(rows);
});

app.get('/users/:id/sleep', async (req, res) => {
  const sleepRows = await pool.query(
    'SELECT id, total_minutes, deep_minutes, rem_minutes, light_minutes, sleep_date FROM sleep WHERE user_id = $1 ORDER BY sleep_date DESC',
    [req.params.id]
  );

  const hrRows = await pool.query(
    'SELECT resting_hr, avg_hr, max_hr, summary_date FROM heart_rate_summary WHERE user_id = $1 ORDER BY summary_date DESC',
    [req.params.id]
  );

  res.json({
    sleep: sleepRows.rows,
    heartRateSummary: hrRows.rows
  });
});

app.get('/users/:id/activity', async (req, res) => {
  const { rows } = await pool.query(
    'SELECT id, steps, distance_km, active_minutes, activity_date FROM activity WHERE user_id = $1 ORDER BY activity_date DESC',
    [req.params.id]
  );
  res.json(rows);
});

app.get('/docs', (_req, res) => {
  res.json({
    endpoints: [
      'GET /health',
      'GET /users',
      'GET /users/{id}/workouts',
      'GET /users/{id}/sleep',
      'GET /users/{id}/activity'
    ]
  });
});

const port = Number(process.env.BACKEND_PORT || 8000);
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
