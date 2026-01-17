import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function Admin() {
  const [form, setForm] = useState({ title: '', url: '', category: 'Cricket' });

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "streams"), { ...form, isLive: true, viewers: 0 });
    alert("Match added live! 🔴");
    setForm({ title: '', url: '', category: 'Cricket' });
  };

  return (
    <div className="min-h-screen bg-darkBg text-white p-6">
      <h1 className="text-2xl font-bold mb-8 text-red-600">Toto Pro Admin</h1>
      <form onSubmit={handleAdd} className="bg-darkCard p-6 rounded-2xl border border-gray-800 space-y-4">
        <input 
          placeholder="Match Title" 
          className="w-full bg-darkBg p-3 rounded-lg border border-gray-700 outline-none"
          value={form.title} onChange={e => setForm({...form, title: e.target.value})}
        />
        <textarea 
          placeholder="m3u8 link or Iframe code" 
          className="w-full bg-darkBg p-3 rounded-lg border border-gray-700 outline-none h-32"
          value={form.url} onChange={e => setForm({...form, url: e.target.value})}
        />
        <button className="w-full bg-red-600 p-3 rounded-lg font-bold">START STREAM</button>
      </form>
    </div>
  );
}
