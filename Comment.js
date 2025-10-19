const mongoose = require('mongoose');

/**
 * Defines the schema for the sub-document representing a single comment.
 */
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: { // Denormalized for performance
      type: String,
      required: true,
    },
    avatarUrl: { // Denormalized for performance
      type: String,
    },
    text: {
      type: String,
      required: [true, 'Comment text cannot be empty.'],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt for each comment
  }
);


/**
 * Defines the schema for the main Post model.
 */
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Establishes a relationship to the User model
    },
    imageUrl: {
      type: String,
      required: [true, 'An image URL is required for a post.'],
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        }
      }
    ],
    comments: [commentSchema], // An array of comment sub-documents
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields for the post
  }
);

module.exports = mongoose.model('Post', postSchema);
