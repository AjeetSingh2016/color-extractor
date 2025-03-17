"use client";

import { useParams, useRouter } from "next/navigation";
import { Download, Share2, Copy, Check, Image as ImageIcon } from "lucide-react";
import { GetColorName } from "hex-color-to-color-name";
import { useState, useEffect, useRef } from "react";
import { palettes } from "../data/palettes";
import PaletteCard from "../components/PaletteCard"; // Assuming PaletteCard is a component

export default function PalettePage() {
  const params = useParams();
  const { hex } = params; // e.g., "FF5733-FF8D1A-FFC300-DAF7A6_warm"
  const router = useRouter();
  const [copiedStates, setCopiedStates] = useState({});
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const downloadButtonRef = useRef(null);

  // Split hex into color string and tag
  const [colorString, tag] = hex.split("_");
  const hexCodes = colorString.split("-").map((code) => `#${code}`);

  // Initialize filters with tag from URL
  const [filters, setFilters] = useState({ type: tag || "All", usage: "All" });

  const getRGBFromHex = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => setCopiedStates({ ...copiedStates, [id]: false }), 2000);
  };

  const downloadJSON = () => {
    const paletteData = hexCodes.map((color) => ({
      hex: color,
      rgb: getRGBFromHex(color),
      name: GetColorName(color.replace("#", "")),
    }));
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(paletteData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "color-palette.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowDownloadOptions(false);
  };

  const downloadImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 600);

    const blockWidth = 1200 / hexCodes.length;
    hexCodes.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * blockWidth, 0, blockWidth, 400);
    });

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#333333";
    ctx.textAlign = "center";
    hexCodes.forEach((color, index) => {
      const x = index * blockWidth + blockWidth / 2;
      const rgb = getRGBFromHex(color);
      const name = GetColorName(color.replace("#", ""));
      ctx.fillText(color.toUpperCase(), x, 450);
      ctx.fillText(rgb, x, 500);
      ctx.fillText(name, x, 550);
    });

    const link = document.createElement("a");
    link.download = "color-palette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setShowDownloadOptions(false);
  };

  const sharePalette = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: "Color Palette",
          text: "Check out this awesome color palette!",
          url: url,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(url);
      setCopiedStates({ ...copiedStates, shareUrl: true });
      setTimeout(() => setCopiedStates({ ...copiedStates, shareUrl: false }), 2000);
    }
  };

  // Filter palettes based on tag from URL
  const filteredPalettes = palettes.filter((palette) => {
    const matchesTag =
      filters.type === "All" || palette.tags.includes(filters.type);
    const matchesUsage =
      filters.usage === "All" || palette.tags.includes(filters.usage);
    return matchesTag && matchesUsage;
  });

  // Close dropdown when clicking outside
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-25">
      {/* Main Palette Display */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[550px] mb-8">
        <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6 rounded-lg overflow-hidden">
          {hexCodes.map((color, index) => (
            <div
              key={index}
              className="aspect-square transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex justify-between mb-4 sm:mb-6 gap-2 sm:gap-3 relative">
          <div ref={downloadButtonRef} className="relative">
            <button
              onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 bg-transparent border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base font-medium"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Download</span>
            </button>
            {showDownloadOptions && (
              <div className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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

          <button
            onClick={sharePalette}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 bg-transparent border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base font-medium"
          >
            {copiedStates["shareUrl"] ? (
              <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            ) : (
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
            <span>{copiedStates["shareUrl"] ? "Copied" : "Share"}</span>
          </button>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {hexCodes.map((color, index) => {
            const rgb = getRGBFromHex(color);
            const colorName = GetColorName(color.replace("#", ""));
            const hexId = `hex-${index}`;
            const rgbId = `rgb-${index}`;

            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <div>
                    <p className="text-gray-800 font-medium text-sm sm:text-base truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
                      {colorName}
                    </p>
                    <div className="flex items-center gap-1">
                      <p
                        className="text-gray-600 text-xs sm:text-sm cursor-pointer hover:text-blue-500"
                        onClick={() => copyToClipboard(color.toUpperCase(), hexId)}
                      >
                        {color.toUpperCase()}
                      </p>
                      {copiedStates[hexId] && (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className="text-gray-500 text-xs sm:text-sm cursor-pointer hover:text-blue-500"
                    onClick={() => copyToClipboard(rgb, rgbId)}
                  >
                    {rgb}
                  </span>
                  {copiedStates[rgbId] ? (
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  ) : (
                    <Copy
                      className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hover:text-blue-500 cursor-pointer"
                      onClick={() => copyToClipboard(rgb, rgbId)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtered Palette Cards */}
      <div className="w-full max-w-7xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          More Similor Palettes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPalettes.length > 0 ? (
            filteredPalettes.map((palette) => (
              <div
                key={palette.id}
                className="palette-card opacity-0 transform hover:scale-105 transition-transform duration-200 animate-fadeIn"
              >
                <PaletteCard palette={palette} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">😕</div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No palettes found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Optional CSS for fade-in animation
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

// Add styles to document head (if not using a CSS-in-JS solution)
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}