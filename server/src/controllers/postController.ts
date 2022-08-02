import Post from '../model/post';
import Comment from '../model/comment';
import catchAsync from '../utils/catchAsync';
import { paginate } from '../utils/paginate';
import sendResponse from '../utils/sendResponse';

// TODO: Get request for posts
export const getAllPost = catchAsync(async (req, res, next) => {
  const skip = paginate(Number(req.query.page ?? 1));
  const posts = await Post.find({ published: { $eq: true } })
    .skip(skip)
    .limit(10)
    .sort('-createdAt')
    .populate({ path: 'author', select: '-password' })
    .populate('commentCount')
    .exec();

  return sendResponse(res, 200, { posts });
});

// TODO: GET reuest for post
export const getPost = catchAsync(async (req, res, next) => {
  const postQuery = Post.findById(req.params.postId).exec();
  const commentQuery = Comment.find({ post: req.params.postId }).exec();
  const [post, comments] = await Promise.all([postQuery, commentQuery]);

  if (!post) return next(new Error('Post does not exist'));

  return sendResponse(res, 200, { post, comments });
});

// TODO: POST request for comment
export const createComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return next(new Error('Post does not exist'));
  const comment = await Comment.create({
    user: req.user,
    text: req.body.text,
    post
  });

  return sendResponse(res, 201, { comment });
});
