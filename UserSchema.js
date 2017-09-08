import mongoose from 'mongoose';

mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    gender: {
      type: String,
    },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  }
});

export default mongoose.model('User', UserSchema);
