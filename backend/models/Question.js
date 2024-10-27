// Quiz model

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }],
    followUps: [{ answer: String, nextQuestion: String }],
});

const Quiz = mongoose.model('Quiz', questionSchema);
module.exports = Quiz;
