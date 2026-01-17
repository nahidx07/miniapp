import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send } from 'lucide-react';

export default function LiveChat({ streamId, userName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, `streams/${streamId}/chats`), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [streamId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, `streams/${streamId}/chats`), {
      text: input,
      user: userName,
      createdAt: serverTimestamp()
    });
    setInput("");
  };

  return (
    <div className="flex flex-col h-[400px] bg-darkCard rounded-xl border border-gray-800 mt-4 overflow-hidden">
      <div className="p-3 border-b border-gray-800 bg-black/20 font-bold text-red-500">LIVE CHAT</div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse space-y-reverse space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className="text-sm">
            <span className="font-bold text-gray-400 mr-2">{msg.user}:</span>
            <span className="text-gray-200">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="p-3 bg-black/40 flex gap-2">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..." 
          className="flex-1 bg-transparent border-none outline-none text-white text-sm"
        />
        <button onClick={handleSend} className="text-red-500 hover:scale-110 transition"><Send size={20}/></button>
      </div>
    </div>
  );
}
