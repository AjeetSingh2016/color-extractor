"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { itemVariants, cardVariants } from "@/app/theme";

export default function ColorResults({ convertedColors, isDarkMode }) {
  const colorFormats = [
    { label: "HEX", value: convertedColors.hex },
    { label: "RGB", value: `rgb(${convertedColors.rgb.join(", ")})` },
    { label: "HSL", value: `hsl(${convertedColors.hsl.join(", ")}%)` },
    { label: "CMYK", value: `cmyk(${convertedColors.cmyk.join(", ")}%)` },
    { label: "LAB", value: `lab(${convertedColors.lab.join(", ")})` },
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-white ${isDarkMode ? "bg-slate-800/80" : "bg-white"} p-6 rounded-xl shadow-xl w-full md:w-1/2 transition-all duration-300`}
    >
      <h2 className={`${isDarkMode ? "text-white" : "text-gray-800"} text-lg font-semibold mb-5`}>
        Conversion Results
      </h2>
      <div className="space-y-4">
        {colorFormats.map((format) => (
          <motion.div
            key={format.label}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className={`flex justify-between items-center p-4 rounded-xl ${
              isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"
            } border shadow-md`}
          >
            <div>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} text-sm font-medium`}>
                {format.label}
              </p>
              <p className={`${isDarkMode ? "text-white" : "text-gray-800"} text-base`}>
                {format.value}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy(format.value)}
              className={`${isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-500 hover:text-indigo-600"} transition-colors duration-200`}
            >
              <Copy className="w-6 h-6" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}