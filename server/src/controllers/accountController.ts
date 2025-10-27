import mongoose from 'mongoose';

import { Account } from '../models/accountsModel';
import asyncHandler from '../utils/asyncHandler';
import { NotFoundError, BadRequestError } from '../utils/apiError';
import ApiResponse from '../utils/apiResponse';
import handleZodError from '../utils/handleZodError';
import { validateTransfer } from '../validations/accountValidation';

export const getBalance = asyncHandler(async (req, res) => {
  if (!req.user || !('_id' in req?.user))
    throw new NotFoundError('User not found');

  const findUserAccount = await Account.findOne({ userId: req.user._id })
    .populate('userId')
    .select('-password -token');

  if (!findUserAccount) throw new NotFoundError('Account not found');

  const sanatizeUserAccount = {
    balance: findUserAccount.balance,
  };

  res
    .status(200)
    .json(
      new ApiResponse(200, 'Balance found successfully', sanatizeUserAccount)
    );
});

export const transferMoney = asyncHandler(async (req, res) => {
  const { receiverId, amount } = handleZodError(validateTransfer(req.body));

  if (!req.user || !('_id' in req.user))
    throw new NotFoundError('User not found');

  const userId = req.user._id;

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const sender = await Account.findOne({ userId }).session(session).lean();

      if (!sender) throw new NotFoundError('Sender not found');

      const receiver = await Account.findOne({ userId: receiverId })
        .session(session)
        .lean();

      if (!receiver) throw new NotFoundError('Receiver not found');

      if (sender.balance < amount)
        throw new BadRequestError('Insufficient balance');

      await Account.updateOne(
        { userId },
        { $inc: { balance: -amount } }
      ).session(session);

      await Account.updateOne(
        { userId: receiverId },
        { $inc: { balance: amount } }
      ).session(session);
    });
    return res
      .status(200)
      .json(new ApiResponse(200, 'Transfer successful', []));
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
});
