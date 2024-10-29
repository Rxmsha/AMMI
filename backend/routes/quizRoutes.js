const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion'); // Import model
const QuizProgress = require('../models/QuizProgress');

// Determine the next question ID based on the current question and user response
const determineNextQuestionId = async (currentQuestionId, userResponse) => {
  const currentQuestion = await QuizQuestion.findById(currentQuestionId);
  return currentQuestion?.next[userResponse] || null;
};

// Endpoint to fetch the first question
router.get('/first-question', async (req, res) => {
  try {
    // Fetch the first question in the database
    const firstQuestion = await QuizQuestion.findOne().sort({ _id: 1 }); // Sort by _id to ensure the first question is fetched

    if (!firstQuestion) {
      return res.status(404).json({ message: "No questions available." });
    }

    // Update session with the first question ID
    req.session.lastQuestionId = firstQuestion._id;

    res.json(firstQuestion);
  } catch (error) {
    console.error("Error fetching the first question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to fetch the next question based on progress
router.get('/next-question', async (req, res) => {
  try {
    let nextQuestion;

    if (req.session.lastQuestionId) {
      // Resume from the last question in the session
      nextQuestion = await QuizQuestion.findById(req.session.lastQuestionId);
    } else {
      // Start with the first question
      nextQuestion = await QuizQuestion.findOne();
      req.session.lastQuestionId = nextQuestion._id;
    }

    if (!nextQuestion) {
      return res.status(404).json({ message: "No more questions available." });
    }

    res.json(nextQuestion);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to fetch the next question based on user response
router.post('/answer', async (req, res) => {
  const { currentQuestionId, userResponse } = req.body;

  try {
    const nextQuestionId = await determineNextQuestionId(currentQuestionId, userResponse);

    if (!nextQuestionId) {
      return res.status(404).json({ message: "No more questions available." });
    }

    req.session.lastQuestionId = nextQuestionId; // Set lastQuestionId here

    const nextQuestion = await QuizQuestion.findById(nextQuestionId);
    res.json(nextQuestion);
  } catch (error) {
    console.error("Error fetching next question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to fetch a specific question by ID
router.get('/question/:id', async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
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
