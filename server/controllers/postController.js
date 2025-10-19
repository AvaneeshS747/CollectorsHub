const Post = require('../models/Post'); // We will create this model next
const User = require('../models/User');

/**
 * @desc    Fetch all posts
 * @route   GET /api/posts
 * @access  Public
 */
const getPosts = async (req, res) => {
  try {
    // Find all posts and sort them by creation date (newest first)
    const posts = await Post.find({}).sort({ createdAt: -1 }).populate('user', 'username avatarUrl');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
};

/**
 * @desc    Fetch a single post by ID
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username avatarUrl')
      .populate('comments.user', 'username avatarUrl');

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching the post.' });
  }
};


/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
const createPost = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image URL is required.' });
    }

    const post = new Post({
      user: req.user.id, // This comes from our auth middleware
      imageUrl,
      caption,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
};


/**
 * @desc    Like a post
 * @route   PUT /api/posts/:id/like
 * @access  Private
 */
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the post has already been liked by this user
        if (post.likes.some((like) => like.user.toString() === req.user.id)) {
            // Unlike the post
            post.likes = post.likes.filter(
                (like) => like.user.toString() !== req.user.id
            );
        } else {
            // Like the post
            post.likes.unshift({ user: req.user.id });
        }

        await post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while liking post.' });
    }
};

/**
 * @desc    Add a comment to a post
 * @route   POST /api/posts/:id/comment
 * @access  Private
 */
const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        const newComment = {
            text: req.body.text,
            user: req.user.id,
            username: user.username,
            avatarUrl: user.avatarUrl,
        };

        post.comments.unshift(newComment);

        await post.save();
        res.status(201).json(post.comments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while adding comment.' });
    }
};


module.exports = {
  getPosts,
  getPostById,
  createPost,
  likePost,
  addComment,
};

