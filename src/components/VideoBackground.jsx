import { useRef, useEffect } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4';

export default function VideoBackground({ children }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().then(() => {
        v.style.transition = 'opacity 0.8s ease';
        v.style.opacity = 1;
      }).catch(() => {});
    };

    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener('canplaythrough', tryPlay, { once: true });
    }

    return () => v.removeEventListener('canplaythrough', tryPlay);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white" style={{ isolation: 'isolate' }}>
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        webkit-playsinline="true"
        x-webkit-airplay="deny"
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.8) 100%)',
        zIndex: 1, pointerEvents: 'none'
      }} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
