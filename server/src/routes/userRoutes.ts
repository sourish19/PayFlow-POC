import { Router } from 'express';

import {
  signup,
  signin,
  getUser,
  getFilteredUser,
} from '../controllers/userController';
import isAlreadyLoggedIn from '../middlewares/isAlreadyLogedIn';
import isLoggedIn from '../middlewares/isLoggedIn';

const userRouter = Router();

userRouter.route('/signup').post(isAlreadyLoggedIn, signup);
userRouter.route('/signin').post(isAlreadyLoggedIn, signin);
userRouter.route('/').get(isLoggedIn, getUser);
userRouter.route('/bulk').get(isLoggedIn, getFilteredUser);

export default userRouter;
