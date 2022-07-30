import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

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

UserSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (inputPassword: string) {
  return compare(inputPassword, this.password);
};

const User = model('User', UserSchema);

export default User;
