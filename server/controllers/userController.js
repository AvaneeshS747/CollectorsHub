const User = require('../models/User');
const Post = require('../models/Post');

/**
 * @desc    Get user profile by username
 * @route   GET /api/users/:username
 * @access  Public
 */
const getUserProfile = async (req, res) => {
  try {
    // Find the user by their username, excluding their password and email for privacy
    const user = await User.findOne({ username: req.params.username }).select('-password -email');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find all posts created by this user
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });

    // Respond with the user's profile data and their posts
    res.json({
      _id: user._id,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts, // Include the user's posts in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user profile.' });
  }
};


/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.username = req.body.username || user.username;
            user.bio = req.body.bio || user.bio;
            user.avatarUrl = req.body.avatarUrl || user.avatarUrl;

            // Optional: Update password if a new one is provided
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                avatarUrl: updatedUser.avatarUrl,
                bio: updatedUser.bio,
            });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while updating profile.' });
    }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
