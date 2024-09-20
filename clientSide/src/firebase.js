// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "e-learning-4efaa.firebaseapp.com",
  projectId: "e-learning-4efaa",
  storageBucket: "e-learning-4efaa.appspot.com",
  messagingSenderId: "222134807204",
  appId: "1:222134807204:web:767a97a3bacd8c6994d431"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);