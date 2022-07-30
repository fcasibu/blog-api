import express from 'express';
import { verify } from '../controllers/authController';
import {
  createUserDraftPost,
  createUserPost,
  deleteUserPost,
  getAllPublishedPost,
  getAllUnpublishedPost,
  getAllUserPost,
  getUserPost,
  updateUserPost
} from '../controllers/userController';
import isValid from '../middlewares/isValid';
import { validatePost } from '../utils/validators';

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

export default router;
