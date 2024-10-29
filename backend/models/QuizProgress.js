// models/QuizProgress.js
const mongoose = require('mongoose');

const QuizProgressSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  lastQuestionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' }
});

module.exports = mongoose.model('QuizProgress', QuizProgressSchema);
