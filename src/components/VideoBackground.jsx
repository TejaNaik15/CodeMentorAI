import { useRef, useEffect } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

export default function VideoBackground({ children }) {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const fadingOut = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    function animateOpacity(from, to, duration, onDone) {
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        v.style.opacity = from + (to - from) * t;
        if (t < 1) rafRef.current = requestAnimationFrame(step);
        else if (onDone) onDone();
      }
      rafRef.current = requestAnimationFrame(step);
    }

    function monitor() {
      if (v.duration && !fadingOut.current) {
        const remaining = v.duration - v.currentTime;
        if (remaining <= 0.5) {
          fadingOut.current = true;
          animateOpacity(1, 0, 500);
        }
      }
      rafRef.current = requestAnimationFrame(monitor);
    }

    const onCanPlay = () => {
      v.play().catch(() => {});
      animateOpacity(0, 1, 500, () => {
        rafRef.current = requestAnimationFrame(monitor);
      });
    };

    const onEnded = () => {
      fadingOut.current = false;
      v.style.opacity = 0;
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        animateOpacity(0, 1, 500, () => {
          rafRef.current = requestAnimationFrame(monitor);
        });
      }, 100);
    };

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('ended', onEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Video layer */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        className="absolute w-full object-cover pointer-events-none"
        style={{ opacity: 0, top: '300px', inset: 'auto 0 0 0' }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none z-[1]" />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
