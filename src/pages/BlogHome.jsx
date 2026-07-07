import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, User, Clock, ArrowRight, Heart, Eye, Terminal
} from 'lucide-react';

// Blog images (unchanged)
const blogImages = {
  1: "https://www.stjohns.in/healthscience/uploads/student-information/2-1.jpg", // ApiSynIQ
  2: "https://miro.medium.com/1*b0CH088PsihIRV45JvAq9Q.png", // Deploying Java Microservices
  3: "https://cdn.accelq.com/wp-content/uploads/2024/03/ci-cd-pipeline-stages.jpg", // CI/CD Pipeline
  4: "https://media.licdn.com/dms/image/v2/D4D22AQF5aTPHVgrdDg/feedshare-shrink_800/B4DZp2BVpbGgAg-/0/1762916654570?e=2147483647&v=beta&t=Ydp2FmkHYw0TsJQaTZfYLw5VVx9VBXNUUXFkn_cmTpo", // Microservices Spring Boot
  5: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDb974ujY_XX0_uQAjyTdt9i_gXMSZcoLMLpK4Gxe8iQ&s=10"  // Zufeto
};

export default function BlogHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  const blogPosts = [
      {
      id: 1,
      title: "LMS: A Modern Approach to API Development",
      excerpt: "Developed a robust Java Spring Boot backend for LMS, implementing secure REST APIs for user authentication, course management, student enrollment, assignments, quizzes, and progress tracking.",
      date: "July 7, 2026",
      author: "Sandeep Konda",
      category: "Java Backend",
      path: "/blog/ApiSynIQ",
      readTime: 8,
      views: 1247,
      likes: 89,
      tags: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "REST API",
        "Hibernate",
        "JPA",
        "JWT",
        "MySQL",
        "LMS"
      ]
    },
    {
      id: 2,
      title: "Deploying Java Microservices on Kubernetes",
      excerpt: "A comprehensive guide to containerizing and deploying Spring Boot applications on Kubernetes with production-ready configurations.",
      date: "June 1, 2026",
      author: "Sandeep Konda",
      category: "Kubernetes",
      path: "/blog/kubernetes-java",
      readTime: 12,
      views: 3421,
      likes: 234,
      tags: ["Kubernetes", "Java", "Spring Boot", "Docker", "EKS", "Helm", "Istio", "cert-manager", "Kafka", "Redis"]
    },
    {
      id: 3,
      title: "Production CI/CD Pipeline: From Git Commit to Kubernetes",
      excerpt: "Build a complete CI/CD pipeline that automatically builds, tests, and deploys Java applications to Kubernetes.",
      date: "May 28, 2026",
      author: "Sandeep Konda",
      category: "DevOps",
      path: "/blog/devops-pipeline",
      readTime: 15,
      views: 2856,
      likes: 178,
      tags: ["Jenkins", "GitHub Actions", "Kubernetes", "Terraform", "ArgoCD", "Docker"]
    },
    {
      id: 4,
      title: "Building Production-Ready Microservices with Spring Boot",
      excerpt: "Practical guide to building scalable, resilient microservices using Spring Boot, Spring Cloud, and industry best practices.",
      date: "June 1, 2026",
      author: "Sandeep Konda",
      category: "Java Backend",
      path: "/blog/microservices-java",
      readTime: 12,
      views: 1987,
      likes: 145,
      tags: ["Java", "Spring Boot", "Microservices", "Docker", "Kafka", "Redis"]
    },
    {
      id: 5,
      title: "Zufeto: A New Approach to Cloud-Native Development",
      excerpt: "Exploring the innovative features of Zufeto and how it's changing the way we develop cloud-native applications.",
      date: "June 10, 2026",
      author: "Sandeep Konda",
      category: "Cloud Native",
      path: "/blog/zufeto",
      readTime: 10,
      views: 1567,
      likes: 123,
      tags: ["Cloud Native", "Kubernetes", "Docker", "Go", "Python"]
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Terminal size={16} /> ~$ ls -la /blog/posts
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Technical <span className="text-blue-600">Insights</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Deep dives into Kubernetes, DevOps, Java microservices, and cloud infrastructure.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.section>

        {/* ---- SEARCH & FILTER ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="flex flex-col gap-6 mb-10"
        >
          {/* Search */}
          <div className="max-w-lg mx-auto w-full">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---- RESULTS COUNT ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm text-slate-600">
            <span className="font-semibold text-blue-600">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''} found
            {searchQuery && <span className="text-slate-400 ml-2">🔍 "{searchQuery}"</span>}
          </div>
        </motion.div>

        {/* ---- BLOG CARDS ---- */}
        {filteredPosts.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.div key={post.id} variants={fadeUp}>
                <Link to={post.path} className="block">
                  <div className="group grid grid-cols-1 md:grid-cols-[300px_1fr] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-60 md:h-auto overflow-hidden">
                      <img
                        src={blogImages[post.id]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col">
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-mono mb-3">
                        <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 leading-relaxed mb-4 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {post.tags.slice(0, 8).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 8 && (
                          <span className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded-full">
                            +{post.tags.length - 8} more
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <div className="flex gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Eye size={14} /> {post.views.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Heart size={14} /> {post.likes}</span>
                        </div>
                        <span className="flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                          Read more <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-lg mx-auto text-center py-16"
          >
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500">Try a different search term or category.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}