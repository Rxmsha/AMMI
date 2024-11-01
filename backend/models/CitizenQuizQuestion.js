// models/CitizenQuizQuestion.js
const mongoose = require('mongoose');

const citizenQuizQuestionSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Use a custom string ID if needed
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  next: { type: Object, required: true }, // Mapping of user responses to next question IDs
});

// Automatically create the model from the schema
const CitizenQuizQuestion = mongoose.model('CitizenQuizQuestion', citizenQuizQuestionSchema, 'citizenquizquestions');

module.exports = CitizenQuizQuestion;