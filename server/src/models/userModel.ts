import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { InternalServerError } from '../utils/apiError';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    return next();
  } catch (error) {
    console.error(`Error occured while hashing the password --> `, error);
    throw new InternalServerError();
  }
});

export const User = mongoose.model('user', userSchema);
