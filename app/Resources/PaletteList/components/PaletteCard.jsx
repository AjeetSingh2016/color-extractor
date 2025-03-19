"use client";

import { motion } from "framer-motion";
import { Download, Share2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function PaletteCard({ palette }) {
  const router = useRouter();
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const downloadButtonRef = useRef(null);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  const handleShare = () => {
    if (!palette?.colors?.length) return;
    const colorString = palette.colors.map((color) => color.replace("#", "")).join("-");
    const shareUrl = `${window.location.origin}/Resources/PaletteList/${colorString}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this color palette!",
          url: shareUrl,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Web Share API not supported. URL: " + shareUrl);
    }
  };

  const handleRedirect = () => {
    if (!palette?.colors?.length) return;
    const colorString = palette.colors.map((color) => color.replace("#", "")).join("-");
    const firstTag = palette.tags?.[0] || "";
    const fullString = firstTag ? `${colorString}_${firstTag}` : colorString;
    router.push(`/Resources/PaletteList/${fullString}`);
  };

  const getRGBFromHex = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const downloadJSON = () => {
    const paletteData = palette.colors.map((color) => ({
      hex: color,
      rgb: getRGBFromHex(color),
      name: require("hex-color-to-color-name").GetColorName(color.replace("#", "")),
    }));
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(paletteData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${palette.name}-palette.json`);
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

    const blockWidth = 1200 / palette.colors.length;
    palette.colors.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * blockWidth, 0, blockWidth, 400);
    });

    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#333333";
    ctx.textAlign = "center";
    palette.colors.forEach((color, index) => {
      const x = index * blockWidth + blockWidth / 2;
      const rgb = getRGBFromHex(color);
      const name = require("hex-color-to-color-name").GetColorName(color.replace("#", ""));
      ctx.fillText(color.toUpperCase(), x, 450);
      ctx.fillText(rgb, x, 500);
      ctx.fillText(name, x, 550);
    });

    const link = document.createElement("a");
    link.download = `${palette.name}-palette.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setShowDownloadOptions(false);
  };

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
    <motion.div
      className="bg-primary-main rounded-lg shadow-md overflow-hidden w-full max-w-[300px] mx-auto"
      whileHover={{ scale: 1.05, borderColor: "primary-highlight" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col h-[180px] sm:h-[200px] md:h-[220px]">
        {palette?.colors?.map((color) => (
          <div
            key={color}
            className="relative flex-1 cursor-pointer group"
            style={{ backgroundColor: color }}
            onClick={handleRedirect}
          >
            <motion.span
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-headline text-sm font-semibold bg-primary-background p-1 rounded opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy(color);
              }}
            >
              {color}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="p-1 flex justify-between gap-2 relative">
        <div ref={downloadButtonRef} className="relative">
          <button
            className="p-2 text-primary-button-text rounded cursor-pointer"
            onClick={() => setShowDownloadOptions(!showDownloadOptions)}
          >
            <Download size={16} />
          </button>
          {showDownloadOptions && (
            <div className="absolute bottom-full left-0 mb-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
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
          className="p-2 text-primary-button-text cursor-pointer"
          onClick={handleShare}
        >
          <Share2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}