"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Check } from "lucide-react";

export default function ColorCard({ color, theme }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getContrastColor = (hexColor) => {
    if (!hexColor.startsWith("#")) return "#FFFFFF";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#FFFFFF";
  };

  const textColor = getContrastColor(color.hex);

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: color.name,
          text: `Check out this color: ${color.name} - ${color.hex}`,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      handleCopy(`${color.name} - ${color.hex}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-48 rounded-xl overflow-hidden shadow-md flex flex-col" // Increased height to fit name
    >
      {/* Color Background */}
      <div
        className="relative flex-grow h-3/4 cursor-pointer group" // Adjusted height for color section
        style={{ backgroundColor: color.hex }}
        onClick={() => handleCopy(color.hex)}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-lg font-bold px-3 py-1 rounded-lg bg-black/30 backdrop-blur-sm"
          style={{ color: textColor }}
        >
          {color.hex}
        </motion.span>
      </div>

      {/* Color Name and Share Button */}
      <div
        className="h-1/4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-2 flex items-center justify-between" // Bottom bar for name and share
      >
        <span
          className="text-sm font-medium truncate"
          style={{ color: theme?.headline || "#000" }} // Use theme color or fallback
          title={color.name} // Tooltip for long names
        >
          {color.name}
        </span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={handleShare}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Share color"
        >
          {/* <Share2 className="h-4 w-4" style={{ color: theme?.primary || "#666" }} /> */}
        </motion.button>
      </div>

      {/* Copy Success Notification */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-white font-medium px-4 py-2 bg-gray-900/80 rounded-full">
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}