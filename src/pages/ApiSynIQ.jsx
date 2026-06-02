import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Copy, Check, Clock } from 'lucide-react';
import CommentSection from '../components/CommentSection';

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

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', maxWidth: '900px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/blogs')}
          style={{
            background: 'none',
            border: 'none',
            color: '#00ffaa',
            cursor: 'pointer',
            fontFamily: "'Fira Code', monospace",
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '30px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#80ffff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#00ffaa'}
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '10px' }}>
            $ cat apisyniq.md
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>ApiSynIQ — Talk to Your APIs</h1>
          <p className="hero-description">
            An open-source framework that lets users interact with your APIs through natural voice or text.
          </p>
          
          <div className="live-status-panel">
            <div className="status-header">📄 ARTICLE METADATA</div>
            <div className="status-items">
              <span><Calendar size={12} /> May 20, 2026</span>
              <span><User size={12} />Sandeep Konda</span>
              <span><Clock size={12} /> 8 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="java-backend-showcase" style={{ padding: '40px' }}>
          <div className="code-showcase">
            <div className="code-tabs">
              <div className="code-tab active">README.md</div>
            </div>
            <div className="code-block" style={{ padding: '30px' }}>
              <div style={{ color: '#aaffdd', lineHeight: '1.8' }}>
                
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', marginBottom: '15px' }}>What is ApiSynIQ?</h2>
                <p style={{ marginBottom: '20px' }}>
                  <strong className="text-[#00ffaa]">ApiSynIQ</strong> is an open-source framework that sits as a conversational layer
                  in front of your APIs. Instead of building complex frontend forms for every endpoint, your users simply speak
                  or type what they want — and ApiSynIQ figures out the intent, constructs the correct request payload, calls
                  the right endpoint, and returns a human-readable response.
                </p>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 KEY FEATURE</div>
                  <div className="status-items">
                    A conversational layer that makes APIs accessible to anyone, through any interface.
                  </div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Architecture</h2>
                <p style={{ marginBottom: '20px' }}>
                  A user query travels through four purpose-built layers: <strong className="text-[#00ffaa]">GO Gateway</strong> (HTTP/WebSocket handling), 
                  <strong className="text-[#00ffaa]"> AI Orchestrator</strong> (LangChain/LangGraph for intent processing), 
                  <strong className="text-[#00ffaa]"> API Resolver</strong> (Java with pgvector for RAG), and
                  <strong className="text-[#00ffaa]"> Java Agent SDK</strong> for API annotation.
                </p>

                <div className="microservices-grid" style={{ marginBottom: '30px' }}>
                  <div className="ms-card">🚀 GO Gateway</div>
                  <div className="ms-card">🧠 AI Orchestrator</div>
                  <div className="ms-card">💾 API Resolver</div>
                  <div className="ms-card">🔌 Java Agent SDK</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Code Example</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">BookingController.java</div>
                    <button onClick={copyCode} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '12px', fontFamily: "'Fira Code', monospace" }}>
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
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 KEY TAKEAWAY</div>
                  <div className="status-items">
                    ApiSynIQ removes the friction between users and APIs. Instead of learning API endpoints, users just say what they want.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="microservices-grid" style={{ marginTop: '30px' }}>
            <div className="ms-card" style={{ background: 'rgba(0, 255, 170, 0.1)' }}>
              <Tag size={16} style={{ color: '#00ffaa' }} /> <span style={{ color: '#00ffaa' }}>TAGS</span>
            </div>
            {['Go', 'Python', 'Java', 'gRPC', 'AI', 'LangChain'].map(tag => (
              <div key={tag} className="ms-card"><span>{tag}</span></div>
            ))}
          </div>

          {/* Comments */}
          <CommentSection postId={1} />
        </div>
      </div>
    </div>
  );
}