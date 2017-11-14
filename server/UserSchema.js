import mongoose from 'mongoose';

mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  gender: {
    type: String
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String
  }
});

UserSchema.methods = {
  //turns mongoose user into javascript object. removes all mongoose methods i.e. .save(), .etc
  toJson: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  }
};

export default mongoose.model('User', UserSchema);
