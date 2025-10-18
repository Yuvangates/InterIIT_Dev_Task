const express = require('express');
const router = express.Router();
const { getAllComments, createComment, upvoteComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', getAllComments);

router.post('/', protect, createComment);
router.patch('/:id/upvote', protect, upvoteComment);
router.delete('/:id', protect, deleteComment);

module.exports = router;