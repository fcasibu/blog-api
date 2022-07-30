import { Schema, model } from 'mongoose';
import { DateTime } from 'luxon';

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minLength: 55
  },
  body: {
    type: String,
    required: true,
    minLength: 5000
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PostSchema.virtual('formattedDate').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
});

const Post = model('Post', PostSchema);

export default Post;
