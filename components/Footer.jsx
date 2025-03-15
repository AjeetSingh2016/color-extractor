// components/Footer.jsx
"use client"
import { motion } from 'framer-motion'
import { Sun, Moon, Palette, Accessibility, Rocket, Code, Twitter, Github, Linkedin, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Head from 'next/head'

const Footer = () => {
  
        const [isDarkMode, setIsDarkMode] = useState(false)
        const [isMenuOpen, setIsMenuOpen] = useState(false)
        const [isScrolled, setIsScrolled] = useState(false)
  
      const theme = {
          light: {
            background: "bg-gradient-to-br from-gray-50 to-blue-50",
            headline: "text-slate-800",
            paragraph: "text-slate-600",
            primary: "text-indigo-600",
            secondary: "text-emerald-500",
            accent: "text-fuchsia-500",
            button: "bg-indigo-600 hover:bg-indigo-700 text-white",
            buttonOutline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
            card: "bg-white",
            header: "bg-white/80 backdrop-blur-lg",
            footer: "bg-slate-900"
          },
          dark: {
            background: "bg-gradient-to-br from-slate-900 to-slate-800",
            headline: "text-white",
            paragraph: "text-slate-300",
            primary: "text-indigo-400",
            secondary: "text-emerald-400",
            accent: "text-fuchsia-400",
            button: "bg-indigo-500 hover:bg-indigo-600 text-white",
            buttonOutline: "border border-indigo-500 text-indigo-400 hover:bg-indigo-900/30",
            card: "bg-slate-800/80",
            header: "bg-slate-900/80 backdrop-blur-lg",
            footer: "bg-slate-950"
          }
        }
      
        const currentTheme = isDarkMode ? theme.dark : theme.light
  return (
          <footer className={`${currentTheme.footer} py-12 px-4`} id="company">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <div className="flex items-center space-x-2 mb-4">
                <Palette className={`h-6 w-6 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-300'}`} />
                <span className="text-xl font-bold text-white">ColorCraft</span>
              </div>
              <p className="text-slate-400 mb-6">The ultimate color toolkit for designers and developers. Create, extract, and analyze colors with ease.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
  
            {/* Tools Column */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white">Tools</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Gradient Generator</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Color Picker</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contrast Checker</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Color Palettes</a></li>
              </ul>
            </div>
  
            {/* Resources Column */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">API Reference</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Community</a></li>
              </ul>
            </div>
  
            {/* Company Column */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
              <p className="text-slate-400 mb-4">Get the latest ColorCraft news and updates</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors duration-300">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-400">© 2025 ColorCraft. All rights reserved.</p>
          </div>
        </footer>
  );
};

export default Footer;
