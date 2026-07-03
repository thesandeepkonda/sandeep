import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#fdf7e3] text-[#3b492a] py-6 px-8 border-b border-[#3b492a]/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-black">Sandeep Konda.</Link>
        <div className="flex gap-8 font-bold text-sm uppercase tracking-wider">
          <Link to="/" className="hover:text-[#3b492a]/70">Home</Link>
          <Link to="/about" className="hover:text-[#3b492a]/70">Experience</Link>
          <Link to="/blogs" className="hover:text-[#3b492a]/70">Projects</Link>
          <Link to="/contact" className="hover:text-[#3b492a]/70">Contact</Link>
        </div>
      </div>
    </nav>
  );
}