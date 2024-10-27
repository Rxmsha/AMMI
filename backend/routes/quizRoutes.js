// quizRoutes.js

const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get the first question
router.get('/start', async (req, res) => {
  try {
    const firstQuestion = await Question.findOne();
    res.json(firstQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the next question based on the selected option
router.get('/next/:questionId', async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
