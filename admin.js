
// firebase-config.js থেকে প্রয়োজনীয় ফাংশন ইমপোর্ট করা
import { db, doc, setDoc } from './firebase-config.js';

/**
 * ১. লাইভ ম্যাচ কন্ট্রোল সেকশন
 * এখান থেকে ম্যাচের নাম এবং M3U8 স্ট্রিমিং লিঙ্ক আপডেট করা হয়।
 */

// HTML এলিমেন্টগুলো আইডি অনুযায়ী ধরা
const matchNameInput = document.getElementById('mName');
const matchUrlInput = document.getElementById('mUrl');
const updateMatchBtn = document.getElementById('updateMatchBtn');

// আপডেট বাটনে ক্লিক করলে যা হবে
if (updateMatchBtn) {
    updateMatchBtn.onclick = async () => {
        const title = matchNameInput.value.trim();
        const url = matchUrlInput.value.trim();

        // ভ্যালিডেশন চেক
        if (title === "" || url === "") {
            alert("⚠️ দয়া করে ম্যাচের নাম এবং স্ট্রিমিং লিঙ্ক দুটোই দিন!");
            return;
        }

        try {
            // Firebase Firestore-এর 'settings' কালেকশনের 'liveMatch' ডক আপডেট
            await setDoc(doc(db, "settings", "liveMatch"), {
                title: title,
                url: url,
                lastUpdated: new Date().toLocaleString() // সময় সেভ করে রাখা
            });

            alert("✅ লাইভ ম্যাচ সফলভাবে আপডেট হয়েছে!");
            
            // ইনপুট বক্স খালি করা
            matchNameInput.value = "";
            matchUrlInput.value = "";
        } catch (error) {
            console.error("Error updating match:", error);
            alert("❌ এরর: ডাটাবেসে আপডেট করা সম্ভব হয়নি। ফায়ারবেস রুলস চেক করুন।");
        }
    };
}


/**
 * ২. দর্শক সংখ্যা (Watching Count) কন্ট্রোল সেকশন
 * এখান থেকে ম্যানুয়ালি দর্শক সংখ্যা বাড়ানো বা কমানো যায়।
 */

const watchingCountInput = document.getElementById('vCount');
const updateWatchingBtn = document.getElementById('updateWatchingBtn');

if (updateWatchingBtn) {
    updateWatchingBtn.onclick = async () => {
        const count = watchingCountInput.value.trim();

        if (count === "") {
            alert("⚠️ দয়া করে একটি সংখ্যা দিন!");
            return;
        }

        try {
            // Firestore-এর 'stats' কালেকশনের 'watching' ডক আপডেট
            await setDoc(doc(db, "stats", "watching"), {
                count: parseInt(count) // স্ট্রিং থেকে নাম্বারে কনভার্ট
            });

            alert("👥 দর্শক সংখ্যা সফলভাবে আপডেট করা হয়েছে!");
            watchingCountInput.value = ""; // ইনপুট খালি করা
        } catch (error) {
            console.error("Error updating stats:", error);
            alert("❌ এরর: দর্শক সংখ্যা আপডেট হয়নি।");
        }
    };
}
