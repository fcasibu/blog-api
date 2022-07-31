import { Schema, model, Types, Document } from 'mongoose';
import { DateTime } from 'luxon';

export interface IPost extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;
  body: string;
  tag: string;
  published: boolean;
  createdAt: Date;
}

const PostSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minLength: 5
  },
  body: {
    type: String,
    required: true,
    minLength: 55,
    maxLength: 5000
  },
  tag: {
    type: String,
    minLength: 2,
    maxLength: 7
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

const Post = model<IPost>('Post', PostSchema);

export default Post;
