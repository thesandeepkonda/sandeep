import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-md mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-extrabold gradient-text">Sandeep<span className="text-[#0d9488]">Konda</span></Link>
            <p className="text-slate-500 text-sm mt-4 max-w-xs leading-relaxed">
              DevOps Engineer & Java Backend Architect.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0d9488] transition">🐙</a>
              <a href="https://linkedin.com/in/sandeepkonda07" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0d9488] transition">🔗</a>
              <a href="https://twitter.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0d9488] transition">🐦</a>
              <a href="mailto:kondasandeep56@gmail.com" className="text-slate-400 hover:text-[#0d9488] transition">✉️</a>
            </div>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-[#0d9488] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#0d9488] transition">Experience</Link></li>
              <li><Link to="/blogs" className="hover:text-[#0d9488] transition">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-[#0d9488] transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Java', 'Spring Boot', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'React'].map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-slate-800 font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <div>✉️ kondasandeep56@gmail.com</div>
              <div>📍 Hyderabad, India</div>
              <div>📞 +91 8008806996</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200/60 mt-8 pt-6 text-center text-xs text-slate-400">
          © {year} Sandeep Konda. Built with React & Tailwind.
        </div>
      </div>
    </footer>
  );
}