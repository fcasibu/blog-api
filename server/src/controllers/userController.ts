import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import DataURIParser from 'datauri/parser';

import User from '../model/user';
import Post from '../model/post';
import Comment from '../model/comment';

import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { paginate } from '../utils/paginate';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const parser = new DataURIParser();

const formatBufferTo64 = (file: any) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const cloudinaryUpload = (file: any) => cloudinary.uploader.upload(file);

// TODO: Refactor this
// TODO: GET request for all author's post
export const getAllUserPost = catchAsync(async (req, res, next) => {
  let query = { author: req.params.userId };
  const skip = paginate(Number(req.query.page ?? 1));
  const posts = await Post.find(query)
    .skip(skip)
    .limit(10)
    .sort('-createdAt')
    .populate({ path: 'author', select: '-password' })
    .populate('commentCount')
    .exec();

  return sendResponse(res, 200, { posts });
});

// TODO: GET request for all author's unpublished post
export const getAllUnpublishedPost = catchAsync(async (req, res, next) => {
  let query = { author: req.params.userId, published: { $eq: false } };
  const skip = paginate(Number(req.query.page ?? 1));
  const posts = await Post.find(query)
    .skip(skip)
    .limit(10)
    .sort('-createdAt')
    .populate({ path: 'author', select: '-password' })
    .populate('commentCount')
    .exec();

  return sendResponse(res, 200, { posts });
});

// TODO: GET request for all author's published post
export const getAllPublishedPost = catchAsync(async (req, res, next) => {
  let query = { author: req.params.userId, published: { $eq: true } };
  const skip = paginate(Number(req.query.page ?? 1));
  const posts = await Post.find(query)
    .skip(skip)
    .limit(10)
    .sort('-createdAt')
    .populate({ path: 'author', select: '-password' })
    .populate('commentCount')
    .exec();

  return sendResponse(res, 200, { posts });
});

// TODO: POST request for author's unpublished post
export const createUserDraftPost = catchAsync(async (req, res, next) => {
  const { title, body, tag } = req.body;
  const image = formatBufferTo64(req.file);
  const uploadResult = await cloudinaryUpload(image.content);
  const author = await User.findById(req.params.userId, '-password').exec();
  const post = await Post.create({
    author,
    title,
    body,
    tag,
    image: uploadResult.secure_url
  });

  return sendResponse(res, 201, { post });
});

// TODO: POST request for author's post
export const createUserPost = catchAsync(async (req, res, next) => {
  const { title, body, tag } = req.body;
  const image = formatBufferTo64(req.file);
  const uploadResult = await cloudinaryUpload(image.content);
  const author = await User.findById(req.params.userId, '-password').exec();
  const post = await Post.create({
    author,
    title,
    body,
    tag,
    image: uploadResult.secure_url,
    published: true
  });

  return sendResponse(res, 201, { post });
});

// TODO: GET request for author's post
export const getUserPost = catchAsync(async (req, res, next) => {
  const commentQuery = Comment.find({ post: req.params.postId }).exec();
  const postQuery = Post.findById(req.params.postId).exec();

  const [post, comments] = await Promise.all([postQuery, commentQuery]);

  if (!post) {
    return next(new Error('Post does not exist'));
  }

  return sendResponse(res, 200, { post, comments });
});

// TODO: DELETE request for author's post
export const deleteUserPost = catchAsync(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postId).exec();

  return sendResponse(res, 204, {});
});

// TODO: PUT request for author's post
export const updateUserPost = catchAsync(async (req, res, next) => {
  const image = formatBufferTo64(req.file);
  const uploadResult = await cloudinaryUpload(image.content);
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      ...req.body,
      image: uploadResult.secure_url
    },
    {
      new: true
    }
  ).exec();

  if (!post) {
    return next(new Error('Post does not exist'));
  }

  return sendResponse(res, 200, { post });
});

export const getAllComment = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId }).exec();

  return sendResponse(res, 200, { comments });
});

export const getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId).exec();

  if (!comment) return next(new Error('Comment does not exist'));

  return sendResponse(res, 200, { comment });
});

// TODO: DELETE request for author's post comment
export const deleteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentId).exec();

  return sendResponse(res, 204, {});
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

  if (!comment) return next(new Error('Comment does not exist'));

  return sendResponse(res, 200, { comment });
});
