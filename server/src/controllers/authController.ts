import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User, { IUser } from '../model/user';
import catchAsync from '../utils/catchAsync';

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne<IUser>({ email }).exec();
  if (!user) {
    next(new Error('User does not exist'));
  }
  if (!(await user?.comparePassword(password))) {
    next(new Error('Invalid Password'));
  }

  const token = jwt.sign({ id: user?._id }, process.env.SECRET_KEY as string, {
    expiresIn: '30d'
  });

  return res.status(200).json({
    status: 'success',
    token
  });
});

export const signOut = (req: Request, res: Response, next: NextFunction) => {
  // I can't find how you would remove jwt on log out
  // Haven't tried yet in the client side gotta wait later
  const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY as string, {
    expiresIn: '1'
  });
  return res.status(200).json({
    status: 'success',
    token
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  await User.create({
    username,
    email,
    password,
    passwordConfirm
  });

  return res.status(200).json({
    status: 'success',
    message: 'Successfully created a new user'
  });
});

export const verify = [
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    return res.status(200).json({
      status: 'success',
      user: req.user
    });
  }
];
