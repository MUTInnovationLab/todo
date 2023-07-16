import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Link } from "react-router-dom";
import './SignIn.css';
import {useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();
  const signUp = (e) => {

    e.preventDefault();
    
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert("Signed In");
        navigate("/SignIn");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <div className="sign-in-container-custom">
      <form  className="form-custom"  onSubmit={signUp}>
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
        <button type="submit" className="custom">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/SignIn" className="link-custom">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
