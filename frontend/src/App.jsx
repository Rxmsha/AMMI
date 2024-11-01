// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatusPage from './pages/StatusPage';
import QuizPage from './pages/QuizPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="/quiz/:status" element={<QuizPage />} />
    </Routes>
  );
};

export default App;
