const express = require('express');
const router = express.Router();
const { getAllComments, createComment, upvoteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware'); 

router.get('/', getAllComments);

router.post('/', protect, createComment);
router.patch('/:id/upvote', protect, upvoteComment);

module.exports = router;
