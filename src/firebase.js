// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-QxE3hL0jD8WTwVluJL9ledx71LXsE3E",
  authDomain: "realtor-2a2e8.firebaseapp.com",
  projectId: "realtor-2a2e8",
  storageBucket: "realtor-2a2e8.appspot.com",
  messagingSenderId: "349565470439",
  appId: "1:349565470439:web:5cddfa961fa1a4be800442"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();