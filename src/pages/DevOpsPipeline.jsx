import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Copy, Check, GitBranch, Settings, Rocket, Clock } from 'lucide-react';
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

export default function DevOpsPipeline() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopied({ [id]: true });
    setTimeout(() => setCopied({}), 2000);
  };

  const codeSnippets = {
    jenkinsfile: `pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'registry.hub.docker.com'
        DOCKER_IMAGE = 'myapp/backend-service'
        AWS_REGION = 'us-east-1'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/company/backend-service.git'
            }
        }
        
        stage('Build & Test') {
            steps {
                sh 'mvn clean compile'
                sh 'mvn test'
            }
            post {
                success {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    docker.build("\${DOCKER_IMAGE}:\${BUILD_NUMBER}")
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://\${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("\${DOCKER_IMAGE}:\${BUILD_NUMBER}").push()
                        docker.image("\${DOCKER_IMAGE}:\${BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to EKS') {
            steps {
                sh "kubectl set image deployment/backend-service backend-service=\${DOCKER_IMAGE}:\${BUILD_NUMBER} -n production"
                sh "kubectl rollout status deployment/backend-service -n production"
            }
        }
    }
    
    post {
        success {
            slackSend color: 'good', 
                message: "✅ Build \${BUILD_NUMBER} succeeded! Deployed to production."
        }
        failure {
            slackSend color: 'danger', 
                message: "❌ Build \${BUILD_NUMBER} failed! Check Jenkins console."
        }
    }
}`,
    githubActions: `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: \${{ runner.os }}-m2-\${{ hashFiles('**/pom.xml') }}
    
    - name: Build and Test
      run: mvn clean verify
    
    - name: Run Security Scan
      run: mvn owasp:check
    
    - name: Upload Test Results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: target/surefire-reports/

  docker-build:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKER_USERNAME }}
        password: \${{ secrets.DOCKER_TOKEN }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        push: true
        tags: |
          myapp/backend-service:latest
          myapp/backend-service:\${{ github.sha }}

  deploy:
    needs: docker-build
    runs-on: ubuntu-latest
    environment: production
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Update kubeconfig
      run: aws eks update-kubeconfig --name production-cluster
    
    - name: Deploy to EKS
      run: |
        kubectl set image deployment/backend-service backend-service=myapp/backend-service:\${{ github.sha }}
        kubectl rollout status deployment/backend-service`
  };

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
            $ cat devops-pipeline.md
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Production CI/CD Pipeline: From Git Commit to Kubernetes</h1>
          <p className="hero-description">
            Learn how to build a complete CI/CD pipeline that automatically builds, tests, and deploys Java applications 
            to Kubernetes. Real-world configuration from my 2+ years of DevOps experience.
          </p>
          
          <div className="live-status-panel">
            <div className="status-header">📄 ARTICLE METADATA</div>
            <div className="status-items">
              <span><Calendar size={12} /> May 28, 2026</span>
              <span><User size={12} /> Sandeep Konda</span>
              <span><Clock size={12} /> 15 min read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="java-backend-showcase" style={{ padding: '40px' }}>
          <div className="code-showcase">
            <div className="code-tabs">
              <div className="code-tab active">README.md</div>
              <div className="code-tab">Jenkinsfile</div>
              <div className="code-tab">.github/workflows/deploy.yml</div>
            </div>
            <div className="code-block" style={{ padding: '30px' }}>
              <div style={{ color: '#aaffdd', lineHeight: '1.8' }}>
                
                <div className="live-status-panel" style={{ margin: '0 0 30px 0' }}>
                  <div className="status-header">🚀 REAL PIPELINE STATS</div>
                  <div className="status-items">
                    <span>50+ builds daily</span>
                    <span>4 min build time</span>
                    <span>90 sec deployment</span>
                  </div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', marginBottom: '15px' }}>The Pipeline Architecture</h2>
                
                <div className="microservices-grid" style={{ marginBottom: '30px' }}>
                  <div className="ms-card"><GitBranch size={20} /> Git Push</div>
                  <div className="ms-card"><Settings size={20} /> Build & Test</div>
                  <div className="ms-card"><Copy size={20} /> Docker Build</div>
                  <div className="ms-card"><Rocket size={20} /> Deploy to K8s</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Jenkins Pipeline (Declarative)</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">Jenkinsfile</div>
                    <button onClick={() => copyCode('jenkins', codeSnippets.jenkinsfile)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                      {copied.jenkins ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '11px', fontFamily: "'Fira Code', monospace", overflow: 'auto', maxHeight: '400px' }}>
                      {codeSnippets.jenkinsfile}
                    </pre>
                  </div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">💡 PRO TIP</div>
                  <div className="status-items">
                    Implement parallel stages for build and test to reduce pipeline execution time. 
                    We reduced our pipeline time from 12 minutes to 4 minutes using parallel execution.
                  </div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>GitHub Actions Workflow</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="dot red"></div>
                      <div className="dot yellow"></div>
                      <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">.github/workflows/deploy.yml</div>
                    <button onClick={() => copyCode('github', codeSnippets.githubActions)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
                      {copied.github ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '11px', fontFamily: "'Fira Code', monospace", overflow: 'auto', maxHeight: '400px' }}>
                      {codeSnippets.githubActions}
                    </pre>
                  </div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Best Practices from Production</h2>
                
                <div className="microservices-grid" style={{ marginBottom: '30px' }}>
                  <div className="ms-card">✅ Security Scanning</div>
                  <div className="ms-card">✅ Blue-Green Deployments</div>
                  <div className="ms-card">✅ Canary Releases</div>
                  <div className="ms-card">✅ Rollback Strategies</div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 KEY TAKEAWAY</div>
                  <div className="status-items">
                    A good CI/CD pipeline is invisible. Developers push code, and it's automatically in production within minutes.
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
            {["Jenkins", "GitHub Actions", "Kubernetes", "Terraform", "ArgoCD", "Docker"].map(tag => (
              <div key={tag} className="ms-card"><span>{tag}</span></div>
            ))}
          </div>

          {/* Comments */}
          <CommentSection postId={3} />
        </div>
      </div>
    </div>
  );
}