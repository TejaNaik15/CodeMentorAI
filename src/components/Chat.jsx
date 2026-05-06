import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../config/firebase";
import { generateWithFallback } from "../config/gemini";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navigation from "./Navigation";

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [indexReady, setIndexReady] = useState(false);
  const [user] = useAuthState(auth);
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
    function startPlay() {
      v.play().catch(() => {});
      animateOpacity(0, 1, 500, () => { rafRef.current = requestAnimationFrame(monitor); });
    }
    const onEnded = () => {
      fadingOut.current = false;
      v.style.opacity = 0;
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        animateOpacity(0, 1, 500, () => { rafRef.current = requestAnimationFrame(monitor); });
      }, 100);
    };
    v.addEventListener('canplay', startPlay, { once: true });
    v.addEventListener('loadeddata', startPlay, { once: true });
    v.addEventListener('loadedmetadata', startPlay, { once: true });
    v.addEventListener('ended', onEnded);
    if (v.readyState >= 2) startPlay();
    return () => {
      v.removeEventListener('canplay', startPlay);
      v.removeEventListener('loadeddata', startPlay);
      v.removeEventListener('loadedmetadata', startPlay);
      v.removeEventListener('ended', onEnded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const initializeChat = async () => {
      const messagesRef = collection(db, "messages");
      const userMessagesQuery = query(
        messagesRef,
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(userMessagesQuery);

      if (snapshot.empty) {
        await addDoc(messagesRef, {
          text: `Hello there! I'm here to help you with programming questions. Ask me anything!`,
          timestamp: serverTimestamp(),
          role: "ai",
          userId: user.uid,
          isWelcomeMessage: true,
        });
      }
    };

    initializeChat();

    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
        setIndexReady(true);
      },
      error: (error) => {
        console.error("Error fetching messages:", error);
        setIndexReady(true);
      },
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const userMessageDoc = await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp(),
        role: "user",
        userId: user.uid,
      });

      const response = await generateWithFallback(
        `You are a programming assistant. User question: ${newMessage}`
      );

      await addDoc(collection(db, "messages"), {
        text: response,
        timestamp: serverTimestamp(),
        role: "ai",
        userId: user.uid,
        replyTo: userMessageDoc.id,
      });
    } catch (error) {
      console.error("Error:", error);
      const isQuota = error.message?.includes("quota") || error.message?.includes("429");
      const friendlyMsg = isQuota
        ? "⚠️ Rate limit exceeded. Please wait a moment or get a new API key at https://console.groq.com/keys"
        : "Error: " + error.message;
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: friendlyMsg, role: "ai", userId: user.uid },
      ]);
    } finally {
      setNewMessage("");
      setIsLoading(false);
    }
  };

  const MessageContent = ({ text }) => (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          ul: ({ children }) => <ul className="mb-3 list-disc pl-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-3 list-decimal pl-4 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-bold mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
          a: ({ children, href }) => <a href={href} className="text-blue-500 hover:text-blue-600 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic">{children}</blockquote>,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <div className="rounded-lg overflow-hidden my-3">
                <div className="bg-gray-800 px-4 py-2 text-xs text-gray-200 uppercase">{match[1]}</div>
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" customStyle={{ margin: 0, borderRadius: "0 0 0.5rem 0.5rem" }} {...props}>
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono" {...props}>{children}</code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );

  const LoadingDots = () => (
    <div className="flex space-x-1 items-center">
      <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white flex flex-col">
      {/* Video background */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        autoPlay
        playsInline
        loop
        preload="auto"
        x-webkit-airplay="deny"
        style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.8) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      {/* Navigation */}
      <div className="relative z-20">
        <Navigation />
      </div>

      {/* Chat header */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1
              className="text-xl"
              style={{ fontFamily: "'Instrument Serif', serif", color: '#000000' }}
            >
              AI Chat Assistant
            </h1>
            <p className="text-sm" style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>
              Get answers. Find inspiration. Be more productive.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      {!indexReady ? (
        <div className="relative z-10 flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4 p-8 bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-sm max-w-md w-full">
            <div className="w-14 h-14 mx-auto rounded-full bg-black flex items-center justify-center animate-pulse">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>Setting up the chat... This may take a few moments.</p>
            <LoadingDots />
          </div>
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
                      message.role === 'user'
                        ? 'bg-black text-white ml-4'
                        : 'bg-white/80 backdrop-blur-sm border border-gray-200/60 mr-4'
                    }`}
                  >
                    <div
                      className="text-xs mb-2"
                      style={{
                        color: message.role === 'user' ? 'rgba(255,255,255,0.6)' : '#6F6F6F',
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {message.role === 'user' ? 'You' : 'AI Assistant'}
                    </div>
                    <div style={{ color: message.role === 'user' ? '#fff' : '#000000' }}>
                      <MessageContent text={message.text} />
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl px-5 py-4 mr-4">
                    <div className="text-xs mb-2" style={{ color: '#6F6F6F', fontFamily: "'Inter', sans-serif" }}>AI Assistant</div>
                    <LoadingDots />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input bar */}
          <div className="relative z-10 bg-white/70 backdrop-blur-lg border-t border-gray-200/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask a programming question..."
                  disabled={isLoading}
                  className="flex-1 px-5 py-3 rounded-full border border-gray-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-gray-400 disabled:opacity-50 transition-all"
                  style={{ color: '#000000', fontFamily: "'Inter', sans-serif" }}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full px-6 py-3 text-sm text-white disabled:opacity-50 hover:scale-[1.03] transition-transform"
                  style={{ backgroundColor: '#000000', fontFamily: "'Inter', sans-serif" }}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
