// API ENDPOINT 
// This file defines the API routes for the quiz application. I have a route to fetch the next question but it does not take user responses into account.

const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion'); // Import model


// CORRECT ONEE
// Function to determine the next question ID based on the current question and user response
const determineNextQuestionId = async (currentQuestionId, userResponse) => {
  const nextQuestionMapping = {
    "q1": {
      "Yes": "q2",
      "No": "q3"
    },
    // Add more mappings as needed
  };

  // Get the next question ID based on the current question ID and user response
  return nextQuestionMapping[currentQuestionId]?.[userResponse] || null;
};


// Endpoint to fetch the first question
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

// Endpoint to fetch the next question based on current question ID and user response
router.get('/next-question/:currentQuestionId/:userResponse', async (req, res) => {
  const { currentQuestionId, userResponse } = req.params;

  try {
    // Logic to determine the next question based on user response
    const nextQuestionId = await determineNextQuestionId(currentQuestionId, userResponse);
    
    const nextQuestion = await QuizQuestion.findById(nextQuestionId);
    
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
