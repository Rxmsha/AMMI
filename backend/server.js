// Main backend file

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const quizRoutes = require('./routes/quiz');
// const bodyParser = require('body-parser');


// Load environment variables
dotenv.config();

// Connection to mongodb
const connectDB = require('./config/db');
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Define routes
app.get('/', (req, res) => {
  res.send("API is running...");
});


// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/quiz', quizRoutes);