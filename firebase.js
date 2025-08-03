// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDowu4JT9joWXLHjpmUJrwswLBUizcU5ac",
  authDomain: "evolveyou-617f3.firebaseapp.com",
  projectId: "evolveyou-617f3",
  storageBucket: "evolveyou-617f3.firebasestorage.app",
  messagingSenderId: "239058615985",
  appId: "1:239058615985:web:3db9a0c1df557f847fac90",
  measurementId: "G-TENXDQMWHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);