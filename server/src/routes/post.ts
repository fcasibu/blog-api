import express from 'express';
import { verify } from '../controllers/authController';
import {
  createComment,
  getAllPost,
  getPost
} from '../controllers/postController';
import isValid from '../middlewares/isValid';
import { validateComment } from '../utils/validators';

const router = express.Router();

router.use(verify);

router.route('/').get(getAllPost);

router
  .route('/:postId')
  .get(getPost)
  .post(validateComment(), isValid, createComment);

export default router;
