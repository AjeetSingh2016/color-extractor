"use client";

import { Search, X, Filter, ChevronDown } from "lucide-react";

export default function GradientFilters({
  searchTerm,
  setSearchTerm,
  typeFilter,
  setTypeFilter,
  colorScheme,
  setColorScheme,
  colorCount,
  setColorCount,
  isFilterOpen,
  setIsFilterOpen,
  clearFilters,
  hasActiveFilters,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        {/* Search Bar */}
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

        {/* Mobile Filter Toggle */}
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

        {/* Filters - Always visible on desktop, toggleable on mobile */}
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
  );
}