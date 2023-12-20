import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});