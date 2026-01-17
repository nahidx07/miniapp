import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ url }) {
  const videoRef = useRef();

  useEffect(() => {
    if (url && !url.includes('<iframe')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = url;
      }
    }
  }, [url]);

  if (url.includes('<iframe')) {
    return (
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden" 
           dangerouslySetInnerHTML={{ __html: url.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"') }} />
    );
  }

  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-gray-800">
      <video ref={videoRef} className="w-full h-full" controls autoPlay muted playsInline />
    </div>
  );
}
