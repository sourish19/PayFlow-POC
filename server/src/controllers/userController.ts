import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

import { User } from '../models/userModel';
import { Account } from '../models/accountsModel';
import asyncHandler from '../utils/asyncHandler';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  ForbiddenError,
} from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import sanatizeUser from '../utils/sanitizeUser';
import { validateSignup, validateSignin } from '../validations/userValidation';
import handleZodError from '../utils/handleZodError';

export const signup = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = handleZodError(
    validateSignup(req.body)
  );

  const findUser = await User.findOne({ email, firstName, lastName })
    .select('-password')
    .lean();

  if (findUser) throw new ConflictError('Email already taken');

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (!user) {
    console.log('Unable to create user -->', user);
    throw new InternalServerError();
  }

  // This is so that I don’t have to integrate it with banks and give users random balances to start with
  const randomBalance = Math.random() * (10000 - 1) + 1;

  const userAccount = await Account.create({
    userId: user._id,
    balance: randomBalance,
  });

  if (!userAccount) {
    console.log('Unable to create user account -->', userAccount);
    throw new InternalServerError();
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, 'User created successfully', sanatizeUser(user))
    );
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = handleZodError(validateSignin(req.body));

  const findUser = await User.findOne({ email });

  if (!findUser) throw new NotFoundError('User not found');

  const verifyPassword = await argon2.verify(findUser.password, password);

  if (!verifyPassword) throw new ForbiddenError('Invalid credentials');

  const token = jwt.sign(
    { _id: findUser._id.toString(), email },
    String(process.env.JWT_SECRET),
    {
      expiresIn: '1d',
    }
  );

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

export const getUser = asyncHandler(async (req, res) => {
  if (!req.user || !('_id' in req?.user))
    throw new NotFoundError('User not found');

  const findUser = await User.findById(req.user._id).select('-password -token');

  if (!findUser) throw new NotFoundError('User not found');

  res
    .status(200)
    .json(
      new ApiResponse(200, 'User found successfully', sanatizeUser(findUser))
    );
});

export const getFilteredUser = asyncHandler(async (req, res) => {
  const { filter } = req.query;

  const findUsers = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } },
    ],
  }).select('-password -token');

  if (!findUsers || findUsers.length === 0)
    throw new NotFoundError('Users not found');

  const santizedData = findUsers.map((user) => {
    return sanatizeUser(user);
  });

  res
    .status(200)
    .json(new ApiResponse(200, 'Users found successfully', santizedData));
});

// export const getAllUser = asyncHandler(async(req,res)=>{

// })
