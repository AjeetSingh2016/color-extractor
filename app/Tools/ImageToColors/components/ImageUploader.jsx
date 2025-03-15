"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { extractColors } from "../lib/colorExtractor";
import { motion } from "framer-motion";
import { theme, itemVariants } from '../../../theme';

export default function ImageUploader({ setPalette, setImage, isDarkMode = false }) {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imgUrl = URL.createObjectURL(file);
    setImage(imgUrl);

    const colors = await extractColors(file);
    setPalette(colors, imgUrl);
  }, [setPalette, setImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className={`${currentTheme.card} p-6 rounded-xl  ${currentTheme.border} shadow-md`}
    >
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300 border-indigo-400 
          ${isDragActive 
            ? `border-indigo-500 bg-indigo-900/20 ${currentTheme.primary}` 
            : `hover:border-indigo-400 bg-opacity-30`}`}
      >
        <input {...getInputProps()} />
        <p className={`${currentTheme.paragraph} font-medium`}>
          {isDragActive
            ? "Drop the image here!"
            : "Drag & drop an image or click to select"}
        </p>
      </div>
    </motion.div>
  );
}