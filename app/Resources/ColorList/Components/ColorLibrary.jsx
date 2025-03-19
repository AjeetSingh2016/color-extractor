"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Moon, Sun } from "lucide-react";
import Filters from "./Filters";
import ColorCard from "./ColorCard";
import { theme } from "@/app/theme";
import "../style.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/colors";
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
    search: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    hue_categories: [],
    lightness_categories: [],
    saturation_categories: [],
  });

  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const observerRef = useRef(null);

  // Fetch colors on mount
  useEffect(() => {
    const fetchColors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch colors");
        const data = await response.json();

        setAllColors(data.colors);
        setFilterOptions({
          hue_categories: data.filters.hue_categories,
          lightness_categories: data.filters.lightness_categories,
          saturation_categories: data.filters.saturation_categories,
        });
        setColors(data.colors.slice(0, BATCH_SIZE));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < allColors.length) {
          setLoadedCount((prev) => Math.min(prev + BATCH_SIZE, allColors.length));
        }
      },
      { rootMargin: "200px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observerRef.current && observer.unobserve(observerRef.current);
  }, [loadedCount, allColors.length]);

  // Filtered colors
  const filteredColors = useMemo(() => {
    return allColors
      .filter((color) => {
        const matchesHue = filters.hue.length === 0 || filters.hue.includes(color.hue_category);
        const matchesLightness =
          filters.lightness.length === 0 || filters.lightness.includes(color.lightness_category);
        const matchesSaturation =
          filters.saturation.length === 0 || filters.saturation.includes(color.saturation_category);
        const matchesSearch =
          filters.search === "" ||
          color.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          color.hex.toLowerCase().includes(filters.search.toLowerCase());
        return matchesHue && matchesLightness && matchesSaturation && matchesSearch;
      })
      .slice(0, loadedCount);
  }, [allColors, filters, loadedCount]);

  const getGridColumns = () => {
    if (typeof window !== "undefined") {
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

  const clearFilters = () => {
    setFilters({ hue: [], lightness: [], saturation: [], search: "" });
    setLoadedCount(BATCH_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} font-sans`}>
      <motion.div className="fixed bottom-8 right-8 z-50" whileHover={{ scale: 1.1 }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${currentTheme.card} p-3 rounded-full shadow-lg`}
        >
          {isDarkMode ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-indigo-600" />}
        </button>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 pt-8 pb-20">
        {/* Mobile Filters */}
        <div className="lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className={`${currentTheme.card} flex-1 rounded-full shadow-sm px-4 py-2 flex items-center gap-2`}>
                <Search className={`h-5 w-5 ${currentTheme.muted}`} />
                <input
                  type="text"
                  placeholder="Search colors..."
                  className={`w-full bg-transparent outline-none ${currentTheme.paragraph}`}
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <motion.button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className={`${currentTheme.card} p-2 rounded-lg shadow-sm`}
              >
                <Filter className={`h-5 w-5 ${currentTheme.primary}`} />
              </motion.button>
            </div>
            <AnimatePresence>
              {isMobileFiltersOpen && (
                <Filters
                  filters={filters}
                  setFilters={setFilters}
                  filterOptions={filterOptions}
                  clearFilters={clearFilters}
                  setLoadedCount={setLoadedCount}
                  theme={currentTheme}
                  closeFilters={() => setIsMobileFiltersOpen(false)}
                />
              )}
            </AnimatePresence>
            <div className={`${currentTheme.muted} text-sm font-medium mb-4`}>
              {filteredColors.length} / {allColors.length} colors
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <Filters
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
              clearFilters={clearFilters}
              setLoadedCount={setLoadedCount}
              theme={currentTheme}
            />
          </div>

          <div className="flex-1">
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-4">
                <div className={`${currentTheme.card} flex-1 max-w-md rounded-full shadow-sm px-4 py-2 flex items-center gap-2`}>
                  <Search className={`h-5 w-5 ${currentTheme.muted}`} />
                  <input
                    type="text"
                    placeholder="Search colors..."
                    className={`w-full bg-transparent outline-none ${currentTheme.paragraph}`}
                    value={filters.search}
                    onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
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
                  <div
                    className={`h-6 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded w-1/4 mx-auto`}
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {Array(12)
                      .fill(0)
                      .map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-48 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-xl`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className={`${currentTheme.card} rounded-2xl p-8 shadow-lg text-center`}>
                <p className="text-red-500 font-medium">Error: {error}</p>
              </div>
            ) : (
              <>
                {filteredColors.length > 0 ? (
                  <div className="space-y-6">
                    {Array.from(
                      { length: Math.ceil(filteredColors.length / gridColumns) },
                      (_, rowIndex) => {
                        const startIdx = rowIndex * gridColumns;
                        const endIdx = Math.min(startIdx + gridColumns, filteredColors.length);
                        const rowColors = filteredColors.slice(startIdx, endIdx);

                        return (
                          <div
                            key={rowIndex}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                          >
                            {rowColors.map((color, idx) => (
                              <ColorCard key={color.hex + idx} color={color} theme={currentTheme} />
                            ))}
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <div className={`${currentTheme.card} rounded-2xl p-8 text-center shadow-lg mt-4`}>
                    <p className={`${currentTheme.paragraph} text-lg`}>No colors match your filters</p>
                  </div>
                )}
                <div ref={observerRef} className="h-1" />
                {loadedCount < allColors.length && (
                  <div className="py-8 flex justify-center">
                    <span className={`${currentTheme.paragraph} text-sm`}>Loading more colors...</span>
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