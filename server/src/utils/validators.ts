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
      .matches(/^[A-Za-z0-9\s]+$/)
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

export const validatePost = function () {
  return [
    check('title')
      .matches(/^[A-Za-z0-9\s]+$/)
      .withMessage('Username must be alphanumeric')
      .isLength({ min: 5 })
      .withMessage('Title must have a minimum length of 5 characters'),
    check('body')
      .isLength({ min: 55, max: 5000 })
      .withMessage('Body must have a min and max length of 55-5000 characters'),
    check('tag')
      .matches(/^[A-Za-z0-9\s]+$/)
      .withMessage('Username must be alphanumeric')
      .isLength({ min: 2, max: 7 })
      .withMessage('Tag must have a min and max length of 2-7 characters')
  ];
};

export const validateComment = function () {
  return [
    check('text')
      .matches(/^[A-Za-z0-9 _.,!"'&/$]+$/)
      .withMessage('Comment must not contain invalid characters')
      .isLength({ min: 5, max: 500 })
      .withMessage(
        'Comment must have a min and max length of 55-5000 characters'
      )
  ];
};
