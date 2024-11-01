// src/pages/NewToCanadaPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import '../styles/styles.css'; // Import the CSS file with the font and animation

const NewToCanadaPage = () => {
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

  const handleTellMeWhatINeedClick = () => {
    navigate('/quiz', { state: { questions } }); // Navigate to the quiz page
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
          Some text here...
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
          <Text fontSize="2xl" color="#333">You are new to Canada! We’ve got you!</Text>
          <Text fontSize="lg" color="#333">Take this quiz right now to figure out what you need.</Text>
          <Button bg="#26202C" color="white" size="lg" onClick={handleTellMeWhatINeedClick} className="custom-button">
            Tell me what I need
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default NewToCanadaPage;