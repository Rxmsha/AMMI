import React, { useEffect, useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import customMessagesData from './customMessages.json'; // Adjust the path as needed
import '../styles/ResultsPage.css'; // Import the CSS file

const ResultsPage = ({ results, handleBack, handleRestart, history }) => {
  const [customMessages, setCustomMessages] = useState({});

  useEffect(() => {
    // Load custom messages from JSON file
    setCustomMessages(customMessagesData);
  }, []);

  const renderResults = () => {
    return (
      <div className="results-container">
        <h2 className="results-heading">Results</h2>
        {results.map((result, index) => {
          const customMessage = customMessages[result.questionId];
          return (
            <div key={index} className="result-card">
              <h3>{customMessage ? customMessage.heading : result.question}</h3>
              <p>{customMessage ? customMessage.message : `Here is how to...`}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Box textAlign="center" p={4}>
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