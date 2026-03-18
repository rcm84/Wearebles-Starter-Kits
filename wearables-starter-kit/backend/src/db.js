const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER || 'wearables',
  password: process.env.POSTGRES_PASSWORD || 'wearables',
  database: process.env.POSTGRES_DB || 'wearables'
});

module.exports = pool;
