import { Router } from 'express';

import { signup, signin } from '../controllers/userController';

const userRouter = Router();

userRouter.route('/signup').post(signup);
userRouter.route('/signin').post(signin);

export default userRouter;
