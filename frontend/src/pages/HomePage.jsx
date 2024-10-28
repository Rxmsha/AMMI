// HomePage 

import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNewToCanada = () => {
    navigate('/new-to-canada'); // Navigate to the new page
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Our Website!</h1>
      <button onClick={handleNewToCanada}>I am new to Canada</button>
    </div>
  );
};

export default HomePage;
