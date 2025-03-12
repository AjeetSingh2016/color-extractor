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
      className="rounded-lg overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="h-32"
        style={{ backgroundColor: color.hex }}
      />
      <div className="p-2 bg-white dark:bg-gray-800">
        <button
          onClick={() => copyToClipboard(color.hex, "hex")}
          className="w-full text-sm text-gray-700 dark:text-gray-300"
        >
          {copied === "hex" ? "Copied!" : color.hex}
        </button>
        <button
          onClick={() => copyToClipboard(color.rgb, "rgb")}
          className="w-full text-sm text-gray-700 dark:text-gray-300"
        >
          {copied === "rgb" ? "Copied!" : color.rgb}
        </button>
        <button
          onClick={() => copyToClipboard(color.hsl, "hsl")}
          className="w-full text-sm text-gray-700 dark:text-gray-300"
        >
          {copied === "hsl" ? "Copied!" : color.hsl}
        </button>
      </div>
    </motion.div>
  );
}