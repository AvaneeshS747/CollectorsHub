const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/messages/conversations
// @desc    Get all conversations for the current user
// @access  Private
router.get('/conversations', protect, async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Get all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar')
      .sort({ createdAt: -1 });

    // Group messages by conversation and get latest message
    const conversationsMap = new Map();

    messages.forEach((message) => {
      const conversationId = message.conversation;

      if (!conversationsMap.has(conversationId)) {
        // Determine the other user in the conversation
        const otherUser =
          message.sender._id.toString() === userId ? message.receiver : message.sender;

        conversationsMap.set(conversationId, {
          conversationId,
          user: otherUser,
          lastMessage: message.content,
          timestamp: message.createdAt,
          unreadCount: 0,
        });
      }

      // Count unread messages
      if (
        message.receiver._id.toString() === userId &&
        !message.isRead
      ) {
        conversationsMap.get(conversationId).unreadCount++;
      }
    });

    const conversations = Array.from(conversationsMap.values());

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/messages/:userId
// @desc    Get all messages in a conversation with a specific user
// @access  Private
router.get('/:userId', protect, async (req, res) => {
  try {
    const currentUserId = req.user._id.toString();
    const otherUserId = req.params.userId;

    const conversationId = Message.createConversationId(currentUserId, otherUserId);

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar')
      .sort({ createdAt: 1 });

    // Mark messages as read
    await Message.updateMany(
      {
        conversation: conversationId,
        receiver: currentUserId,
        isRead: false,
      },
      { isRead: true }
    );

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/messages/:userId
// @desc    Send a message to a specific user
// @access  Private
router.post('/:userId', protect, async (req, res) => {
  try {
    const { content } = req.body;
    const senderId = req.user._id.toString();
    const receiverId = req.params.userId;

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Message content is required' });
    }

    // Verify receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const conversationId = Message.createConversationId(senderId, receiverId);

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: content.trim(),
      conversation: conversationId,
    });

    await message.populate('sender', 'username avatar');
    await message.populate('receiver', 'username avatar');

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Failed to send message', error: error.message });
  }
});

// @route   DELETE /api/messages/:messageId
// @desc    Delete a message
// @access  Private
router.delete('/:messageId', protect, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Only the sender can delete their message
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message' });
    }

    await message.deleteOne();

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
