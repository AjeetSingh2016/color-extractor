"use client";

import { motion } from "framer-motion";
import { Download, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaletteCard({ palette }) {
  const router = useRouter();

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
  
    // Remove "#" from each color and join with "-"
    const colorString = palette.colors.map((color) => color.replace("#", "")).join("-");
    
    // Get the first tag, default to empty string if no tags exist
    const firstTag = palette.tags?.[0] || "";
    
    // Combine color string and first tag with "_" delimiter
    const fullString = firstTag ? `${colorString}_${firstTag}` : colorString;
  
    router.push(`/Resources/PaletteList/${fullString}`);
   
  };

console.log(palette.tags)
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
            onClick={handleRedirect} // ✅ Cleaned-up syntax
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
      <div className="p-1 flex justify-between gap-2">
        <button className="p-2 text-primary-button-text rounded cursor-pointer">
          <Download size={16} />
        </button>
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
