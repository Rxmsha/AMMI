// Question model

const { text } = require('express');
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  nextQuestionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
});

const questionSchema = new mongoose.Schema({
  question: String,
  options: [optionSchema],
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;