// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnGXOQQFcltG9dnN63JrdvlXkE7fC7-kU",
  authDomain: "weather-app-b7e3f.firebaseapp.com",
  databaseURL: "https://weather-app-b7e3f-default-rtdb.firebaseio.com",
  projectId: "weather-app-b7e3f",
  storageBucket: "weather-app-b7e3f.firebasestorage.app",
  messagingSenderId: "305434292648",
  appId: "1:305434292648:web:3486ffc41d7892c952ed9d",
  measurementId: "G-4H8P79WB06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
export { database };