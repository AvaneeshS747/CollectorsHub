import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/**
 * Chat Page where connected collectors can message each other
 */
const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      username: 'CoinCollector22',
      avatar: 'https://placehold.co/100x100/a3e635/ffffff?text=CC',
      lastMessage: 'That Roman coin is amazing!',
      timestamp: '2m ago',
      unread: 2,
    },
    {
      id: 2,
      username: 'CardShark',
      avatar: 'https://placehold.co/100x100/93c5fd/ffffff?text=CS',
      lastMessage: 'Want to trade cards?',
      timestamp: '1h ago',
      unread: 0,
    },
    {
      id: 3,
      username: 'BikeLife',
      avatar: 'https://placehold.co/100x100/fcd34d/ffffff?text=BL',
      lastMessage: 'Check out my new motorcycle!',
      timestamp: '3h ago',
      unread: 1,
    },
  ];

  // Mock messages for selected conversation
  const messages = selectedChat
    ? [
        { id: 1, sender: 'them', text: 'Hey! I saw your collection post.', timestamp: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Thanks! I\'ve been collecting for years.', timestamp: '10:32 AM' },
        { id: 3, sender: 'them', text: 'That Roman coin is amazing!', timestamp: '10:33 AM' },
        { id: 4, sender: 'me', text: 'Thank you! It\'s one of my favorites.', timestamp: '10:35 AM' },
      ]
    : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      // TODO: Implement actual message sending
      setMessageText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6 overflow-hidden">
        <div className="h-full bg-white rounded-lg shadow-md flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat?.id === conv.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={conv.avatar}
                      alt={conv.username}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="font-semibold text-gray-800 truncate">{conv.username}</p>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.username}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedChat.username}</h3>
                    <p className="text-xs text-gray-500">Active now</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'me'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="mt-2">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
