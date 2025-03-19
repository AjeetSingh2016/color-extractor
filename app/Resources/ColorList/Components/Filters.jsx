"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Filters({
  filters,
  setFilters,
  filterOptions,
  clearFilters,
  setLoadedCount,
  theme,
  closeFilters,
}) {
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].includes(value)
        ? updated[category].filter((item) => item !== value)
        : [...updated[category], value];
      return updated;
    });
    setLoadedCount(500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`${theme.card} rounded-2xl shadow-lg p-6`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`${theme.headline} text-xl font-semibold`}>Filters</h2>
        {closeFilters ? (
          <button onClick={closeFilters} className={`${theme.primary} hover:underline`}>
            <X className="h-5 w-5" />
          </button>
        ) : (
          <button onClick={clearFilters} className={`${theme.primary} hover:underline`}>
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-6">
        {["hue", "lightness", "saturation"].map((category) => (
          <div key={category}>
            <h3 className={`${theme.headline} text-sm font-semibold mb-3 capitalize`}>{category}</h3>
            <div className="space-y-2">
              {filterOptions[`${category}_categories`].map((value) => (
                <motion.label
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-3 cursor-pointer"
                  key={value}
                >
                  <input
                    type="checkbox"
                    checked={filters[category].includes(value)}
                    onChange={() => toggleFilter(category, value)}
                    className="rounded-md h-4 w-4 text-indigo-600"
                  />
                  <span className={`${theme.paragraph} text-sm`}>{value}</span>
                </motion.label>
              ))}
            </div>
          </div>
        ))}
        {closeFilters && (
          <button onClick={clearFilters} className={`${theme.button} w-full py-2 rounded-lg mt-4`}>
            Clear All Filters
          </button>
        )}
      </div>
    </motion.div>
  );
}