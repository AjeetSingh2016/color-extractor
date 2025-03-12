"use client";
import { motion } from "framer-motion";
import ColorCard from "./ColorCard";
import DownloadButton from "./DownloadButton";
import SharePopup from "./SharePopup";
import { useState } from "react";
import { Share2 } from "lucide-react";

export default function PaletteDisplay({ palette, image }) {
  const [dominantColor] = palette;
  const shareUrl = `${window.location.origin}/palette/${palette
    .map((c) => c.hex.slice(1))
    .join("-")}`;
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <motion.div className="space-y-6 p-4 md:p-6">
      {/* Dominant Color Section */}
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

      {/* Color Grid - Fully Responsive */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[60vh] overflow-y-auto px-1">
        {palette.map((color, index) => (
          <ColorCard key={index} color={color} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <DownloadButton palette={palette} image={image} />
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all w-full sm:w-auto justify-center"
        >
          <Share2 size={18} />
          Share Palette
        </button>
      </div>

      {/* Share Popup */}
      {isShareOpen && (
        <SharePopup shareUrl={shareUrl} onClose={() => setIsShareOpen(false)} />
      )}
    </motion.div>
  );
}
