import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});