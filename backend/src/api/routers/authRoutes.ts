import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';

export const authRouter = Router();

authRouter.route('/signin').post(signIn);
authRouter.route('/signup').post(signUp);