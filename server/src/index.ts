import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import dbConnect from './config/db';
import ErrorMiddleware from './middlewares/errorMiddleware';
import router from './routes';
import corsConfig from './config/cors';

const app = express();
const PORT = process.env.PORT;

dbConnect()
  .then(() => {
    console.log('DB conected successfully');
  })
  .catch((err) => {
    console.error('Error occured while connecting DB --> ', err);
  });

app.use(corsConfig());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', router);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running -> http://localhost:${PORT}`);
});
