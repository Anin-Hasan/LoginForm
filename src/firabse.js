// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrstxZvirIRsYBZDgJTwXPDyZNbfLjDwU",
  authDomain: "react-auth-528a0.firebaseapp.com",
  projectId: "react-auth-528a0",
  storageBucket: "react-auth-528a0.appspot.com",
  messagingSenderId: "584566035681",
  appId: "1:584566035681:web:978cb8b90191472bd793a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
