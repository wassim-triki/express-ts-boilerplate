import { Document, Model, model, Schema, Date } from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { IUser } from './IUser';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(config.bcrypt.saltRounds);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
export const User = model<IUser>('User', userSchema);
