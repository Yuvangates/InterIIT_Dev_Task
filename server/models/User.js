const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // Add these two fields
  email: {
    type: String,
    required: true,
    unique: true // No two users can have the same email
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;