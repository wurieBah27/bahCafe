// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cafe-management-website.firebaseapp.com",
  projectId: "cafe-management-website",
  storageBucket: "cafe-management-website.firebasestorage.app",
  messagingSenderId: "60197197886",
  appId: "1:60197197886:web:b43a33e560a1c1265d196f",
  measurementId: "G-65QBFTCVGJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// const auth = getAuth()
export const storage = getStorage(app);
/* auth */
export const auth = getAuth(app);
export const functions = getFunctions(app);
//npm install -g firebase-tools
