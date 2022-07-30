import { check } from 'express-validator';
import User from '../model/user';

export const validateSignIn = function () {
  return [
    check('email').isEmail().withMessage('You have entered an invalid email'),
    check('password')
      .isLength({
        min: 8
      })
      .withMessage('Password must have at least 8 characters')
  ];
};
