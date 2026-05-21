import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

// Custom SVG Icons (same as before, keep them)
const IconGithub = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.36.2 2.37.1 2.62.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>;
const IconLinkedIn = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/></svg>;
const IconTwitter = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.967-12.21c0-.21-.005-.422-.015-.632a9.935 9.935 0 002.46-2.548l-.047-.02z"/></svg>;
const IconMail = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM7 12h4v4H7v-4z"/></svg>;
const IconChevronRight = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IconExternalLink = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const IconStar = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
const IconSun = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const IconMoon = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const IconMenu = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconX = () => <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// Particle Background (Canvas)
const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      const particles = [];
      const count = Math.min(100, Math.floor((width * height) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          color: `hsla(${Math.random() * 60 + 240}, 80%, 65%, ${Math.random() * 0.4 + 0.2})`
        });
      }
      particlesRef.current = particles;
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach(p => {
        if (mouseRef.current.x && mouseRef.current.y) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - dist) / 100;
            p.vx += Math.cos(angle) * force * 0.2;
            p.vy += Math.sin(angle) * force * 0.2;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i+1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(120, 120, 255, ${0.12 * (1 - dist/110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouseRef.current.x = null; mouseRef.current.y = null; });
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

function App() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('light-theme');
  };

  useEffect(() => {
    if (isDark) document.body.classList.remove('light-theme');
    else document.body.classList.add('light-theme');
  }, [isDark]);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];
  const skillsData = [
    { category: "Backend", icon: "☕", items: ["Java", "Spring Boot", "Node.js", "Python", "GraphQL"] },
    { category: "DevOps & Cloud", icon: "☁️", items: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"] },
    { category: "Databases", icon: "🗄️", items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"] },
    { category: "Frontend", icon: "🎨", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
    { category: "Security & Tools", icon: "🔒", items: ["OAuth2/JWT", "SonarQube", "Prometheus", "Grafana"] }
  ];

  const projectsData = [
    { title: "Cloud Native Microservices", description: "Scalable K8s platform with CI/CD, service mesh, handling 50k+ req/sec.", tech: ["K8s", "Spring Boot", "Kafka"], gradient: "from-indigo-500 to-purple-600" },
    { title: "AI API Gateway", description: "Intelligent gateway with rate limiting, JWT, and ML-based anomaly detection.", tech: ["Spring Cloud Gateway", "Redis", "TensorFlow"], gradient: "from-cyan-500 to-blue-600" },
    { title: "Serverless E-Commerce", description: "Event-driven AWS architecture handling 1M+ monthly active users.", tech: ["Lambda", "DynamoDB", "EventBridge"], gradient: "from-emerald-500 to-teal-600" },
    { title: "Real-Time Analytics Pipeline", description: "Processes 10M+ events/day with Kafka, Flink, ClickHouse.", tech: ["Kafka", "Flink", "ClickHouse"], gradient: "from-orange-500 to-red-600" }
  ];

  const experienceData = [
    { year: "2023 - Present", role: "Senior DevOps Engineer", company: "TechCorp Inc.", desc: "Led cloud migration to Kubernetes, reduced costs by 35%, improved deployment frequency by 200%." },
    { year: "2021 - 2023", role: "Java Backend Developer", company: "InnovateSoft", desc: "Developed high-performance REST APIs handling 100k+ concurrent users, implemented OAuth2 security." },
    { year: "2020 - 2021", role: "Full Stack Developer", company: "StartupHub", desc: "Built React + Spring Boot apps, integrated CI/CD pipelines and automated testing." }
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "CTO @ TechCorp", text: "Transformed our infrastructure and mentored the entire team. Exceptional talent.", rating: 5 },
    { name: "Michael Rodriguez", role: "Lead Architect", text: "Sandeep's expertise saved us months. Highly recommend for any critical project.", rating: 5 }
  ];

  return (
    <div className="app">
      <ParticleBackground />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <nav className={`navbar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="nav-container">
          <a href="#" className="logo">SK</a>
          <div className="desktop-nav">
            {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>)}
            <button onClick={toggleTheme} className="theme-btn">{isDark ? <IconSun /> : <IconMoon />}</button>
          </div>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mobile-nav">
              {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)}>{item}</a>)}
              <button onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}>{isDark ? 'Light Mode' : 'Dark Mode'}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <motion.div className="hero-content" style={{ opacity: heroOpacity, scale: heroScale }}>
          <div className="hero-badge"><span className="pulse-dot"></span> System ready for deployment</div>
          <h1 className="hero-title"><span>Sandeep Konda</span></h1>
          <p className="hero-subtitle">Cloud Native Architect & Java Backend Engineer</p>
          <p className="hero-description">Building scalable, resilient systems that power millions of users. Specialized in DevOps, microservices, and cloud infrastructure.</p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">View Projects <IconChevronRight /></a>
            <a href="#contact" className="btn-secondary">Get in touch</a>
          </div>
        </motion.div>
        <div className="scroll-down"><div className="scroll-dot"></div></div>
      </section>

      {/* About */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header"><h2>About Me</h2><div className="section-line"></div></div>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm a passionate Cloud Native Architect and Java Backend Developer with over 5 years of experience designing and building scalable, high-performance systems. My expertise lies at the intersection of robust backend engineering and modern DevOps practices.</p>
              <p>I believe in automation, clean code, and building systems that are not just functional but also maintainable and delightful to work with. When I'm not architecting cloud solutions, I contribute to open-source projects and mentor aspiring developers.</p>
              <a href="#contact" className="link">Let's collaborate <IconChevronRight /></a>
            </div>
            <div className="about-image"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=700&fit=crop" alt="Workspace" /></div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section alt-bg">
        <div className="container">
          <div className="section-header"><h2>Tech Stack & Skills</h2><div className="section-line"></div></div>
          <div className="skills-grid">
            {skillsData.map((skill, i) => (
              <div key={skill.category} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <h3>{skill.category}</h3>
                <div className="skill-tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header"><h2>Featured Projects</h2><div className="section-line"></div></div>
          <div className="projects-grid">
            {projectsData.map((project, i) => (
              <div key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
                <a href="#" className="project-link">Learn more <IconExternalLink /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section alt-bg">
        <div className="container">
          <div className="section-header"><h2>Experience</h2><div className="section-line"></div></div>
          <div className="timeline">
            {experienceData.map((exp, i) => (
              <div key={exp.year} className="timeline-item">
                <div className="timeline-year"><IconCalendar /> {exp.year}</div>
                <h3>{exp.role}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p>{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section">
        <div className="container">
          <div className="section-header"><h2>Testimonials</h2><div className="section-line"></div></div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card">
                <div className="stars">{[...Array(t.rating)].map((_, i) => <IconStar key={i} />)}</div>
                <p>"{t.text}"</p>
                <h4>{t.name}</h4>
                <span>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section alt-bg">
        <div className="container">
          <div className="section-header"><h2>Let's Connect</h2><div className="section-line"></div></div>
          <div className="contact-grid">
            <div className="contact-info">
              <p>Interested in collaborating or have a project in mind? I'm always open to discussing new opportunities.</p>
              <div className="contact-details"><IconMail /> kondasandeep56@gmail.com</div>
              <div className="contact-details"><IconCalendar /> Hyderabad, India</div>
              <div className="social-links">
                <a href="https://github.com/thesandeepkonda"><IconGithub /></a>
                <a href="https://www.linkedin.com/in/sandeepkonda07"><IconLinkedIn /></a>
                <a href="#"><IconTwitter /></a>
              </div>
            </div>
            <form action="https://formspree.io/f/xbjnqzzk" method="POST" className="contact-form">
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <input type="text" name="subject" placeholder="Subject" />
              <textarea name="message" rows="5" placeholder="Your message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer>© 2025 Sandeep Konda. Built with React, Framer Motion, and CSS.</footer>
    </div>
  );
}

export default App;