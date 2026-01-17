import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';

export default function Home() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "streams"), (snapshot) => {
      setStreams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-white p-4">
      <h1 className="text-2xl font-bold mb-6 text-red-600">Toto <span className="text-white">Stream</span></h1>
      <div className="grid gap-4">
        {streams.map(stream => (
          <Link href={`/watch/${stream.id}`} key={stream.id}>
            <div className="bg-darkCard p-4 rounded-xl border border-gray-800 hover:border-red-600 transition">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{stream.title}</h3>
                  <p className="text-gray-400 text-sm">{stream.category}</p>
                </div>
                {stream.isLive && <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold animate-pulse">LIVE</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
