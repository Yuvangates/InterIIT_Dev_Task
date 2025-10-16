const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  text: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
