import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, setDoc, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClqOFvnuDEO6lgQDLCfL5BxSLVu0lwqUA",
  authDomain: "miniapp-07.firebaseapp.com",
  projectId: "miniapp-07",
  storageBucket: "miniapp-07.firebasestorage.app",
  messagingSenderId: "1064097880770",
  appId: "1:1064097880770:web:1be044c6271934e091b95b",
  measurementId: "G-E7KMZ941ZC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// আমরা এই ফাংশনগুলোকে অন্য ফাইল থেকে ব্যবহার করার জন্য এক্সপোর্ট করছি
export { db, collection, addDoc, onSnapshot, doc, setDoc, query, orderBy, limit };
