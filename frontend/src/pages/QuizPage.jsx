// src/pages/QuizPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Button, Text, VStack, HStack } from '@chakra-ui/react';
import ResultsPage from './ResultsPage'; // Import the ResultsPage component
import '../styles/styles.css'; // Import the CSS file with the font and animation

const QuizPage = () => {
  const { status } = useParams(); // Get the status parameter from the route
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
  }, [status]); // Add status as a dependency to refetch questions when status changes

  const fetchFirstQuestion = async () => {
    try {
      const response = await axios.get(`/api/quiz/${status}/first-question`); // Update this endpoint to get the first question based on status
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
      const response = await axios.get(`/api/quiz/${status}/next-question`); // Update this endpoint to get the next question based on status
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
      const newHistory = [
        ...history,
        { questionId: currentQuestion._id, selectedOption: option, question: currentQuestion }
      ];
      setHistory(newHistory);
      sessionStorage.setItem('quizHistory', JSON.stringify(newHistory)); // Store history in session storage
  
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
  
      const response = await axios.post(`/api/quiz/${status}/answer`, {
        currentQuestionId: currentQuestion._id,
        userResponse: option
      });
  
      if (response.data.message === "Quiz ended") {
        setQuizEnded(true);
        sessionStorage.setItem('quizEnded', JSON.stringify(true)); // Save quiz ended state to session storage
      } else {
        setCurrentQuestion(response.data);
        sessionStorage.setItem('currentQuestion', JSON.stringify(response.data)); // Save current question to session storage
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
    <Box textAlign="center" minHeight="100vh" display="flex" flexDirection="column" p={4}>
      <Box
        width="100%"
        bg="#F895A3" // Set the background color to pink
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
        mb={4}
      >
        <Text fontFamily="'Aladin', cursive" fontSize="4xl" fontWeight="bold">
          Quiz
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex="1"
        p={4}
        color="black"
      >
        {loading ? (
          <Text fontSize="xl">Loading questions...</Text>
        ) : (
          <Box width="100%" maxWidth="600px">
            {quizEnded ? (
              <ResultsPage
                results={results}
                handleBack={handleBack}
                handleRestart={handleRestart}
                history={history}
              />
            ) : currentQuestion ? (
              <VStack spacing={4}>
                <Text fontSize="2xl" color="#333">{currentQuestion.question}</Text>
                <VStack spacing={3} width="100%">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      bg="#26202C"
                      color="white"
                      size="lg"
                      className="custom-button"
                      width="100%"
                    >
                      {option}
                    </Button>
                  ))}
                </VStack>
              </VStack>
            ) : (
              <Text fontSize="xl">No more questions available.</Text>
            )}
          </Box>
        )}
        {history.length > 0 && !quizEnded && (
          <Button onClick={handleBack} mt={4} bg="#26202C" color="white" className="custom-button">
            Back
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default QuizPage;