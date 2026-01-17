import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClqOFvnuDEO6lgQDLCfL5BxSLVu0lwqUA",
  authDomain: "miniapp-07.firebaseapp.com",
  projectId: "miniapp-07",
  storageBucket: "miniapp-07.firebasestorage.app",
  messagingSenderId: "1064097880770",
  appId: "1:1064097880770:web:1be044c6271934e091b95b",
  measurementId: "G-E7KMZ941ZC"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
