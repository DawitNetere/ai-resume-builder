import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNPyk46MGnVzl2LOiidDRkkTYnyFwOapI",
  authDomain: "jobfit-pro.firebaseapp.com",
  projectId: "jobfit-pro",
  storageBucket: "jobfit-pro.appspot.com",
  messagingSenderId: "692448767643",
  appId: "1:692448767643:web:b69c8d1032420fe2a3e03e",
  measurementId: "G-3G7JDSH962",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
