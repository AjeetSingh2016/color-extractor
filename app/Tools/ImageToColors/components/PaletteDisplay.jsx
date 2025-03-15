"use client";
import { motion } from "framer-motion";
import ColorCard from "./ColorCard";
import DownloadButton from "./DownloadButton";
import SharePopup from "./SharePopup";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { theme, containerVariants, itemVariants, cardVariants } from '../../../theme';

export default function PaletteDisplay({ palette, image, isDarkMode = false }) {
  const [dominantColor] = palette;
  const shareUrl = `${window.location.origin}/palette/${palette
    .map((c) => c.hex.slice(1))
    .join("-")}`;
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);
  
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const copyHex = () => {
    navigator.clipboard.writeText(dominantColor.hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const copyRgb = () => {
    navigator.clipboard.writeText(dominantColor.rgb);
    setCopiedRgb(true);
    setTimeout(() => setCopiedRgb(false), 2000);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`space-y-8 p-6 md:p-8 ${currentTheme.card} rounded-2xl  ${currentTheme.border} `}
    >
      {/* Dominant Color Section */}
      <motion.div variants={itemVariants}>
        <h3 className={`text-xl font-semibold ${currentTheme.headline} mb-4`}>
          Dominant Color
        </h3>
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          initial="initial"
          className="h-32 rounded-xl shadow-lg overflow-hidden relative"
          style={{ backgroundColor: dominantColor.hex }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
          <div className="relative z-10 flex items-end justify-between p-4 h-full">
            <button
              onClick={copyHex}
              className={`text-sm font-medium py-2 px-4 rounded-full transition-all duration-300
                ${copiedHex 
                  ? "bg-green-500 text-white shadow-md" 
                  : "bg-gray-900/70 text-white hover:bg-gray-900 shadow-sm"}`}
            >
              {copiedHex ? "Copied!" : dominantColor.hex}
            </button>
            <button
              onClick={copyRgb}
              className={`text-sm font-medium py-2 px-4 rounded-full transition-all duration-300
                ${copiedRgb 
                  ? "bg-green-500 text-white shadow-md" 
                  : "bg-gray-900/70 text-white hover:bg-gray-900 shadow-sm"}`}
            >
              {copiedRgb ? "Copied!" : `RGB: ${dominantColor.rgb}`}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Color Grid */}
      <motion.div variants={itemVariants}>
        <h3 className={`text-xl font-semibold ${currentTheme.headline} mb-4`}>
          Color Palette
        </h3>
        <div className={`grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[60vh] overflow-y-auto px-2
          scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-transparent hover:scrollbar-thumb-indigo-600`}>
          {palette.map((color, index) => (
            <ColorCard key={index} color={color} isDarkMode={isDarkMode} />
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-end items-center"
      >
        <DownloadButton 
          palette={palette} 
          image={image} 
          isDarkMode={isDarkMode}
          className={`flex items-center gap-2 px-6 py-3 ${currentTheme.primary} bg-opacity-10 hover:bg-opacity-20 text-white rounded-full 
            transition-all duration-300 w-full sm:w-auto justify-center shadow-lg border ${currentTheme.border}`}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsShareOpen(true)}
          className={`flex items-center gap-2 px-6 py-3 ${currentTheme.button} bg-opacity-10 hover:bg-opacity-20 text-white rounded-full 
            transition-all duration-300 w-full sm:w-auto justify-center shadow-lg border ${currentTheme.button}`}
        >
          <Share2 size={20} />
          <span className="font-medium">Share Palette</span>
        </motion.button>
      </motion.div>

      {/* Share Popup */}
      {isShareOpen && (
        <SharePopup 
          shareUrl={shareUrl} 
          onClose={() => setIsShareOpen(false)} 
          isDarkMode={isDarkMode}
        />
      )}
    </motion.div>
  );
}