// Script to insert questions into MongoDB

const mongoose = require('mongoose');
const QuizQuestion = require('./models/QuizQuestion'); // Adjust path if needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quizdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    return QuizQuestion.deleteMany({}); // Clear existing questions for fresh start
  })
  .then(() => {
    // Insert initial questions
    const questions = [
      {
        question: "Do you have a SIN yet?",
        options: ["Yes", "No"]
      },
      {
        question: "How old are you?",
        options: ["Under 18", "18-30", "31-50", "Over 50"]
      },
      {
        question: "Oops! You need to apply for SIN asap! Do you need help applying for it?",
        options: ["Yes", "No"]
      }
    ];

    return QuizQuestion.insertMany(questions); // Insert questions into the QuizQuestion collection
  })
  .then(() => {
    console.log("Questions added successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error adding questions", error);
    mongoose.connection.close();
  });
