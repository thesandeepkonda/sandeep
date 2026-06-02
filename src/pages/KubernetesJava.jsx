import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Copy, Check, Clock } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import React, { useState, useEffect } from "react";

// Canvas Network Component (same as above)
const CanvasNetwork = () => { /* ... include the CanvasNetwork code ... */ };

export default function DevOpsPipeline() {
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
    const code = `pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { git 'https://github.com/company/backend-service.git' }
        }
        stage('Build & Test') {
            steps { sh 'mvn clean verify' }
        }
        stage('Docker Build') {
            steps { sh 'docker build -t myapp/backend-service .' }
        }
        stage('Deploy to EKS') {
            steps { sh 'kubectl set image deployment/backend-service backend-service=myapp/backend-service:latest' }
        }
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
        <button onClick={() => navigate('/blogs')} style={{ background: 'none', border: 'none', color: '#00ffaa', cursor: 'pointer', fontFamily: "'Fira Code', monospace", fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <div className="mb-8">
          <div className="hero-subtitle" style={{ color: '#00ffaa', fontFamily: "'Fira Code', monospace", marginBottom: '10px' }}>$ cat devops-pipeline.md</div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>Production CI/CD Pipeline</h1>
          <p className="hero-description">From Git commit to Kubernetes - build a complete CI/CD pipeline that automatically builds, tests, and deploys Java applications.</p>
          
          <div className="live-status-panel">
            <div className="status-header">📄 ARTICLE METADATA</div>
            <div className="status-items">
              <span><Calendar size={12} /> May 28, 2026</span>
              <span><User size={12} /> Sandeep Konda</span>
              <span><Clock size={12} /> 15 min read</span>
            </div>
          </div>
        </div>

        <div className="java-backend-showcase" style={{ padding: '40px' }}>
          <div className="code-showcase">
            <div className="code-tabs"><div className="code-tab active">README.md</div></div>
            <div className="code-block" style={{ padding: '30px' }}>
              <div style={{ color: '#aaffdd', lineHeight: '1.8' }}>
                
                <div className="live-status-panel" style={{ margin: '0 0 30px 0' }}>
                  <div className="status-header">🚀 REAL PIPELINE STATS</div>
                  <div className="status-items">50+ builds daily | 4 min build time | 90 sec deployment</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', marginBottom: '15px' }}>Pipeline Architecture</h2>
                <div className="microservices-grid" style={{ marginBottom: '30px' }}>
                  <div className="ms-card">📝 Git Push</div>
                  <div className="ms-card">🔨 Build & Test</div>
                  <div className="ms-card">🐳 Docker Build</div>
                  <div className="ms-card">📦 Push Registry</div>
                  <div className="ms-card">☸️ Deploy to K8s</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Jenkins Pipeline</h2>
                
                <div className="terminal" style={{ margin: '20px 0' }}>
                  <div className="terminal-header">
                    <div className="terminal-dots"><div className="dot red"></div><div className="dot yellow"></div><div className="dot green"></div></div>
                    <div className="terminal-title">Jenkinsfile</div>
                    <button onClick={copyCode} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>{copied ? <Check size={14} /> : <Copy size={14} />}</button>
                  </div>
                  <div className="terminal-body">
                    <pre style={{ color: '#d0ffd0', margin: 0, fontSize: '12px', fontFamily: "'Fira Code', monospace" }}>{`pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps { git 'https://github.com/company/backend-service.git' }
        }
        stage('Build & Test') {
            steps { sh 'mvn clean verify' }
        }
        stage('Docker Build') {
            steps { sh 'docker build -t myapp/backend-service .' }
        }
        stage('Deploy to EKS') {
            steps { sh 'kubectl set image deployment/backend-service backend-service=myapp/backend-service:latest' }
        }
    }
}`}</pre>
                  </div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">💡 PRO TIP</div>
                  <div className="status-items">Implement parallel stages for build and test to reduce pipeline execution time.</div>
                </div>

                <h2 style={{ color: '#00ffaa', fontSize: '1.5rem', margin: '30px 0 15px' }}>Best Practices</h2>
                <div className="microservices-grid">
                  <div className="ms-card">✅ Security Scanning</div>
                  <div className="ms-card">✅ Blue-Green Deployments</div>
                  <div className="ms-card">✅ Canary Releases</div>
                  <div className="ms-card">✅ Rollback Strategies</div>
                </div>

                <div className="live-status-panel" style={{ margin: '30px 0' }}>
                  <div className="status-header">🎯 KEY TAKEAWAY</div>
                  <div className="status-items">A good CI/CD pipeline is invisible. Developers push code, and it's automatically in production within minutes.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="microservices-grid" style={{ marginTop: '30px' }}>
            <div className="ms-card" style={{ background: 'rgba(0, 255, 170, 0.1)' }}><Tag size={16} style={{ color: '#00ffaa' }} /> <span style={{ color: '#00ffaa' }}>TAGS</span></div>
            {['Jenkins', 'GitHub Actions', 'Kubernetes', 'Terraform', 'ArgoCD', 'Docker'].map(tag => (<div key={tag} className="ms-card"><span>{tag}</span></div>))}
          </div>

          <CommentSection postId={3} />
        </div>
      </div>
    </div>
  );
}