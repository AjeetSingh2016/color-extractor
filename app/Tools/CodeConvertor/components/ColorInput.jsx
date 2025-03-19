"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import convert from "color-convert";
import { HexColorPicker } from "react-colorful";
import { Download, Image as ImageIcon } from "lucide-react";
import { itemVariants } from "@/app/theme";

export default function ColorInput({
  inputColor,
  setInputColor,
  setConvertedColors,
  isDarkMode,
  convertedColors
}) {
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const downloadButtonRef = useRef(null);

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

  const downloadJSON = () => {
    const paletteData = {
      hex: convertedColors.hex,
      rgb: `rgb(${convertedColors.rgb.join(", ")})`,
      hsl: `hsl(${convertedColors.hsl.join(", ")}%)`,
      cmyk: `cmyk(${convertedColors.cmyk.join(", ")}%)`,
      lab: `lab(${convertedColors.lab.join(", ")})`,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(paletteData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "color-conversion.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowDownloadOptions(false);
  };

  const downloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 600, 400);

    ctx.fillStyle = convertedColors.hex;
    ctx.fillRect(50, 50, 500, 200);

    ctx.font = "bold 20px Arial";
    ctx.fillStyle = "#333333";
    ctx.textAlign = "center";
    const formats = [
      convertedColors.hex,
      `RGB: ${convertedColors.rgb.join(", ")}`,
      `HSL: ${convertedColors.hsl.join(", ")}%`,
      `CMYK: ${convertedColors.cmyk.join(", ")}%`,
      `LAB: ${convertedColors.lab.join(", ")}`,
    ];
    formats.forEach((text, index) => {
      ctx.fillText(text, 300, 280 + index * 25);
    });

    const link = document.createElement("a");
    link.download = "color-conversion.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setShowDownloadOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadButtonRef.current && !downloadButtonRef.current.contains(event.target)) {
        setShowDownloadOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      variants={itemVariants}
      className={`bg-white ${isDarkMode ? "bg-slate-800/80" : "bg-white"} p-6 rounded-xl shadow-xl w-full md:w-1/2 transition-all duration-300`}
    >
      {/* Input Section */}
      <div className="mb-6">
        <input
          type="text"
          value={inputColor}
          onChange={(e) => setInputColor(e.target.value)}
          placeholder="#FF5733 or rgb(255, 87, 51)"
          className={`w-full p-3 border-2 ${
            isDarkMode ? "border-gray-600 text-white" : "border-gray-200 text-gray-800"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white`}
        />
      </div>
      <div className="flex gap-4 mb-6">
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConvert}
          className={`${
            isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"
          } w-full py-3 rounded-lg transition-all duration-200 text-lg font-medium text-white`}
        >
          Convert
        </motion.button>
        <div ref={downloadButtonRef} className="relative">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
            className={`${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
            } p-3 rounded-lg transition-all duration-200`}
          >
            <Download className="w-6 h-6 text-white" />
          </motion.button>
          {showDownloadOptions && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={downloadImage}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ImageIcon className="h-4 w-4" />
                Image
              </button>
              <button
                onClick={downloadJSON}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Download className="h-4 w-4" />
                JSON
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="mb-6">
        <h2 className={`${isDarkMode ? "text-white" : "text-gray-800"} text-lg font-semibold mb-3`}>
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
        <h2 className={`${isDarkMode ? "text-white" : "text-gray-800"} text-lg font-semibold mb-3`}>
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
  );
}