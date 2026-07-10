import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, User, Clock, Tag, Eye, Cloud, Server, Database, ShoppingBag, Lock, Zap, CloudOff, GitBranch, Shield, Package, Rocket, Activity, Terminal
} from 'lucide-react';
import CommentSection from '../components/CommentSection';

// Blog image
const blogImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDb974ujY_XX0_uQAjyTdt9i_gXMSZcoLMLpK4Gxe8iQ&s=10";

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
            <Terminal size={16} /> $ cat zufeto.md
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Zufeto – Scalable E-Commerce Platform on AWS
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            A cloud-native e-commerce platform designed to support customers, vendors, and administrators through dedicated web applications and backend services on AWS.
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> June 5, 2026</span>
            <span className="flex items-center gap-1.5"><User size={14} /> Sandeep Konda</span>
            <span className="flex items-center gap-1.5"><Clock size={14} /> 18 min read</span>
            <span className="flex items-center gap-1.5"><Eye size={14} /> 892 views</span>
          </div>
        </motion.section>

        {/* ---- FEATURED IMAGE ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-10 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
        >
          <img
            src={blogImage}
            alt="Zufeto AWS Architecture"
            className="w-full h-64 md:h-80 object-cover"
          />
        </motion.div>

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
                
                {/* Overview */}
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Zufeto is a cloud-native e-commerce platform designed to support customers, vendors, and administrators 
                  through dedicated web applications and backend services. The project focuses on scalability, security, 
                  automation, and high availability using AWS and Infrastructure as Code.
                </p>

                {/* Problem Statement */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🎯</span> PROBLEM STATEMENT
                  </div>
                  <ul className="text-slate-700 text-sm space-y-1 list-disc pl-4">
                    <li>Traditional e-commerce deployments suffer from manual infrastructure management</li>
                    <li>Inconsistent environments across development and production</li>
                    <li>Difficult scaling during traffic spikes</li>
                    <li className="text-green-700">Need for automated, production-ready platform</li>
                  </ul>
                </div>

                {/* System Architecture */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">System Architecture</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: <ShoppingBag size={24} />, title: "Customer Portal", sub: "zufeto.in" },
                    { icon: <Server size={24} />, title: "Vendor Portal", sub: "vendor.zufeto.in" },
                    { icon: <Shield size={24} />, title: "Admin Portal", sub: "admin.zufeto.in" },
                    { icon: <Database size={24} />, title: "Backend API", sub: "backend.zufeto.in" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
                      <div className="text-blue-600 mb-2">{item.icon}</div>
                      <div className="font-semibold text-slate-700">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.sub}</div>
                    </div>
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  <strong className="text-blue-600">Frontend Applications:</strong> Each frontend is hosted using Amazon S3, 
                  CloudFront for CDN, AWS ACM Certificates for HTTPS, and Route53 for DNS management.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  <strong className="text-blue-600">Backend Services:</strong> Deployed on Amazon ECS with Application Load Balancer, 
                  Amazon RDS PostgreSQL, Auto Scaling Groups, and private VPC networking.
                </p>

                {/* Infrastructure Design */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Infrastructure Design</h2>
                
                {/* Code Block for network config */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">network-config.yaml</span>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto">
{`# VPC Configuration
- Custom VPC with CIDR 10.0.0.0/16
- Public Subnets (3 AZs) for Load Balancers
- Private Subnets (3 AZs) for ECS tasks
- Isolated Subnets (3 AZs) for RDS
- Internet Gateway + NAT Gateways
- Security Groups with least-privilege access`}
                  </pre>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: <Cloud size={24} />, title: "Multi-AZ", sub: "High Availability" },
                    { icon: <Lock size={24} />, title: "Private Subnets", sub: "Database Isolation" },
                    { icon: <Zap size={24} />, title: "Auto Scaling", sub: "Dynamic Capacity" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl text-center border border-slate-200">
                      <div className="text-blue-600 mb-1">{item.icon}</div>
                      <div className="font-semibold text-slate-700 text-sm">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* DevOps & Automation */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">DevOps & Automation</h2>
                
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-6">
                  <div className="flex flex-wrap justify-between gap-4">
                    {pipelineSteps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="text-blue-600">{step.icon}</div>
                        <div className="font-semibold text-slate-700 text-sm">{step.name}</div>
                        <div className="text-xs text-slate-400">{step.tool}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Block for GitHub Actions */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">.github/workflows/deploy.yml</span>
                  </div>
                  <pre className="p-4 text-sm text-slate-300 font-mono overflow-x-auto">
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

                {/* Security Implementation */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Security Implementation</h2>
                
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🔒</span> SECURITY LAYERS
                  </div>
                  <ul className="text-slate-700 text-sm space-y-1 list-disc pl-4">
                    <li>HTTPS using ACM Certificates</li>
                    <li>Route53 DNS management</li>
                    <li>Private database access</li>
                    <li>IAM role-based permissions</li>
                    <li>Secure VPC network isolation</li>
                  </ul>
                </div>

                {/* Key Challenges Solved */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Key Challenges Solved</h2>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "🌐 Multi-Domain Management", desc: "Configured separate domains (zufeto.in, admin.zufeto.in, vendor.zufeto.in, backend.zufeto.in) using Route53 and ACM." },
                    { title: "🏗️ Automated Infrastructure Provisioning", desc: "Created reusable Terraform modules to provision and manage AWS infrastructure consistently across environments." },
                    { title: "⚡ High Availability", desc: "Implemented Multi-AZ networking, load balancing, auto-scaling, and managed database services for reliability." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <h3 className="text-blue-600 font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Technologies Used */}
                <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Technologies Used</h2>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React.js", "Spring Boot", "PostgreSQL", "AWS ECS", "Amazon RDS", "S3 + CloudFront", "Route53", "ACM", "Terraform", "GitHub Actions", "Docker", "ECR"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="my-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2">
                    <span className="text-xl">✅</span> PROJECT RESULTS
                  </div>
                  <ul className="text-slate-700 text-sm space-y-1 list-disc pl-4">
                    <li>Fully automated cloud deployment from code to production</li>
                    <li>Secure HTTPS infrastructure with custom domains</li>
                    <li>Scalable microservice-ready architecture</li>
                    <li>Reduced manual operational effort by 95%</li>
                    <li>Production-ready CI/CD pipeline with zero-downtime deployments</li>
                  </ul>
                </div>

                {/* Conclusion */}
                <div className="my-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                    <span className="text-xl">🎯</span> CONCLUSION
                  </div>
                  <p className="text-slate-700 text-sm">
                    Zufeto demonstrates end-to-end cloud architecture design, infrastructure automation, and deployment best practices. 
                    The project showcases practical experience in AWS, DevOps, containerization, Infrastructure as Code, and scalable application deployment.
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
                {["AWS", "ECS", "Terraform", "Spring Boot", "React", "PostgreSQL", "S3", "CloudFront", "Route53", "Docker", "GitHub Actions"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---- COMMENTS ---- */}
          <motion.div variants={fadeUp}>
            <CommentSection postId={5} />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}