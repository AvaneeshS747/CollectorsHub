import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import Button from '../common/Button';

/**
 * A component to display the detailed view of a single post.
 * It shows the post image, user info, caption, and a full comment section.
 * @param {object} props The props for the component.
 * @param {object} props.post The post data to display.
 * @returns {JSX.Element} The rendered PostDetails component.
 */
const PostDetails = ({ post }) => {
  // Fallback for missing post data
  if (!post) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500">Post not found.</p>
        </div>
    );
  }

  const { user, imageUrl, caption, likes, comments, createdAt } = post;

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white rounded-lg shadow-lg md:flex md:space-x-6">
      {/* Left Side: Image */}
      <div className="md:w-1/2">
        <img
          className="w-full h-auto rounded-lg object-cover"
          src={imageUrl}
          alt={`Post by ${user.username}`}
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x800/e2e8f0/e2e8f0?text=Image'; }}
        />
      </div>

      {/* Right Side: Content and Comments */}
      <div className="md:w-1/2 mt-4 md:mt-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={user.avatarUrl}
            alt={`${user.username}'s avatar`}
          />
          <div>
            <p className="font-bold text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-500">{createdAt}</p>
          </div>
        </div>
        
        {/* Caption */}
        <div className="py-4 text-gray-700">
          <p>{caption}</p>
        </div>
        
        {/* Likes */}
         <div className="py-2 flex items-center space-x-2">
            <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-gray-800">{likes} likes</span>
        </div>

        {/* Comments Section */}
        <div className="flex-grow overflow-y-auto py-4 border-t border-gray-200 space-y-4">
          <h3 className="font-semibold text-lg text-gray-800">Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={comment.user.avatarUrl}
                  alt={`${comment.user.username}'s avatar`}
                />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">{comment.user.username}</span>{' '}
                    {comment.text}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{comment.createdAt}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="mt-auto pt-4 border-t border-gray-200">
            <form className="flex space-x-2">
                <InputField
                    id="new-comment"
                    name="new-comment"
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full"
                />
                <Button type="submit" variant="primary">Post</Button>
            </form>
        </div>
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  /**
   * The post object containing all necessary data.
   */
  post: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          username: PropTypes.string.isRequired,
          avatarUrl: PropTypes.string.isRequired,
        }).isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ).isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

// Providing default props for when the component is used in isolation (e.g., Storybook)
PostDetails.defaultProps = {
    post: null,
};


export default PostDetails;

