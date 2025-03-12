"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ColorCard({ color }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden shadow-md transition-all duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {/* Color Preview */}
      <div
        className="h-36 md:h-32"
        style={{ backgroundColor: color.hex }}
      />

      {/* Color Details */}
      <div className="p-3 bg-white dark:bg-gray-800 space-y-1 text-center">
        <button
          onClick={() => copyToClipboard(color.hex, "hex")}
          className={`w-full text-xs font-medium py-1 rounded-md transition-all ${
            copied === "hex"
              ? "bg-green-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {copied === "hex" ? "Copied!" : color.hex}
        </button>
        <button
          onClick={() => copyToClipboard(color.rgb, "rgb")}
          className={`w-full text-xs font-medium py-1 rounded-md transition-all ${
            copied === "rgb"
              ? "bg-green-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {copied === "rgb" ? "Copied!" : color.rgb}
        </button>
        <button
          onClick={() => copyToClipboard(color.hsl, "hsl")}
          className={`w-full text-xs font-medium py-1 rounded-md transition-all ${
            copied === "hsl"
              ? "bg-green-500 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {copied === "hsl" ? "Copied!" : color.hsl}
        </button>
      </div>
    </motion.div>
  );
}
