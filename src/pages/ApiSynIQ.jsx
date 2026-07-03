import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, User, Tag, Copy, Check, Clock, Terminal
} from 'lucide-react';
import CommentSection from '../components/CommentSection';

export default function ApiSynIQ() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyCode = () => {
    const code = `@AIExposeController(
    name = "BookingController",
    description = "Handles all ticket booking operations"
)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @AIExposeEpHttp(
        name = "CreateBooking",
        tags = {"booking", "create"},
        inputDescription = "Creates a new ticket booking",
        returnDescription = "Returns booking confirmation ID"
    )
    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request) {
        // booking logic
    }
}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24 overflow-hidden relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* ---- BACK BUTTON ---- */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </motion.button>

        {/* ---- HEADER ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4 border border-blue-200 shadow-sm">
            <Terminal size={16} /> $ cat apisyniq.md
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            ApiSynIQ — Talk to Your APIs
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            An open-source framework that lets users interact with your APIs through natural voice or text.
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> May 20, 2026</span>
            <span className="flex items-center gap-1.5"><User size={14} /> Sandeep Konda</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> 8 min read</span>
          </div>
        </motion.section>

        {/* ---- MAIN CONTENT ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Content Card */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What is ApiSynIQ?</h2>
                <p className="text-slate-600 leading-relaxed">
                  <strong className="text-blue-600">ApiSynIQ</strong> is an open-source framework that sits as a conversational layer
                  in front of your APIs. Instead of building complex frontend forms for every endpoint, your users simply speak
                  or type what they want — and ApiSynIQ figures out the intent, constructs the correct request payload, calls
                  the right endpoint, and returns a human-readable response.
                </p>

                {/* Key Feature Highlight */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🎯</span> KEY FEATURE
                  </div>
                  <p className="text-slate-700 text-sm">
                    A conversational layer that makes APIs accessible to anyone, through any interface.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Architecture</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  A user query travels through four purpose-built layers: <strong className="text-blue-600">GO Gateway</strong> (HTTP/WebSocket handling),
                  <strong className="text-blue-600"> AI Orchestrator</strong> (LangChain/LangGraph for intent processing),
                  <strong className="text-blue-600"> API Resolver</strong> (Java with pgvector for RAG), and
                  <strong className="text-blue-600"> Java Agent SDK</strong> for API annotation.
                </p>

                {/* Architecture Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {['🚀 GO Gateway', '🧠 AI Orchestrator', '💾 API Resolver', '🔌 Java Agent SDK'].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
                      <span className="text-2xl block mb-1">{item.split(' ')[0]}</span>
                      <span className="text-sm font-semibold text-slate-700">{item.split(' ').slice(1).join(' ')}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Code Example</h2>

                {/* Code Block with Copy */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">BookingController.java</span>
                    <button
                      onClick={copyCode}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy code"
                    >
                      {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`@AIExposeController(
    name = "BookingController",
    description = "Handles all ticket booking operations"
)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @AIExposeEpHttp(
        name = "CreateBooking",
        tags = {"booking", "create"},
        inputDescription = "Creates a new ticket booking",
        returnDescription = "Returns booking confirmation ID"
    )
    @PostMapping("/create")
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request) {
        // booking logic
    }
}`}
                  </pre>
                </div>

                {/* Key Takeaway */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🎯</span> KEY TAKEAWAY
                  </div>
                  <p className="text-slate-700 text-sm">
                    ApiSynIQ removes the friction between users and APIs. Instead of learning API endpoints, users just say what they want.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <Tag size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-slate-700">TAGS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Go', 'Python', 'Java', 'gRPC', 'AI', 'LangChain'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---- COMMENTS ---- */}
          <motion.div variants={fadeUp}>
            <CommentSection postId={1} />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}