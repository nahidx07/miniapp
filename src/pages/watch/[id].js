import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import VideoPlayer from '../../components/VideoPlayer';
import LiveChat from '../../components/LiveChat';

export default function Watch() {
  const router = useRouter();
  const { id } = router.query;
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (id) {
      return onSnapshot(doc(db, "streams", id), (docSnap) => {
        setStream(docSnap.data());
      });
    }
  }, [id]);

  if (!stream) return <div className="p-10 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-darkBg text-white">
      <VideoPlayer url={stream.url} />
      <div className="p-4">
        <h1 className="text-xl font-bold">{stream.title}</h1>
        <div className="text-sm text-gray-400 mt-1">{stream.viewers || 0} Watching Now</div>
        <LiveChat streamId={id} userName="User" />
      </div>
    </div>
  );
}
