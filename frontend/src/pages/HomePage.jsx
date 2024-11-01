// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import '../styles/styles.css'; // Import the CSS file with the font and animation

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleStatusPage = () => {
    navigate('/status'); // Navigate to the status page
  };

  const handleLearnMore = () => {
    navigate('/learn-more'); // Navigate to the learn more page
  };

  const headingText = "Welcome to AMMI";

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
        <Box className="animated-heading" fontFamily="'Aladin', cursive" fontSize="9xl" fontWeight="bold">
          {headingText.split("").map((char, index) => (
            <span key={index} style={{ '--char-index': index }}>{char === " " ? "\u00A0" : char}</span>
          ))}
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
          <Text fontSize="xl" color="#333">Your one-stop resource for people in Canada.</Text>
          <Button bg="#26202C" color="white" size="lg" onClick={handleStatusPage} className="custom-button">
            Explore resources
          </Button>
          <Button bg="#26202C" color="white" size="lg" onClick={handleLearnMore} className="custom-button">
            Learn More
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;