import { Schema, model, Document, Types } from 'mongoose';
import { hash, compare } from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  comparePassword(inputPassword: string): Promise<boolean>;
}

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
  return await compare(inputPassword, this.password);
};

const User = model('User', UserSchema);

export default User;
