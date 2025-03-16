"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Filter, X, ChevronLeft, Moon, Sun, Search, Share2, Check } from 'lucide-react';
import Link from 'next/link';
import "./style.css"


// Theme configuration
const theme = {
  light: {
    background: 'bg-gray-50',
    header: 'bg-white/95',
    card: 'bg-white',
    border: 'border-gray-200',
    headline: 'text-gray-900',
    paragraph: 'text-gray-600',
    primary: 'text-indigo-600',
    muted: 'text-gray-400',
    button: 'bg-indigo-600 text-white hover:bg-indigo-700'
  },
  dark: {
    background: 'bg-gray-900',
    header: 'bg-gray-900/95',
    card: 'bg-gray-800',
    border: 'border-gray-700',
    headline: 'text-white',
    paragraph: 'text-gray-300',
    primary: 'text-indigo-400',
    muted: 'text-gray-500',
    button: 'bg-indigo-500 text-white hover:bg-indigo-600'
  }
};

// Constants
// const API_URL = "https://ncert-epub.s3.us-east-1.amazonaws.com/test/colors.json";

const API_URL = "/api/colors";

const BATCH_SIZE = 500;

export default function ColorLibrary() {
  const [colors, setColors] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [loadedCount, setLoadedCount] = useState(BATCH_SIZE);
  const [filters, setFilters] = useState({
    hue: [],
    lightness: [],
    saturation: [],
    search: ""
  });
  const [filterOptions, setFilterOptions] = useState({
    hue_categories: [],
    lightness_categories: [],
    saturation_categories: []
  });

  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch colors');
        const data = await response.json();
        
        setAllColors(data.colors);
        setFilterOptions({
          hue_categories: data.filters.hue_categories,
          lightness_categories: data.filters.lightness_categories,
          saturation_categories: data.filters.saturation_categories
        });
        
        setColors(data.colors.slice(0, BATCH_SIZE));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);

  const filteredColors = useMemo(() => {
    return allColors.filter(color => {
      const matchesHue = filters.hue.length === 0 || filters.hue.includes(color.hue_category);
      const matchesLightness = filters.lightness.length === 0 || filters.lightness.includes(color.lightness_category);
      const matchesSaturation = filters.saturation.length === 0 || filters.saturation.includes(color.saturation_category);
      const matchesSearch = filters.search === "" || 
                           color.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           color.hex.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesHue && matchesLightness && matchesSaturation && matchesSearch;
    }).slice(0, loadedCount);
  }, [allColors, filters, loadedCount]);

  const getGridColumns = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 2;
      if (width < 768) return 3;
      if (width < 1024) return 4;
      if (width < 1280) return 5;
      return 6;
    }
    return 4;
  };

  const [gridColumns, setGridColumns] = useState(getGridColumns());

  // useEffect(() => {
  //   const handleResize = () => setGridColumns(getGridColumns());
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < allColors.length) {
          setLoadedCount(prev => Math.min(prev + BATCH_SIZE, allColors.length));
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadedCount, allColors.length]);

  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].includes(value) 
        ? updated[category].filter(item => item !== value) 
        : [...updated[category], value];
      return updated;
    });
    setLoadedCount(BATCH_SIZE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ hue: [], lightness: [], saturation: [], search: "" });
    setLoadedCount(BATCH_SIZE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div className={`min-h-screen ${currentTheme.background} transition-colors duration-300 font-sans`}>
      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${currentTheme.card} p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-indigo-600" />}
        </button>
      </motion.div>

      <header className={`${currentTheme.header} backdrop-blur-md sticky top-0 z-40 py-8 px-6 border-b ${currentTheme.border}`}>
        
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 pt-8 pb-20">
        {/* Mobile Filter and Search Section (<1024px) */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className={`${currentTheme.card} flex-1 rounded-full shadow-sm px-4 py-2 flex items-center gap-2`}>
                <Search className={`h-5 w-5 ${currentTheme.muted}`} />
                <input 
                  type="text"
                  placeholder="Search colors by name or hex..." 
                  className={`w-full bg-transparent outline-none ${currentTheme.paragraph}`}
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className={`${currentTheme.card} p-2 rounded-lg shadow-sm border ${currentTheme.border}`}
              >
                <Filter className={`h-5 w-5 ${currentTheme.primary}`} />
              </motion.button>
            </div>

            <AnimatePresence>
              {isMobileFiltersOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className={`${currentTheme.card} rounded-2xl shadow-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`${currentTheme.headline} text-xl font-semibold`}>Filters</h2>
                    <button 
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className={`${currentTheme.primary} hover:underline`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="space-y-6">
                    {['hue', 'lightness', 'saturation'].map(category => (
                      <div key={category}>
                        <h3 className={`${currentTheme.headline} text-sm font-semibold mb-3 capitalize`}>{category}</h3>
                        <div className="space-y-2">
                          {filterOptions[`${category}_categories`].map(value => (
                            <motion.label whileHover={{ x: 2 }} className="flex items-center gap-3 cursor-pointer" key={value}>
                              <input
                                type="checkbox"
                                checked={filters[category].includes(value)}
                                onChange={() => toggleFilter(category, value)}
                                className="rounded-md h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                              />
                              <span className={`${currentTheme.paragraph} text-sm`}>{value}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={clearFilters}
                      className={`${currentTheme.button} w-full py-2 rounded-lg mt-4`}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`${currentTheme.muted} text-sm font-medium mb-4`}>
              {filteredColors.length} / {allColors.length} colors
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar Filters (>=1024px) */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <AnimatePresence>
              <motion.aside 
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="sticky top-24"
              >
                <div className={`${currentTheme.card} rounded-2xl shadow-lg p-6 h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`${currentTheme.headline} text-xl font-semibold`}>Filters</h2>
                    <button 
                      onClick={clearFilters}
                      className={`${currentTheme.primary} hover:underline`}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-6">
                    {['hue', 'lightness', 'saturation'].map(category => (
                      <div key={category}>
                        <h3 className={`${currentTheme.headline} text-sm font-semibold mb-3 capitalize`}>{category}</h3>
                        <div className="space-y-2">
                          {filterOptions[`${category}_categories`].map(value => (
                            <motion.label whileHover={{ x: 2 }} className="flex items-center gap-3 cursor-pointer" key={value}>
                              <input
                                type="checkbox"
                                checked={filters[category].includes(value)}
                                onChange={() => toggleFilter(category, value)}
                                className="rounded-md h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                              />
                              <span className={`${currentTheme.paragraph} text-sm`}>{value}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </AnimatePresence>
          </div>

          {/* Color Grid Section */}
          <div className="flex-1">
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-4">
                <div className={`${currentTheme.card} flex-1 max-w-md rounded-full shadow-sm px-4 py-2 flex items-center gap-2`}>
                  <Search className={`h-5 w-5 ${currentTheme.muted}`} />
                  <input 
                    type="text"
                    placeholder="Search colors by name or hex..." 
                    className={`w-full bg-transparent outline-none ${currentTheme.paragraph}`}
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <div className={`${currentTheme.muted} text-sm font-medium`}>
                  {filteredColors.length} / {allColors.length} colors
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className={`${currentTheme.card} rounded-2xl p-8 shadow-lg`}>
                <div className="animate-pulse space-y-6">
                  <div className={`h-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mx-auto`}></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {Array(12).fill(0).map((_, idx) => (
                      <div key={idx} className={`h-48 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className={`${currentTheme.card} rounded-2xl p-8 shadow-lg text-center ${currentTheme.paragraph}`}>
                <p className="text-red-500 font-medium">Error: {error}</p>
                <p className="mt-2">Please try refreshing the page</p>
              </div>
            ) : (
              <>
                {filteredColors.length > 0 ? (
                  <div className="space-y-6">
                    {Array.from({ length: Math.ceil(filteredColors.length / gridColumns) }, (_, rowIndex) => {
                      const startIdx = rowIndex * gridColumns;
                      const endIdx = Math.min(startIdx + gridColumns, filteredColors.length);
                      const rowColors = filteredColors.slice(startIdx, endIdx);

                      return (
                        <div key={rowIndex} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                          {rowColors.map((color, idx) => (
                            <ColorCard 
                              key={color.hex + idx}
                              color={color} 
                              copyToClipboard={copyToClipboard} 
                              theme={currentTheme}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={`${currentTheme.card} rounded-2xl p-8 text-center shadow-lg mt-4`}>
                    <p className={`${currentTheme.paragraph} text-lg`}>No colors match your filters</p>
                    <p className={`${currentTheme.muted} mt-2`}>Try adjusting your criteria</p>
                  </div>
                )}

                <div ref={observerRef} className="h-1" />
                {filteredColors.length > 0 && loadedCount < allColors.length && (
                  <div className="py-8 flex justify-center">
                    <div className={`${currentTheme.paragraph} text-sm flex items-center space-x-2`}>
                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-indigo-500 animate-spin"></div>
                      <span>Loading more colors...</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
const ColorCard = ({ color, copyToClipboard }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (value) => {
    copyToClipboard(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getContrastColor = (hexColor) => {
    if (!hexColor.startsWith("#")) return "#FFFFFF";
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? "#000000" : "#FFFFFF";
  };

  const textColor = getContrastColor(color.hex);

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: color.name,
        text: `Check out this color: ${color.name} - ${color.hex}`,
        url: window.location.href,
      }).catch((err) => console.error("Share failed:", err));
    } else {
      // Fallback: Copy to clipboard
      handleCopy(`${color.name} - ${color.hex}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full h-40 rounded-xl overflow-hidden shadow-md"
    >
      {/* Color Background */}
      <div
        className="relative flex-grow h-full cursor-pointer group"
        style={{ backgroundColor: color.hex }}
        onClick={() => handleCopy(color.hex)}
      >
        {/* Hex Code (Shows on Hover) */}
        <motion.span
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-lg font-bold px-3 py-1 rounded-lg bg-black/30 backdrop-blur-sm"
          style={{ color: textColor }}
        >
          {color.hex}
        </motion.span>
      </div>

      {/* Bottom Bar (Name + Share Button) */}
      <div className="absolute bottom-0 w-full bg-white px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-semibold truncate">{color.name}</span>

        {/* <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-gray-200 shadow-sm"
          onClick={handleShare}
          aria-label="Share color"
        >
          <Share2 className="h-4 w-4 text-gray-700" />
        </motion.button> */}
      </div>

      {/* Copy Success Notification */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-white font-medium px-4 py-2 bg-gray-900/80 rounded-full">
            <Check className="h-4 w-4" />
            <span>Copied!</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
