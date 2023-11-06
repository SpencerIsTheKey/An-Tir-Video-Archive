import { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { updateUser } from '../controllers/userController';

export const userRouter = Router();

userRouter.use(auth);

userRouter.route('/update').post(updateUser);