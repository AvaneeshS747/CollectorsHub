import React, { useState } from 'react';
import InputField from 'components/common/InputField.jsx';
import Button from 'components/common/Button.jsx';
import logo from 'assets/images/logo.svg';

// TODO: Replace 'a' tags with '<Link>' from react-router-dom once routing is set up.

/**
 * The Signup page component.
 * It provides a form for new users to create an account.
 */
const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // TODO: Implement actual signup logic (e.g., API call)
    console.log('Signing up with:', { username, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <img src={logo} alt="CollectorsHub Logo" className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username"
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
          />
          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <InputField
            label="Confirm Password"
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div>
            <Button type="submit" variant="primary" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

