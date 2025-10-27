import { Router } from 'express';

import { getBalance, transferMoney } from '../controllers/accountController';
import isLoggedIn from '../middlewares/isLoggedIn';

const accountRoutes = Router();

accountRoutes.route('/balance').get(isLoggedIn, getBalance);
accountRoutes.route('/transfer').post(isLoggedIn, transferMoney);

export default accountRoutes;
