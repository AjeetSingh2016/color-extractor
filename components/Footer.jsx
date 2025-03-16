"use client";
import { motion } from 'framer-motion';
import { Palette, Twitter, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { theme } from "../app/theme";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <footer className={`${currentTheme.footer} py-12 px-4`} id="company">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Column - Expanded to take more space */}
        <div className="md:col-span-4">
          <div className="flex items-center space-x-2 mb-4">
            <Palette className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-300'}`} />
            <span className="text-xl font-bold text-white">ColorCraft</span>
          </div>
          <p className="text-slate-400 mb-6 text-base leading-relaxed">
            The ultimate color toolkit for designers and developers. Create, extract, 
            and analyze colors with ease. Built with passion for the design community.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Tools Column - Slightly wider */}
        <div className="md:col-span-3">
          <h4 className="font-semibold mb-4 text-white text-lg">Tools</h4>
          <ul className="space-y-4">
            <li><a href="Tools" className="text-slate-400 hover:text-white transition-colors duration-300">Gradient Generator</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Color Picker</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contrast Checker</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Color Palettes</a></li>
          </ul>
        </div>

        {/* Resources Column - Slightly wider */}
        <div className="md:col-span-3">
          <h4 className="font-semibold mb-4 text-white text-lg">Resources</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Documentation</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">API Reference</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Blog</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Community</a></li>
          </ul>
        </div>

        {/* Company Column - Slightly wider */}
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-4 text-white text-lg">Company</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">About</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center">
        <p className="text-slate-400">© 2025 ColorCraft. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;