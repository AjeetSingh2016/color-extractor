"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { theme } from "@/app/theme";

export default function AnimatedTrainColors({ isDarkMode = false }) {
  const currentTheme = isDarkMode ? theme.dark : theme.light;
  const gradientClasses = [
    'bg-gradient-to-r from-indigo-500 to-blue-500',
    'bg-gradient-to-r from-emerald-500 to-teal-500',
    'bg-gradient-to-r from-fuchsia-500 to-purple-500',
    'bg-gradient-to-r from-amber-500 to-orange-500',
    'bg-gradient-to-r from-rose-500 to-pink-500'
  ];
  const [currentIndices, setCurrentIndices] = useState([4, 3, 2, 1, 0

    
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndices(prev => {
        return prev.map(index => (index + 1) % gradientClasses.length);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-16 max-w-4xl mx-auto"
    >
      <div className={`p-4 md:p-6 rounded-2xl ${currentTheme.card} shadow-xl`}>
        <div className="grid grid-cols-5 gap-4">
          {currentIndices.map((index, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${gradientClasses[index]} h-20 rounded-xl shadow-md`}
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}