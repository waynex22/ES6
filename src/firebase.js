import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "asges6.firebaseapp.com",
  databaseURL: "https://asges6-default-rtdb.firebaseio.com",
  projectId: "asges6",
  storageBucket: "asges6.appspot.com",
  messagingSenderId: "667642113891",
  appId: "1:667642113891:web:ceb10df9b982cf4a0bed56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);