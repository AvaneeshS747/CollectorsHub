import { useState } from 'react';

/**
 * A custom hook to handle API requests.
 * It manages the loading, error, and data states for any API call.
 *
 * @param {function} apiFunc - The API function to be called (e.g., login, getPosts).
 * @returns {object} An object containing the data, error, loading state, and a request function.
 */
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Executes the API function.
   * It takes any number of arguments and passes them to the wrapped apiFunc.
   */
  const request = async (...args) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data); // Assuming the API returns data in a 'data' property
      return response;
    } catch (err) {
      console.error("API Error:", err);
      // Set a user-friendly error message
      const errorMessage = err.response?.data?.message || 'An unexpected error occurred.';
      setError(errorMessage);
      throw err; // Re-throw the error so the calling component can also handle it if needed
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};

