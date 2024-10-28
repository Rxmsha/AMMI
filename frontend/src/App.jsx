// App.jsx
// This is the first thing you see when you open localhost:5173
// Main application component that includes all the routes and high-level application structure; set up the routing for different pages of the app

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewToCanadaPage from './pages/NewToCanadaPage'; 
import QuizPage from './pages/QuizPage';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/new-to-canada" element={<NewToCanadaPage />} />
      <Route path="/quiz" element={<QuizPage />} />
    </Routes>
  );
};

export default App;
