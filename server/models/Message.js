const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    conversation: {
      type: String,
      required: true,
      index: true, // Index for faster queries
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique conversation ID from two user IDs (sorted to ensure consistency)
messageSchema.statics.createConversationId = function (userId1, userId2) {
  return [userId1, userId2].sort().join('_');
};

// Index for efficient conversation queries
messageSchema.index({ conversation: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
