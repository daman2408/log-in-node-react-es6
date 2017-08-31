import mongoose from 'mongoose';

function capitalize (val) {
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1);
};

var UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
      set: capitalize,
      required: true
    },
    last_name: {
      type: String,
      set: capitalize,
      required: true
    },
    gender: {
      type: String,
      set: capitalize
    },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', UserSchema);
