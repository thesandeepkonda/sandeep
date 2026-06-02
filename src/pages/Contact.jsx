import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Phone, Send, Clock, CheckCircle } from 'lucide-react';

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

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        
        {/* Header Section */}
        <div className="text-center" style={{ marginBottom: '60px' }}>
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '16px', fontSize: '14px' }}>
            ~$ curl -X POST /api/contact
          </div>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
            Let's <span>Connect</span>
          </h1>
          <p className="hero-description" style={{ maxWidth: '500px', margin: '0 auto', fontSize: '1rem' }}>
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        {/* Main Contact Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '40px',
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          
          {/* Left Column - Contact Info */}
          <div>
            {/* Contact Info Card */}
            <div className="java-backend-showcase" style={{ padding: '32px', marginBottom: '24px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
                Contact <span>Information</span>
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="ms-card" style={{ padding: '12px', borderRadius: '12px', background: 'rgba(0, 255, 170, 0.1)' }}>
                    <Mail size={20} style={{ color: '#00ffaa' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666', fontFamily: "'Fira Code', monospace", marginBottom: '4px' }}>EMAIL</div>
                    <div style={{ color: '#fff', fontSize: '14px' }}>kondasandeep56@gmail.com</div>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="ms-card" style={{ padding: '12px', borderRadius: '12px', background: 'rgba(0, 255, 170, 0.1)' }}>
                    <Phone size={20} style={{ color: '#00ffaa' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666', fontFamily: "'Fira Code', monospace", marginBottom: '4px' }}>PHONE</div>
                    <div style={{ color: '#fff', fontSize: '14px' }}>+91 8008806996</div>
                  </div>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="ms-card" style={{ padding: '12px', borderRadius: '12px', background: 'rgba(0, 255, 170, 0.1)' }}>
                    <MapPin size={20} style={{ color: '#00ffaa' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#666', fontFamily: "'Fira Code', monospace", marginBottom: '4px' }}>LOCATION</div>
                    <div style={{ color: '#fff', fontSize: '14px' }}>Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="live-status-panel" style={{ marginBottom: '24px' }}>
              <div className="status-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="pulse" style={{ width: '8px', height: '8px' }}></div>
                AVAILABILITY STATUS
              </div>
              <div className="status-items">
                <span style={{ color: '#00ffaa' }}>● Available for freelance work</span>
                <span style={{ color: '#ccc' }}>● Open to collaborations</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="java-backend-showcase" style={{ padding: '24px' }}>
              <h2 className="section-title" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                Connect <span>Online</span>
              </h2>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" 
                  className="ms-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00ffaa'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#00ffaa44'}>
                  <span style={{ fontSize: '18px' }}>🐙</span>
                  <span style={{ fontSize: '13px', color: '#fff' }}>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/sandeepkonda07" target="_blank" rel="noopener noreferrer"
                  className="ms-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00ffaa'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#00ffaa44'}>
                  <span style={{ fontSize: '18px' }}>🔗</span>
                  <span style={{ fontSize: '13px', color: '#fff' }}>LinkedIn</span>
                </a>
                <a href="#" 
                  className="ms-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#00ffaa'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#00ffaa44'}>
                  <span style={{ fontSize: '18px' }}>🐦</span>
                  <span style={{ fontSize: '13px', color: '#fff' }}>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="java-backend-showcase" style={{ padding: '32px' }}>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>
              Send a <span>Message</span>
            </h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Name Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#888', fontFamily: "'Fira Code', monospace", marginBottom: '8px' }}>
                  NAME <span style={{ color: '#00ffaa' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(0, 255, 170, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 170, 0.2)'}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#888', fontFamily: "'Fira Code', monospace", marginBottom: '8px' }}>
                  EMAIL <span style={{ color: '#00ffaa' }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(0, 255, 170, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 170, 0.2)'}
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#888', fontFamily: "'Fira Code', monospace", marginBottom: '8px' }}>
                  MESSAGE <span style={{ color: '#00ffaa' }}>*</span>
                </label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell me about your project..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(0, 255, 170, 0.2)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#00ffaa'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(0, 255, 170, 0.2)'}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="trigger-btn"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {status === 'sending' ? (
                  <>Sending... <Clock size={16} /></>
                ) : (
                  <>Send Message <Send size={16} /></>
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <div style={{
                  padding: '12px',
                  background: 'rgba(0, 255, 170, 0.1)',
                  border: '1px solid #00ffaa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  color: '#00ffaa',
                  fontSize: '13px',
                  fontFamily: "'Fira Code', monospace",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={16} /> Message sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Working Hours / Response Time */}
        <div style={{ 
          maxWidth: '1100px', 
          margin: '40px auto 0',
          textAlign: 'center'
        }}>
          <div className="live-status-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="status-header" style={{ marginBottom: 0 }}>⚡ RESPONSE TIME</div>
            <div className="status-items" style={{ marginBottom: 0 }}>
              <span>📧 Email: Within 24 hours</span>
              <span>💬 Message: Within 12 hours</span>
              <span>🕐 IST (GMT+5:30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}