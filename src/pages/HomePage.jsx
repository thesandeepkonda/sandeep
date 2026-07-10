import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Mail, Cloud, Server, Layers, FolderDot,
  ArrowRight, Terminal, CheckCircle, Github, Sparkles
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { blogPosts } from '../data/blogData'; // adjust path as needed

const fullName = 'Sandeep Konda';
const TITLES = ['DevOps Engineer', 'Java Backend Architect', 'Cloud Native Developer'];

const EXPERTISE = [
  {
    icon: <Cloud className="w-8 h-8" />,
    title: 'DevOps & Cloud',
    desc: 'Designing highly available infrastructure using AWS, Terraform, Kubernetes, Docker, and automated CI/CD pipelines.',
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: 'Java Backend',
    desc: 'Architecting scalable microservices with Spring Boot, RESTful APIs, and event-driven systems using Apache Kafka.',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Full-Stack Integration',
    desc: 'Bridging the gap between robust backend systems and responsive frontend UIs using React, TypeScript, and Tailwind.',
  },
];

export default function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  // Smooth typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayText(fullName.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Rotating job titles
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = blogPosts ? blogPosts.slice(0, 3) : [];

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
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24 overflow-hidden">
      {/* ---- HERO with gradient background ---- */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative max-w-6xl mx-auto px-6 text-center"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl blur-3xl opacity-50" />

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8 border border-blue-200 shadow-sm">
          <Terminal size={16} /> Open to new opportunities
        </div>

        {/* Name with typing cursor */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
          Hey, I'm{' '}
          <span className="text-blue-600 relative">
            {displayText}
            <span className="inline-block w-1 h-10 md:h-14 bg-blue-600 ml-1 animate-pulse align-middle rounded-full" />
          </span>
        </h1>

        {/* Rotating titles */}
        <div className="h-12 text-2xl md:text-3xl text-slate-600 font-semibold mb-6 flex justify-center items-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute text-blue-600 font-bold"
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
          I build scalable, resilient systems at the intersection of robust cloud infrastructure and modern application logic.
        </p>

        {/* Stat badges with icons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { label: 'DevOps & Cloud', icon: <Cloud size={14} /> },
            { label: 'Java Backend', icon: <Server size={14} /> },
            { label: '2+ Years Exp', icon: <Sparkles size={14} /> },
            { label: '10+ Deploys', icon: <CheckCircle size={14} /> },
            { label: '99.99% Uptime', icon: <CheckCircle size={14} /> },
          ].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-slate-700 rounded-full text-sm font-medium border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            <Mail size={18} /> Let's Connect
          </Link>
          <a
            href="https://sandeepkonda.site/Sandeep_Konda_Resume1.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-700 px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <FileText size={18} /> View Resume
          </a>
          <a
            href="https://github.com/thesandeepkonda"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-md"
          >
            <FaGithub size={18} /> GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-16 hidden md:flex justify-center"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* ---- EXPERTISE ---- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-6 mt-40"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Core <span className="text-blue-600">Competencies</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {EXPERTISE.map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  {React.cloneElement(item.icon, {
                    className: 'w-8 h-8',
                  })}
                </div>
                <h3 className="text-slate-900 font-bold text-xl mt-6 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ---- FEATURED PROJECTS ---- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        className="max-w-6xl mx-auto px-6 mt-40"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Featured <span className="text-blue-600">Work</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full" />
          </div>
          <Link
            to="/blogs"
            className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((post) => (
            <motion.div variants={fadeUp} key={post.id}>
              <Link
                to={post.path}
                className="block h-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/40 transition-all duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-md">
                  <FolderDot className="w-6 h-6" />
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-3">{post.title}</h3>
                <p className="text-slate-600 line-clamp-3 mb-8 flex-grow">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 px-6 py-3 rounded-xl text-slate-700 font-bold hover:border-blue-500 transition-colors"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>

      {/* ---- FINAL CTA ---- */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-5xl mx-auto px-6 mt-40"
      >
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">
            Open to New Opportunities
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl relative z-10 mb-10">
            I'm looking for exciting opportunities where I can contribute my experience in Java, Spring Boot, AWS, Terraform, Docker, Kubernetes, and CI/CD while continuing to grow as a software engineer.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-extrabold transition-all relative z-10 shadow-lg hover:shadow-white/30 hover:-translate-y-1"
          >
            Contact Me <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}