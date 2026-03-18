CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  device_provider TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  workout_type TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  calories INTEGER NOT NULL,
  workout_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS sleep (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total_minutes INTEGER NOT NULL,
  deep_minutes INTEGER NOT NULL,
  rem_minutes INTEGER NOT NULL,
  light_minutes INTEGER NOT NULL,
  sleep_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS activity (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  steps INTEGER NOT NULL,
  distance_km NUMERIC(6,2) NOT NULL,
  active_minutes INTEGER NOT NULL,
  activity_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS heart_rate_summary (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  resting_hr INTEGER NOT NULL,
  avg_hr INTEGER NOT NULL,
  max_hr INTEGER NOT NULL,
  summary_date DATE NOT NULL
);
