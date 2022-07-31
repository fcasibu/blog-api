import { Schema, model, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IComment extends Document {
  _id: Types.ObjectId;
  post: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema({
  post: {
    type: Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.virtual('formattedDate').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

CommentSchema.virtual('relativeTime').get(function () {
  return DateTime.fromJSDate(this.createdAt).toRelativeCalendar();
});

const Comment = model<IComment>('Comment', CommentSchema);

export default Comment;
