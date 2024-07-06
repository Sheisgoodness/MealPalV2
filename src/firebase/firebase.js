import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkI7GxPslS94qR3SbqxrnlWwoo5xPFH6E",
  authDomain: "mealpal-3185a.firebaseapp.com",
  projectId: "mealpal-3185a",
  storageBucket: "mealpal-3185a.appspot.com",
  messagingSenderId: "967341769015",
  appId: "1:967341769015:web:9b9cfeb5c532a7dfe25ab2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, onAuthStateChanged };
export const auth = getAuth(app);
export default app;
