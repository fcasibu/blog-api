import mongoose from 'mongoose';

export default interface ResponseError extends Error {
  status?: number;
}

declare global {
  namespace Express {
    interface User {
      _id: mongoose.Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      passowrdConfirm?: string;
    }
    interface ResponseError extends Error {
      status?: number;
    }
  }
}
