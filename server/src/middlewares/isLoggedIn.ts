import jwt, { JwtPayload } from 'jsonwebtoken';

import asyncHandler from '../utils/asyncHandler';
import { UnauthorizedError } from '../utils/apiError';
import { User } from '../models/userModel';
import handleZodError from '../utils/handleZodError';
import { validateJwt } from '../validations/userValidation';

const isLoggedIn = asyncHandler(async (req, _res, next) => {
  try {
    const { token: cookieToken } = req.cookies;
    // it just converts whatever passed in to lowercase and looks it up in req.headers is safer & readable than req.headers['authorization'];
    const bearer = req.header('Authorization');

    const bearerToken = bearer?.split('Bearer ')[1];

    const tokenToVerify = cookieToken || bearerToken;

    handleZodError(validateJwt(tokenToVerify));

    if (!tokenToVerify) throw new UnauthorizedError();

    const verifyToken = jwt.verify(
      tokenToVerify,
      String(process.env.JWT_SECRET)
    ) as JwtPayload;

    if (!verifyToken) throw new UnauthorizedError();

    const user = await User.findById(verifyToken?._id).select(
      '-password -token'
    );

    if (!user) throw new UnauthorizedError();

    req.user = user;

    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid or expired token');
    }
    throw error;
  }
});

export default isLoggedIn;
