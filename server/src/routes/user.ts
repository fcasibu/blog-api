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

const router = express.Router();

router.use(verify);

router.route('/:userId/posts').get(getAllUserPost);

router
  .route('/:userId/posts/draft')
  .get(getAllUnpublishedPost)
  .post(createUserDraftPost);

router
  .route('/:userId/posts/publish')
  .get(getAllPublishedPost)
  .post(createUserPost);

router
  .route('/:userId/posts/:postId')
  .get(getUserPost)
  .put(updateUserPost)
  .delete(deleteUserPost);

export default router;
