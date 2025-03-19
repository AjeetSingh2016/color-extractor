"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ColorInput from "./ColorInput";
import ColorResults from "./ColorResults";
import { itemVariants, containerVariants } from "@/app/theme";

export default function ColorConverterClient() {
  const [inputColor, setInputColor] = useState("#FF5733");
  const [convertedColors, setConvertedColors] = useState({
    hex: "#FF5733",
    rgb: [255, 87, 51],
    hsl: [14, 100, 60],
    cmyk: [0, 66, 80, 0],
    lab: [60, 62, 55],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      } flex flex-col items-center justify-center p-4 pt-10 `}
    >
      {/* Title and Description */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="text-center md:text-left lg:text-left mb-10 w-full max-w-6xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-4xl lg:text-4xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          } tracking-tight`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Color{" "}
          </span>
          Code Converter
        </motion.h1>
        <motion.p
          variants={itemVariants}
          transition={{ delay: 0.1 }}
          className={`text-lg md:text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } w-full max-w-6xl mx-auto leading-relaxed text-center md:text-left lg:text-left`}
        >
          Convert between HEX, RGB, HSL, CMYK, and LAB color formats instantly.
        </motion.p>
      </motion.div>

      {/* Two side-by-side containers */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8"
      >
        <ColorInput
          inputColor={inputColor}
          setInputColor={setInputColor}
          setConvertedColors={setConvertedColors}
          isDarkMode={isDarkMode}
          convertedColors={convertedColors}
        />
        <ColorResults
          convertedColors={convertedColors}
          isDarkMode={isDarkMode}
        />
      </motion.div>
    </div>
  );
}