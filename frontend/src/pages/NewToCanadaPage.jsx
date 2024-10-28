// src/pages/NewToCanadaPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewToCanadaPage = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/quiz');
      console.log(response.data); // Log the fetched questions
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions on mount
  }, []);

  const handleTellMeWhatINeedClick = () => {
    navigate('/quiz', { state: { questions } }); // Navigate to the quiz page
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Oh, you are new to Canada! We’ve got you!</h2>
      <p>Take this quiz right now to figure out what you need.</p>
      <button onClick={handleTellMeWhatINeedClick}>Tell me what I need</button>
    </div>
  );
};

export default NewToCanadaPage;
