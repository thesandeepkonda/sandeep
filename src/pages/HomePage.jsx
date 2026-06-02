import React, { useState, useEffect, useRef } from 'react';

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

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [rotatingTitle, setRotatingTitle] = useState('DevOps Engineer');
  const [titleIndex, setTitleIndex] = useState(0);
  
  const fullName = 'Sandeep Konda';
  const titles = [
    'DevOps Engineer',
    'Java Backend Architect',
    'Cloud Native Developer',
    'CI/CD Specialist',
    'System Designer'
  ];

  // Typing animation for name
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

  // Rotating titles animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    setRotatingTitle(titles[titleIndex]);
  }, [titleIndex, titles]);

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

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ color: '#00ffaa', fontFamily: 'monospace', marginBottom: '16px', fontSize: '14px' }}>
            &gt; Hello, world! I'm
          </div>
          
          <h1 style={{ 
            fontSize: '4rem', 
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff, #00ffaa)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            {displayText}
            <span style={{ 
              display: 'inline-block', 
              width: '3px', 
              height: '50px', 
              background: '#00ffaa', 
              marginLeft: '4px',
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle'
            }}></span>
          </h1>
          
          <div style={{ marginBottom: '20px' }}>
            <span style={{ color: '#aaa', fontSize: '1.2rem' }}>I'm a </span>
            <span style={{ 
              color: '#00ffaa', 
              fontSize: '1.2rem',
              fontFamily: 'monospace',
              fontWeight: 'bold'
            }}>
              {rotatingTitle}
            </span>
          </div>
          
          <p style={{ 
            maxWidth: '550px', 
            margin: '0 auto 32px', 
            color: '#b0b0c0',
            lineHeight: '1.7',
            fontSize: '1rem'
          }}>
            Building scalable, resilient systems at the intersection of 
            <strong style={{ color: '#00ffaa' }}> infrastructure</strong> and 
            <strong style={{ color: '#00ffaa' }}> application logic</strong>.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
            <button 
              onClick={() => window.location.href = '/about'}
              style={{ 
                padding: '10px 24px', 
                background: '#00ffaa',
                border: 'none',
                borderRadius: '40px',
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              View Portfolio →
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              style={{ 
                padding: '10px 24px', 
                background: 'transparent', 
                border: '1px solid #00ffaa',
                borderRadius: '40px',
                color: '#00ffaa',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Contact Me
            </button>
          </div>
          
          {/* Quick Stats */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ffaa' }}>2+</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Years Experience</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ffaa' }}>50+</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Projects Deployed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#00ffaa' }}>99.99%</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Uptime</div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div style={{ marginTop: '80px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Professional <span>Summary</span></h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>The engineer behind the infrastructure and code</p>
          
          <div className="java-backend-showcase" style={{ padding: '32px', marginTop: '30px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                <h3 style={{ color: '#00ffaa', marginBottom: '16px' }}>Who Am I?</h3>
                <p style={{ color: '#c0c0d0', lineHeight: '1.7', fontSize: '14px' }}>
                  I'm a passionate software engineer based in Hyderabad, India, operating at the intersection of 
                  <strong style={{ color: '#00ffaa' }}> DevOps Engineering</strong> and 
                  <strong style={{ color: '#00ffaa' }}> Java Backend Development</strong>.
                </p>
                <p style={{ color: '#c0c0d0', lineHeight: '1.7', fontSize: '14px', marginTop: '16px' }}>
                  I design and deploy production-grade systems that handle thousands of requests while maintaining 99.99% uptime.
                </p>
              </div>
              <div>
                <h3 style={{ color: '#00ffaa', marginBottom: '16px' }}>Core Philosophy</h3>
                <p style={{ color: '#c0c0d0', lineHeight: '1.7', fontSize: '14px' }}>
                  I don't just write code; I design how it's packaged, how it scales, and how it survives in production.
                </p>
                <div className="live-status-panel" style={{ marginTop: '20px' }}>
                  <div className="status-header">🎯 MISSION</div>
                  <div className="status-items">
                    <span>✓ Reliability</span>
                    <span>✓ Security</span>
                    <span>✓ Performance</span>
                    <span>✓ Scalability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Architecture */}
        <div style={{ marginTop: '80px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Deployment <span>Architecture</span></h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Automating the path from code to cloud infrastructure</p>
          
          <div className="pipeline-container" style={{ marginTop: '30px' }}>
            <div className="pipeline-header">Standard CI/CD Lifecycle</div>
            <div className="pipeline-flow">
              <div className="pipeline-node"><div className="node-icon">💻</div><div className="node-label">1. Code (Git)</div></div>
              <div className="pipeline-connector"><div className="connector-progress"></div></div>
              <div className="pipeline-node"><div className="node-icon">🛡️</div><div className="node-label">2. SAST (Sonar)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '0.5s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">⚙️</div><div className="node-label">3. Build (Jenkins)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '1s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">🐳</div><div className="node-label">4. Image (Docker)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '1.5s' }}></div></div>
              <div className="pipeline-node"><div className="node-icon">☁️</div><div className="node-label">5. Deploy (EKS)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '2s' }}></div></div>
              <div className="pipeline-node" style={{ borderColor: '#60efff' }}><div className="node-icon">📊</div><div className="node-label">6. Monitor (Grafana)</div></div>
            </div>
          </div>
        </div>

        {/* Core Expertise */}
        <div style={{ marginTop: '80px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Core <span>Expertise</span></h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>What I bring to the table</p>
          
          <div className="tech-categories" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '30px' }}>
            <div className="tech-category-card">
              <div className="tech-cat-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <div className="tech-items">
                <span className="tech-badge">AWS</span>
                <span className="tech-badge">Terraform</span>
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">Kubernetes</span>
                <span className="tech-badge">Jenkins</span>
              </div>
            </div>
            <div className="tech-category-card">
              <div className="tech-cat-icon">⚙️</div>
              <h3>Backend</h3>
              <div className="tech-items">
                <span className="tech-badge">Java 17+</span>
                <span className="tech-badge">Spring Boot</span>
                <span className="tech-badge">Microservices</span>
                <span className="tech-badge">REST APIs</span>
                <span className="tech-badge">Kafka</span>
              </div>
            </div>
            <div className="tech-category-card">
              <div className="tech-cat-icon">🗄️</div>
              <h3>Databases</h3>
              <div className="tech-items">
                <span className="tech-badge">PostgreSQL</span>
                <span className="tech-badge">MySQL</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">Redis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div style={{ marginTop: '80px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Key <span>Achievements</span></h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>Milestones I'm proud of</p>
          
          <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginTop: '30px' }}>
            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🏆</div>
              <h3 style={{ color: '#fff', fontSize: '0.9rem' }}>AWS Certified</h3>
              <p style={{ color: '#888', fontSize: '10px' }}>Solutions Architect</p>
            </div>
            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🏅</div>
              <h3 style={{ color: '#fff', fontSize: '0.9rem' }}>CKA Certified</h3>
              <p style={{ color: '#888', fontSize: '10px' }}>Kubernetes Admin</p>
            </div>
            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>🎓</div>
              <h3 style={{ color: '#fff', fontSize: '0.9rem' }}>M.Tech Degree</h3>
              <p style={{ color: '#888', fontSize: '10px' }}>Cloud Computing</p>
            </div>
            <div className="dashboard-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>⚡</div>
              <h3 style={{ color: '#fff', fontSize: '0.9rem' }}>50+ Deployments</h3>
              <p style={{ color: '#888', fontSize: '10px' }}>Production</p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2rem !important;
            }
            .tech-categories {
              grid-template-columns: 1fr !important;
            }
            .dashboard-grid {
              grid-template-columns: 1fr !important;
            }
            .java-backend-showcase > div {
              grid-template-columns: 1fr !important;
            }
            .pipeline-flow {
              flex-direction: column !important;
            }
            .pipeline-connector {
              width: 2px !important;
              height: 30px !important;
              margin: 0 auto !important;
            }
          }
        `}
      </style>
    </div>
  );
}