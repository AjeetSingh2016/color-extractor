"use client";
import { useRef } from "react";
import { Download } from "lucide-react";
import { theme, containerVariants, itemVariants, cardVariants } from '../../../theme';
export default function DownloadButton({ palette, image, isDarkMode = false }) {

   const currentTheme = isDarkMode ? theme.dark : theme.light;

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
        <button className={`flex items-center gap-2 px-6 py-3 ${currentTheme.button} bg-opacity-10 hover:bg-opacity-20 text-white rounded-full 
            transition-all duration-300 w-full sm:w-auto justify-center shadow-lg border ${currentTheme.button}`}>
        <Download size={18} />
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