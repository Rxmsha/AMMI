// npm install react-router-dom
// Main.jsx is the entry point for the React app.
// When the app starts, it renders the App.jsx into the DOM, which contains all the routing logic. The Router component from react-router-dom allows App.jsx to handle routing.

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
