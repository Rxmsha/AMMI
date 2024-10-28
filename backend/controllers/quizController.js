// QUIZ CONTROLLER to fetch the next question based on the current question ID and the user's response
// This file contains the logic for handling quiz-related operations. It specifically handles fetching the next question based on the current question ID and the user's response.

import mongoose from 'mongoose';
import QuizQuestion from '../models/QuizQuestion.js'; 

// CORRECT ONE
// Endpoint to fetch the next question 
export const getNextQuestion = async (req, res) => {
  const { currentQuestionId, userResponse } = req.params;

  try {
    // Find the current question by ID
    const currentQuestion = await QuizQuestion.findById(currentQuestionId);

    if (!currentQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    // Determine the next question ID based on the user's response
    const nextQuestionId = currentQuestion.next[userResponse];

    if (!nextQuestionId) {
      return res.status(404).json({ message: "No more questions available." });
    }

    // Fetch the next question using the ID
    const nextQuestion = await QuizQuestion.findById(nextQuestionId);

    if (!nextQuestion) {
      return res.status(404).json({ message: "Next question not found." });
    }

    res.json(nextQuestion); // Send the next question back to the client
  } catch (error) {
    console.error("Error fetching next question:", error);
    res.status(500).json({ error: "Server error" });
  }
};
