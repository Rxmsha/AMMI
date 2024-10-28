// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quizRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', //  frontend URL
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions));
  

// Connect to the Database
connectDB();

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/quiz', quizRoutes); // Mount quiz routes


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

