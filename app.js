
import { db, onSnapshot, doc, collection, addDoc, query, orderBy, limit } from './firebase-config.js';

const player = document.getElementById('player');
const watchingText = document.getElementById('watching');
const matchTitle = document.getElementById('match-title');
const chatInput = document.getElementById('chatInput');
const messagesDiv = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');

const tg = window.Telegram.WebApp;
tg.expand();
const userName = tg.initDataUnsafe?.user?.first_name || "Guest User";

// ১. লাইভ ম্যাচ ডাটা লোড
onSnapshot(doc(db, "settings", "liveMatch"), (docSnap) => {
    if (docSnap.exists()) {
        const data = docSnap.data();
        matchTitle.innerText = data.title;
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(data.url);
            hls.attachMedia(player);
        } else {
            player.src = data.url;
        }
    }
});

// ২. লাইভ ওয়াচিং
onSnapshot(doc(db, "stats", "watching"), (docSnap) => {
    if (docSnap.exists()) {
        watchingText.innerText = docSnap.data().count;
    }
});

// ৩. চ্যাট পাঠানো
sendBtn.onclick = async () => {
    if (chatInput.value.trim() === "") return;
    await addDoc(collection(db, "chats"), {
        name: userName,
        msg: chatInput.value,
        time: Date.now()
    });
    chatInput.value = "";
};

// ৪. চ্যাট দেখানো
const chatQuery = query(collection(db, "chats"), orderBy("time", "desc"), limit(20));
onSnapshot(chatQuery, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
        const d = doc.data();
        const msgHtml = `<div class="msg"><span style="color:#ff4d4d">${d.name}:</span> ${d.msg}</div>`;
        messagesDiv.insertAdjacentHTML('beforeend', msgHtml);
    });
});
