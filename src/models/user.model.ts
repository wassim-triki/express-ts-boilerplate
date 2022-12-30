import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { config } from '../config/config';
import { IUser } from '../interfaces/IUser';

const userSchema = new Schema(
  {
    username: {
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
      minlength: config.validation.password.minLength,
      maxLength: config.validation.password.maxLength,
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
