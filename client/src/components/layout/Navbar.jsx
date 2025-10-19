import React from 'react';
// import { Link } from 'react-router-dom'; // Note: We will use <Link> instead of <a> once routing is set up.
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.svg';
import Button from './common/Button';

/**
 * The main navigation bar for the application.
 * It displays the logo, a search bar, and navigation links or user actions based on authentication status.
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  // This is a placeholder for authentication logic. In a real app, this would come from a context or state manager.
  const isAuthenticated = false;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side: Logo and Brand Name */}
          <div className="flex-shrink-0">
            {/* TODO: Replace <a> with <Link to="/"> from react-router-dom */}
            <a href="/" className="flex items-center space-x-2">
              <img className="h-8 w-auto" src={logo} alt="CollectorsHub Logo" />
              <span className="hidden sm:block font-bold text-xl text-gray-800">CollectorsHub</span>
            </a>
          </div>

          {/* Middle: Search Bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* Search Icon SVG */}
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search collections..." 
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Right Side: Nav Links & User Actions */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {isAuthenticated ? (
                <>
                  {/* This section will be displayed for logged-in users */}
                  {/* TODO: Replace <a> with <Link> from react-router-dom */}
                  <a href="/create" title="Create Post" className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                  <a href="/profile" className="text-gray-700 hover:text-indigo-600 font-medium">Profile</a>
                </>
              ) : (
                <>
                  {/* This section is for logged-out users */}
                  {/* TODO: Replace <a> with <Link> from react-router-dom */}
                  <a href="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Log In</a>
                  <Button variant="primary" onClick={() => { /* TODO: Navigate to signup page */ }}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button (functionality to be added later) */}
          <div className="-mr-2 flex md:hidden">
            <button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// This component currently doesn't accept any props, but this is good practice for the future.
Navbar.propTypes = {};

export default Navbar;

