import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

import RequestError from './types/express/';
import User from './model/user';

import authRouter from './routes/auth';
import postRouter from './routes/post';
import userRouter from './routes/user';

const app = express();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY as string
};

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id, '-password').exec();
      if (!user) return done(null, false, { message: 'User does not exist' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (err: RequestError, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
      status: 'fail',
      message: err.message,
      stack: err.stack
    });
  }
);

export default app;
