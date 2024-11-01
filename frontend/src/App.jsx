// App.jsx
// This is the first thing you see when you open localhost:5173
// Main application component that includes all the routes and high-level application structure; set up the routing for different pages of the app

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatusPage from './pages/StatusPage'; 
import CitizenQuizPage from './pages/CitizenQuizPage';
import PRQuizPage from './pages/PRQuizPage';
import TemporaryQuizPage from './pages/TemporaryQuizPage';
import SpecialQuizPage from './pages/SpecialQuizPage';
import OtherQuizPage from './pages/OtherQuizPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/quiz/citizen" element={<CitizenQuizPage />} />
      <Route path="/quiz/pr" element={<PRQuizPage />} />
      <Route path="/quiz/temporary" element={<TemporaryQuizPage />} />
      <Route path="/quiz/special" element={<SpecialQuizPage />} />
      <Route path="/quiz/other" element={<OtherQuizPage />} />
    </Routes>
  );
};

export default App;
