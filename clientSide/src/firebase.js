// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: "e-learning-f6156.firebaseapp.com",
  projectId: "e-learning-f6156",
  storageBucket: "e-learning-f6156.appspot.com",
  messagingSenderId: "436148435831",
  appId: "1:436148435831:web:09d984fb7f99fb54347f72",
  measurementId: "G-SPMEMY3R6Z" // Optional if not using Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app); // Firebase Storage for file uploads

export { app, storage }; // Export so you can use them in other files
