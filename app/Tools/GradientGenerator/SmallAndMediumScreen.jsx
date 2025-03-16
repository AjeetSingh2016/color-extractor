"use client";

import html2canvas from "html2canvas";
import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import {
    theme,
    containerVariants,
    itemVariants,
    cardVariants,
  } from "../../theme";
export default function GradientGenerator({
    isDarkMode = false,
    currentTheme,
    gradientType,
    colorStops,
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
  }) {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-start justify-center p-6 pt-25">
      {/* Main Content */}
      <div className="w-full max-w-7xl"> 

        {/* Title and Description */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="text-center md:text-left lg:text-left  mb-10 w-full mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-4xl lg:text-4xl font-bold mb-4 ${currentTheme.headline} tracking-tight`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Gradient{" "}
          </span>
          <span className="text-gray-700">
          Generator
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          transition={{ delay: 0.1 }}
          className={`text-lg md:text-lg ${currentTheme.paragraph} w-full leading-relaxed text-center md:text-left lg:text-left`}
        >
          Convert between HEX, RGB, HSL, CMYK, and LAB color formats instantly.
        </motion.p>
      </motion.div>

        {/* Preview Area */}
        <div
          ref={previewRef}
          className="w-full h-80 rounded-lg mb-8 overflow-hidden shadow-lg relative" 
          style={{ backgroundImage: getGradientCSS() }}
        >
          <div className="flex items-center justify-center h-full text-white text-xl font-medium">
            Preview Area
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Settings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Gradient Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Gradient Type</label>
              <div className="flex space-x-3">
                <button
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${gradientType === "linear" ? "bg-purple-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  onClick={() => handleGradientTypeChange("linear")}
                >
                  Linear
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${gradientType === "radial" ? "bg-purple-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  onClick={() => handleGradientTypeChange("radial")}
                >
                  Radial
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${gradientType === "conic" ? "bg-purple-500 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                  onClick={() => handleGradientTypeChange("conic")}
                >
                  Conic
                </button>
              </div>
            </div>

            {/* Color Stops */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Color Stops</label>
              {colorStops.map((stop, index) => (
                <div key={index} className="flex items-center mb-3 space-x-3">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateColorStop(index, "color", e.target.value)}
                    className="w-12 h-12 p-1 border rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateColorStop(index, "color", e.target.value)}
                    className="w-24 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stop.position}
                    onChange={(e) => updateColorStop(index, "position", e.target.value)}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-300"
                  />
                  <span className="w-12 text-center text-sm text-gray-600">{stop.position}%</span>
                  {colorStops.length > 2 && (
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                      onClick={() => removeColorStop(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button
                className="mt-3 w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
                onClick={addColorStop}
              >
                + Add Color Stop
              </button>
            </div>

            {/* Angle */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Angle</label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-300"
                />
                <span className="text-sm text-gray-600">{angle}°</span>
              </div>
            </div>
          </div>

          {/* Right Panel - CSS & Export */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* CSS Code */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">CSS Code</label>
              <div className="flex items-center space-x-3">
                <pre className="bg-gray-100 p-3 rounded-lg flex-1 overflow-auto text-sm text-gray-800">{`background-image: ${getGradientCSS()};`}</pre>
                <button
                  className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
                  onClick={() => navigator.clipboard.writeText(`background-image: ${getGradientCSS()};`)}
                >
                  📋 Copy
                </button>
              </div>
            </div>

            {/* Export */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Export</label>
              <button
                className="w-full mb-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
                onClick={exportPNG}
              >
                ⬇️ Download PNG
              </button>
              <button
                className="w-full mb-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
                onClick={exportSVG}
              >
                ↯ Download SVG
              </button>
              <button
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 shadow-sm"
                onClick={shareLink}
              >
                ↗️ Share Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}