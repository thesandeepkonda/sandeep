import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Phone, Send, Clock, CheckCircle, Terminal
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
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

      <div className="max-w-6xl mx-auto px-6">
        
        {/* ---- HEADER ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200 shadow-sm">
            <Terminal size={16} /> ~$ curl -X POST /api/contact
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Let's <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind? Let's discuss how we can work together.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.section>

        {/* ---- MAIN GRID ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          {/* Left Column - Contact Info */}
          <motion.div variants={fadeUp} className="space-y-6">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Contact <span className="text-blue-600">Information</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono font-medium uppercase">Email</div>
                    <div className="text-slate-700 text-sm font-semibold">kondasandeep56@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono font-medium uppercase">Phone</div>
                    <div className="text-slate-700 text-sm font-semibold">+91 8008806996</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono font-medium uppercase">Location</div>
                    <div className="text-slate-700 text-sm font-semibold">Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-bold text-slate-700">AVAILABILITY</span>
              </div>
              <div className="space-y-1 text-sm text-slate-600">
                <p>● Available for freelance work</p>
                <p>● Open to collaborations</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-sm font-bold text-slate-700 mb-4">Connect Online</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/thesandeepkonda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-slate-200"
                >
                  <FaGithub size={18} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/sandeepkonda07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-slate-200"
                >
                  <FaLinkedin size={18} /> LinkedIn
                </a>
                <a
                  href="https://twitter.com/thesandeepkonda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors border border-slate-200"
                >
                  <FaTwitter size={18} /> Twitter
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div variants={fadeUp}>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Send a <span className="text-blue-600">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-400 uppercase mb-1.5">
                    Name <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-400 uppercase mb-1.5">
                    Email <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-400 uppercase mb-1.5">
                    Message <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>Sending... <Clock size={18} /></>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium">
                    <CheckCircle size={16} /> Message sent successfully!
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- RESPONSE TIME FOOTER ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <span className="text-blue-600">⚡</span> RESPONSE TIME
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>📧 Email: Within 24 hours</span>
              <span>💬 Message: Within 12 hours</span>
              <span>🕐 IST (GMT+5:30)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}