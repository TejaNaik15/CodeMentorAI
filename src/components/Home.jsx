import { useNavigate } from "react-router-dom";
import { FaRobot, FaGithub, FaLightbulb, FaBrain, FaFire, FaCode } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <VideoBackground>
      <div className="container mx-auto px-6 text-center" style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '6rem' }}>

        {/* Hero */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <h1
            className="animate-fade-rise max-w-5xl font-normal text-5xl sm:text-7xl md:text-8xl text-[#000000]"
            style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 0.95, letterSpacing: '-2.46px' }}
          >
            AI-Powered{' '}
            <em className="italic" style={{ color: '#6F6F6F' }}>Developer</em>{' '}
            Assistant
          </h1>

          <p
            className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-medium"
            style={{
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              textShadow: '0 1px 8px rgba(255,255,255,0.9)',
            }}
          >
            Experience a new era of coding where an AI companion understands your needs, resolves your challenges, and helps you create exceptional software.
          </p>

          <div className="animate-fade-rise-delay-2 flex justify-center gap-6 flex-wrap mt-12">
            <button
              onClick={() => navigate("/auth")}
              className="rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] transition-transform duration-200 flex items-center gap-3"
              style={{ backgroundColor: '#000000', fontFamily: "'Inter', sans-serif" }}
            >
              <FaRobot className="text-xl" />
              Start Coding Now
              <span className="inline-block animate-bounce">→</span>
            </button>
            <a
              href="https://github.com/TejaNaik15/CodeMentorAI"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-14 py-5 text-base flex items-center gap-3 hover:scale-[1.03] transition-transform duration-200 border border-gray-400 bg-white/30 backdrop-blur-sm"
              style={{ color: '#000000', fontFamily: "'Inter', sans-serif" }}
            >
              <FaGithub className="text-xl" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Feature Cards — minimal so video shows through */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mt-24"
        >
          <FeatureCard
            icon={<FaBrain />}
            title="Groq-Powered AI"
            description="Runs on llama-3.3-70b-versatile via Groq — one of the fastest LLM inference engines available."
            gradient="from-blue-500 to-blue-700"
          />
          <FeatureCard
            icon={<FaCode />}
            title="Code-First Answers"
            description="Get syntax-highlighted, Markdown-rendered responses with real code examples across 100+ languages."
            gradient="from-violet-500 to-violet-700"
          />
          <FeatureCard
            icon={<FaFire />}
            title="Real-time Firebase"
            description="Every message is persisted in Firestore and synced live — your full chat history, always available."
            gradient="from-orange-500 to-orange-700"
          />
          <FeatureCard
            icon={<MdSecurity />}
            title="Secure Auth"
            description="Email/password and Google OAuth via Firebase Authentication with session persistence."
            gradient="from-green-500 to-green-700"
          />
          <FeatureCard
            icon={<FaLightbulb />}
            title="Model Fallback"
            description="Automatically falls back to llama3-70b-8192 on rate limits so you never hit a dead end."
            gradient="from-yellow-500 to-yellow-600"
          />
          <FeatureCard
            icon={<FaRobot />}
            title="Private by Design"
            description="All conversations are scoped to your user ID — no one else can see your chat history."
            gradient="from-pink-500 to-pink-700"
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <StatCard number="100+" label="Programming Languages" />
          <StatCard number="24/7" label="AI Availability" />
          <StatCard number="⚡ Fast" label="Groq Inference" />
          <StatCard number="🔒" label="Private & Secure" />
        </motion.div>
      </div>
    </VideoBackground>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/40 hover:bg-white/40 transition-all duration-300 group shadow-sm text-left"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white text-xl">{icon}</div>
      </div>
      <h3 className="text-[#000000] text-lg font-semibold mt-4 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</h3>
      <p className="text-[#3a3a3a] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-5 bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm"
    >
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1"
        style={{ fontFamily: "'Instrument Serif', serif" }}>
        {number}
      </div>
      <div className="text-[#3a3a3a] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
    </motion.div>
  );
}

export default Landing;
