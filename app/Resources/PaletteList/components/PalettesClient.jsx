"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PaletteCard from "./PaletteCard";
import PaletteFilters from "./PaletteFilters";
import { palettes } from "../data/palettes";

import { containerVariants, itemVariants } from "@/app/theme";

export default function PalettesClient() {
  const initialPalettes = palettes;
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "All", usage: "All" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();

  const filteredPalettes = initialPalettes.filter((palette) => {
    const matchesSearch =
      palette.name.toLowerCase().includes(search.toLowerCase()) ||
      palette.colors.some((color) => color.toLowerCase().includes(search.toLowerCase()));
    const matchesType = filters.type === "All" || palette.tags.includes(filters.type);
    const matchesUsage = filters.usage === "All" || palette.tags.includes(filters.usage);
    return matchesSearch && matchesType && matchesUsage;
  });

  useEffect(() => {
    const cards = document.querySelectorAll(".palette-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("opacity-100");
      }, index * 50);
    });
  }, [filteredPalettes]);

  return (
    <div className="min-h-screen bg-primary-background dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="text-center pb-8 px-6 max-w-7xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Color
            </span>{" "}
            <span className="text-gray-800 dark:text-gray-200">Palette Explorer</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Find the perfect color combination for your next project
          </motion.p>
        </motion.div>

        {/* Filters */}
        <PaletteFilters
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilters}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        {/* Results Summary */}
        {filters.type !== "All" || filters.usage !== "All" || search !== "" ? (
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
        ) : null}

        {/* Palette Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPalettes.length > 0 ? (
            filteredPalettes.map((palette) => (
              <div
                key={palette.id}
                className="palette-card opacity-0 transform hover:scale-105 transition-transform duration-200"
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