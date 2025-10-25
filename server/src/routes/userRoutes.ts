import { Router } from 'express';

import { signup, signin } from '../controllers/userController';
import isAlreadyLogedIn from '../middlewares/isAlreadyLogedIn';

const userRouter = Router();

userRouter.route('/signup').post(isAlreadyLogedIn, signup);
userRouter.route('/signin').post(isAlreadyLogedIn, signin);

export default userRouter;
