import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

import UserSchema from '../../schemas/user.schema';

/**
 * Pre-save hook
 * Before saving the user, hash the password
 */
UserSchema.pre('save', function(next): void {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Methods
 */
UserSchema.methods.comparePassword = function(candidatePassword, callback): void {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

/**
 * Omit the password when returning a user
 */
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

/**
 * Model
 */
const User =  mongoose.model('User', UserSchema, 'users');

export default User;
