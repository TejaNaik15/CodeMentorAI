import { useRef, useEffect } from 'react';
import { Globe, ArrowRight, Link2, X } from 'lucide-react';

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4';

function fadeOpacity(el, from, to, duration, onDone) {
  const start = performance.now();
  el.style.opacity = from;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    el.style.opacity = from + (to - from) * t;
    if (t < 1) requestAnimationFrame(step);
    else if (onDone) onDone();
  }
  requestAnimationFrame(step);
}

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => {
      v.play().catch(() => {});
      fadeOpacity(v, 0, 1, 500);
    };

    const onTimeUpdate = () => {
      const remaining = v.duration - v.currentTime;
      if (remaining <= 0.55 && parseFloat(v.style.opacity) > 0) {
        fadeOpacity(v, parseFloat(v.style.opacity) || 1, 0, 500);
      }
    };

    const onEnded = () => {
      v.style.opacity = 0;
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        fadeOpacity(v, 0, 1, 500);
      }, 100);
    };

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="min-h-screen bg-black overflow-hidden relative flex flex-col">
      {/* Background video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
      />

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg ml-2">Asme</span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              {['Features', 'Pricing', 'About'].map(link => (
                <a key={link} href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white text-sm font-medium">Sign Up</button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Know it then <em className="italic">all</em>.
        </h1>

        {/* Email input */}
        <div className="max-w-xl w-full mb-6">
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
            />
            <button className="bg-white rounded-full p-3 text-black flex-shrink-0">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <p className="text-white text-sm leading-relaxed px-4 max-w-md mb-6">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
        </p>

        <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
          Manifesto
        </button>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[Link2, X, Globe].map((Icon, i) => (
          <button key={i} className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all">
            <Icon size={20} />
          </button>
        ))}
      </div>
    </section>
  );
}
