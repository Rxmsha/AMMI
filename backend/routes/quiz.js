// quiz.js router

const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Quiz.find();
        res.json(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
