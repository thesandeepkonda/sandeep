import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#3b492a] text-[#fdf7e3] py-10 mt-10">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-xl font-black">Sandeep Konda.</Link>
        </div>
        <div className="flex gap-6 text-xl">
          <a href="https://github.com/thesandeepkonda" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/thesandeepkonda" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}