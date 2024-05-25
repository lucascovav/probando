const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    mail: String,
    password: String,
    phone: String,
    jobs: [String]
});

  const UserModel = mongoose.model('User', UserSchema);

  module.exports = {
    UserModel, 
    UserSchema
  };