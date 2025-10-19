import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component to display a single comment.
 * It shows the commenter's avatar, username, text, and when the comment was made.
 * @param {object} props The props for the component.
 * @param {object} props.comment The comment data to display.
 * @returns {JSX.Element} The rendered Comment component.
 */
const Comment = ({ comment }) => {
  if (!comment) {
    return null;
  }

  const { user, text, createdAt } = comment;

  return (
    <div className="flex items-start space-x-3">
      <img
        className="h-8 w-8 rounded-full object-cover"
        src={user.avatarUrl}
        alt={`${user.username}'s avatar`}
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/32x32/cbd5e0/cbd5e0?text='; }}
      />
      <div className="flex-1">
        <p className="text-sm bg-gray-100 p-2 rounded-lg">
          <span className="font-semibold text-gray-800 block">{user.username}</span>
          {text}
        </p>
        <p className="text-xs text-gray-400 mt-1 px-2">{createdAt}</p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  /**
   * The comment object containing all necessary data.
   */
  comment: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
