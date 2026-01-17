import { db, doc, setDoc } from './firebase-config.js';

const mName = document.getElementById('mName');
const mUrl = document.getElementById('mUrl');
const vCount = document.getElementById('vCount');

// ম্যাচ আপডেট
document.getElementById('updateMatchBtn').onclick = async () => {
    const title = mName.value.trim();
    const url = mUrl.value.trim();
    if(!title || !url) return alert("সবগুলো বক্স পূরণ করুন!");
    
    await setDoc(doc(db, "settings", "liveMatch"), { title, url });
    alert("ম্যাচ লাইভ করা হয়েছে! ✅");
    mName.value = ""; mUrl.value = "";
};

// ওয়াচিং কাউন্ট আপডেট
document.getElementById('updateWatchingBtn').onclick = async () => {
    const count = parseInt(vCount.value);
    if(isNaN(count)) return alert("সংখ্যা দিন!");
    
    await setDoc(doc(db, "stats", "watching"), { count });
    alert("দর্শক সংখ্যা আপডেট হয়েছে! 👥");
    vCount.value = "";
};
