import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResultsPage from './ResultsPage'; // Import the ResultsPage component

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Load history and quiz state from session storage
    const storedHistory = JSON.parse(sessionStorage.getItem('quizHistory'));
    const storedCurrentQuestion = JSON.parse(sessionStorage.getItem('currentQuestion'));
    const storedQuizEnded = JSON.parse(sessionStorage.getItem('quizEnded'));
    const storedResults = JSON.parse(sessionStorage.getItem('quizResults'));

    // If there's stored history and current question, resume from the last question; otherwise, fetch the first question
    if (storedHistory && storedHistory.length > 0 && storedCurrentQuestion) {
      setHistory(storedHistory);
      setCurrentQuestion(storedCurrentQuestion);
      setQuizEnded(storedQuizEnded);
      setResults(storedResults || []);
      setLoading(false); // Set loading to false after setting the current question
    } else {
      fetchFirstQuestion();
    }

    // Clear session storage when the component unmounts
    return () => {
      sessionStorage.removeItem('quizHistory');
      sessionStorage.removeItem('currentQuestion');
      sessionStorage.removeItem('quizEnded');
      sessionStorage.removeItem('quizResults');
    };
  }, []);

  const fetchFirstQuestion = async () => {
    try {
      const response = await axios.get('/api/quiz/first-question'); // Update this endpoint to get the first question
      setCurrentQuestion(response.data);
      sessionStorage.setItem('currentQuestion', JSON.stringify(response.data)); // Save current question to session storage
    } catch (error) {
      console.error("Error fetching the first question:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and error cases
    }
  };

  const fetchNextQuestion = async () => {
    try {
      const response = await axios.get('/api/quiz/next-question');
      setCurrentQuestion(response.data);
      sessionStorage.setItem('currentQuestion', JSON.stringify(response.data)); // Save current question to session storage
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and error cases
    }
  };

  const handleOptionSelect = async (option) => {
    try {
      // Save the current question in history before moving to the next one
      const newHistory = [
        ...history,
        { questionId: currentQuestion._id, selectedOption: option, question: currentQuestion }
      ];
      setHistory(newHistory);
      sessionStorage.setItem('quizHistory', JSON.stringify(newHistory)); // Store history in session storage

      // Track the user's response for results
      let newResults = [...results];
      if (option.toLowerCase() === 'no') {
        if (!newResults.some(result => result.questionId === currentQuestion._id)) {
          newResults.push({ questionId: currentQuestion._id, question: currentQuestion.question });
        }
      } else {
        newResults = newResults.filter(result => result.questionId !== currentQuestion._id);
      }
      setResults(newResults);
      sessionStorage.setItem('quizResults', JSON.stringify(newResults)); // Store results in session storage

      // Fetch the next question based on the selected option
      const response = await axios.post('/api/quiz/answer', {
        currentQuestionId: currentQuestion._id,
        userResponse: option
      });

      if (response.data) {
        setCurrentQuestion(response.data);
        sessionStorage.setItem('currentQuestion', JSON.stringify(response.data)); // Save current question to session storage
      } else {
        setQuizEnded(true);
        sessionStorage.setItem('quizEnded', JSON.stringify(true)); // Save quiz ended state to session storage
      }
    } catch (error) {
      console.error("Error processing response:", error);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      // Get the last question from history
      const previousQuestion = history[history.length - 1];

      // Update current question to the previous one
      setCurrentQuestion(previousQuestion.question);
      sessionStorage.setItem('currentQuestion', JSON.stringify(previousQuestion.question)); // Save current question to session storage

      // Remove the last item from history
      const updatedHistory = history.slice(0, -1);
      setHistory(updatedHistory);
      sessionStorage.setItem('quizHistory', JSON.stringify(updatedHistory)); // Update stored history

      // Clear results for the current question
      const newResults = results.filter(result => result.questionId !== previousQuestion.questionId);
      setResults(newResults);
      sessionStorage.setItem('quizResults', JSON.stringify(newResults)); // Update stored results

      // Reset quiz ended state if it was set
      if (quizEnded) {
        setQuizEnded(false);
        sessionStorage.setItem('quizEnded', JSON.stringify(false)); // Update quiz ended state in session storage
      }
    } else {
      console.log("No previous question available.");
    }
  };

  const handleRestart = () => {
    // Clear session storage and reset state
    sessionStorage.removeItem('quizHistory');
    sessionStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('quizEnded');
    sessionStorage.removeItem('quizResults');
    setHistory([]);
    setQuizEnded(false);
    setResults([]);
    setLoading(true);
    fetchFirstQuestion();
  };

  return (
    <div>
      <h1>Quiz</h1>
      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <div>
          {quizEnded ? (
            <ResultsPage
              results={results}
              handleBack={handleBack}
              handleRestart={handleRestart}
              history={history}
            />
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
      )}
      {/* Render the Back button only if there is a history */}
      {history.length > 0 && !quizEnded && (
        <button onClick={handleBack}>Back</button>
      )}
    </div>
  );
};

export default QuizPage;