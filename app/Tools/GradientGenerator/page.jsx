"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import LargeScreen from "./LargeScreen";
import SmallAndMediumScreen from "./SmallAndMediumScreen";
import { theme, containerVariants, itemVariants  } from "../../theme";
import { motion } from "framer-motion";

const Page = ({ isDarkMode = false }) => {
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const [gradientType, setGradientType] = useState("linear");
  const [colorStops, setColorStops] = useState([
    { color: "#B85CFF", position: 0 },
    { color: "#EC4899", position: 100 },
  ]);
  const [angle, setAngle] = useState(90);
  const previewRef = useRef(null);

  // Handle gradient type change
  const handleGradientTypeChange = (type) => setGradientType(type);

  // Add new color stop
  const addColorStop = () => {
    const newColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const newPosition =
      colorStops.length > 0
        ? Math.max(...colorStops.map((stop) => stop.position)) + 20
        : 50;
    setColorStops([
      ...colorStops,
      { color: newColor, position: newPosition > 100 ? 100 : newPosition },
    ]);
  };

  // Update color stop
  const updateColorStop = (index, field, value) => {
    const updatedStops = [...colorStops];
    updatedStops[index][field] =
      field === "position" ? Math.max(0, Math.min(100, value)) : value;
    setColorStops(updatedStops);
  };

  // Remove color stop
  const removeColorStop = (index) => {
    setColorStops(colorStops.filter((_, i) => i !== index));
  };

  // Generate CSS gradient
  // const getGradientCSS = () => {
  //   const stops = colorStops
  //     .sort((a, b) => a.position - b.position)
  //     .map((stop) => `${stop.color} ${stop.position}%`)
  //     .join(", ");

  //   switch (gradientType) {
  //     case "linear":
  //       return `linear-gradient(${angle}deg, ${stops})`;
  //     case "radial":
  //       return `radial-gradient(circle, ${stops})`;
  //     case "conic":
  //       return `conic-gradient(from ${angle}deg, ${stops})`;
  //     default:
  //       return `linear-gradient(${angle}deg, ${stops})`;
  //   }
  // };

  // Export PNG
  const exportPNG = () => {
    html2canvas(previewRef.current).then((canvas) => {
      canvas.toBlob((blob) => saveAs(blob, "gradient.png"));
    });
  };

  // Export SVG
  const exportSVG = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(
        (stop) =>
          `<stop offset="${stop.position}%" style="stop-color:${stop.color};" />`
      )
      .join("");

    const gradientId =
      gradientType === "linear"
        ? "linearGrad"
        : gradientType === "radial"
        ? "radialGrad"
        : "conicGrad";
    let gradientDef = "";
    switch (gradientType) {
      case "linear":
        gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${angle})">${stops}</linearGradient>`;
        break;
      case "radial":
        gradientDef = `<radialGradient id="${gradientId}">${stops}</radialGradient>`;
        break;
      case "conic":
        gradientDef = `<linearGradient id="${gradientId}" gradientTransform="rotate(${angle})">${stops}</linearGradient>`;
        break;
      default:
        gradientDef = `<linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${angle})">${stops}</linearGradient>`;
    }

    const svg = `
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${gradientDef}
        </defs>
        <rect width="400" height="200" fill="url(#${gradientId})" />
      </svg>
    `;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    saveAs(blob, "gradient.svg");
  };
  const getGradientCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");
    switch (gradientType) {
      case "linear":
        return `linear-gradient(${angle}deg, ${stops})`;
      case "radial":
        return `radial-gradient(circle, ${stops})`;
      case "conic":
        return `conic-gradient(from ${angle}deg, ${stops})`;
      default:
        return `linear-gradient(${angle}deg, ${stops})`;
    }
  };

  const shareLink = () => {
    const cssCode = `background-image: ${getGradientCSS()}`; // No semicolon
    const params = new URLSearchParams({
      css: cssCode,
    }).toString();
    const url = `${window.location.origin}/Tools/GradientGenerator/View?${params}`;
  
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: "Check out this gradient!",
        text: "Here’s a cool gradient I created:",
        url: url,
      })
      .then(() => console.log("Successfully shared"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don’t support Web Share API
      navigator.clipboard.writeText(url);
      alert("CSS link copied to clipboard (Share API not supported)");
    }
  };
  const screenProps = {
    currentTheme,
    gradientType,
    setGradientType,
    colorStops,
    setColorStops,
    angle,
    setAngle,
    previewRef,
    handleGradientTypeChange,
    addColorStop,
    updateColorStop,
    removeColorStop,
    getGradientCSS,
    exportPNG,
    exportSVG,
    shareLink,
  };

  // Add console.log to debug props
  console.log("screenProps in Page.jsx:", screenProps);

  return (
    <div>
      <div className="block md:block xl:hidden">
        <SmallAndMediumScreen {...screenProps} />
      </div>
      <div className="hidden xl:block">
      
        <LargeScreen {...screenProps} />
      </div>
    </div>
  );
};

export default Page;