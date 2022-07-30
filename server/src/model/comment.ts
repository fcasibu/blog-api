import { Schema, model } from 'mongoose';
import { DateTime } from 'luxon';

const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
    minLength: 500
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

const Comment = model('Comment', CommentSchema);

export default Comment;
