import mongoose from 'mongoose';

export default interface ResponseError extends Error {
  status?: number;
}

declare global {
  namespace Express {
    interface User {
      _id: mongoose.Types.ObjectId;
      username: string;
      email: string;
      password: string;
      passwordConfirm?: string;
      comparePassword(inputPassword: string): Promise<boolean>;
    }
    interface ResponseError extends Error {
      status?: number;
    }
  }
}
