// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj1KZPHFHHjAer_Yj1nmHH3VqM3gAl7jk",
  authDomain: "ieiklc-62a8e.firebaseapp.com",
  projectId: "ieiklc-62a8e",
  storageBucket: "ieiklc-62a8e.appspot.com",
  messagingSenderId: "719056875312",
  appId: "1:719056875312:web:64d3a40c923649202ba2f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();