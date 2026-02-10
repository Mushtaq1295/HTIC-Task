import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import pool from './config/db.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ time: result.rows[0].now });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
