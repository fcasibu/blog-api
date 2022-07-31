import User from '../model/user';
import Post from '../model/post';
import Comment from '../model/comment';

import catchAsync from '../utils/catchAsync';

// TODO: Refactor this

// TODO: GET request for all author's post
export const getAllUserPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.params.userId }).exec();
  return res.status(200).json({
    status: 'success',
    posts
  });
});

// TODO: GET request for all author's unpublished post
export const getAllUnpublishedPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({
    author: req.params.userId,
    published: { $eq: false }
  }).exec();

  return res.status(200).json({
    status: 'success',
    posts
  });
});

// TODO: GET request for all author's published post
export const getAllPublishedPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({
    author: req.params.userId,
    published: { $eq: true }
  }).exec();

  return res.status(200).json({
    status: 'success',
    posts
  });
});

// TODO: POST request for author's unpublished post
export const createUserDraftPost = catchAsync(async (req, res, next) => {
  const { title, body } = req.body;
  const author = await User.findById(req.params.userId, '-password').exec();
  const post = await Post.create({
    author,
    title,
    body
  });

  return res.status(201).json({
    status: 'success',
    post
  });
});

// TODO: POST request for author's post
export const createUserPost = catchAsync(async (req, res, next) => {
  const { title, body } = req.body;
  const author = await User.findById(req.params.userId, '-password').exec();
  const post = await Post.create({
    author,
    title,
    body,
    published: true
  });

  return res.status(201).json({
    status: 'success',
    post
  });
});

// TODO: GET request for author's post
export const getUserPost = catchAsync(async (req, res, next) => {
  const commentQuery = Comment.find({ post: req.params.postId }).exec();
  const postQuery = Post.findById(req.params.postId).exec();

  const [post, comments] = await Promise.all([postQuery, commentQuery]);

  if (!post) {
    return next(new Error('Post does not exist'));
  }

  return res.status(200).json({
    status: 'success',
    post,
    comments
  });
});

// TODO: DELETE request for author's post
export const deleteUserPost = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postId).exec();

  return res.status(204).json({
    status: 'success'
  });
});

// TODO: PUT request for author's post
export const updateUserPost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
    new: true
  }).exec();

  if (!post) {
    return next(new Error('Post does not exist'));
  }

  return res.status(200).json({
    status: 'success',
    post
  });
});

export const getAllComment = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId }).exec();

  return res.status(200).json({
    status: 'success',
    comments
  });
});

export const getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).exec();

  return res.status(200).json({
    status: 'success',
    comment
  });
});

// TODO: DELETE request for author's post comment
export const deleteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentId).exec();

  return res.status(204).json({
    status: 'success'
  });
});
// TODO: PUT request for author's post comment
export const updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(
    req.params.commentId,
    req.body,
    {
      new: true
    }
  ).exec();

  return res.status(200).json({
    status: 'success',
    comment
  });
});
