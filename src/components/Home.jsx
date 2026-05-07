import { useNavigate } from "react-router-dom";
import { FaRobot, FaGithub, FaLightbulb, FaBrain, FaFire, FaCode } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";
import TextPressure from "./TextPressure";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const features = [
  {
    icon: <FaBrain className="text-3xl" />,
    title: "Groq-Powered AI",
    description: "Runs on llama-3.3-70b-versatile via Groq — one of the fastest LLM inference engines available.",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    icon: <FaCode className="text-3xl" />,
    title: "Code-First Answers",
    description: "Syntax-highlighted, Markdown-rendered responses with real code examples across 100+ languages.",
    gradient: "from-violet-500 to-violet-700",
  },
  {
    icon: <FaFire className="text-3xl" />,
    title: "Real-time Firebase",
    description: "Every message is persisted in Firestore and synced live — your full chat history, always available.",
    gradient: "from-orange-500 to-orange-700",
  },
  {
    icon: <MdSecurity className="text-3xl" />,
    title: "Secure Auth",
    description: "Email/password and Google OAuth via Firebase Authentication with session persistence.",
    gradient: "from-green-500 to-green-700",
  },
  {
    icon: <FaLightbulb className="text-3xl" />,
    title: "Model Fallback",
    description: "Automatically falls back to llama3-70b-8192 on rate limits so you never hit a dead end.",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    icon: <FaRobot className="text-3xl" />,
    title: "Private by Design",
    description: "All conversations are scoped to your user ID — no one else can see your chat history.",
    gradient: "from-pink-500 to-pink-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

function Landing() {
  const navigate = useNavigate();

  return (
    <VideoBackground>
      {/* Hero section */}
      <div className="container mx-auto px-6 text-center" style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '4rem' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center justify-center">
          <h1
            className="animate-fade-rise max-w-5xl font-normal text-5xl sm:text-7xl md:text-8xl text-[#000000]"
            style={{ fontFamily: "'Instrument Serif', serif", lineHeight: 0.95, letterSpacing: '-2.46px' }}
          >
            AI-Powered{' '}
            <em className="italic" style={{ color: '#6F6F6F' }}>Developer</em>{' '}
            Assistant
          </h1>

          <div className="animate-fade-rise-delay w-full max-w-3xl mt-8" style={{ height: '70px' }}>
            <TextPressure
              text="Experience a new era of coding"
              flex={true} alpha={false} stroke={false}
              width={true} weight={true} italic={true}
              textColor="#6F6F6F" minFontSize={14}
            />
          </div>
          <div className="w-full max-w-2xl" style={{ height: '55px' }}>
            <TextPressure
              text="AI that understands, solves & builds"
              flex={true} alpha={false} stroke={false}
              width={true} weight={true} italic={true}
              textColor="#6F6F6F" minFontSize={12}
            />
          </div>

          <div className="animate-fade-rise-delay-2 flex justify-center gap-6 flex-wrap mt-10">
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
      </div>

      {/* ScrollStack feature cards */}
      <div style={{ height: '100vh', width: '100%', maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>
        <ScrollStack
          itemDistance={80}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.88}
          rotationAmount={0}
          blurAmount={0}
        >
          {features.map((f, i) => (
            <ScrollStackItem key={i}>
              <div className="flex items-start gap-5">
                <div className={`w-14 h-14 shrink-0 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center`}>
                  <div className="text-white">{f.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{f.title}</h3>
                  <p className="text-[#3a3a3a] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{f.description}</p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 pb-20">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number="100+" label="Programming Languages" />
          <StatCard number="24/7" label="AI Availability" />
          <StatCard number="⚡ Fast" label="Groq Inference" />
          <StatCard number="🔒" label="Private & Secure" />
        </motion.div>
      </div>
    </VideoBackground>
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
