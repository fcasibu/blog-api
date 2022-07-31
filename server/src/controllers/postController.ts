import Post from '../model/post';
import Comment from '../model/comment';
import catchAsync from '../utils/catchAsync';

// TODO: Get request for posts
export const getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ published: { $eq: true } }).exec();

  return res.status(200).json({
    status: 'success',
    posts
  });
});

// TODO: GET reuest for post
export const getPost = catchAsync(async (req, res, next) => {
  const postQuery = Post.findById(req.params.postId).exec();
  const commentQuery = Comment.find({ post: req.params.postId }).exec();
  const [post, comments] = await Promise.all([postQuery, commentQuery]);

  return res.status(200).json({
    status: 'success',
    post,
    comments
  });
});

// TODO: POST request for comment
export const createComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  const comment = await Comment.create({
    user: req.user,
    text: req.body.text,
    post
  });

  return res.status(201).json({
    status: 'success',
    comment
  });
});
