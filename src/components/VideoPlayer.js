import { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import 'shaka-player/dist/controls.css';

export default function VideoPlayer({ url }) {
  const videoRef = useRef();

  useEffect(() => {
    if (!url.includes('<iframe')) {
      const player = new shaka.Player(videoRef.current);
      player.load(url).catch(e => console.error("Error loading stream", e));
    }
  }, [url]);

  if (url.includes('<iframe')) {
    return (
      <div className="aspect-video w-full border-0" 
           dangerouslySetInnerHTML={{ __html: url.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"') }} />
    );
  }

  return (
    <div className="aspect-video w-full bg-black">
      <video ref={videoRef} className="w-full h-full" controls autoPlay />
    </div>
  );
}
