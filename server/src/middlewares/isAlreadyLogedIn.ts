import jwt, { JwtPayload } from 'jsonwebtoken';

import asyncHandler from '../utils/asyncHandler';
import { User } from '../models/userModel';
import { UnauthorizedError } from '../utils/apiError';

// for unproctected routes
const isAlreadyLogedIn = asyncHandler(async (req, _res, next) => {
  const { token } = req.cookies;

  if (!token) return next();

  const isTokenValid = jwt.verify(
    token,
    String(process.env.JWT_SECRET)
  ) as JwtPayload;

  if (typeof isTokenValid !== 'object' || !('_id' in isTokenValid))
    return next();

  const user = await User.findById(isTokenValid?._id)
    .select('-password')
    .lean();

  if (!user) return next();

  throw new UnauthorizedError();
});

export default isAlreadyLogedIn;
