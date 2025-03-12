"use client";
import { motion } from "framer-motion";
import ColorCard from "./ColorCard";
import DownloadButton from "./DownloadButton";
import SharePopup from "./SharePopup"; // New component
import { useState } from "react";

export default function PaletteDisplay({ palette, image }) {
  const [dominantColor] = palette;
  const shareUrl = `${window.location.origin}/palette/${palette
    .map(c => c.hex.slice(1))
    .join("-")}`;
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <motion.div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          Dominant Color
        </h3>
        <motion.div
          className="h-24 rounded-xl shadow-md flex items-end justify-end p-3"
          style={{ backgroundColor: dominantColor.hex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigator.clipboard.writeText(dominantColor.hex)}
            className="text-white bg-gray-800/70 hover:bg-gray-800 px-3 py-1 rounded-full text-sm"
          >
            {dominantColor.hex}
          </button>
        </motion.div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {palette.map((color, index) => (
          <ColorCard key={index} color={color} />
        ))}
      </div>
      <div className="flex gap-4 justify-end">
        <DownloadButton palette={palette} image={image} />
        <button
          onClick={() => setIsShareOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all"
        >
          Share Palette
        </button>
      </div>
      {isShareOpen && (
        <SharePopup shareUrl={shareUrl} onClose={() => setIsShareOpen(false)} />
      )}
    </motion.div>
  );
}