const express = require('express');
const router = express.Router();
const Community = require('../models/Community');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/communities
// @desc    Get all public communities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find({ isPublic: true })
      .populate('creator', 'username avatar')
      .sort({ createdAt: -1 });
    
    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/communities/:id
// @desc    Get a single community by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('creator', 'username avatar')
      .populate('members', 'username avatar')
      .populate({
        path: 'posts',
        options: { sort: { createdAt: -1 }, limit: 10 },
      });

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    res.json(community);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/communities
// @desc    Create a new community
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, image, category } = req.body;

    const community = await Community.create({
      name,
      description,
      image,
      category,
      creator: req.user._id,
      members: [req.user._id], // Creator automatically becomes a member
    });

    res.status(201).json(community);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create community', error: error.message });
  }
});

// @route   POST /api/communities/:id/join
// @desc    Join a community
// @access  Private
router.post('/:id/join', protect, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if user is already a member
    if (community.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already a member of this community' });
    }

    community.members.push(req.user._id);
    await community.save();

    res.json({ message: 'Successfully joined the community', community });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/communities/:id/leave
// @desc    Leave a community
// @access  Private
router.post('/:id/leave', protect, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    community.members = community.members.filter(
      (memberId) => memberId.toString() !== req.user._id.toString()
    );
    await community.save();

    res.json({ message: 'Successfully left the community' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/communities/user/joined
// @desc    Get communities the current user has joined
// @access  Private
router.get('/user/joined', protect, async (req, res) => {
  try {
    const communities = await Community.find({ members: req.user._id })
      .populate('creator', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(communities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
