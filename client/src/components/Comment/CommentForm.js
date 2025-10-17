import React, { useState } from 'react';
import commentService from '../../services/commentService';
import './CommentForm.css';

const CommentForm = ({ parentId = null, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const newComment = { text, parentId };
      const response = await commentService.create(newComment);
      onCommentAdded(response.data);
      setText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={parentId ? "Write a reply..." : "What are your thoughts?"}
        rows="3"
      ></textarea>
      <button type="submit">
        {parentId ? 'Reply' : 'Comment'}
      </button>
    </form>
  );
};

export default CommentForm;