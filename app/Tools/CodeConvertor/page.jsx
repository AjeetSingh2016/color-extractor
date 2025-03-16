"use client";
// components/ColorConverter.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import convert from "color-convert";
import { Copy } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import {
  theme,
  containerVariants,
  itemVariants,
  cardVariants,
} from "../../theme"; // Importing theme and variants

const ColorConverter = () => {
  const [inputColor, setInputColor] = useState("#FF5733");
  const [convertedColors, setConvertedColors] = useState({
    hex: "#FF5733",
    rgb: [255, 87, 51],
    hsl: [14, 100, 60],
    cmyk: [0, 66, 80, 0],
    lab: [60, 62, 55],
  });
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme switching

  const handleConvert = () => {
    try {
      let hex = inputColor;
      if (inputColor.startsWith("rgb")) {
        const rgbMatch = inputColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          const rgb = [
            parseInt(rgbMatch[1]),
            parseInt(rgbMatch[2]),
            parseInt(rgbMatch[3]),
          ];
          hex = "#" + convert.rgb.hex(rgb);
        }
      }
      const rgb = convert.hex.rgb(hex);
      const hsl = convert.hex.hsl(hex);
      const cmyk = convert.hex.cmyk(hex);
      const lab = convert.hex.lab(hex);

      const newColors = {
        hex: hex.toUpperCase(),
        rgb,
        hsl,
        cmyk,
        lab,
      };
      setConvertedColors(newColors);
    } catch (error) {
      console.error("Invalid color format:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  const colorFormats = [
    { label: "HEX", value: convertedColors.hex },
    { label: "RGB", value: `rgb(${convertedColors.rgb.join(", ")})` },
    { label: "HSL", value: `hsl(${convertedColors.hsl.join(", ")}%)` },
    { label: "CMYK", value: `cmyk(${convertedColors.cmyk.join(", ")}%)` },
    { label: "LAB", value: `lab(${convertedColors.lab.join(", ")})` },
  ];

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div
      className={`min-h-screen ${currentTheme.background} flex flex-col items-center justify-center p-4 pt-24 md:pt-28 lg:pt-25 `}
    >
      {/* Title and Description */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="text-center md:text-left lg:text-left  mb-10 w-full max-w-6xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-4xl lg:text-4xl font-bold mb-4 ${currentTheme.headline} tracking-tight`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Color{" "}
          </span>
          Code Converter
        </motion.h1>
        <motion.p
          variants={itemVariants}
          transition={{ delay: 0.1 }}
          className={`text-lg md:text-lg ${currentTheme.paragraph} w-full max-w-6xl mx-auto leading-relaxed text-center md:text-left lg:text-left`}
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
        {/* Left Container: Input and Preview */}
        <motion.div
          variants={itemVariants}
          className={`bg-white ${currentTheme.card} p-6 rounded-xl shadow-xl w-full md:w-1/2 transition-all duration-300`}
        >
          {/* Input Section */}
          <div className="mb-6">
            <input
              type="text"
              value={inputColor}
              onChange={(e) => setInputColor(e.target.value)}
              placeholder="#FF5733 or rgb(255, 87, 51)"
              className={`w-full p-3 border-2 ${
                currentTheme.card === "bg-white"
                  ? "border-gray-200"
                  : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white ${currentTheme.card === "bg-slate-800/80" ? "text-white" : "text-gray-800"}`}
            />
          </div>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConvert}
            className={`${currentTheme.button} w-full py-3 rounded-lg transition-all duration-200 mb-6 text-lg font-medium`}
          >
            Convert
          </motion.button>

          {/* Live Preview */}
          <div className="mb-6">
            <h2 className={`${currentTheme.headline} text-lg font-semibold mb-3`}>
              Live Preview
            </h2>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="h-32 w-full rounded-xl border-2 border-gray-200 overflow-hidden"
              style={{ backgroundColor: convertedColors.hex }}
            />
          </div>

          {/* Color Picker */}
          <div className="mb-6">
            <h2 className={`${currentTheme.headline} text-lg font-semibold mb-3`}>
              Pick a Color
            </h2>
            <div className="w-full max-w-lg">
              <HexColorPicker
                color={inputColor}
                onChange={setInputColor}
                style={{ width: "100%", borderRadius: "0.75rem", overflow: "hidden" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right Container: Conversion Results */}
        <motion.div
          variants={itemVariants}
          className={`bg-white ${currentTheme.card} p-6 rounded-xl shadow-xl w-full md:w-1/2 transition-all duration-300`}
        >
          <h2 className={`${currentTheme.headline} text-lg font-semibold mb-5`}>
            Conversion Results
          </h2>
          <div className="space-y-4">
            {colorFormats.map((format, index) => (
              <motion.div
                key={format.label}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                className={`flex justify-between items-center p-4 rounded-xl ${
                  currentTheme.card === "bg-white" ? "bg-gray-50" : "bg-gray-700"
                } border border-gray-100 ${currentTheme.card === "bg-slate-800/80" ? "border-gray-600" : ""} shadow-md`}
              >
                <div>
                  <p className={`${currentTheme.paragraph} text-sm font-medium`}>
                    {format.label}
                  </p>
                  <p className={`${currentTheme.headline} text-base`}>{format.value}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCopy(format.value)}
                  className={`${currentTheme.primary} hover:${currentTheme.secondary} transition-colors duration-200`}
                >
                  <Copy className="w-6 h-6" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ColorConverter;