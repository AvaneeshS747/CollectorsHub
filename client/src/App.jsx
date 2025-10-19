import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Page Components
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

// Import Global Context Provider
import { AuthProvider } from './context/AuthContext.js';

/**
 * The root component of the application.
 * It sets up the main router and wraps the application with the AuthProvider
 * to make authentication state available globally.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-sans">
          <Routes>
            {/* Publicly Accessible Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            
            {/* Protected Routes */}
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback Route */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen bg-gray-100">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-indigo-600">404</h1>
                    <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

