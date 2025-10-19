const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/users/:username
// @desc    Get a user's public profile
// @access  Public
router.route('/:username').get(getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update the logged-in user's profile
// @access  Private
router.route('/profile').put(protect, updateUserProfile);


module.exports = router;
