const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Comment text cannot be empty'],
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment', 
    default: null,
  },
}, { 
  timestamps: true 
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;