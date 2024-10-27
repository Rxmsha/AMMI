// Main backend file

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app and connection to mongodb
const app = express();
connectDB();

// Middleware
app.use(express.json());

// Connect route to server
const quizRoutes = require('./routes/quizRoutes'); 
app.use('/api', quizRoutes);  // This line tells Express to prepend /api to all the routes defined in userRoutes. So if userRoutes has a route /users, it will be accessible at /api/users on the server.

// Define routes
app.get('/', (req, res) => {
  res.send("API is running...");
});

// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});