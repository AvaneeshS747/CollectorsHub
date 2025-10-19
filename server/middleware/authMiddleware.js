const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We need to access the User model

/**
 * Middleware to protect routes that require authentication.
 * It verifies the JWT from the Authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Get user from the token's ID and attach it to the request object
      // We exclude the password from the user object for security.
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found.' });
      }

      // 4. Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  // If no token is found in the header
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

module.exports = { protect };
