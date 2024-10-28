// UserResponse model
const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion', required: true },
  selectedOption: { type: String, required: true },
  userId: { type: String, required: true }, // Or use a reference to a user model if applicable
});

const UserResponse = mongoose.model('UserResponse', userResponseSchema);

module.exports = UserResponse;
