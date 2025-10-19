import apiClient from './api'; // We will create the apiClient in another step

/**
 * Service for handling user-related API requests.
 */
const userService = {
  /**
   * Fetches a user's public profile by their username.
   * @param {string} username - The username of the user to fetch.
   * @returns {Promise<object>} The user's profile data.
   */
  getUserProfile: async (username) => {
    const response = await apiClient.get(`/users/${username}`);
    return response.data;
  },

  /**
   * Updates the currently authenticated user's profile.
   * @param {object} profileData - The data to update (e.g., { bio, avatarUrl }).
   * Note: The server will identify the user via the auth token.
   * @returns {Promise<object>} The updated user profile data.
   */
  updateUserProfile: async (profileData) => {
    // The endpoint might be something like '/users/me' to update the current user
    const response = await apiClient.put('/users/me', profileData);
    return response.data;
  },

  /**
   * Follows another user.
   * @param {string} userId - The ID of the user to follow.
   * @returns {Promise<object>} A confirmation message or updated user data.
   */
  followUser: async (userId) => {
    const response = await apiClient.post(`/users/${userId}/follow`);
    return response.data;
  },

  /**
   * Unfollows another user.
   * @param {string} userId - The ID of the user to unfollow.
   * @returns {Promise<object>} A confirmation message or updated user data.
   */
  unfollowUser: async (userId) => {
    const response = await apiClient.delete(`/users/${userId}/follow`);
    return response.data;
  },
};

export default userService;
