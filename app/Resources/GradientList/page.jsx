"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, X, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import GradientCard from "./components/GradientCard";
import { containerVariants, itemVariants } from "@/app/theme";
import { gradientsData } from "./data/gradientsData";

export default function GradientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [colorScheme, setColorScheme] = useState("all");
  const [colorCount, setColorCount] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(gradientsData.gradients.length);
  const [selectedGradient, setSelectedGradient] = useState(null);

  const filteredGradients = gradientsData.gradients.filter((gradient) => {
    const matchesSearch = gradient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || gradient.type === typeFilter;
    const matchesCount =
      colorCount === "all" ||
      (colorCount === "two-tone" ? gradient.colors.length === 2 : gradient.colors.length > 2);

    const matchesScheme =
      colorScheme === "all" ||
      (colorScheme === "warm"
        ? gradient.colors.some((c) => c.match(/#[C-F][0-9A-F]{5}/i))
        : colorScheme === "cool"
        ? gradient.colors.some((c) => c.match(/#[0-7][0-9A-F]{5}/i))
        : colorScheme === "pastel"
        ? gradient.colors.some((c) => c.match(/#[A-F][0-9A-F]{5}/i))
        : colorScheme === "neon"
        ? gradient.colors.some((c) => c.includes("ff") || c.includes("00"))
        : colorScheme === "monochrome"
        ? gradient.colors.every((c, _, arr) =>
            c.substring(1, 3) === arr[0].substring(1, 3) ||
            c.substring(3, 5) === arr[0].substring(3, 5) ||
            c.substring(5, 7) === arr[0].substring(5, 7)
          )
        : true);
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

  const goToNextGradient = () => {
    const currentIndex = filteredGradients.findIndex(g => g.name === selectedGradient.name);
    const nextIndex = (currentIndex + 1) % filteredGradients.length;
    setSelectedGradient(filteredGradients[nextIndex]);
  };

  const goToPreviousGradient = () => {
    const currentIndex = filteredGradients.findIndex(g => g.name === selectedGradient.name);
    const prevIndex = (currentIndex - 1 + filteredGradients.length) % filteredGradients.length;
    setSelectedGradient(filteredGradients[prevIndex]);
  };

  const handleGradientClick = (gradient) => {
    setSelectedGradient(gradient);
  };

  return (
    <div className="min-h-screen bg-primary-background">
      {/* Navigation */}
      <nav className="flex items-center p-6 sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-100">
        <a href="/" className="flex items-center gap-2 text-gray-800 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </a>
      </nav>

      {/* Header */}
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

      {/* Search and Filter Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search gradients by name..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="md:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700"
            >
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <ChevronDown size={18} className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <div className={`${isFilterOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 flex-1"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
              </select>
              <select
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 flex-1"
                value={colorScheme}
                onChange={(e) => setColorScheme(e.target.value)}
              >
                <option value="all">All Schemes</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="pastel">Pastel</option>
                <option value="neon">Neon</option>
                <option value="monochrome">Monochrome</option>
              </select>
              <select
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 flex-1"
                value={colorCount}
                onChange={(e) => setColorCount(e.target.value)}
              >
                <option value="all">All Colors</option>
                <option value="two-tone">Two-tone</option>
                <option value="multi-color">Multi-color</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results info and clear filters */}
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

      {/* Gradient Grid */}
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

      {/* Full-screen Gradient Modal */}
      <AnimatePresence>
        {selectedGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setSelectedGradient(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full"
                style={{
                  background: selectedGradient.css.match(/linear-gradient\([^)]*\)/)?.[0] || selectedGradient.css,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
                  onClick={goToPreviousGradient}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
                  onClick={goToNextGradient}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
                onClick={() => setSelectedGradient(null)}
              >
                <X size={20} />
              </motion.button>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl font-bold">{selectedGradient.name}</h2>
                <p className="text-sm">{selectedGradient.type} Gradient</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>Browse, search and use beautiful gradients for your next design project</p>
        </div>
      </footer>
    </div>
  );
}