import mongoose from 'mongoose';
import { exit } from 'node:process';

const dbConnect = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
  } catch (error) {
    console.error(`Error occured while connecting DB -> ${error}`);
    exit(1);
  }
};

export default dbConnect;
