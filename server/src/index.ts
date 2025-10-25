import 'dotenv/config';
import express from 'express';
import dbConnect from './config/db';

const app = express();
const PORT = process.env.PORT;

dbConnect()
  .then(() => {
    console.log('DB conected successfully');
  })
  .catch((err) => {
    console.error('Error occured while connecting DB --> ', err);
  });

app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server is running -> http://localhost:${PORT}`);
});
