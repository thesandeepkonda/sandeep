import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, User, Tag, Copy, Check, GitBranch, Settings, Rocket, Clock, Terminal
} from 'lucide-react';
import CommentSection from '../components/CommentSection';

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

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pt-32 pb-24 overflow-hidden relative">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-75" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* ---- BACK BUTTON ---- */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </motion.button>

        {/* ---- HEADER ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4 border border-blue-200 shadow-sm">
            <Terminal size={16} /> $ cat devops-pipeline.md
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Production CI/CD Pipeline: From Git Commit to Kubernetes
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Learn how to build a complete CI/CD pipeline that automatically builds, tests, and deploys Java applications 
            to Kubernetes. Real-world configuration from my 2+ years of DevOps experience.
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> May 28, 2026</span>
            <span className="flex items-center gap-1.5"><User size={14} /> Sandeep Konda</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
          </div>
        </motion.section>

        {/* ---- MAIN CONTENT ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Content Card */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="prose prose-slate max-w-none">
                
                {/* Pipeline Stats */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🚀</span> REAL PIPELINE STATS
                  </div>
                  <div className="flex flex-wrap gap-4 text-slate-700 text-sm">
                    <span>15+ builds daily</span>
                    <span>4 min build time</span>
                    <span>90 sec deployment</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">The Pipeline Architecture</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: <GitBranch size={20} />, label: "Git Push" },
                    { icon: <Settings size={20} />, label: "Build & Test" },
                    { icon: <Copy size={20} />, label: "Docker Build" },
                    { icon: <Rocket size={20} />, label: "Deploy to K8s" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
                      <div className="text-blue-600 mb-1">{item.icon}</div>
                      <div className="font-semibold text-slate-700 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Jenkins Pipeline (Declarative)</h2>
                
                {/* Jenkins Code Block */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Jenkinsfile</span>
                    <button
                      onClick={() => copyCode('jenkins', codeSnippets.jenkinsfile)}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy code"
                    >
                      {copied.jenkins ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto max-h-[400px]">
                    {codeSnippets.jenkinsfile}
                  </pre>
                </div>

                {/* Pro Tip */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">💡</span> PRO TIP
                  </div>
                  <p className="text-slate-700 text-sm">
                    Implement parallel stages for build and test to reduce pipeline execution time. 
                    We reduced our pipeline time from 12 minutes to 4 minutes using parallel execution.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">GitHub Actions Workflow</h2>
                
                {/* GitHub Actions Code Block */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">.github/workflows/deploy.yml</span>
                    <button
                      onClick={() => copyCode('github', codeSnippets.githubActions)}
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Copy code"
                    >
                      {copied.github ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto max-h-[400px]">
                    {codeSnippets.githubActions}
                  </pre>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Best Practices from Production</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "✅ Security Scanning" },
                    { label: "✅ Blue-Green Deployments" },
                    { label: "✅ Canary Releases" },
                    { label: "✅ Rollback Strategies" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
                      <div className="font-semibold text-slate-700 text-sm">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Takeaway */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🎯</span> KEY TAKEAWAY
                  </div>
                  <p className="text-slate-700 text-sm">
                    A good CI/CD pipeline is invisible. Developers push code, and it's automatically in production within minutes.
                  </p>
                </div>

              </div>
            </div>

            {/* Tags */}
            <div className="border-t border-slate-200 p-6 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <Tag size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-slate-700">TAGS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Jenkins", "GitHub Actions", "Kubernetes", "Terraform", "ArgoCD", "Docker"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---- COMMENTS ---- */}
          <motion.div variants={fadeUp}>
            <CommentSection postId={3} />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}