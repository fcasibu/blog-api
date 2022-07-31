import express from 'express';
import { verify } from '../controllers/authController';
import {
  createUserDraftPost,
  createUserPost,
  deleteComment,
  deleteUserPost,
  getAllComment,
  getAllPublishedPost,
  getAllUnpublishedPost,
  getAllUserPost,
  getComment,
  getUserPost,
  updateComment,
  updateUserPost
} from '../controllers/userController';
import isValid from '../middlewares/isValid';
import { validateComment, validatePost } from '../utils/validators';

const router = express.Router();

router.use(verify);

router.route('/:userId/posts').get(getAllUserPost);

router
  .route('/:userId/posts/draft')
  .get(getAllUnpublishedPost)
  .post(validatePost(), isValid, createUserDraftPost);

router
  .route('/:userId/posts/publish')
  .get(getAllPublishedPost)
  .post(validatePost(), isValid, createUserPost);

router
  .route('/:userId/posts/:postId')
  .get(getUserPost)
  .put(validatePost(), isValid, updateUserPost)
  .delete(deleteUserPost);

router.route('/:userId/posts/:postId/comments').get(getAllComment);

router
  .route('/:userId/posts/:postId/comments/:commentId')
  .get(getComment)
  .put(validateComment(), isValid, updateComment)
  .delete(deleteComment);

export default router;
