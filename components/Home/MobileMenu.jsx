"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MobileMenu({ currentTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden fixed top-16 left-0 right-0 p-6 mt-2 mx-4 rounded-2xl z-40 shadow-xl ${currentTheme.card} border border-opacity-20 border-slate-300`}
        >
          <nav className="flex flex-col space-y-4">
            <a
              href="#tools"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </a>
            <a
              href="#resources"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </a>
            <a
              href="#company"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Company
            </a>
            <button
              className={`rounded-full px-5 py-3 ${currentTheme.button} text-center mt-4`}
            >
              Sign Up
            </button>
          </nav>
        </motion.div>
      )}
    </>
  );
}