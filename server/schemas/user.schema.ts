import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String
});

UserSchema
  .set('minimize', true)
  .set('timestamps', {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

export default UserSchema;
