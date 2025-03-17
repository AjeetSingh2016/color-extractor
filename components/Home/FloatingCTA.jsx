"use client";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function FloatingCTA({ currentTheme }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 md:hidden"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className={`rounded-full px-6 py-3 ${currentTheme.button} shadow-lg flex items-center space-x-2`}
      >
        <span>Get Started</span>
        <Rocket className="h-4 w-4" />
      </button>
    </motion.div>
  );
}