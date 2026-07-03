import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, Cloud, Server, Layers, FolderDot, ArrowRight, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { blogPosts } from '../data/blogData';

const fullName = 'Sandeep Konda';
const TITLES = ['DevOps Engineer', 'Java Backend Architect', 'Cloud Native Developer'];

const EXPERTISE = [
  {
    icon: <Cloud className="w-8 h-8 text-teal-600 mb-4" />,
    title: 'DevOps & Cloud',
    desc: 'Designing highly available infrastructure using AWS, Terraform, Kubernetes, Docker, and automated CI/CD pipelines.',
  },
  {
    icon: <Server className="w-8 h-8 text-teal-600 mb-4" />,
    title: 'Java Backend',
    desc: 'Architecting scalable microservices with Spring Boot, RESTful APIs, and event-driven systems using Apache Kafka.',
  },
  {
    icon: <Layers className="w-8 h-8 text-teal-600 mb-4" />,
    title: 'Full-Stack Integration',
    desc: 'Bridging the gap between robust backend systems and responsive frontend UIs using React, TypeScript, and Tailwind.',
  }
];

export default function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  // Smooth Typing effect
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

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pt-32 pb-24 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUpVariants}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-800 font-medium text-sm mb-8 shadow-sm border border-teal-200">
          <Terminal size={16} /> Open to new opportunities
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Hey, I'm{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">
            {displayText}
          </span>
          <span className="inline-block w-1.5 h-10 md:h-14 bg-teal-600 ml-1 animate-pulse align-middle rounded-full"></span>
        </h1>
        
        {/* Animated Rotating Title */}
        <div className="h-12 text-2xl md:text-3xl text-slate-600 font-medium mb-6 overflow-hidden relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute font-semibold text-teal-700"
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-10">
          I build scalable, resilient systems at the intersection of robust cloud infrastructure and modern application logic.
        </p>

        {/* Professional Stat Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['DevOps & Cloud', 'Java Backend', '2+ Years Exp', '50+ Deploys', '99.99% Uptime'].map((stat, idx) => (
            <span key={idx} className="px-4 py-1.5 bg-white text-slate-600 rounded-lg text-sm font-semibold border border-slate-200 shadow-sm">
              {stat}
            </span>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-teal-600/30 hover:-translate-y-0.5">
            <Mail size={18} /> Let's Connect
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-teal-600 text-slate-700 hover:text-teal-700 px-8 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-sm">
            <FileText size={18} /> View Resume
          </a>
          <a href="https://github.com/thesandeepkonda" target="_blank" rel="noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-md">
            <FaGithub size={18} /> GitHub
          </a>
        </div>
      </motion.section>

      {/* 2. EXPERTISE SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="max-w-6xl mx-auto px-6 mt-40"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Core <span className="text-teal-600">Competencies</span></h2>
          <div className="w-20 h-1.5 bg-teal-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {EXPERTISE.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpVariants}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                {React.cloneElement(item.icon, { className: "w-8 h-8 text-teal-600 group-hover:text-white transition-colors" })}
              </div>
              <h3 className="text-slate-900 font-bold text-xl mt-6 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
        className="max-w-6xl mx-auto px-6 mt-40"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Featured <span className="text-teal-600">Work</span></h2>
            <div className="w-20 h-1.5 bg-teal-600 mt-4 rounded-full"></div>
          </div>
          <Link to="/blogs" className="hidden md:flex items-center gap-2 text-teal-600 font-bold hover:text-teal-800 transition-colors">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>

        <motion.div variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map((post) => (
            <motion.div variants={fadeUpVariants} key={post.id}>
              <Link to={post.path} className="block h-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-400 transition-all duration-300 flex flex-col">
                <FolderDot className="w-10 h-10 text-teal-600 mb-6" />
                <h3 className="text-slate-900 font-bold text-xl mb-3">{post.title}</h3>
                <p className="text-slate-500 line-clamp-3 mb-8 flex-grow">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center md:hidden">
          <Link to="/blogs" className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 px-6 py-3 rounded-xl text-slate-700 font-bold hover:border-teal-600 hover:text-teal-600 transition-colors">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </motion.section>

      {/* 4. FINAL CALL TO ACTION */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUpVariants}
        className="max-w-5xl mx-auto px-6 mt-40"
      >
        <div className="bg-slate-900 rounded-3xl p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10 tracking-tight">Ready to collaborate?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl relative z-10 mb-10">
            Whether you need robust cloud infrastructure, a scalable backend, or a full-stack solution—let's build it together.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-4 rounded-xl font-extrabold transition-all relative z-10 shadow-lg shadow-teal-500/25 hover:-translate-y-1">
            Start a Conversation <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>

    </div>
  );
}