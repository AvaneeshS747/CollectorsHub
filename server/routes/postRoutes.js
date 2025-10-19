const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
  likePost,
  addComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/posts
// @desc    Fetch all posts
// @access  Public
router.route('/').get(getPosts);

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.route('/').post(protect, createPost);

// @route   GET /api/posts/:id
// @desc    Fetch a single post by its ID
// @access  Public
router.route('/:id').get(getPostById);

// @route   PUT /api/posts/:id/like
// @desc    Like or unlike a post
// @access  Private
router.route('/:id/like').put(protect, likePost);

// @route   POST /api/posts/:id/comment
// @desc    Add a comment to a post
// @access  Private
router.route('/:id/comment').post(protect, addComment);

module.exports = router;
