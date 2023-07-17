import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import SignIn from './SignIn';
import SignUp from './SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Set the SignIn component as the landing page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Remove the Route for the App component from the initial routing configuration */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
