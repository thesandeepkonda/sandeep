import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function About() {
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

  const technicalSkills = {
    "Cloud & DevOps": ["AWS (EKS, ECS, RDS, S3, CloudFront)", "Terraform", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
    "Backend Development": ["Java 17+", "Spring Boot", "Microservices", "Hibernate", "REST APIs", "Kafka"],
    "Frontend": ["React.js", "JavaScript", "HTML/CSS", "Tailwind CSS"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    "Monitoring & Security": ["Prometheus", "Grafana", "SonarQube", "IAM"]
  };

  const achievements = [
    { icon: "🏆", title: "AWS Certified Solutions Architect", year: "2024", description: "Professional cloud architecture certification" },
    { icon: "🏅", title: "Kubernetes Administrator", year: "2024", description: "Certified Kubernetes Administrator (CKA)" },
    { icon: "🎓", title: "M.Tech in Computer Science", year: "2023", description: "Cloud Computing & Distributed Systems" },
    { icon: "⚡", title: "50+ Deployments", year: "2024", description: "Production deployments managed" }
  ];

  const contactOptions = [
    { icon: "✉️", label: "Email", value: "kondasandeep56@gmail.com", link: "mailto:kondasandeep56@gmail.com" },
    { icon: "🐙", label: "GitHub", value: "/thesandeepkonda", link: "https://github.com/thesandeepkonda" },
    { icon: "🔗", label: "LinkedIn", value: "/sandeepkonda07", link: "https://www.linkedin.com/in/sandeepkonda07" },
    { icon: "📍", label: "Location", value: "Hyderabad, India", link: null }
  ];

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '16px', fontSize: '14px' }}>
            ~$ cat about.md
          </div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            About <span>Me</span>
          </h1>
          <p className="hero-description" style={{ maxWidth: '600px', margin: '0 auto', color: '#a0a0b0' }}>
            DevOps Engineer & Java Backend Developer passionate about cloud-native systems and AI.
          </p>
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', marginBottom: '60px' }}>
          
          {/* Left Column - Profile Image & Quick Info */}
          <div>
            <div className="java-backend-showcase" style={{ padding: '32px', textAlign: 'center' }}>
              
              {/* PROFILE IMAGE - FULL DISPLAY FIX */}
              <div style={{
                width: '360px',
                height: '500px',
                margin: '0 auto 24px',
                borderRadius: '10%',
                overflow: 'hidden',
                border: '3px solid #00ffaa',
                boxShadow: '0 0 20px rgba(0, 255, 170, 0.3)',
                backgroundColor: '#0a0a12'
              }}>
                <img 
                  src="/images/photo.JPG" 
                  alt="Sandeep Konda"
                  style={{
                  width: 'auto',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center'
                }}
                />
              </div>
              
              <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '8px' }}>Sandeep Konda</h2>
              <p style={{ color: '#00ffaa', fontSize: '14px', marginBottom: '24px', fontFamily: "'Fira Code', monospace" }}>
                DevOps Engineer | Java Backend Architect
              </p>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  {contactOptions.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ color: '#00ffaa', fontSize: '18px' }}>{item.icon}</div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{item.label}</div>
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', fontSize: '13px', textDecoration: 'none' }}>
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ color: '#ccc', fontSize: '13px' }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Call to Action */}
          <div>
            <div className="java-backend-showcase" style={{ padding: '32px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                Who <span>Am I?</span>
              </h2>
              
              <p style={{ color: '#c0c0d0', lineHeight: '1.8', marginBottom: '16px' }}>
                Engineer, researcher, and lifelong tinkerer building systems that <strong style={{ color: '#00ffaa' }}>sense, reason, and act</strong> — 
                at the intersection of DevOps, Java Backend, and Cloud Infrastructure.
              </p>
              
              <p style={{ color: '#c0c0d0', lineHeight: '1.8', marginBottom: '24px' }}>
                I bridge the gap between infrastructure and application logic, ensuring systems are not just functional, 
                but scalable, secure, and resilient. My journey began in the trenches of Linux systems and CI/CD pipelines, 
                evolving into cloud-native architecture and microservices.
              </p>

              {/* Location and Role Info */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '16px', 
                marginBottom: '24px',
                padding: '16px',
                background: 'rgba(0, 255, 170, 0.05)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📍</span>
                  <span style={{ color: '#ccc', fontSize: '13px' }}>Hyderabad, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>💼</span>
                  <span style={{ color: '#ccc', fontSize: '13px' }}>DevOps & Java Backend Engineer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎓</span>
                  <span style={{ color: '#ccc', fontSize: '13px' }}>M.Tech · Cloud Computing</span>
                </div>
              </div>

              {/* Call to Action Banner */}
              <div className="live-status-panel" style={{ background: 'linear-gradient(135deg, rgba(0, 255, 170, 0.1), rgba(0, 0, 0, 0.4))' }}>
                <div className="status-header" style={{ fontSize: '14px' }}>🚀 LET'S COLLABORATE</div>
                <div className="status-items" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Let's build, research, or just talk shop. Open to graduate research opportunities, 
                    engineering collaborations, and conversations about agentic AI, robotics, or reinforcement learning.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button 
                      onClick={() => window.location.href = '/contact'}
                      className="trigger-btn"
                      style={{ padding: '8px 20px', fontSize: '12px' }}
                    >
                      Get in touch →
                    </button>
                    <button 
                      onClick={() => window.open('https://github.com/thesandeepkonda', '_blank')}
                      style={{ 
                        padding: '8px 20px', 
                        background: 'transparent', 
                        border: '1px solid #00ffaa',
                        borderRadius: '40px',
                        color: '#00ffaa',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      View GitHub
                    </button>
                    <button 
                      onClick={() => window.open('/resume.pdf', '_blank')}
                      style={{ 
                        padding: '8px 20px', 
                        background: 'transparent', 
                        border: '1px solid #00ffaa',
                        borderRadius: '40px',
                        color: '#00ffaa',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      📄 Resume/CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="devops-dashboard" style={{ marginBottom: '60px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '16px' }}>
            Key <span>Achievements</span>
          </h2>
          <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {achievements.map((achievement, idx) => (
              <div key={idx} className="dashboard-card" style={{ textAlign: 'center' }}>
                <div style={{ color: '#00ffaa', marginBottom: '12px', fontSize: '28px' }}>{achievement.icon}</div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '4px' }}>{achievement.title}</h3>
                <span style={{ color: '#00ffaa', fontSize: '11px', fontFamily: "'Fira Code', monospace" }}>{achievement.year}</span>
                <p style={{ color: '#888', fontSize: '11px', marginTop: '8px' }}>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="advanced-tech-stack" style={{ marginBottom: '60px' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '16px' }}>
            Technical <span>Skills</span>
          </h2>
          <div className="tech-categories">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div key={category} className="tech-category-card">
                <div className="tech-cat-icon">
                  {category === "Cloud & DevOps" && "☁️"}
                  {category === "Backend Development" && "⚙️"}
                  {category === "Frontend" && "🎨"}
                  {category === "Databases" && "🗄️"}
                  {category === "Monitoring & Security" && "🔒"}
                </div>
                <h3>{category}</h3>
                <div className="tech-items">
                  {skills.map(skill => (
                    <span key={skill} className="tech-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Interests Section */}
        <div className="java-backend-showcase" style={{ marginBottom: '60px' }}>
          <div className="code-tabs">
            <div className="code-tab active">🧠 RESEARCH INTERESTS</div>
          </div>
          <div style={{ padding: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              <div className="ms-card" style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧠</div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Agentic AI</h3>
                <p style={{ color: '#888', fontSize: '12px' }}>Autonomous agents, decision-making systems, and multi-agent coordination</p>
              </div>
              <div className="ms-card" style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤖</div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Robotics</h3>
                <p style={{ color: '#888', fontSize: '12px' }}>Control systems, robot perception, and autonomous navigation</p>
              </div>
              <div className="ms-card" style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🚀</div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>Reinforcement Learning</h3>
                <p style={{ color: '#888', fontSize: '12px' }}>Deep RL, policy optimization, and real-world applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Open To Section */}
        <div className="live-status-panel" style={{ textAlign: 'center' }}>
          <div className="status-header" style={{ fontSize: '14px' }}>🌟 OPEN TO</div>
          <div className="status-items" style={{ justifyContent: 'center', gap: '24px' }}>
            <span>🎓 Graduate Research Opportunities</span>
            <span>🤝 Engineering Collaborations</span>
            <span>💬 Technical Conversations</span>
            <span>🚀 Open Source Contributions</span>
          </div>
        </div>
      </div>
    </div>
  );
}