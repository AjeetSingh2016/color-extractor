"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { palettes } from "./data/palettes";
import PaletteCard from "./components/PaletteCard";
import { Search, Filter } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "All", usage: "All" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();

  const filteredPalettes = palettes.filter((palette) => {
    const matchesSearch =
      palette.name.toLowerCase().includes(search.toLowerCase()) ||
      palette.colors.some((color) =>
        color.toLowerCase().includes(search.toLowerCase())
      );
    const matchesType =
      filters.type === "All" || palette.tags.includes(filters.type);
    const matchesUsage =
      filters.usage === "All" || palette.tags.includes(filters.usage);
    return matchesSearch && matchesType && matchesUsage;
  });

  const handleRedirect = (colors) => {
    const colorString = colors.map((color) => color.replace("#", "")).join("-");
    router.push(`/Resources/PaletteList/${colorString}`);
  };

  useEffect(() => {
    // Add smooth fade-in effect for palette cards
    const cards = document.querySelectorAll(".palette-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("opacity-100");
      }, index * 50);
    });
  }, [filteredPalettes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="py-8"></div>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Color Palette Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find the perfect color combination for your next project
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or HEX code..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                      shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 px-4 flex items-center bg-blue-500 hover:bg-blue-600 
                      text-white rounded-r-lg transition-colors duration-200"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        <div
          className={`mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
            isFilterOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
              Filter Palettes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Palette Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Vibrant",
                    "Neon",
                    "Cool",
                    "Pastel",
                    "Dark",
                    "Monochrome",
                  ].map((type) => (
                    <button
                      key={type}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.type === type
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      } transition-colors duration-200`}
                      onClick={() => setFilters({ ...filters, type })}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => {
              setSearch("");
              setFilters({ type: "All", usage: "All" });
            }}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>

        {/* Palette Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPalettes.length > 0 ? (
            filteredPalettes.map((palette) => (
              <div
                key={palette.id}
                className="palette-card opacity-0 transform hover:scale-105 transition-transform duration-200"
              >
                <PaletteCard palette={palette} onRedirect={handleRedirect} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                😕
              </div>
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
