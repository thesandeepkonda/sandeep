import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, Clock, ArrowRight, Heart, Eye } from 'lucide-react';

// Canvas Network Component
const CanvasNetwork = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const initParticles = () => {
      const particles = [];
      const numParticles = Math.min(120, Math.floor((width * height) / 9000));
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 1.0,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseColor: `hsl(${Math.random() * 60 + 150}, 85%, 60%)`,
        });
      }
      particlesRef.current = particles;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.7;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.4;
            ctx.strokeStyle = `rgba(0, 255, 200, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }
      
      particlesRef.current.forEach(p => {
        if (mouseRef.current.x && mouseRef.current.y) {
          const dxMouse = p.x - mouseRef.current.x;
          const dyMouse = p.y - mouseRef.current.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - distMouse) / mouseRef.current.radius;
            p.vx += dxMouse * 0.002 * force;
            p.vy += dyMouse * 0.002 * force;
          }
        }
        
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
        
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffcc';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    resize();
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="canvas-bg" />;
};

// High-quality blog images
const blogImages = {
  1: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
  2: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
  3: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
  4: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
  5: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"  // Add this for Zufeto
};

export default function BlogHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollProgress, setScrollProgress] = useState(0);

  const blogPosts = [
    {
      id: 1,
      title: "ApiSynIQ — Talk to Your APIs",
      excerpt: "An open-source framework that lets users interact with your APIs through natural voice or text — no forms, no JSON wrangling, just intent.",
      date: "May 20, 2026",
      author: "Koteshwar Chinnolla",
      category: "Open Source",
      path: "/blog/apisyniq",
      readTime: 8,
      views: 1247,
      likes: 89,
      tags: ["Go", "Python", "Java", "gRPC", "AI", "NLP"]
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

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '16px', fontSize: '14px' }}>
            ~$ ls -la /blog/posts
          </div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            Technical <span>Insights</span>
          </h1>
          <p className="hero-description" style={{ maxWidth: '600px', margin: '0 auto', color: '#a0a0b0' }}>
            Deep dives into Kubernetes, DevOps, Java microservices, and cloud infrastructure.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          {/* Search */}
          <div style={{ maxWidth: '500px', margin: '0 auto', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(0, 255, 170, 0.2)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 170, 0.2)'}
              />
            </div>
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 20px',
                  background: selectedCategory === cat ? '#00ffaa' : 'rgba(0, 0, 0, 0.3)',
                  border: selectedCategory === cat ? 'none' : '1px solid rgba(0, 255, 170, 0.3)',
                  borderRadius: '40px',
                  color: selectedCategory === cat ? '#000' : '#ccc',
                  fontSize: '13px',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="live-status-panel" style={{ display: 'inline-block' }}>
            <div className="status-header">📊 RESULTS</div>
            <div className="status-items">
              <span>{filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found</span>
              {searchQuery && <span>🔍 Searching: "{searchQuery}"</span>}
            </div>
          </div>
        </div>

        {/* Blog Cards Grid - Large & Professional */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {filteredPosts.map((post, index) => (
            <Link to={post.path} key={post.id} style={{ textDecoration: 'none' }}>
              <div 
                className="project-card" 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  gap: '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.5s ease ${index * 0.1}s both`
                }}
              >
                {/* Image Section */}
                <div style={{
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img 
                    src={blogImages[post.id]} 
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(0, 255, 170, 0.9)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>
                    {post.category}
                  </div>
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '28px' }}>
                  {/* Author & Meta */}
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', fontSize: '12px', color: '#888', fontFamily: "'Fira Code', monospace" }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} /> {post.author}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} /> {post.readTime} min read
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h2 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: 'bold', 
                    color: '#fff', 
                    marginBottom: '16px',
                    lineHeight: '1.3'
                  }}>
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p style={{ color: '#b0b0c0', lineHeight: '1.6', marginBottom: '20px', fontSize: '14px' }}>
                    {post.excerpt}
                  </p>
                  
                  {/* Tags - Showing many tags like in your screenshot */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {post.tags.slice(0, 8).map(tag => (
                      <span key={tag} style={{
                        padding: '4px 12px',
                        background: 'rgba(0, 255, 170, 0.1)',
                        borderRadius: '20px',
                        fontSize: '11px',
                        color: '#00ffaa',
                        fontFamily: "'Fira Code', monospace"
                      }}>
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 8 && (
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        fontSize: '11px',
                        color: '#888'
                      }}>
                        +{post.tags.length - 8} more
                      </span>
                    )}
                  </div>
                  
                  {/* Stats & Read More */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '20px',
                    marginTop: '8px'
                  }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666' }}>
                        <Eye size={14} /> {post.views.toLocaleString()} views
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666' }}>
                        <Heart size={14} /> {post.likes} likes
                      </span>
                    </div>
                    <span style={{ 
                      color: '#00ffaa', 
                      fontSize: '14px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontWeight: '500'
                    }}>
                      Read more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="terminal" style={{ maxWidth: '500px', margin: '60px auto' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="terminal-title">error — 404</div>
            </div>
            <div className="terminal-body">
              <div><span className="term-command">$</span> No articles found</div>
              <div><span className="term-string">"Try a different search term"</span></div>
              <div className="cursor"></div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}