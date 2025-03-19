"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import GradientCard from "./GradientCard";
import GradientFilters from "./GradientFilters";
import GradientModal from "./GradientModal";
import { containerVariants, itemVariants } from "@/app/theme";
import { gradientsData } from "../data/gradientsData";
import { X } from "lucide-react";

// Helper function to convert HEX to HSL
const hexToHSL = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 }; // Return in degrees and percentages
};

export default function GradientsClient() {
  const initialGradients = gradientsData.gradients;
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [colorScheme, setColorScheme] = useState("all");
  const [colorCount, setColorCount] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(initialGradients.length);
  const [selectedGradient, setSelectedGradient] = useState(null);

  const filteredGradients = initialGradients.filter((gradient) => {
    const matchesSearch = gradient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || gradient.type === typeFilter;
    const matchesCount =
      colorCount === "all" ||
      (colorCount === "two-tone" ? gradient.colors.length === 2 : gradient.colors.length > 2);

    const matchesScheme =
      colorScheme === "all" ||
      gradient.colors.some((color) => {
        const { h, s, l } = hexToHSL(color);
        if (colorScheme === "warm") return (h >= 0 && h <= 90) || (h >= 270 && h <= 360); // Reds, oranges, yellows
        if (colorScheme === "cool") return h >= 180 && h <= 270; // Blues, cyans
        if (colorScheme === "pastel") return s <= 50 && l >= 50; // Low saturation, high lightness
        if (colorScheme === "neon") return s >= 80 && (l >= 40 && l <= 60); // High saturation, medium lightness
        return false; // Default case (excluding monochrome for now)
      }) ||
      (colorScheme === "monochrome" &&
        gradient.colors.every((c) => {
          const { h } = hexToHSL(c);
          const baseHue = hexToHSL(gradient.colors[0]).h;
          return Math.abs(h - baseHue) <= 20 || Math.abs(h - baseHue - 360) <= 20; // Allow hue variation
        }));

    return matchesSearch && matchesType && matchesCount && matchesScheme;
  });

  useEffect(() => {
    setResultsCount(filteredGradients.length);
  }, [filteredGradients]);

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setColorScheme("all");
    setColorCount("all");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    typeFilter !== "all" ||
    colorScheme !== "all" ||
    colorCount !== "all";

  const handleGradientClick = (gradient) => setSelectedGradient(gradient);

  return (
    <div className="min-h-screen bg-primary-background">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="text-center pt-12 pb-8 px-6 max-w-7xl mx-auto"
      >
        <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Gradient
          </span>{" "}
          <span className="text-gray-800">Collection</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Explore stunning pre-made gradient combinations for your next design project
        </motion.p>
      </motion.div>

      <GradientFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        colorCount={colorCount}
        setColorCount={setColorCount}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 mb-3 sm:mb-0">
          Showing <span className="font-medium text-gray-900">{resultsCount}</span> gradients
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            <X size={16} />
            Clear filters
          </button>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        {filteredGradients.length > 0 ? (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            <AnimatePresence>
              {filteredGradients.map((gradient) => (
                <motion.div
                  key={gradient.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  layout
                  className="transition-all duration-300"
                >
                  <GradientCard gradient={gradient} onGradientClick={handleGradientClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-flex rounded-full p-3 mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No gradients found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <GradientModal
        selectedGradient={selectedGradient}
        setSelectedGradient={setSelectedGradient}
        filteredGradients={filteredGradients}
      />

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>Browse, search and use beautiful gradients for your next design project</p>
        </div>
      </footer>
    </div>
  );
}