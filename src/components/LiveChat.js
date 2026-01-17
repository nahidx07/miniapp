import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LiveChat({ streamId, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, `streams/${streamId}/chats`), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [streamId]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, `streams/${streamId}/chats`), {
      text: input,
      userId: user.id,
      username: user.username,
      photo: user.photo_url,
      createdAt: serverTimestamp()
    });
    setInput("");
  };

  return (
    <div className="flex flex-col h-[400px] bg-[#161b22] rounded-xl border border-gray-800">
      <div className="p-3 border-b border-gray-800 font-bold text-red-500">LIVE CHAT</div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
        {messages.map(msg => (
          <div key={msg.id} className="mb-3 flex gap-2">
            <img src={msg.photo} className="w-6 h-6 rounded-full" />
            <p className="text-sm"><span className="text-gray-400 font-bold">{msg.username}:</span> {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-3 flex gap-2 bg-[#0d1117]">
        <input value={input} onChange={(e)=>setInput(e.target.value)} 
               placeholder="Say something..." className="flex-1 bg-transparent outline-none text-sm"/>
        <button onClick={sendMessage} className="text-red-500 font-bold">SEND</button>
      </div>
    </div>
  );
                                                     }
