// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarBg, setNavbarBg] = useState('rgba(10, 10, 10, 0.95)');
  const [terminalText, setTerminalText] = useState('');
  const [formStatus, setFormStatus] = useState({ show: false, message: '', isError: false });
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const typewriterTimeout = useRef(null);

  // Terminal JSON data
  const jsonResponse = `{
  <span class="term-key">"name"</span>: <span class="term-string">"Sandeep Konda"</span>,
  <span class="term-key">"roles"</span>: [
    <span class="term-string">"DevOps Engineer"</span>, 
    <span class="term-string">"Java Backend Developer"</span>
  ],
  <span class="term-key">"expertise"</span>: <span class="term-string">"AWS, Spring Boot, CI/CD"</span>,
  <span class="term-key">"status"</span>: <span class="term-string">"200 OK"</span>
}`;

  // Typewriter effect for terminal
  useEffect(() => {
    typewriterTimeout.current = setTimeout(() => {
      setTerminalText(jsonResponse);
    }, 1200);

    return () => {
      if (typewriterTimeout.current) clearTimeout(typewriterTimeout.current);
    };
  }, [jsonResponse]);

  // Scroll handling: progress bar, navbar background, navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Navbar background
      if (window.scrollY > 50) {
        setNavbarBg('rgba(5, 5, 5, 0.98)');
      } else {
        setNavbarBg('rgba(10, 10, 10, 0.95)');
      }

      // Navbar hide/show on scroll
      if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setFormStatus({ show: true, message: 'Processing payload...', isError: false });

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setFormStatus({ show: true, message: '{ "status": "success", "message": "Payload delivered." }', isError: false });
        form.reset();
      } else {
        setFormStatus({ show: true, message: '{ "status": "error", "code": "try to mail: kondasandeep56@gmail.com" }', isError: true });
      }
    } catch (error) {
      setFormStatus({ show: true, message: '{ "status": "error", "message": "Network Timeout" }', isError: true });
    }
  };

  return (
    <div className="app">
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation */}
      <nav className={`navbar ${!isNavbarVisible ? 'navbar-hidden' : ''}`} style={{ background: navbarBg }}>
        <div className="container nav-content">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="logo">
            Sandeep<span>Konda</span>
          </a>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">Home</a></li>
            <li><a href="#architecture" onClick={(e) => { e.preventDefault(); scrollToSection('architecture'); }} className="nav-link">Infra</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="nav-link">Stack</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="nav-link">Deployments</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-subtitle">~$ whoami</div>
            <h1 className="hero-title">Cloud Native<br/>Architect.</h1>
            <p className="hero-description">
              Bridging the gap between robust Java backend systems and scalable DevOps pipelines. I automate infrastructure, containerize applications, and engineer serverless APIs.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">Init_Projects()</button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">git commit --contact</button>
            </div>
          </div>
          
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="terminal-title">bash - root@aws-prod-server</div>
            </div>
            <div className="terminal-body">
              <span className="term-command">$ curl -X GET https://api.sandeep.dev/v1/profile</span><br/>
              <div className="typewriter-output" style={{ marginTop: '10px' }} dangerouslySetInnerHTML={{ __html: terminalText }}></div>
              <span className="cursor"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <div className="metrics-banner">
        <div className="container metrics-grid">
          <div className="metric">
            <div className="metric-value"><div className="pulse"></div> 99.99%</div>
            <div className="metric-label">System Uptime</div>
          </div>
          <div className="metric">
            <div className="metric-value">42ms</div>
            <div className="metric-label">Avg API Latency</div>
          </div>
          <div className="metric">
            <div className="metric-value">50+</div>
            <div className="metric-label">Deployments</div>
          </div>
        </div>
      </div>

      {/* Architecture Section */}
      <section id="architecture" className="section">
        <div className="container">
          <h2 className="section-title">Deployment <span>Architecture</span></h2>
          <p className="section-subtitle">Automating the path from local code to highly available cloud infrastructure with built-in security and monitoring.</p>
          
          <div className="pipeline-container">
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
              <div className="pipeline-node"><div className="node-icon">☁️</div><div className="node-label">5. Deploy (K8s/AWS)</div></div>
              <div className="pipeline-connector"><div className="connector-progress" style={{ animationDelay: '2s' }}></div></div>
              <div className="pipeline-node" style={{ borderColor: '#60efff' }}><div className="node-icon">📊</div><div className="node-label">6. Monitor (Grafana)</div></div>
            </div>
          </div>

          <h2 className="section-title" style={{ marginTop: '4rem' }}>Core <span>Infrastructure</span></h2>
          <p className="section-subtitle">A high-level view of how my microservices handle incoming traffic, process events, and manage data.</p>
          
          <div className="topology-wrapper">
            <div className="topo-tier">
              <div className="topo-box accent">🌐 External API Traffic / DNS (Route 53)<div className="topo-line-vertical"></div></div>
            </div>
            <div className="topo-tier" style={{ marginTop: '2rem' }}>
              <div className="topo-box" style={{ width: '60%' }}>🛡️ AWS API Gateway / Load Balancer
                <div className="topo-line-horizontal"></div>
                <div className="topo-line-vertical" style={{ left: '20%' }}></div>
                <div className="topo-line-vertical" style={{ left: '50%' }}></div>
                <div className="topo-line-vertical" style={{ left: '80%' }}></div>
              </div>
            </div>
            <div className="topo-tier" style={{ marginTop: '2rem' }}>
              <div className="topo-box">🔒 Auth Service<br/><span style={{ color: '#888', fontSize: '0.75rem' }}>(Spring Security + JWT)</span><div className="topo-line-vertical"></div></div>
              <div className="topo-box accent">🛒 Core Logic Service<br/><span style={{ color: '#888', fontSize: '0.75rem' }}>(Spring Boot REST API)</span><div className="topo-line-vertical"></div></div>
              <div className="topo-box">⚡ API Gateway Router<br/><span style={{ color: '#888', fontSize: '0.75rem' }}>(Spring Cloud Gateway)</span><div className="topo-line-vertical"></div></div>
            </div>
            <div className="topo-tier" style={{ marginTop: '2rem' }}>
              <div className="topo-box database">🗄️ Redis Cache</div>
              <div className="topo-box database">🗄️ PostgreSQL</div>
              <div className="topo-box accent">🔄 Spring Boot Microservice<br/><span style={{ color: '#888', fontSize: '0.75rem' }}>(Async Event Processor)</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">Tech <span>Stack</span></h2>
          <p className="section-subtitle">Core technologies I use to build, secure, and deploy enterprise applications.</p>
          <div className="skills-grid">
            <div className="skill-category"><div className="skill-icon">☕</div><h3>Java Backend</h3><p>Architecting decoupled microservices and production-grade APIs.</p><div className="skill-tags"><span className="skill-tag">Java 17+</span><span className="skill-tag">Spring Boot</span><span className="skill-tag">Microservices</span><span className="skill-tag">Hibernate</span></div></div>
            <div className="skill-category"><div className="skill-icon">☁️</div><h3>Cloud Infra</h3><p>Designing scalable, fault-tolerant environments on AWS.</p><div className="skill-tags"><span className="skill-tag">AWS Lambda</span><span className="skill-tag">EC2 & VPC</span><span className="skill-tag">S3 & CloudFront</span><span className="skill-tag">EKS</span></div></div>
            <div className="skill-category"><div className="skill-icon">🐳</div><h3>Container Orchestration</h3><p>Managing isolated deployment environments and clusters.</p><div className="skill-tags"><span className="skill-tag">Docker</span><span className="skill-tag">Kubernetes</span><span className="skill-tag">Helm</span></div></div>
            <div className="skill-category"><div className="skill-icon">🔄</div><h3>CI/CD & Automation</h3><p>Building zero-downtime deployment pipelines.</p><div className="skill-tags"><span className="skill-tag">Jenkins</span><span className="skill-tag">GitLab CI</span><span className="skill-tag">Terraform</span><span className="skill-tag">Ansible</span></div></div>
            <div className="skill-category"><div className="skill-icon">🌊</div><h3>API Gateway & Routing</h3><p>Smart routing, rate limiting, and cross-cutting concerns.</p><div className="skill-tags"><span className="skill-tag">Spring Cloud Gateway</span><span className="skill-tag">Netflix Zuul</span><span className="skill-tag">AWS API Gateway</span><span className="skill-tag">NGINX</span></div></div>
            <div className="skill-category"><div className="skill-icon">🔒</div><h3>Security & IAM</h3><p>Protecting endpoints and managing secrets dynamically.</p><div className="skill-tags"><span className="skill-tag">OAuth2 / JWT</span><span className="skill-tag">HashiCorp Vault</span><span className="skill-tag">SonarQube</span><span className="skill-tag">AWS IAM</span></div></div>
            <div className="skill-category"><div className="skill-icon">🗄️</div><h3>Database Architecture</h3><p>Managing schema design and multi-tenant logic.</p><div className="skill-tags"><span className="skill-tag">PostgreSQL</span><span className="skill-tag">DynamoDB</span><span className="skill-tag">MongoDB</span><span className="skill-tag">Redis Cache</span></div></div>
            <div className="skill-category"><div className="skill-icon">📊</div><h3>Observability</h3><p>Ensuring system health and tracing bottlenecks.</p><div className="skill-tags"><span className="skill-tag">Prometheus</span><span className="skill-tag">Grafana</span><span className="skill-tag">ELK Stack</span><span className="skill-tag">Datadog</span></div></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Production <span>Deployments</span></h2>
          <p className="section-subtitle">Real-world systems architecture and backend engineering solutions.</p>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-header"><div className="project-icon">🛒</div><h3 className="project-title">E-Commerce Pricing Engine</h3></div>
              <div className="project-content"><p className="project-description">Engineered a Spring Boot backend handling complex multi-vendor cart calculations and GST tax compliance. Designed strictly decoupled logic methods allowing frontend and external service teams to easily integrate pricing logic without altering core cart mechanisms or existing coupon services.</p><div className="project-tech"><span className="tech-tag">Java</span><span className="tech-tag">Spring Boot</span><span className="tech-tag">REST APIs</span><span className="tech-tag">PostgreSQL</span></div></div>
            </div>
            <div className="project-card">
              <div className="project-header"><div className="project-icon">🌊</div><h3 className="project-title">API Gateway & Routing Layer</h3></div>
              <div className="project-content"><p className="project-description">Built a centralized API Gateway using Spring Cloud Gateway to handle request routing, rate limiting, and JWT validation across multiple microservices. Implemented circuit breakers with Resilience4j for fault tolerance and request transformation for legacy service compatibility.</p><div className="project-tech"><span className="tech-tag">Spring Cloud Gateway</span><span className="tech-tag">Resilience4j</span><span className="tech-tag">JWT</span><span className="tech-tag">Docker</span></div></div>
            </div>
            <div className="project-card">
              <div className="project-header"><div className="project-icon">⚡</div><h3 className="project-title">Serverless Cloud Backend</h3></div>
              <div className="project-content"><p className="project-description">Architected highly scalable backends using AWS serverless components and managed production rollouts for frontend applications. Handled build and update deployment cycles while managing robust IAM roles, S3 bucket policies, and distributing content globally via CloudFront.</p><div className="project-tech"><span className="tech-tag">AWS Lambda</span><span className="tech-tag">DynamoDB</span><span className="tech-tag">AWS API Gateway</span><span className="tech-tag">CloudFront</span></div></div>
            </div>
            <div className="project-card">
              <div className="project-header"><div className="project-icon">☸️</div><h3 className="project-title">K8s Microservices Platform</h3></div>
              <div className="project-content"><p className="project-description">Built a scalable microservices platform using Kubernetes, featuring automated CI/CD pipelines via Jenkins and comprehensive monitoring using Prometheus & Grafana. Reduced deployment friction and ensured high availability across distributed nodes.</p><div className="project-tech"><span className="tech-tag">Kubernetes</span><span className="tech-tag">Docker</span><span className="tech-tag">Jenkins</span><span className="tech-tag">Grafana</span></div></div>
            </div>
            <div className="project-card">
              <div className="project-header"><div className="project-icon">🔄</div><h3 className="project-title">Async Event Processor</h3></div>
              <div className="project-content"><p className="project-description">Developed a Spring Boot microservice for async event processing using @Async and CompletableFuture. Handles bulk email notifications, report generation, and background data synchronization without blocking main request threads.</p><div className="project-tech"><span className="tech-tag">Spring Boot</span><span className="tech-tag">@Async</span><span className="tech-tag">CompletableFuture</span><span className="tech-tag">Redis</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Establish <span>Connection</span></h2>
          <div className="contact-content">
            <div>
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>// Open Ports</h3>
              <p style={{ color: '#888', marginBottom: '30px' }}>Looking to architect a new backend, optimize your cloud infrastructure, or automate your pipelines? Send a payload.</p>
              <div style={{ fontFamily: "'Fira Code', monospace", color: '#aaa', lineHeight: 2 }}>
                <div><span style={{ color: '#00ff87' }}>email:</span> kondasandeep56@gmail.com</div>
                <div><span style={{ color: '#00ff87' }}>location:</span> Hyderabad, TS, India</div>
                <div><span style={{ color: '#00ff87' }}>status:</span> Available for opportunities</div>
              </div>
              <a href="https://wa.me/+918008806996" className="whatsapp-button" target="_blank" rel="noopener noreferrer">[ Execute WhatsApp Chat ]</a>
            </div>
            <div className="contact-form">
              <form action="https://formspree.io/f/xbjnqzzk" method="POST" onSubmit={handleSubmit}>
                <div className="form-group"><label htmlFor="name">req.body.name</label><input type="text" id="name" name="name" required /></div>
                <div className="form-group"><label htmlFor="email">req.body.email</label><input type="email" id="email" name="email" required /></div>
                <div className="form-group"><label htmlFor="message">req.body.message</label><textarea id="message" name="message" rows="4" required></textarea></div>
                <button type="submit" className="submit-btn">POST /api/message</button>
                {formStatus.show && (
                  <div id="statusMessage" style={{ marginTop: '15px', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', color: formStatus.isError ? '#ff5f56' : '#00ff87' }}>
                    {formStatus.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>System maintained by Sandeep Konda © 2025</p>
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/sandeepkonda07" target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;