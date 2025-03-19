"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GradientModal({ selectedGradient, setSelectedGradient, filteredGradients }) {
  const goToNextGradient = () => {
    const currentIndex = filteredGradients.findIndex((g) => g.name === selectedGradient.name);
    const nextIndex = (currentIndex + 1) % filteredGradients.length;
    setSelectedGradient(filteredGradients[nextIndex]);
  };

  const goToPreviousGradient = () => {
    const currentIndex = filteredGradients.findIndex((g) => g.name === selectedGradient.name);
    const prevIndex = (currentIndex - 1 + filteredGradients.length) % filteredGradients.length;
    setSelectedGradient(filteredGradients[prevIndex]);
  };

  return (
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
  );
}