import { db, onSnapshot, doc, collection, addDoc, query, orderBy, limit } from './firebase-config.js';

const player = document.getElementById('player');
const iframeContainer = document.getElementById('iframe-container');
const watchingText = document.getElementById('watching');
const matchTitle = document.getElementById('match-title');
const chatInput = document.getElementById('chatInput');
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

const tg = window.Telegram.WebApp;
tg.expand();
const userName = tg.initDataUnsafe?.user?.first_name || "Sports Fan";

// ১. লাইভ ম্যাচ ডাটা ডিটেক্ট করা (Link vs Iframe)
onSnapshot(doc(db, "settings", "liveMatch"), (docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();
        const source = data.url;
        matchTitle.innerText = data.title;

        if (source.includes('<iframe')) {
            // যদি আইফ্রেম কোড হয়
            player.style.display = 'none';
            iframeContainer.style.display = 'block';
            iframeContainer.innerHTML = source;
        } else {
            // যদি সাধারণ m3u8 লিঙ্ক হয়
            iframeContainer.style.display = 'none';
            player.style.display = 'block';
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(source);
                hls.attachMedia(player);
            } else {
                player.src = source;
            }
        }
    }
});

// ২. ওয়াচিং কাউন্ট আপডেট
onSnapshot(doc(db, "stats", "watching"), (docSnap) => {
    if (docSnap.exists()) {
        watchingText.innerText = docSnap.data().count.toLocaleString();
    }
});

// ৩. চ্যাট পাঠানো
sendBtn.onclick = async () => {
    const val = chatInput.value.trim();
    if (val === "") return;
    await addDoc(collection(db, "chats"), {
        name: userName,
        msg: val,
        time: Date.now()
    });
    chatInput.value = "";
};

// ৪. রিয়েল টাইম চ্যাট দেখানো
const q = query(collection(db, "chats"), orderBy("time", "desc"), limit(25));
onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
        const d = doc.data();
        const msgElement = `<div class="msg"><span>${d.name}:</span> ${d.msg}</div>`;
        messagesDiv.insertAdjacentHTML('beforeend', msgElement);
    });
});
