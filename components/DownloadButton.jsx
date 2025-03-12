"use client";
import { useRef } from "react";

export default function DownloadButton({ palette, image }) {
  const canvasRef = useRef(null);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = palette.length * 100;
    canvas.height = 200;

    palette.forEach((color, i) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(i * 100, 0, 100, 200);
    });

    const link = document.createElement("a");
    link.download = "palette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadJSON = () => {
    const json = JSON.stringify(palette, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "palette.json";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div className="relative inline-block group">
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
          Download
        </button>
        <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 shadow-lg rounded opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-10">
          <button
            onClick={downloadPNG}
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            PNG
          </button>
          <button
            onClick={downloadJSON}
            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            JSON
          </button>
        </div>
      </div>
    </>
  );
}