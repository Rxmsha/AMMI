// Quiz Router to fetch questions and submit user responses

const express = require('express');
const QuizQuestion = require('./models/QuizQuestion');
const UserResponse = require('./models/UserResponse');

const router = express.Router();

// Get all quiz questions
router.get('/quiz-questions', async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
});

// Submit a user response
router.post('/user-responses', async (req, res) => {
  const { questionId, selectedOption, userId } = req.body;
  try {
    const response = new UserResponse({ questionId, selectedOption, userId });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error saving response' });
  }
});

module.exports = router;
