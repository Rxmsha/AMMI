const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion'); // Import model

// Endpoint to fetch the next question
router.get('/next-question', async (req, res) => {
  try {
    const nextQuestion = await QuizQuestion.findOne(); // Fetch the first question
    if (!nextQuestion) {
      return res.status(404).json({ message: "No more questions available." });
    }
    res.json(nextQuestion);
  } catch (error) {
    console.error("Error fetching next question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to create a new quiz question
router.post('/questions', async (req, res) => {
  const questionData = req.body;

  if (!questionData.question || !questionData.options) {
    return res.status(400).json({ success: false, message: 'Please enter all fields' });
  }

  const newQuestion = new QuizQuestion(questionData);

  try {
    await newQuestion.save();
    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    console.error('Error creating quiz question:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
