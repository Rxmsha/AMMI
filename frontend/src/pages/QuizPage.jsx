import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]); // History stack to keep track of previous questions

  useEffect(() => {
    // Fetch the initial question
    fetchNextQuestion();
  }, []);

  const fetchNextQuestion = async (currentQuestionId = null, userResponse = null) => {
    try {
      // Fetch the next question or initial question
      const response = await axios.get(
        `/api/quiz/next-question${currentQuestionId ? `/${currentQuestionId}/${userResponse}` : ''}`
      );
      if (response.data) {
        setCurrentQuestion(response.data);
      } else {
        console.log("No more questions available");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching question:", error);
      setLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    try {
      // Save the current question in history before moving to the next one
      setHistory((prevHistory) => [
        ...prevHistory,
        { questionId: currentQuestion._id, selectedOption: option, question: currentQuestion }
      ]);
      
      // Fetch the next question based on the selected option
      fetchNextQuestion(currentQuestion._id, option);
    } catch (error) {
      console.error("Error processing response:", error);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
      setCurrentQuestion(previousQuestion.question);
      setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the last item from history
    } else {
      console.log("No previous question available.");
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
          {/* Render Back button if there's history */}
          {history.length > 0 && (
            <button onClick={handleBack}>Back</button>
          )}
        </div>
      ) : (
        <p>No more questions available.</p>
      )}
    </div>
  );
};

export default QuizPage;
