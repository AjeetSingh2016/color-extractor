"use client";

import { Search, Filter } from "lucide-react";

export default function PaletteFilters({
  search,
  setSearch,
  filters,
  setFilters,
  isFilterOpen,
  setIsFilterOpen,
}) {
  return (
    <>
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
            {/* Add usage filters if needed */}
          </div>
        </div>
      </div>
    </>
  );
}