import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import dbConnect from './config/db';
import ErrorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT;

dbConnect()
  .then(() => {
    console.log('DB conected successfully');
  })
  .catch((err) => {
    console.error('Error occured while connecting DB --> ', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dummy
app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running -> http://localhost:${PORT}`);
});
