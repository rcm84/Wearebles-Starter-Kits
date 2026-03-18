require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./db');

function readSeed(fileName) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'seed-data', fileName), 'utf8'));
}

async function seed() {
  const users = readSeed('users.json');
  const workouts = readSeed('workouts.json');
  const sleep = readSeed('sleep.json');
  const activity = readSeed('activity.json');

  await pool.query('BEGIN');
  try {
    await pool.query('TRUNCATE heart_rate_summary, activity, sleep, workouts, users RESTART IDENTITY CASCADE');

    for (const user of users) {
      await pool.query(
        'INSERT INTO users (username, device_provider) VALUES ($1, $2)',
        [user.username, user.device_provider]
      );
    }

    for (const item of workouts) {
      await pool.query(
        'INSERT INTO workouts (user_id, workout_type, duration_minutes, calories, workout_date) VALUES ($1, $2, $3, $4, $5)',
        [item.user_id, item.workout_type, item.duration_minutes, item.calories, item.workout_date]
      );
    }

    for (const item of sleep) {
      await pool.query(
        'INSERT INTO sleep (user_id, total_minutes, deep_minutes, rem_minutes, light_minutes, sleep_date) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.user_id, item.total_minutes, item.deep_minutes, item.rem_minutes, item.light_minutes, item.sleep_date]
      );

      await pool.query(
        'INSERT INTO heart_rate_summary (user_id, resting_hr, avg_hr, max_hr, summary_date) VALUES ($1, $2, $3, $4, $5)',
        [item.user_id, item.heart_rate_summary.resting_hr, item.heart_rate_summary.avg_hr, item.heart_rate_summary.max_hr, item.sleep_date]
      );
    }

    for (const item of activity) {
      await pool.query(
        'INSERT INTO activity (user_id, steps, distance_km, active_minutes, activity_date) VALUES ($1, $2, $3, $4, $5)',
        [item.user_id, item.steps, item.distance_km, item.active_minutes, item.activity_date]
      );
    }

    await pool.query('COMMIT');
    console.log('Seed data loaded successfully');
  } catch (err) {
    await pool.query('ROLLBACK');
    throw err;
  } finally {
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
