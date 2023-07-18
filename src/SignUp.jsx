import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Signed Up');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="sign-up-container-custom">
      <form className="form-custom" onSubmit={signUp}>
      <h1 className="custom"><b>Todo List</b></h1> {/* Add the Todo List title */}

        <h1 className="custom">Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="custom"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="custom"
        />
        <button type="submit" className="custom">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
