import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

/**
 * Custom hook for accessing the authentication context.
 * This provides an easy way to get the current user, login/logout functions, etc.
 * from any component wrapped in an AuthProvider.
 *
 * It also throws an error if used outside of an AuthProvider, which helps catch bugs early.
 *
 * @returns {object} The authentication context value.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

