import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

console.log('Loaded password:', process.env.DB_PASSWORD);

import pool from './config/db.js';

console.log(process.cwd());


async function testDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected at:', result.rows[0].now);
    

  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    pool.end();
  }
}

testDB();
