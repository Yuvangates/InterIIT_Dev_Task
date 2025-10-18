import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onUpvote, onReplyAdded, onDelete }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onUpvote={onUpvote} onReplyAdded={onReplyAdded} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CommentList;