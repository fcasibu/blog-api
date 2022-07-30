import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 8
  },
  lastName: {
    type: String,
    required: true,
    minLength: 8
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  passwordConfirm: {
    type: String,
    required: true,
    minLength: 8
  }
});

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('postCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  count: true
});

const User = model('User', UserSchema);

export default User;
