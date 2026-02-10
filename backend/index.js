import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// IMPORTANT
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root Route - serves a JSON response
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
  // Removed the redundant res.send() which caused an error
});

// 404 Not Found handler
app.get('/*any', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});