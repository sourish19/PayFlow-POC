import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { z } from 'zod';

import { User } from '../models/userModel';
import asyncHandler from '../utils/asyncHandler';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  ForbiddenError,
} from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import sanatizeUser from '../utils/sanitizeUser';
import { validateSignup } from '../validations/userValidation';
import handleZodError from '../utils/handleZodError';

export const signup = asyncHandler(async (req, res, _next) => {
  const { name, email, password } = handleZodError(validateSignup(req.body));
  console.log('name email password --> ', name, email, password);

  const findUser = await User.findOne({ email, name })
    .select('-password')
    .lean();

  if (findUser) throw new ConflictError('Email already taken');

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    console.log('Unable to create user -->', user);
    throw new InternalServerError();
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, 'User created successfully', sanatizeUser(user))
    );
});

export const signin = asyncHandler(async (req, res, _next) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email });

  if (!findUser) throw new NotFoundError('User not found');

  const verifyPassword = await argon2.verify(findUser.password, password);

  if (!verifyPassword) throw new ForbiddenError('Invalid credentials');

  const token = jwt.sign({ email }, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
  });

  res
    .cookie('token', token)
    .status(200)
    .json(
      new ApiResponse(
        200,
        'User logged in successfully',
        sanatizeUser(findUser)
      )
    );
});
