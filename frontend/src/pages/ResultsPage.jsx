import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';
import '../styles/ResultsPage.css';

const ResultsPage = ({ results, handleBack, handleRestart, history }) => {
  const [customMessages, setCustomMessages] = useState({});

  // Function to fetch individual result by questionId
  const fetchResults = async (questionId) => {
    try {
      const response = await axios.get(`/api/results/${questionId}`);
      setCustomMessages((prev) => ({ ...prev, [questionId]: response.data }));
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // Fetch data for each result's questionId
  useEffect(() => {
    results.forEach((result) => {
      fetchResults(result.questionId);
    });
  }, [results]);

  const getCustomMessage = (questionId, choice, status) => {
    const questionMessages = customMessages[questionId];
    if (questionMessages && questionMessages.responses) {
      const responseMessages = questionMessages.responses[choice.toLowerCase()];
      if (responseMessages) {
        const message = responseMessages[status] || responseMessages.default || null;
        if (message) {
          return (
            <div>
              {message.split('\n').map((line, index) => {
                if (line.includes('Under 18:') || line.includes('18+:')) {
                  return (
                    <p key={index}>
                      <span className="button-like">{line}</span>
                    </p>
                  );
                } else {
                  return <p key={index}>{line}</p>;
                }
              })}
            </div>
          );
        }
      }
    }
    return null;
  };
  
  const renderResults = () => {
    return (
      <div className="results-container">
        {results.map((result, index) => {
          const customMessage = getCustomMessage(result.questionId, result.response, result.status);
  
          // Skip rendering the result card if there is no specific message
          if (!customMessage) {
            return null;
          }
  
          // Define custom CSS classes for specific questions
          const customClass = `result-card ${result.questionId}`;
  
          return (
            <div key={index} className={customClass}>
              <h3>{customMessages[result.questionId] ? customMessages[result.questionId].heading : result.question}</h3>
              <div>{customMessage}</div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <Box textAlign="center" minHeight="100vh" display="flex" flexDirection="column" p={4}>
      <Box
        width="100%"
        bg="#F895A3"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
        mb={4}
        border="2px solid #333"
        borderRadius="40px"
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            animation: 'bounce-skills 0.6s',
          },
        }}
      >
        <Text fontFamily="'Aladin', cursive" fontSize="4xl" fontWeight="bold">
          Resources
        </Text>
      </Box>
      {renderResults()}
      <VStack spacing={4} mt={4}>
        {history.length > 0 && (
          <Button onClick={handleBack} bg="#26202C" color="white" className="custom-button">
            Back
          </Button>
        )}
        <Button onClick={handleRestart} bg="#26202C" color="white" className="custom-button">
          Restart
        </Button>
      </VStack>
    </Box>
  );
};

export default ResultsPage;
