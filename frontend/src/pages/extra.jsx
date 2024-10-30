import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import backgroundImage from '../images/background.png'; // Adjust the path as needed

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleNewToCanada = () => {
    navigate('/new-to-canada'); // Navigate to the new page
  };

  const handleLearnMore = () => {
    navigate('/learn-more'); // Navigate to the learn more page
  };

  return (
    <Box textAlign="center" minHeight="100vh" display="flex" flexDirection="column">
      <Box
        width="100%"
        height="50vh" // Take up the top half of the viewport height
        bgImage={`url(${backgroundImage})`}
        bgSize="cover" // Ensure the image covers the entire width
        bgRepeat="no-repeat"
        bgPosition="center"
      />
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
          <Heading as="h1" size="2xl" color="red">
            Welcome to Our Website!
          </Heading>
          <Text fontSize="xl">Your one-stop resource for newcomers to Canada.</Text>
          <Button colorScheme="blue" size="lg" onClick={handleNewToCanada}>
            I am new to Canada
          </Button>
          <Button colorScheme="blue" size="lg" onClick={handleLearnMore}>
            Learn More
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;