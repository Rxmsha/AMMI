// backend/controllers/quizController.js
const Question = require('../models/Question');

exports.getNextQuestion = async (req, res) => {
    const { questionId, answer } = req.body;

    // Find question and determine next question based on answer
    const question = await Question.findById(questionId);
    const nextQuestionId = question.followUpQuestions.get(answer);

    if (nextQuestionId) {
        const nextQuestion = await Question.findById(nextQuestionId);
        return res.json({ question: nextQuestion });
    } else {
        return res.json({ message: "Quiz complete!" });
    }
};
