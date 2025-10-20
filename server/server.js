const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// --- Local Imports ---
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/messages', messageRoutes);

// --- Deployment Configuration ---
// The following code will run only in production
if (process.env.NODE_ENV === 'production') {
  // Set the static folder for the built React application
  app.use(express.static(path.join(__dirname, '/client/build')));

  // For any route that is not an API route, serve the React app's index.html file
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  // Simple route for checking if the API is running in development
  app.get('/', (req, res) => {
    res.send('API for CollectorsHub is running...');
  });
}

// Define the port the server will run on
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

