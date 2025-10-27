import { Router } from 'express';
import userRouter from './userRoutes';
import accountRoutes from './accountRoutes';

const router = Router();

router.use('/user', userRouter);
router.use('/account', accountRoutes);

export default router;
