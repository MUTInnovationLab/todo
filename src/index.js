import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import SignIn from './SignIn';
import SignUp from './SignUp';
import App from './App'; // Add the import for the App component
import AddTodo from './AddTodo'; // Add the import for the App component

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Set the SignIn component as the landing page */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<App />} /> {/* Add a route for the App component */}
        <Route path="/addtodo" element={<AddTodo />} /> {/* Add a route for the App component */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
