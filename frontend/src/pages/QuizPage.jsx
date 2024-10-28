// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const QuizPage = () => {
  const { state } = useLocation();
  const { questions } = state || { questions: [] };
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => {
      const updatedAnswers = prev.filter((ans) => ans.questionId !== questionId);
      return [...updatedAnswers, { questionId, answer }];
    });
  };

  const handleSubmit = async () => {
    const userId = 'some_unique_user_id'; // You could generate this dynamically
    try {
      await axios.post('/api/quiz/submit', { userId, answers: userAnswers });
      alert('Responses submitted successfully!');
    } catch (error) {
      console.error('Error submitting responses:', error);
    }
  };

  if (questions.length === 0) {
    return <div>No questions available. Please go back.</div>;
  }

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question) => (
        <div key={question._id}>
          <h3>{question.question}</h3>
          {question.options.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name={question._id}
                value={option}
                onChange={() => handleAnswerChange(question._id, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
    </div>
  );
};

export default QuizPage;
