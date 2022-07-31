import { Response } from 'express';
import { Model } from 'mongoose';
import { IComment } from '../model/comment';
import { IPost } from '../model/post';
import { IUser } from '../model/user';

interface Documents {
  posts?: IPost[];
  post?: IPost;
  comments?: IComment[];
  comment?: IComment;
  users?: IUser[];
  user?: IUser;
}

const sendResponse = (res: Response, statusCode: number, doc: Documents) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'success',
    ...doc
  });
};

export default sendResponse;
