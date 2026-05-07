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

      {/* Feature Section */}
      <section className="w-full py-16 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl font-semibold text-neutral-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Powerful Features
          </h1>
          <p className="text-sm text-neutral-600 mt-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Everything you need to get instant AI-powered coding help — securely, privately, and blazing fast.
          </p>
        </div>

        {/* Top 3 cards with image-style visuals */}
        <div className="flex flex-wrap items-start justify-center gap-8 max-w-5xl mx-auto">
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="max-w-xs w-full hover:-translate-y-0.5 transition duration-300"
            >
              <div className={`w-full h-44 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                <div className="text-white text-6xl opacity-80">{feature.icon}</div>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mt-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-600 mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom section — why choose */}
        <div className="max-w-5xl mx-auto mt-16 px-4">
          <p
            className="text-2xl md:text-3xl text-left font-medium max-w-2xl mb-8"
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: 'linear-gradient(to right, #1e293b, #4D6EA3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why developers choose CodeMentorAI?
          </p>

          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
            {features.slice(3).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-1 bg-white/25 backdrop-blur-md rounded-2xl border border-white/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow`}>
                  <div className="text-white text-xl">{feature.icon}</div>
                </div>
                <h3 className="text-base font-semibold text-neutral-900 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
