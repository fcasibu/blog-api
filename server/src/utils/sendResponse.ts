import { Response } from 'express';
import { IComment } from '../model/comment';
import { IPost } from '../model/post';
import { IUser } from '../model/user';

interface Data {
  posts?: IPost[];
  post?: IPost;
  comments?: IComment[];
  comment?: IComment;
  users?: IUser[];
  user?: IUser;
  token?: string;
}

const sendResponse = (res: Response, statusCode: number, data: Data) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'success',
    ...data
  });
};

export default sendResponse;
