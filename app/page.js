"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ImageUploader from "../components/ImageUploader";
import PaletteDisplay from "../components/PaletteDisplay";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [palette, setPalette] = useState([]);
  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleImageUpload = (colors, imgUrl) => {
    setPalette(colors);
    setImage(imgUrl);
    setUploadStatus("Image uploaded successfully!");
    setTimeout(() => setUploadStatus(""), 3000);
  };

  return (
    <main  className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl flex justify-between items-center mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold">PaletteCraft</h1>
        {/* <ThemeToggle /> */}
      </motion.header>

      {/* Uploader */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Upload an Image</h2>
        <ImageUploader setPalette={handleImageUpload} setImage={setImage} />
        {uploadStatus && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-indigo-600 dark:text-indigo-400 mt-4 font-medium"
          >
            {uploadStatus}
          </motion.p>
        )}
      </motion.section>

      {/* Results */}
      {palette.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-5xl flex flex-col gap-8 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-xl p-6"
        >
          {image && (
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={image}
                alt="Uploaded image"
                className="w-full h-full object-contain bg-gray-300 dark:bg-gray-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
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
          <div>
            <h2 className="text-xl font-semibold mb-4">Extracted Palette</h2>
            <PaletteDisplay palette={palette} image={image} />
          </div>
        </motion.section>
      )}

<footer className="mt-12 text-gray-500 dark:text-gray-400 text-sm">
  Crafted with ❤️ by 
  <a 
    href="https://ajeetsingh.online" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-500 hover:underline ml-1"
  >
    Ajeet
  </a>
</footer>
    </main>
  );
}