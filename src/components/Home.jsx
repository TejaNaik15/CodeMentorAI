import { useNavigate } from "react-router-dom";
import { FaRobot, FaLock, FaGithub, FaLightbulb, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

function Landing() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <VideoBackground>
      <div className="container mx-auto px-6 text-center" style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <h1
            className="animate-fade-rise max-w-5xl font-normal text-5xl sm:text-7xl md:text-8xl text-[#000000]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
            }}
          >
            AI-Powered{' '}
            <em className="italic" style={{ color: '#6F6F6F' }}>Developer</em>{' '}
            Assistant
          </h1>

          <p
            className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
            style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}
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
              className="rounded-full px-14 py-5 text-base flex items-center gap-3 hover:scale-[1.03] transition-transform duration-200 border border-gray-300"
              style={{ color: '#000000', fontFamily: "'Inter', sans-serif" }}
            >
              <FaGithub className="text-xl" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <FeatureCard
            icon={<FaBrain />}
            title="AI-Powered Intelligence"
            description="Advanced machine learning algorithms that understand your code context and provide smart suggestions."
            gradient="from-blue-500 to-blue-700"
          />
          <FeatureCard
            icon={<FaLightbulb />}
            title="Smart Solutions"
            description="Get instant help with debugging, optimization, and best practices across all programming languages."
            gradient="from-purple-500 to-purple-700"
          />
          <FeatureCard
            icon={<FaLock />}
            title="Secure & Private"
            description="Your code and conversations are encrypted and completely private. We take security seriously."
            gradient="from-pink-500 to-pink-700"
          />
        </motion.div>

        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <StatCard number="100+" label="Programming Languages" />
          <StatCard number="24/7" label="AI Availability" />
          <StatCard number="1M+" label="Developers" />
          <StatCard number="5⭐" label="Average Rating" />
        </motion.div>
      </div>
    </VideoBackground>
  );
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200/60
                hover:border-gray-300 transition-all duration-300 group shadow-sm`}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center
                    transform group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white text-2xl">{icon}</div>
      </div>
      <h3 className="text-[#000000] text-xl font-semibold mt-6 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</h3>
      <p className="text-[#6F6F6F] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-6 bg-white/60 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-sm"
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2"
        style={{ fontFamily: "'Instrument Serif', serif" }}>
        {number}
      </div>
      <div className="text-[#6F6F6F] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</div>
    </motion.div>
  );
}

export default Landing;