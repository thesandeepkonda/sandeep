import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add shadow after scrolling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md shadow-lg shadow-olive/5'
          : 'bg-cream'
      } border-b border-olive/10`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black text-olive tracking-tight hover:text-olive/80 transition-colors"
        >
          Sandeep Konda<span className="text-olive/40">.</span>
        </Link>

        {/* Desktop links + social */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-olive/70 ${
                location.pathname === link.path
                  ? 'text-olive border-b-2 border-olive pb-1'
                  : 'text-olive/80'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex items-center gap-4 ml-2 pl-4 border-l border-olive/20">
            <a
              href="https://github.com/thesandeepkonda"
              target="_blank"
              rel="noreferrer"
              className="text-olive/70 hover:text-olive transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sandeepkonda97/"
              target="_blank"
              rel="noreferrer"
              className="text-olive/70 hover:text-olive transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-olive p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-olive/10 pb-6 px-6 animate-fade-in">
          <div className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider ${
                  location.pathname === link.path
                    ? 'text-olive'
                    : 'text-olive/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/thesandeepkonda" target="_blank" rel="noreferrer" className="text-olive/70 hover:text-olive">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/thesandeepkonda" target="_blank" rel="noreferrer" className="text-olive/70 hover:text-olive">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}