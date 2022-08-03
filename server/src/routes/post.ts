import express from 'express';
import { verify } from '../controllers/authController';
import {
  createComment,
  getAllNewPost,
  getAllPost,
  getAllTag,
  getPost
} from '../controllers/postController';
import isValid from '../middlewares/isValid';
import { validateComment } from '../utils/validators';

const router = express.Router();

router.route('/new-posts').get(getAllNewPost);
router.route('/tags').get(getAllTag);

router.route('/').get(getAllPost);

router
  .route('/:postId')
  .get(getPost)
  .post(verify, validateComment(), isValid, createComment);

export default router;
