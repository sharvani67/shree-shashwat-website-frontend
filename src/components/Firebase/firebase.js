// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyD2wEAPOr2-LoZMIMZs8jdWdeDKxCWScj4",
//   authDomain: "tickettracker-dedc6.firebaseapp.com",
//   projectId: "tickettracker-dedc6",
//   storageBucket: "tickettracker-dedc6.appspot.com",
//   messagingSenderId: "1075768501163",
//   appId: "1:1075768501163:web:60c680551cab81f6f128ee",
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Export Firebase services
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider(); // ✅ Google Auth Provider
// export const db = getFirestore(app);
// export const storage = getStorage(app);







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
