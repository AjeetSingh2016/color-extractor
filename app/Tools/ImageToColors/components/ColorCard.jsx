"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { theme, cardVariants } from '../../../theme';

export default function ColorCard({ color, isDarkMode = false }) {
  const [copied, setCopied] = useState(null);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      className={`rounded-xl overflow-hidden ${currentTheme.card} shadow-xl transition-all duration-100 border border-gray-300`}
    >
      {/* Color Preview */}
      <div
        className="h-36 md:h-32 w-full relative"
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
      </div>

      {/* Color Details */}
      <div className={`p-4 bg-gray-50 space-y-2 text-center `}>
        <button
          onClick={() => copyToClipboard(color.hex, "hex")}
          className={`w-full text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 bg-indigo-50
            ${copied === "hex"
              ? "bg-green-500 text-white shadow-md"
              : `${currentTheme.paragraph} bg-opacity-70 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:${currentTheme.primary}`}`}
        >
          {copied === "hex" ? "Copied!" : color.hex}
        </button>
        <button
          onClick={() => copyToClipboard(color.rgb, "rgb")}
          className={`w-full text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300 bg-indigo-50
            ${copied === "rgb"
              ? "bg-green-500 text-white shadow-md"
              : `${currentTheme.paragraph} bg-opacity-70 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:${currentTheme.primary}`}`}
        >
          {copied === "rgb" ? "Copied!" : `${color.rgb}`}
        </button>
      </div>
    </motion.div>
  );
}