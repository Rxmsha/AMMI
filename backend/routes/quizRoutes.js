const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion'); // Import model
const Result = require('../models/Result');

// Determine the next question ID based on the current question and user response
const determineNextQuestionId = async (currentQuestionId, userResponse, userStatus) => {
  const currentQuestion = await QuizQuestion.findById(currentQuestionId);
  const nextQuestionId = currentQuestion?.next[userResponse];

  // If the next question ID is "goToNextQuestion", find the next question in the collection
  if (nextQuestionId === 'goToNextQuestion') {
    const nextQuestion = await QuizQuestion.findOne({ _id: { $gt: currentQuestionId }, status: { $in: [userStatus] } }).sort({ _id: 1 });
    return nextQuestion ? nextQuestion._id : null;
  }

  // Fetch the next question to check its status
  if (nextQuestionId) {
    const nextQuestion = await QuizQuestion.findById(nextQuestionId);
    // Check if the next question's status allows for the user's status
    if (nextQuestion && nextQuestion.status.includes(userStatus)) {
      return nextQuestionId;
    }
  }
  
  return null; // No valid next question found
};

// Endpoint to fetch the first question for a specific status
router.get('/:status/first-question', async (req, res) => {
  const { status } = req.params;
  try {
    // Fetch the first question for the specified status
    const firstQuestion = await QuizQuestion.findOne({ status: { $in: [status] } }).sort({ _id: 1 }); // Use $in operator to check if status array contains the provided status

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

// Endpoint to fetch the next question based on progress for a specific status
router.get('/:status/next-question', async (req, res) => {
  const { status } = req.params;
  try {
    // If there is a last question ID, fetch the current question
    if (req.session.lastQuestionId) {
      const currentQuestion = await QuizQuestion.findById(req.session.lastQuestionId);
      
      if (!currentQuestion) {
        return res.status(404).json({ message: "No more questions available." });
      }

      // Determine the next question based on the user's response
      const nextQuestionId = currentQuestion.next[req.session.userResponse]; // Store user response in the session before this call
      if (!nextQuestionId) {
        return res.status(404).json({ message: "No more questions available." });
      }

      // Update session with the next question ID
      req.session.lastQuestionId = nextQuestionId;

      const nextQuestion = await QuizQuestion.findById(nextQuestionId);
      return res.json(nextQuestion);
    } else {
      // If no last question ID, start from the first question
      const firstQuestion = await QuizQuestion.findOne({ status: { $in: [status] } });
      if (!firstQuestion) {
        return res.status(404).json({ message: "No questions available." });
      }
      req.session.lastQuestionId = firstQuestion._id; // Save the first question ID
      return res.json(firstQuestion);
    }
  } catch (error) {
    console.error("Error fetching next question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to fetch the next question based on user response for a specific status
router.post('/:status/answer', async (req, res) => {
  const { currentQuestionId, userResponse } = req.body;
  const { status } = req.params;

  try {
    // Pass userStatus to determineNextQuestionId
    const nextQuestionId = await determineNextQuestionId(currentQuestionId, userResponse, status);
    
    if (!nextQuestionId) {
      return res.status(200).json({ message: "Quiz ended" }); // Indicate quiz end
    }

    req.session.lastQuestionId = nextQuestionId; // Set lastQuestionId here
    req.session.userResponse = userResponse; // Save user response to the session

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

  if (!questionData.question || !questionData.options || !questionData.status) {
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

// Endpoint to fetch results by question ID
router.get('/results/:questionId', async (req, res) => {
  const { questionId } = req.params;
  try {
    const result = await Result.findOne({ questionId });
    if (!result) {
      return res.status(404).json({ message: "Results not found." });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;