"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "./components/ImageUploader";
import PaletteDisplay from "./components/PaletteDisplay";
import { Palette, ArrowRight, ChevronLeft, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { theme, containerVariants, itemVariants } from '../../theme';

export default function Home() {
  const [palette, setPalette] = useState([]);
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleImageUpload = (colors, imgUrl) => {
    setPalette(colors);
    setImage(imgUrl);
    setUploadStatus("Image uploaded successfully!");
    setTimeout(() => setUploadStatus(""), 3000);
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div className={`min-h-screen ${currentTheme.background} transition-colors duration-500 font-sans pb-20`}>
      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${currentTheme.card} shadow-lg rounded-full p-3 flex items-center justify-center transition-all duration-300 hover:scale-110`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>
      </div>

      {/* Header */}
      <header className={`${currentTheme.header} backdrop-blur-xl sticky top-0 z-40 py-4 px-6 border-b ${currentTheme.border}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className={`${currentTheme.card} shadow-md rounded-full p-2 group-hover:-translate-x-1 transition-all duration-300`}>
              <ChevronLeft className={`h-4 w-4 ${currentTheme.primary}`} />
            </span>
            <span className={`${currentTheme.paragraph} font-medium`}>Back to Home</span>
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${currentTheme.headline} text-2xl md:text-3xl font-bold`}
          >
            PaletteCraft
          </motion.h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-16">
        {/* Page Title */}
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`text-4xl md:text-5xl font-bold mb-5 ${currentTheme.headline} tracking-tight`}
          >
            Extract <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Color Palettes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${currentTheme.paragraph} max-w-2xl mx-auto leading-relaxed`}
          >
            Upload any image and instantly generate a beautiful color palette
          </motion.p>
        </div>

        {/* Uploader Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className={`${currentTheme.card} rounded-2xl shadow-xl p-8 mb-12  ${currentTheme.border}`}
        >
          <motion.div variants={itemVariants}>
            <h2 className={`text-2xl font-bold mb-6 ${currentTheme.headline}`}>
              Upload Your Image
            </h2>
            <ImageUploader setPalette={handleImageUpload} setImage={setImage} />
            {uploadStatus && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${currentTheme.primary} text-center mt-4 font-medium`}
              >
                {uploadStatus}
              </motion.p>
            )}
          </motion.div>
        </motion.section>

        {/* Results Section */}
        {palette.length > 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`${currentTheme.card} rounded-2xl shadow-xl p-8  ${currentTheme.border}`}
          >
            <motion.div variants={itemVariants}>
              {image && (
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg mb-8">
                  <img
                    src={image}
                    alt="Uploaded image"
                    className="w-full h-full object-contain bg-gray-200 dark:bg-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                    {palette.map((color, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-12 h-12 rounded-full shadow-lg border-2 border-white dark:border-gray-700"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <h2 className={`text-2xl font-bold mb-6 ${currentTheme.headline}`}>
                Extracted Palette
              </h2>
              <PaletteDisplay palette={palette} image={image} />
            </motion.div>
          </motion.section>
        )}
      </main>

     
     
    </div>
  );
}