import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Mail, Cloud, Server, Layers, Folder, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const fullName = 'Sandeep Konda';
const TITLES = ['DevOps Engineer', 'Java Backend Architect', 'Cloud Native Developer'];

const EXPERTISE = [
  {
    icon: <Cloud className="w-8 h-8 text-teal-600 mb-3" />,
    title: 'DevOps & Cloud',
    desc: 'AWS, Terraform, Kubernetes, Docker, CI/CD pipelines.',
  },
  {
    icon: <Server className="w-8 h-8 text-teal-600 mb-3" />,
    title: 'Java Backend',
    desc: 'Spring Boot, Microservices, REST API, Apache Kafka.',
  },
  {
    icon: <Layers className="w-8 h-8 text-teal-600 mb-3" />,
    title: 'Full-Stack',
    desc: 'React, TypeScript, Tailwind CSS, System Integrations.',
  }
];

export default function HomePage() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullName.length) {
        setDisplayText(fullName.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Rotating titles
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = blogPosts.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="container mx-auto px-6 pt-28 pb-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold gradient-text mb-4 tracking-tight">
          Hey, I'm {displayText}
          <span className="inline-block w-1 h-8 sm:h-12 bg-teal-600 ml-2 animate-pulse align-middle rounded-full"></span>
        </h1>
        
        <div className="h-10 text-xl sm:text-2xl text-slate-700 mb-4 overflow-hidden relative flex justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-teal-600 font-mono font-bold absolute"
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <p className="text-slate-500 max-w-lg mx-auto text-lg leading-relaxed mb-8">
          Building scalable, resilient systems at the intersection of infrastructure and application logic.
        </p>

        {/* Stat Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['🔧 DevOps & Cloud', '☕ Java Backend', '⚡ 2+ Years Exp', '📦 50+ Deploys', '📈 99.99% Uptime'].map((stat, idx) => (
            <span key={idx} className="stat-badge">
              {stat}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <FileText size={18} /> Resume
          </a>
          <a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" className="btn-outline">
            <span className="text-xl">🐙</span> GitHub
          </a>
          <Link to="/contact" className="btn-outline">
            <Mail size={18} /> Contact
          </Link>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-32"
      >
        <h2 className="section-title text-center mb-12">My <span>Expertise</span></h2>
        
        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
          {EXPERTISE.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="card p-8 flex flex-col items-center text-center group"
            >
              <div className="p-4 bg-teal-50 rounded-full group-hover:bg-teal-100 transition-colors mb-4">
                {item.icon}
              </div>
              <h3 className="text-slate-800 font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="mt-32"
      >
        <div className="flex justify-between items-end mb-10">
          <h2 className="section-title">Featured <span>Projects</span></h2>
          <Link to="/blogs" className="hidden md:flex items-center gap-1 text-teal-600 font-medium hover:text-teal-700 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((post) => (
            <motion.div variants={itemVariants} key={post.id}>
              <Link to={post.path} className="card block p-6 h-full flex flex-col hover:border-teal-500/50">
                <Folder className="w-8 h-8 text-teal-500 mb-4" />
                <h3 className="text-slate-800 font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 flex-grow mb-6">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/blogs" className="btn-outline">
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-32"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-16 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Let’s Build Something Great</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-lg relative z-10">
            Have a complex infrastructure challenge or a backend project in mind? Let’s connect.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-8 bg-teal-500 hover:bg-teal-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/25 hover:-translate-y-1 relative z-10">
            Get in Touch <ArrowRight size={20} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}