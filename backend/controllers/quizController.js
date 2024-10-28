// controllers/quiz.controller.js

import mongoose from 'mongoose';
import QuizQuestion from '../models/QuizQuestion.js'; // Adjust path as necessary

// Fetch all quiz questions
export const getQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find({});
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error('Error fetching quiz questions:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Create a new quiz question
export const createQuizQuestion = async (req, res) => {
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
};
