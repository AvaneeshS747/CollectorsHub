import apiClient from './api'; // We will create the apiClient in another step

/**
 * Service object for handling authentication-related API requests.
 */
const authService = {
  /**
   * Sends a login request to the server.
   * @param {object} credentials - The user's credentials ({ email, password }).
   * @returns {Promise<object>} The server's response, including the user data and token.
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    // If the login is successful and a token is returned, store it.
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Sends a signup request to the server.
   * @param {object} userData - The new user's information ({ username, email, password }).
   * @returns {Promise<object>} The server's response, including the new user data and token.
   */
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    // If signup is successful and a token is returned, store it.
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  /**
   * Logs the user out by removing the token from local storage.
   */
  logout: () => {
    localStorage.removeItem('token');
    // In a real app, you might also want to send a request to the server
    // to invalidate the session/token.
  },

  /**
   * Checks for a token in local storage to see if a user is currently logged in.
   * @returns {string|null} The stored token, or null if it doesn't exist.
   */
  getCurrentUserToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
