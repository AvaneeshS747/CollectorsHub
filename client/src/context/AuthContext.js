import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

/**
 * Custom hook to use the AuthContext
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * The AuthProvider component that will wrap our application.
 * It provides authentication state and functions to its children.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Effect to check for an existing token and fetch user data on initial load
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // In a real app, you'd make an API call here to verify the token
          // and get the user's data.
          // For now, we'll simulate it with a mock user.
          console.log('Validating token...');
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
          setUser({ id: '123', username: 'CoinCollector22' });
        } catch (error) {
          console.error('Token validation failed', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [token]);

  /**
   * Logs in the user.
   * In a real app, this would call the login API endpoint.
   */
  const login = async (email, password) => {
    console.log('Attempting login with:', email, password);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newToken = 'fake-jwt-token';
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser({ id: '123', username: 'CoinCollector22' });
    return true; // Indicate success
  };

  /**
   * Signs up a new user.
   * In a real app, this would call the signup API endpoint.
   */
  const signup = async (username, email, password) => {
    console.log('Attempting signup with:', username, email, password);
     // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newToken = 'fake-jwt-token-for-new-user';
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser({ id: '124', username: username });
    return true; // Indicate success
  };


  /**
   * Logs out the user.
   */
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
