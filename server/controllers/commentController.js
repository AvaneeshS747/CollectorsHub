const Post = require('../models/Post');

/**
 * @desc    Delete a comment from a post
 * @route   DELETE /api/posts/:postId/comments/:commentId
 * @access  Private
 */
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Find the comment to be deleted
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    // Check if the user deleting the comment is the one who made it
    // or the one who owns the post.
    if (comment.user.toString() !== req.user.id && post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this comment.' });
    }

    // Filter out the comment to be removed
    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.commentId
    );

    await post.save();

    res.json({ message: 'Comment removed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting comment.' });
  }
};


/**
 * @desc    Update a comment on a post
 * @route   PUT /api/posts/:postId/comments/:commentId
 * @access  Private
 */
const updateComment = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const comment = post.comments.find(c => c.id === req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.' });
        }

        // Check if the user updating the comment is the one who made it
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this comment.' });
        }

        comment.text = text;
        await post.save();
        
        // Return the entire post with the updated comment
        res.json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating comment.' });
    }
};


module.exports = {
  deleteComment,
  updateComment,
};
