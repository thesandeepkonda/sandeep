import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { ArrowUp, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-slate-100">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight">
              Sandeep Konda<span className="text-blue-600">.</span>
            </Link>
            <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-xs">
              DevOps Engineer & Java Backend Architect, building resilient cloud-native solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Navigate</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
              <li><Link to="/blogs" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Quick Links (Optional – projects, resume, etc.) */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">More</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="/resume.pdf" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Resume</a></li>
              <li><a href="https://github.com/thesandeepkonda" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">GitHub</a></li>
              <li><Link to="/blogs" className="hover:text-blue-600 transition-colors">All Projects</Link></li>
            </ul>
          </div>

          {/* Social & Action */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-4">Connect</h4>
            <div className="flex gap-4 text-xl text-slate-600 mb-6">
              <a href="https://github.com/thesandeepkonda" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/sandeepkonda97/" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="mailto:kondasandeep56@gmail.com" className="hover:text-blue-600 transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm group"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
              Back to top
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-slate-400 text-xs">
          © {new Date().getFullYear()} Sandeep Konda. Built with passion & precision.
        </div>
      </div>
    </footer>
  );
}