import express, { Request, Response } from 'express';

import { signIn, signOut, signUp, verify } from '../controllers/authController';
import isValid from '../middlewares/isValid';
import { validateSignIn, validateSignUp } from '../utils/validators';

const router = express.Router();

router.route('/signin').post(validateSignIn(), isValid, signIn);

router.route('/signup').post(validateSignUp(), isValid, signUp);

router.route('/verify').get(verify, (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'success',
    user: req.user
  });
});

router.route('/signout').get(signOut);
export default router;
