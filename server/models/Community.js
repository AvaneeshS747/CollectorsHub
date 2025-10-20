const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Community name is required'],
      trim: true,
      maxlength: [100, 'Community name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Community description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    image: {
      type: String,
      default: 'https://placehold.co/400x200/6366f1/ffffff?text=Community',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    category: {
      type: String,
      enum: ['coins', 'cards', 'vehicles', 'stamps', 'toys', 'art', 'other'],
      default: 'other',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for member count
communitySchema.virtual('memberCount').get(function () {
  return this.members.length;
});

// Virtual for post count
communitySchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// Ensure virtuals are included in JSON
communitySchema.set('toJSON', { virtuals: true });
communitySchema.set('toObject', { virtuals: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
