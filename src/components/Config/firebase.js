// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCl74x3Ljo72TI8IMu6P09Vybmi4-RTsvk",
  authDomain: "aifactify-1f847.firebaseapp.com",
  projectId: "aifactify-1f847",
  storageBucket: "aifactify-1f847.firebasestorage.app",
  messagingSenderId: "202260946134",
  appId: "1:202260946134:web:0af35619b5a283f288fd77"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
