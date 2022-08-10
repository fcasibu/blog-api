import Post from '../model/post';
import Comment from '../model/comment';
import catchAsync from '../utils/catchAsync';
import { paginate } from '../utils/paginate';
import sendResponse from '../utils/sendResponse';

interface IQuery {
  published: { $eq: boolean };
  tag: { $in: string };
}

// TODO: Get request for posts
export const getAllPost = catchAsync(async (req, res, next) => {
  const query = { published: { $eq: true } } as IQuery;
  if (req.query.tag) query.tag = { $in: req.query.tag as string };
  const skip = paginate(Number(req.query.page ?? 1));
  const posts = await Post.find(query)
    .skip(skip)
    .limit(10)
    .sort('createdAt')
    .populate({ path: 'author', select: '-password' })
    .populate('commentCount')
    .exec();

  return sendResponse(res, 200, { posts });
});

// TODO: GET reuest for post
export const getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({
    _id: req.params.postId,
    published: { $eq: true }
  })
    .populate({ path: 'author', select: 'username' })
    .exec();

  if (!post) return next(new Error('Post does not exist'));

  const comments = await Comment.find({ post: req.params.postId })
    .select('-post')
    .limit(10)
    .sort('-createdAt')
    .populate({ path: 'user', select: 'username' })
    .exec();

  return sendResponse(res, 200, { post, comments });
});

export const getAllComment = catchAsync(async (req, res, next) => {
  const skip = paginate(Number(req.query.page ?? 1));
  const comments = await Comment.find({ post: req.params.postId })
    .select('-post')
    .skip(skip)
    .limit(10)
    .sort('-createdAt')
    .populate('user', 'username')
    .exec();

  return sendResponse(res, 200, { comments });
})

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

export const getAllNewPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ published: { $eq: true } })
    .sort('-createdAt')
    .limit(3);

  return sendResponse(res, 200, { posts });
});

export const getAllTag = catchAsync(async (req, res, next) => {
  const tags = await Post.aggregate([
    { $match: { published: { $eq: true } } },
    { $group: { _id: '$tag' } },
    { $addFields: { tag: '$_id' } },
    { $project: { _id: 0 } }
  ]);

  return sendResponse(res, 200, { tags });
});
