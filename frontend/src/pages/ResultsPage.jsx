import React, { useEffect, useState } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import customMessagesData from './customMessages.json'; // Adjust the path as needed
import '../styles/ResultsPage.css'; // Import the CSS file

const ResultsPage = ({ results, handleBack, handleRestart, history }) => {
  const [customMessages, setCustomMessages] = useState({});

  useEffect(() => {
    // Load custom messages from JSON file
    setCustomMessages(customMessagesData);
  }, []);

  const getCustomMessage = (questionId, choice, status) => {
    const questionMessages = customMessages[questionId];
    if (questionMessages && questionMessages.responses) {
      const responseMessages = questionMessages.responses[choice.toLowerCase()];
      if (responseMessages) {
        if (responseMessages.responses) {
          return responseMessages.responses[status] || responseMessages.responses.default || "No specific message for this choice.";
        }
        return responseMessages[status] || responseMessages.default || "No specific message for this choice.";
      }
    }
    return "No specific message for this choice.";
  };

  const renderResults = () => {
    return (
      <div className="results-container">
        {results.map((result, index) => {
          const customMessage = getCustomMessage(result.questionId, result.response, result.status);
          return (
            <div key={index} className="result-card">
              <h3>{customMessages[result.questionId] ? customMessages[result.questionId].heading : result.question}</h3>
              <p>{customMessage}</p>
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
        bg="#F895A3" // Set the background color to pink
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