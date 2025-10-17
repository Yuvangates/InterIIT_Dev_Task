const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'name avatar') 
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching comments' });
  }
};

exports.createComment = async (req, res) => {
  const { text, parentId } = req.body;
  const userId = req.user; 

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const comment = await Comment.create({
      text,
      parent: parentId || null, 
      user: userId,
    });
    
    const populatedComment = await Comment.findById(comment._id).populate('user', 'name avatar');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating comment' });
  }
};

exports.upvoteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.upvotes += 1;
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate('user', 'name avatar');
    res.json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error upvoting comment' });
  }
};
