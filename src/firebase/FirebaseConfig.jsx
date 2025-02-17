// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCVg84N4nS47YuEBfiEdglVE9QAuXPbW8",
  authDomain: "myecom-be075.firebaseapp.com",
  projectId: "myecom-be075",
  storageBucket: "myecom-be075.firebasestorage.app",
  messagingSenderId: "612090514448",
  appId: "1:612090514448:web:ed31cf1fc8eea0d9130e95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }