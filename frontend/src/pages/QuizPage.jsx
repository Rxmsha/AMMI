import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId] = useState("user-id-placeholder"); // Replace with actual user ID logic

  useEffect(() => {
    // Fetch the initial question
    fetchNextQuestion();
  }, []);

  const fetchNextQuestion = async (questionId = null, answer = null) => {
    try {
      const response = await axios.get('/api/quiz/next-question', { // Adjusted URL here
        params: { questionId, answer }
      });
      
      setCurrentQuestion(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const handleOptionSelect = async (option) => {
    try {
      // Save user response
      await axios.post('/api/user-responses', {
        questionId: currentQuestion._id,
        selectedOption: option,
        userId
      });

      // Fetch the next question based on the selected option
      fetchNextQuestion(currentQuestion._id, option);
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : currentQuestion ? (
        <div>
          <h3>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionSelect(option)}>{option}</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No more questions available.</p>
      )}
    </div>
  );
};

export default QuizPage;
