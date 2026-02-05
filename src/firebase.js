import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object goes here.
// Replace this with the config you copied from the Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDALxhbhecrgKCmXZt31vYjSuS2CKsU_ss",
  authDomain: "southsutra-8252f.firebaseapp.com",
  projectId: "southsutra-8252f",
  storageBucket: "southsutra-8252f.firebasestorage.app",
  messagingSenderId: "396073335171",
  appId: "1:396073335171:web:72be6e0c41fda1aa5d9eb6",
  measurementId: "G-YTEJ9345DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };