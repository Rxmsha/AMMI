// src/pages/StatusPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import '../styles/styles.css'; // Import the CSS file with the font and animation

const StatusPage = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/quiz');
      console.log(response.data); // Log the fetched questions
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path, { state: { questions } });
  };

  return (
    <Box textAlign="center" minHeight="100vh" display="flex" flexDirection="column">
      <Box
        width="100%"
        height="50vh" // Take up the top half of the viewport height
        bg="#F895A3" // Set the background color to pink
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box fontFamily="'Aladin', cursive" fontSize="6xl" fontWeight="bold">
          Welcome to Canada
        </Box>
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
        <VStack spacing={4}>
          <Text fontSize="2xl" color="#333">What is your current status in Canada?</Text>
          <Button bg="#26202C" color="white" size="lg" onClick={() => handleNavigate('/quiz/citizen')} className="custom-button">
            Canadian Citizen
          </Button>
          <Button bg="#26202C" color="white" size="lg" onClick={() => handleNavigate('/quiz/pr')} className="custom-button">
            Permanent Resident
          </Button>
          <Button bg="#26202C" color="white" size="lg" onClick={() => handleNavigate('/quiz/temporary')} className="custom-button">
            Temporary Resident
          </Button>
          <Button bg="#26202C" color="white" size="lg" onClick={() => handleNavigate('/quiz/special')} className="custom-button">
            Special Status
          </Button>
          <Button bg="#26202C" color="white" size="lg" onClick={() => handleNavigate('/quiz/other')} className="custom-button">
            Other
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default StatusPage;