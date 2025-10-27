import jwt, { JwtPayload } from 'jsonwebtoken';

import asyncHandler from '../utils/asyncHandler';
import { User } from '../models/userModel';
import { UnauthorizedError } from '../utils/apiError';

// for unproctected routes
const isAlreadyLoggedIn = asyncHandler(async (req, _res, next) => {
  const { token } = req.cookies;
  if (!token) return next(); // No token user not logged in

  try {
    const decoded = jwt.verify(
      token,
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    // Invalid token structure
    if (typeof decoded !== 'object' || !('_id' in decoded)) return next();

    const user = await User.findById(decoded._id).select('-password').lean();

    if (!user) return next();

    // If valid token and user exists thn block the user
    throw new UnauthorizedError('You are already logged in');
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return next();

    throw error;
  }
});

export default isAlreadyLoggedIn;
