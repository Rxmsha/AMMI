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

  const fetchNextQuestion = async (currentQuestionId = null, userResponse = null) => {
    try {
      // This part will handle both initial fetch and subsequent question fetch
      const response = await axios.get(`/api/quiz/next-question${currentQuestionId ? `/${currentQuestionId}/${userResponse}` : ''}`);
      
      console.log("Next question response:", response.data); // Log the response data

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

  // Implement a Temporary Store for Responses
  const [userResponses, setUserResponses] = useState([]); // State to store user responses
  const handleOptionSelect = async (option) => {
    try {
      console.log("Selected option:", option); // Log selected option

      // Save response temporarily in state
      setUserResponses((prevResponses) => [
        ...prevResponses,
        { questionId: currentQuestion._id, selectedOption: option }
      ]);

      // Fetch the next question based on the selected option
      fetchNextQuestion(currentQuestion._id, option);
    } catch (error) {
      console.error("Error processing response:", error);
    }
  };

  

  return (
    <div>
      <h1>Quiz CORRECT ONE</h1>
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
