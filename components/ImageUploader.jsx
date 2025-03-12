"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { extractColors } from "../lib/colorExtractor";

export default function ImageUploader({ setPalette, setImage }) {
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
    <div
      {...getRootProps()}
      className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-300
        ${isDragActive ? "border-indigo-500 bg-indigo-900/20" : "border-gray-600 hover:border-gray-500 bg-gray-800/30"}`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-300 font-medium">
        {isDragActive
          ? "Drop the image here!"
          : "Drag & drop an image or click to select"}
      </p>
    </div>
  );
}