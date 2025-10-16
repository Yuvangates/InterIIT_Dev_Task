const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
require('dotenv').config({path:'../.env'}); // Corrected path for .env

// Import routes (we will create these files next)
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to make requests to this server
app.use(express.json()); // Parses incoming JSON requests and puts the data in `req.body`

const dbURL = process.env.dbURL;

mongoose.connect(dbURL)
  .then(() => app.listen(3000, () => console.log('✅ Server running on port 3000'))) // Changed to 5000 to avoid conflicts with client
  .catch(err => console.log('❌ DB Connection Error:', err));

// Use the routes
app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth
app.use('/api/comments', commentRoutes); // All comment routes will start with /api/comments