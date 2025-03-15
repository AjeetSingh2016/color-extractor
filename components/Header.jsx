"use client"
import { motion } from 'framer-motion'
import { Sun, Moon, Palette, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'



const Header = () => {

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
    <div className={`${currentTheme.header} ${isScrolled ? 'shadow-lg' : ''} py-4 px-6 fixed w-full top-0 z-50 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 hand-cursor">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Palette className={`h-6 w-6 ${currentTheme.primary}`} />
            </motion.div>
            <span className={`text-xl font-bold ${currentTheme.headline}`}>ColorCraft</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#tools" className={`${currentTheme.paragraph} hover:${currentTheme.primary} transition-colors duration-300`}>Tools</a>
            <a href="#resources" className={`${currentTheme.paragraph} hover:${currentTheme.primary} transition-colors duration-300`}>Resources</a>
            <a href="#company" className={`${currentTheme.paragraph} hover:${currentTheme.primary} transition-colors duration-300`}>Company</a>
          </nav>
          
          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full p-2 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md transition-all duration-300 hover:scale-105`}
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
            </button> */}
            <button className={`rounded-full px-5 py-2 ${currentTheme.button} transition-all duration-300 shadow-md hover:shadow-lg`}>
              Sign Up
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full p-2 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-indigo-500" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`rounded-full p-2 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-md`}
            >
              {isMenuOpen ? <X className={`h-5 w-5 ${currentTheme.primary}`} /> : <Menu className={`h-5 w-5 ${currentTheme.primary}`} />}
            </button>
          </div>
        </div>
    </div>
  )
}

export default Header
