// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGlMisk1-FhAwadqkpVHz716IGEJlqxuQ",
  authDomain: "just-do-it-b69f3.firebaseapp.com",
  projectId: "just-do-it-b69f3",
  storageBucket: "just-do-it-b69f3.appspot.com",
  messagingSenderId: "854052536774",
  appId: "1:854052536774:web:e1dc9efcbd04c9ece632c7",
  measurementId: "G-BK1VHG6HZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);