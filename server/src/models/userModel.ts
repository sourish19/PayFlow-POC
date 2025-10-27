import { Schema, InferRawDocType, model, Document } from 'mongoose';
import * as argon2 from 'argon2';
import { InternalServerError } from '../utils/apiError';

const schemaDefinition = {
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 50,
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
} as const;

const userSchema = new Schema(schemaDefinition, { timestamps: true });
// An interface describing how the data is saved in MongoDB
export type RawUserDocument = InferRawDocType<typeof schemaDefinition>;

userSchema.pre('save', async function (next) {
  const user = this as RawUserDocument & Document;
  if (!user.isModified('password')) return next();
  try {
    const hashedPassword = await argon2.hash(String(user.password));
    user.password = hashedPassword;
    return next();
  } catch (error) {
    console.error(`Error occured while hashing the password --> `, error);
    throw new InternalServerError();
  }
});

userSchema.methods.verifyPassword = async function (
  password: string
): Promise<Boolean> {
  const user = this as Document & RawUserDocument;
  try {
    const isPasswordValid = await argon2.verify(user.password, password);
    return isPasswordValid;
  } catch (error) {
    throw new InternalServerError();
  }
};

export const User = model('user', userSchema);
