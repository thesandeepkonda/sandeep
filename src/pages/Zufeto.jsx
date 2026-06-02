import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag, Eye, GitBranch, Shield, Package, Server, Rocket, Activity, ShoppingBag, Cloud, Lock, Zap, Database } from 'lucide-react';
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

// Blog image
const blogImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop";

export default function Zufeto() {
  const navigate = useNavigate();
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

  const pipelineSteps = [
    { icon: <GitBranch size={20} />, name: "Code", tool: "Git" },
    { icon: <Shield size={20} />, name: "Build", tool: "GitHub Actions" },
    { icon: <Package size={20} />, name: "Image", tool: "Docker/ECR" },
    { icon: <Server size={20} />, name: "Deploy", tool: "Terraform" },
    { icon: <Rocket size={20} />, name: "Release", tool: "ECS" },
    { icon: <Activity size={20} />, name: "Monitor", tool: "CloudWatch" }
  ];

  return (
    <div className="app">
      <CanvasNetwork />
      <div className="bg-animation"></div>
      <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

      <div className="container" style={{ paddingTop: '100px', maxWidth: '1000px' }}>
        
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
            $ cat zufeto.md
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Zufeto – Scalable E-Commerce Platform on AWS</h1>
          <p className="hero-description">
            A cloud-native e-commerce platform designed to support customers, vendors, and administrators through dedicated web applications and backend services on AWS.
          </p>
          
          <div className="live-status-panel">
            <div className="status-header">📄 ARTICLE METADATA</div>
            <div className="status-items">
              <span><Calendar size={12} /> June 5, 2026</span>
              <span><User size={12} /> Sandeep Konda</span>
              <span><Clock size={12} /> 18 min read</span>
              <span><Eye size={12} /> 892 views</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="terminal" style={{ marginBottom: '40px' }}>
          <div className="terminal-header">
            <div className="terminal-dots">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>
            <div className="terminal-title">architecture-diagram.png</div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <img 
              src={blogImage}
              alt="Zufeto AWS Architecture"
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="java-backend-showcase" style={{ padding: '40px' }}>
          <div className="code-showcase">
            <div className="code-tabs">
              <div className="code-tab active">README.md</div>
              <div className="code-tab">terraform/main.tf</div>
              <div className="code-tab">.github/workflows/deploy.yml</div>
            </div>
            <div className="code-block" style={{ padding: '30px' }}>
              <div style={{ color: '#aaffdd', lineHeight: '1.8' }}>
                
                {/* Overview */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', marginBottom: '15px' }}>Overview</h2>
                <p style={{ marginBottom: '20px' }}>
                  Zufeto is a cloud-native e-commerce platform designed to support customers, vendors, and administrators 
                  through dedicated web applications and backend services. The project focuses on scalability, security, 
                  automation, and high availability using AWS and Infrastructure as Code.
                </p>

                {/* Problem Statement */}
                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 PROBLEM STATEMENT</div>
                  <div className="status-items" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span>✗ Traditional e-commerce deployments suffer from manual infrastructure management</span>
                    <span>✗ Inconsistent environments across development and production</span>
                    <span>✗ Difficult scaling during traffic spikes</span>
                    <span>✓ Need for automated, production-ready platform</span>
                  </div>
                </div>

                {/* System Architecture */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>System Architecture</h2>
                
                <div className="microservices-grid" style={{ marginBottom: '30px' }}>
                  <div className="ms-card">
                    <ShoppingBag size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div><strong>Customer Portal</strong></div>
                    <div style={{ fontSize: '11px', color: '#888' }}>zufeto.in</div>
                  </div>
                  <div className="ms-card">
                    <Server size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div><strong>Vendor Portal</strong></div>
                    <div style={{ fontSize: '11px', color: '#888' }}>vendor.zufeto.in</div>
                  </div>
                  <div className="ms-card">
                    <Shield size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div><strong>Admin Portal</strong></div>
                    <div style={{ fontSize: '11px', color: '#888' }}>admin.zufeto.in</div>
                  </div>
                  <div className="ms-card">
                    <Database size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div><strong>Backend API</strong></div>
                    <div style={{ fontSize: '11px', color: '#888' }}>backend.zufeto.in</div>
                  </div>
                </div>

                <p style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#00ffaa' }}>Frontend Applications:</strong> Each frontend is hosted using Amazon S3, 
                  CloudFront for CDN, AWS ACM Certificates for HTTPS, and Route53 for DNS management.
                </p>
                
                <p style={{ marginBottom: '20px' }}>
                  <strong style={{ color: '#00ffaa' }}>Backend Services:</strong> Deployed on Amazon ECS with Application Load Balancer, 
                  Amazon RDS PostgreSQL, Auto Scaling Groups, and private VPC networking.
                </p>

                {/* Infrastructure Design */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Infrastructure Design</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">network-config.yaml</div>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '11px', fontFamily: "'Fira Code', monospace" }}>
{`# VPC Configuration
- Custom VPC with CIDR 10.0.0.0/16
- Public Subnets (3 AZs) for Load Balancers
- Private Subnets (3 AZs) for ECS tasks
- Isolated Subnets (3 AZs) for RDS
- Internet Gateway + NAT Gateways
- Security Groups with least-privilege access`}
                    </pre>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '30px 0' }}>
                  <div className="ms-card" style={{ textAlign: 'center', padding: '16px' }}>
                    <Cloud size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Multi-AZ</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>High Availability</div>
                  </div>
                  <div className="ms-card" style={{ textAlign: 'center', padding: '16px' }}>
                    <Lock size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Private Subnets</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Database Isolation</div>
                  </div>
                  <div className="ms-card" style={{ textAlign: 'center', padding: '16px' }}>
                    <Zap size={24} style={{ color: '#00ffaa', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>Auto Scaling</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>Dynamic Capacity</div>
                  </div>
                </div>

                {/* DevOps & Automation */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>DevOps & Automation</h2>
                
                <div className="pipeline-visualization" style={{ marginBottom: '30px', background: '#0a0a12' }}>
                  <div className="pipeline-steps">
                    {pipelineSteps.map((step, idx) => (
                      <div key={idx} className="pipeline-step">
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-name">{step.name}</div>
                        <div style={{ fontSize: '9px', color: '#666' }}>{step.tool}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">.github/workflows/deploy.yml</div>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '11px', fontFamily: "'Fira Code', monospace" }}>
{`name: Deploy to AWS
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Build Docker image
      - name: Push to ECR
      - name: Terraform apply
      - name: Invalidate CloudFront`}
                    </pre>
                  </div>
                </div>

                {/* Security Implementation */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Security Implementation</h2>
                
                <div className="live-status-panel" style={{ margin: '20px 0' }}>
                  <div className="status-header">🔒 SECURITY LAYERS</div>
                  <div className="status-items">
                    <span>✓ HTTPS using ACM Certificates</span>
                    <span>✓ Route53 DNS management</span>
                    <span>✓ Private database access</span>
                    <span>✓ IAM role-based permissions</span>
                    <span>✓ Secure VPC network isolation</span>
                  </div>
                </div>

                {/* Key Challenges Solved */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Key Challenges Solved</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                  <div className="dashboard-card">
                    <h3 style={{ color: '#00ffaa', fontSize: '1rem', marginBottom: '8px' }}>🌐 Multi-Domain Management</h3>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>Configured separate domains (zufeto.in, admin.zufeto.in, vendor.zufeto.in, backend.zufeto.in) using Route53 and ACM.</p>
                  </div>
                  <div className="dashboard-card">
                    <h3 style={{ color: '#00ffaa', fontSize: '1rem', marginBottom: '8px' }}>🏗️ Automated Infrastructure Provisioning</h3>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>Created reusable Terraform modules to provision and manage AWS infrastructure consistently across environments.</p>
                  </div>
                  <div className="dashboard-card">
                    <h3 style={{ color: '#00ffaa', fontSize: '1rem', marginBottom: '8px' }}>⚡ High Availability</h3>
                    <p style={{ fontSize: '13px', color: '#ccc' }}>Implemented Multi-AZ networking, load balancing, auto-scaling, and managed database services for reliability.</p>
                  </div>
                </div>

                {/* Technologies Used */}
                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Technologies Used</h2>
                
                <div className="project-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '30px' }}>
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Spring Boot</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">AWS ECS</span>
                  <span className="tech-tag">Amazon RDS</span>
                  <span className="tech-tag">S3 + CloudFront</span>
                  <span className="tech-tag">Route53</span>
                  <span className="tech-tag">ACM</span>
                  <span className="tech-tag">Terraform</span>
                  <span className="tech-tag">GitHub Actions</span>
                  <span className="tech-tag">Docker</span>
                  <span className="tech-tag">ECR</span>
                </div>

                {/* Results */}
                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">✅ PROJECT RESULTS</div>
                  <div className="status-items" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span>✓ Fully automated cloud deployment from code to production</span>
                    <span>✓ Secure HTTPS infrastructure with custom domains</span>
                    <span>✓ Scalable microservice-ready architecture</span>
                    <span>✓ Reduced manual operational effort by 95%</span>
                    <span>✓ Production-ready CI/CD pipeline with zero-downtime deployments</span>
                  </div>
                </div>

                {/* Conclusion */}
                <div className="live-status-panel" style={{ margin: '30px 0', background: 'rgba(0, 255, 170, 0.05)' }}>
                  <div className="status-header">🎯 CONCLUSION</div>
                  <div className="status-items">
                    Zufeto demonstrates end-to-end cloud architecture design, infrastructure automation, and deployment best practices. 
                    The project showcases practical experience in AWS, DevOps, containerization, Infrastructure as Code, and scalable application deployment.
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
            {["AWS", "ECS", "Terraform", "Spring Boot", "React", "PostgreSQL", "S3", "CloudFront", "Route53", "Docker", "GitHub Actions"].map(tag => (
              <div key={tag} className="ms-card"><span>{tag}</span></div>
            ))}
          </div>

          {/* Comments */}
          <CommentSection postId={5} />
        </div>
      </div>
    </div>
  );
}