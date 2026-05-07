import { useNavigate } from "react-router-dom";
import { FaRobot, FaGithub, FaLightbulb, FaBrain, FaFire, FaCode } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";
import TextPressure from "./TextPressure";

const features = [
  {
    icon: <FaBrain />,
    title: "Groq-Powered AI",
    description: "Runs on llama-3.3-70b-versatile via Groq — one of the fastest LLM inference engines available.",
    points: [
      "Primary model: llama-3.3-70b-versatile",
      "Fallback model: llama3-70b-8192 on rate limits",
      "Instant responses with minimal latency",
    ],
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50/60",
  },
  {
    icon: <FaCode />,
    title: "Code-First Answers",
    description: "Syntax-highlighted, Markdown-rendered responses with real code examples.",
    points: [
      "Supports 100+ programming languages",
      "VSCode Dark+ syntax highlighting",
      "Inline code and full block rendering",
    ],
    gradient: "from-violet-500 to-violet-700",
    bg: "bg-violet-50/60",
  },
  {
    icon: <FaFire />,
    title: "Real-time Firebase",
    description: "Every message is persisted in Firestore and synced live across sessions.",
    points: [
      "Firestore onSnapshot real-time listener",
      "Messages scoped per user ID",
      "Auto welcome message on first login",
    ],
    gradient: "from-orange-500 to-orange-700",
    bg: "bg-orange-50/60",
  },
  {
    icon: <MdSecurity />,
    title: "Secure Auth",
    description: "Email/password and Google OAuth via Firebase Authentication.",
    points: [
      "Google OAuth one-click sign-in",
      "Session persisted via browserLocalPersistence",
      "Protected routes with auth guard",
    ],
    gradient: "from-green-500 to-green-700",
    bg: "bg-green-50/60",
  },
  {
    icon: <FaLightbulb />,
    title: "Model Fallback",
    description: "Never hits a dead end — automatically retries with a backup model.",
    points: [
      "Detects 429 rate limit errors automatically",
      "Seamless switch to fallback model",
      "User-friendly error messages",
    ],
    gradient: "from-yellow-500 to-yellow-600",
    bg: "bg-yellow-50/60",
  },
  {
    icon: <FaRobot />,
    title: "Private by Design",
    description: "All conversations are scoped to your user ID — completely private.",
    points: [
      "Per-user Firestore queries",
      "No shared chat history",
      "API key stored only in your browser",
    ],
    gradient: "from-pink-500 to-pink-700",
    bg: "bg-pink-50/60",
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
      {/* Hero */}
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

      {/* Sticky stacking feature cards */}
      <div className="max-w-3xl mx-auto px-4 pb-32">
        <div className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex max-sm:flex-col bg-white/20 backdrop-blur-md gap-4 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-white/40"
              style={{ top: `calc(80px + ${index * 28}px)`, position: 'sticky' }}
            >
              {/* Left — info */}
              <div className="flex flex-1 flex-col p-6 md:p-8">
                <h3
                  className="text-xl md:text-2xl border-b border-white/30 pb-2 text-neutral-900 font-semibold"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-neutral-700 mt-2 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {feature.description}
                </p>
                <ul className="mt-3 space-y-1">
                  {feature.points.map((point, i) => (
                    <li key={i} className="text-sm text-neutral-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                      — {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — icon visual */}
              <div className={`flex items-center justify-center ${feature.bg} backdrop-blur-sm min-w-[120px] sm:min-w-[160px] p-8`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <div className="text-white text-3xl">{feature.icon}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
      <div
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {number}
      </div>
      <div className="text-[#3a3a3a] text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
    </motion.div>
  );
}

export default Landing;
