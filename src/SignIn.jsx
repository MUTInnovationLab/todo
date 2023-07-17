import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('Signed In');
        navigate('/App');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-in-container-custom">
      <form className="form-custom" onSubmit={signIn}>
        <h1 className="custom">Log In to Your Account</h1>
        <input
          className="custom"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="custom"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="custom" type="submit">
          Log In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
