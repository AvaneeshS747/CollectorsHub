import apiClient from './api'; // We will create the apiClient in another step

/**
 * Service for handling post-related API requests.
 */
const postService = {
  /**
   * Fetches all posts from the server.
   * @returns {Promise<Array>} A list of all posts.
   */
  getAllPosts: async () => {
    const response = await apiClient.get('/posts');
    return response.data;
  },

  /**
   * Fetches a single post by its ID.
   * @param {string} postId - The ID of the post to fetch.
   * @returns {Promise<object>} The post object.
   */
  getPostById: async (postId) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  },

  /**
   * Creates a new post.
   * @param {FormData} postData - The post data, including image and caption.
   * Use FormData because we are uploading a file.
   * @returns {Promise<object>} The newly created post object.
   */
  createPost: async (postData) => {
    const response = await apiClient.post('/posts', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Adds a "like" to a specific post.
   * @param {string} postId - The ID of the post to like.
   * @returns {Promise<object>} The updated post object with the new like count.
   */
  likePost: async (postId) => {
    const response = await apiClient.post(`/posts/${postId}/like`);
    return response.data;
  },

  /**
   * Adds a comment to a specific post.
   * @param {string} postId - The ID of the post to comment on.
   * @param {object} commentData - An object containing the comment text, e.g., { text: 'Great post!' }.
   * @returns {Promise<object>} The updated post with the new comment.
   */
  addComment: async (postId, commentData) => {
    const response = await apiClient.post(`/posts/${postId}/comments`, commentData);
    return response.data;
  },
};

export default postService;
