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

export const validateSignUp = function () {
  return [
    check('username')
      .isLength({ min: 3, max: 15 })
      .withMessage(
        'First name must have a min and max length of 3-15 characters'
      )
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('Username must be alphanumeric'),
    check('email')
      .isEmail()
      .withMessage('You have entered an invalid email')
      .custom((email) =>
        User.findOne({ email }).then((user) => {
          if (user) return Promise.reject(new Error('Email is already taken'));
        })
      ),
    check('password')
      .isLength({
        min: 8
      })
      .withMessage('Password must have at least 8 characters'),
    check('passwordConfirm', 'Passwords do not match')
      .isLength({ min: 8 })
      .withMessage('Password must have at least 8 characters')
      .custom((value, { req }) => value === req.body.password)
  ];
};
