import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User, { IUser } from '../model/user';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec();
  if (!user) {
    return next(new Error('User does not exist'));
  }
  if (!(await user?.comparePassword(password))) {
    return next(new Error('Invalid Password'));
  }

  const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY as string, {
    expiresIn: '30d'
  });

  return sendResponse(res, 200, { token });
});

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  // I can't find how you would remove jwt on log out
  // Haven't tried yet in the client side gotta wait later
  const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY as string, {
    expiresIn: '1'
  });

  return sendResponse(res, 200, { token });
};

export const signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm
  });

  return sendResponse(res, 201, { user });
});

export const verify = [
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    next();
  }
];
