import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid rgba(0, 255, 170, 0.2)',
      background: 'rgba(3, 3, 12, 0.95)',
      backdropFilter: 'blur(10px)',
      marginTop: '60px'
    }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          
          {/* Brand Column */}
          <div>
            <Link to="/" className="logo" style={{ fontSize: '1.8rem', display: 'inline-block', marginBottom: '16px' }}>
              Sandeep<span style={{ color: '#00ffaa' }}>Konda</span>
            </Link>
            <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
              DevOps Engineer & Java Backend Architect specializing in cloud-native infrastructure, 
              CI/CD automation, and high-performance microservices.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://github.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                display: 'flex',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '18px' }}>🐙</span>
              </a>
              <a href="https://www.linkedin.com/in/sandeepkonda07" target="_blank" rel="noopener noreferrer" style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                display: 'flex',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '18px' }}>🔗</span>
              </a>
              <a href="https://twitter.com/thesandeepkonda" target="_blank" rel="noopener noreferrer" style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                display: 'flex',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '18px' }}>🐦</span>
              </a>

              <a href="mailto:kondasandeep56@gmail.com" style={{ 
                padding: '8px', 
                background: 'rgba(255,255,255,0.05)', 
                borderRadius: '8px',
                display: 'flex',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '18px' }}>✉️</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', fontWeight: '600' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Home', 'About', 'Blog', 'Contact'].map(link => (
                <li key={link} style={{ marginBottom: '12px' }}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} style={{ 
                    color: '#888', 
                    textDecoration: 'none', 
                    fontSize: '13px',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#00ffaa'}
                  onMouseLeave={(e) => e.target.style.color = '#888'}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', fontWeight: '600' }}>Tech Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Java', 'Spring Boot', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'React', 'PostgreSQL'].map(tech => (
                <span key={tech} style={{
                  padding: '4px 12px',
                  background: 'rgba(0, 255, 170, 0.1)',
                  borderRadius: '20px',
                  fontSize: '11px',
                  color: '#00ffaa'
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '20px', fontWeight: '600' }}>Get in Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>✉️</span>
                <span style={{ color: '#888', fontSize: '13px' }}>kondasandeep56@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>📍</span>
                <span style={{ color: '#888', fontSize: '13px' }}>Hyderabad, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px' }}>📞</span>
                <span style={{ color: '#888', fontSize: '13px' }}>+91 8008806996</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{ color: '#666', fontSize: '12px' }}>
            © {currentYear} Sandeep Konda. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: '#666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              💻 Built with React
            </span>
            <span style={{ color: '#666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ☁️ Deployed on AWS
            </span>
            <span style={{ color: '#666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ❤️ Made with passion
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}