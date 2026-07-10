import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  Cloud,
  Server,
  Layers,
  Code,
  Database,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Terminal,
  GitBranch,
  Boxes
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
        "Backend Frameworks & Libraries": [
          "Java",
          "Spring Boot",
          "Spring Data JPA",
          "Hibernate",
          "RESTful Web Services",
          "Spring Security"
        ],

        "Cloud Infrastructure (AWS)": [
          "EC2",
          "VPC",
          "Elastic Load Balancing (ELB)",
          "S3",
          "Route 53",
          "CloudFront",
          "CloudWatch",
          "IAM",
          "ACM",
          "ECR",
          "ECS"
        ],

        "DevOps & CI/CD": [
          "Git",
          "GitHub",
          "GitHub Actions",
          "Jenkins",
          "Terraform"
        ],

        "Containerization & Orchestration": [
          "Docker",
          "Kubernetes (EKS)",
          "Helm"
        ],

        "Databases & Data Layer": [
          "AWS RDS",
          "PostgreSQL",
          "MySQL",
          "MongoDB"
        ],

        "Monitoring & Logging": [
          "AWS CloudWatch",
          "Prometheus",
          "Grafana"
        ]
      };

  const achievements = [
    { icon: <Award className="w-8 h-8" />, title: "AWS Certified Solutions Architect", year: "2024", description: "Professional cloud architecture certification" },
    { icon: <Award className="w-8 h-8" />, title: "Kubernetes Administrator", year: "2024", description: "Certified Kubernetes Administrator (CKA)" },
    { icon: <GraduationCap className="w-8 h-8" />, title: "M.Sec in Computer Science", year: "2023", description: "Cloud Computing & Distributed Systems" },
    { icon: <Zap className="w-8 h-8" />, title: "15+ Deployments", year: "2024", description: "Production deployments managed" }
  ];

  const contactOptions = [
    { icon: <Mail size={18} />, label: "Email", value: "kondasandeep56@gmail.com", link: "mailto:kondasandeep56@gmail.com" },
    { icon: <FaGithub size={18} />, label: "GitHub", value: "/thesandeepkonda", link: "https://www.github.com/thesandeepkonda" },
    { icon: <FaLinkedin size={18} />, label: "LinkedIn", value: "/sandeepkonda97", link: "https://www.linkedin.com/in/sandeepkonda97/" },
    { icon: <MapPin size={18} />, label: "Location", value: "Hyderabad, India", link: null }
  ];

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

      <div className="max-w-6xl mx-auto px-6">
        
        {/* ---- HEADER ---- */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200 shadow-sm">
            <Terminal size={16} /> ~$ cat about.md
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            About <span className="text-blue-600">Me</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            DevOps Engineer & Java Backend Developer passionate about cloud-native systems and AI.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </motion.section>

        {/* ---- MAIN GRID ---- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* Left Column - Profile & Contact */}
          <motion.div variants={fadeUp}>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
              
              {/* Profile Image */}
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100">
                <img
                  src="/images/photo.JPG"
                  alt="Sandeep Konda"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-1">Sandeep Konda</h2>
              <p className="text-blue-600 font-mono text-sm mb-6">DevOps Engineer | Java Backend Architect</p>

              <div className="border-t border-slate-100 pt-6 space-y-4 text-left">
                {contactOptions.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-medium">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-700 text-sm font-semibold hover:text-blue-600 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-slate-700 text-sm font-semibold">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio & CTA */}
          <motion.div variants={fadeUp}>
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Who <span className="text-blue-600">Am I?</span>
              </h2>
              
              <div className="space-y-4 text-slate-600 leading-relaxed flex-grow">
                <p>
                  Engineer, researcher, and lifelong tinkerer building systems that <strong className="text-blue-600">sense, reason, and act</strong> — 
                  at the intersection of DevOps, Java Backend, and Cloud Infrastructure.
                </p>
                <p>
                  I bridge the gap between infrastructure and application logic, ensuring systems are not just functional, 
                  but scalable, secure, and resilient. My journey began in the trenches of Linux systems and CI/CD pipelines, 
                  evolving into cloud-native architecture and microservices.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">📍</div>
                  <div className="text-xs text-slate-500 font-medium">Location</div>
                  <div className="text-sm text-slate-800 font-semibold">Hyderabad</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">💼</div>
                  <div className="text-xs text-slate-500 font-medium">Role</div>
                  <div className="text-sm text-slate-800 font-semibold">DevOps / Java</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">🎓</div>
                  <div className="text-xs text-slate-500 font-medium">Education</div>
                  <div className="text-sm text-slate-800 font-semibold">M.Sc</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold text-lg">⚡</div>
                  <div className="text-xs text-slate-500 font-medium">Deploys</div>
                  <div className="text-sm text-slate-800 font-semibold">15+</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  Get in touch <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => window.open('https://github.com/thesandeepkonda', '_blank')}
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5"
                >
                  <FaGithub size={18} /> GitHub
                </button>
                <button
                  onClick={() => window.open('/resume.pdf', '_blank')}
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-500 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all hover:-translate-y-0.5"
                >
                  <Sparkles size={18} /> Resume
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- ACHIEVEMENTS ---- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-4">
            Key <span className="text-blue-600">Achievements</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          
          <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-base">{item.title}</h3>
                <span className="text-blue-600 text-xs font-mono font-semibold">{item.year}</span>
                <p className="text-slate-500 text-xs mt-2">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---- TECHNICAL SKILLS ---- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-4">
            Technical <span className="text-blue-600">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <motion.div
                key={category}
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">

                  {category === "Backend Frameworks & Libraries" && (
                    <Server size={20} />  )}

                  {category === "Cloud Infrastructure (AWS)" && (
                    <Cloud size={20} /> )}

                  {category === "DevOps & CI/CD" && (
                    <GitBranch size={20} /> )}

                  {category === "Containerization & Orchestration" && (
                    <Boxes size={20} /> )}

                  {category === "Databases & Data Layer" && (
                    <Database size={20} /> )}

                  {category === "Monitoring & Logging" && (
                    <ShieldCheck size={20} /> )}

                </div>
                  <h3 className="text-slate-900 font-bold text-lg">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---- RESEARCH INTERESTS ---- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-4">
            Research <span className="text-blue-600">Interests</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🧠", title: "Agentic AI", desc: "Autonomous agents, decision-making systems, and multi-agent coordination" },
              { icon: "🤖", title: "Robotics", desc: "Control systems, robot perception, and autonomous navigation" },
              { icon: "🚀", title: "Reinforcement Learning", desc: "Deep RL, policy optimization, and real-world applications" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h3 className="text-slate-900 font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ---- FINAL CTA (OPEN TO) ---- */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                🌟 Open To
              </h2>
              <div className="flex flex-wrap justify-center gap-4 text-white/90 text-lg font-medium">
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">🎓 Graduate Research</span>
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">🤝 Engineering Collaborations</span>
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">💬 Technical Conversations</span>
                <span className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">🚀 Open Source</span>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}