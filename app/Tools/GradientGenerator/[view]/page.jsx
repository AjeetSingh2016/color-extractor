"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const GradientViewer = () => {
  const searchParams = useSearchParams();
  const [gradientStyle, setGradientStyle] = useState("");

  // Function to generate a random gradient (for fallback)
  const generateRandomGradient = () => {
    const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    const color1 = randomColor();
    const color2 = randomColor();
    const angle = Math.floor(Math.random() * 360);
    const type = ["linear", "radial", "conic"][Math.floor(Math.random() * 3)];

    switch (type) {
      case "linear":
        return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
      case "radial":
        return `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${color1} 0%, ${color2} 100%)`;
      default:
        return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
    }
  };

  useEffect(() => {
    const css = searchParams.get("css");
    if (css && css.startsWith("background-image:")) {
      const gradientValue = css.replace("background-image:", "").trim();
      setGradientStyle(gradientValue); // No semicolon
      console.log("Gradient from query:", css);
    } else {
      const randomGradient = generateRandomGradient();
      setGradientStyle(randomGradient); // No semicolon
      console.log("No valid CSS in query, using random gradient:", randomGradient);
    }
  }, [searchParams]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundImage: gradientStyle }} // No semicolon in value
    >
      <div className="text-center text-white p-6 bg-black/40 bg-opacity-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Gradient Viewer</h1>
       <p className="text-lg mb-4">
          {searchParams.get("css")
            ? "Generated from URL query parameters"
            : "Randomly generated gradient"}
        </p>
        <div className="bg-transparent p-4 rounded-md">
          <p className="text-sm font-mono">
            CSS: <code>background-image: {gradientStyle}</code>
          </p>
          <button
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
            onClick={() => {
              navigator.clipboard.writeText(`background-image: ${gradientStyle}`);
              alert("CSS copied to clipboard!");
            }}
          >
            📋 Copy CSS
          </button>
        </div>
        {/* <p className="mt-4 text-sm">
          URL: <span className="font-mono break-all">{window.location.href}</span>
        </p> */}
      </div>
    </div>
  );
};

export default GradientViewer;