import React, { useState, useEffect, useContext } from 'react';
import commentService from '../services/commentService';
import CommentList from '../components/Comment/CommentList';
import CommentForm from '../components/Comment/CommentForm';
import { AuthContext } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [comments, setComments] = useState([]);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    commentService.getAll().then((initialComments) => {
      setComments(initialComments.data);
    });
  }, []);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleUpvote = (upvotedComment) => {
    setComments(prevComments => 
      prevComments.map(c => c._id === upvotedComment._id ? upvotedComment : c)
    );
  };

  // Helper function to structure comments into a nested tree
  const nestComments = (commentList) => {
    const commentMap = {};
    commentList.forEach(comment => commentMap[comment._id] = {...comment, children: []});
  
    const nested = [];
    commentList.forEach(comment => {
      if (comment.parent) {
        commentMap[comment.parent]?.children.push(commentMap[comment._id]);
      } else {
        nested.push(commentMap[comment._id]);
      }
    });
    return nested;
  };
  
  const nestedComments = nestComments(comments);

  return (
    <div>
      <header className="home-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <div className="post-container">
        <h2>Comment Down Here</h2>
        <p>This is a placeholder for the main post content. Share your thoughts below!</p>
      </div>

      <CommentForm onCommentAdded={handleAddComment} />
      <CommentList comments={nestedComments} onUpvote={handleUpvote} onReplyAdded={handleAddComment} />
    </div>
  );
};

export default HomePage;