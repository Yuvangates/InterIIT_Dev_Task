import React, { useState,useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';
import { AuthContext } from '../../context/AuthContext';
import './Comment.css';

const Comment = ({ comment, onUpvote, onReplyAdded, onDelete}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { user } = useContext(AuthContext);

  const handleUpvoteClick = async () => {
    try {
      const updatedComment = await commentService.upvote(comment._id);
      onUpvote(updatedComment.data);
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  const handleReplyAdded = (newReply) => {
    setShowReplyForm(false);
    onReplyAdded(newReply);
  }

 const handleDeleteClick = async () => {
    try {
      await commentService.remove(comment._id);
      onDelete(comment._id); 
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const isAuthor = user && user._id === comment.user._id;

  return (
    <div className="comment-container">
      <div className="comment-main">
        <div className="comment-sidebar">
           <div className="comment-threadline"></div>
        </div>
        <div className="comment-body">
            <div className="comment-header">
              <img src={comment.user.avatar} alt={comment.user.name} className="comment-avatar" />
              <span className="comment-author">{comment.user.name}</span>
              <span className="comment-date">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
            <p className="comment-text">{comment.text}</p>
            <div className="comment-actions">
              <button onClick={handleUpvoteClick} className="action-btn">
                👍 {comment.upvotes}
              </button>
              <button onClick={() => setShowReplyForm(!showReplyForm)} className="action-btn">
                Reply
            </button>
            {isAuthor && (
                <button onClick={handleDeleteClick} className="action-btn delete-btn">
                  Delete
                </button>
              )}
            </div>
        </div>
      </div>
      
      {showReplyForm && (
        <div className="reply-form-container">
          <CommentForm parentId={comment._id} onCommentAdded={handleReplyAdded} />
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="comment-children">
            <CommentList comments={comment.children} onUpvote={onUpvote} onReplyAdded={onReplyAdded} onDelete={onDelete}/>
        </div>
      )}
    </div>
  );
};

export default Comment;