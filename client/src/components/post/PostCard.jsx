import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component to display a single post in a card format.
 * It shows the user who posted, the post image, actions (like, comment), and the post description.
 * @param {object} props The props for the component.
 * @param {object} props.post The post data to display.
 * @returns {JSX.Element} The rendered PostCard component.
 */
const PostCard = ({ post }) => {
  // Fallback for missing post data
  if (!post) {
    return null;
  }

  const { user, imageUrl, caption, likes, comments, createdAt } = post;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-xl mx-auto">
      {/* Card Header: User Info */}
      <div className="p-4 flex items-center space-x-3 border-b border-gray-200">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user.avatarUrl}
          alt={`${user.username}'s avatar`}
        />
        <div>
          <p className="font-semibold text-sm text-gray-800">{user.username}</p>
          <p className="text-xs text-gray-500">{createdAt}</p>
        </div>
      </div>

      {/* Card Image */}
      <div className="w-full bg-gray-200">
        <img
          className="w-full h-auto object-cover"
          src={imageUrl}
          alt={`Post by ${user.username}`}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/e2e8f0?text=Image'; }}
        />
      </div>

      {/* Card Actions: Like, Comment */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 focus:outline-none transition-colors">
            {/* Like Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-semibold text-sm">{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 focus:outline-none">
            {/* Comment Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-semibold text-sm">{comments.length}</span>
          </button>
        </div>
      </div>

      {/* Card Content: Caption */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{user.username}</span>{' '}
          {caption}
        </p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  /**
   * The post object containing all necessary data for the card.
   */
  post: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
