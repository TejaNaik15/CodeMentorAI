import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4';

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: "'Instrument Serif', serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Innovation{' '}
          <em className="italic text-white/40">x</em>{' '}
          Vision
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: video */}
          <motion.div
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              src={VIDEO_URL}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>

          {/* Right: text blocks */}
          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Choose your space</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every meaningful breakthrough begins at the intersection of disciplined strategy and remarkable creative vision. We operate at that crossroads, turning bold thinking into tangible outcomes that move people and reshape industries.
              </p>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Shape the future</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                We believe that the best work emerges when curiosity meets conviction. Our process is designed to uncover hidden opportunities and translate them into experiences that resonate long after the first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
