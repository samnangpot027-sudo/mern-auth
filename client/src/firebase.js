// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c84a7.firebaseapp.com",
  projectId: "mern-auth-c84a7",
  storageBucket: "mern-auth-c84a7.firebasestorage.app",
  messagingSenderId: "563233850337",
  appId: "1:563233850337:web:7824cc2e711623ea1308a0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
