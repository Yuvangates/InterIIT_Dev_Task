import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onUpvote, onReplyAdded }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} onUpvote={onUpvote} onReplyAdded={onReplyAdded} />
      ))}
    </div>
  );
};

export default CommentList;