"use client"
import { motion } from 'framer-motion'
import { Copy, Download, Share2, Check, ChevronDown, Code, Palette } from 'lucide-react'
import { useState, useRef } from 'react'

// Helper function to determine if a color is dark or light
const getTextColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  // Calculate luminance (simplified formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF'; // Black for light colors, white for dark
};

const GradientCard = ({ gradient }) => {
  const [copiedColor, setCopiedColor] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const menuRef = useRef(null)

  const gradientValue = gradient.css.match(/linear-gradient\([^)]*\)/)?.[0] || gradient.css;
  const gradientType = gradient.type || "linear";
  const colorCount = gradient.colors.length;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gradient.css)
  }

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([gradient.css], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${gradient.name.toLowerCase().replace(/\s+/g, '-')}-gradient.css`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${gradient.name} Gradient`,
        text: `Check out this beautiful ${gradient.name} gradient!`,
        url: window.location.href,
      })
    } else {
      copyToClipboard();
    }
  }

  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    <motion.div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-xl bg-white border border-gray-100 transition-all duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Gradient Preview */}
      <div className="relative group">
        <motion.div 
          className="h-48 w-full cursor-pointer"
          style={{ background: gradientValue }}
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
        
        {/* Gradient Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-black/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
            {gradientType}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-gray-700 hover:text-gray-900 transition-colors"
            onClick={copyToClipboard}
            title="Copy CSS"
          >
            <Copy size={16} />
          </motion.button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight">
            {gradient.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {colorCount} {colorCount === 1 ? 'color' : 'colors'}
          </span>
        </div>
        
        {/* Color Palette */}
        <div className="flex gap-1 mt-3">
          {gradient.colors.map((color, index) => (
            <div 
              key={index} 
              className="relative flex-1 h-8 rounded-md border border-gray-200 transition-all hover:scale-105"
              style={{ backgroundColor: color }}
              title={color}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  className="p-1 rounded-full"
                  onClick={() => copyColor(color)}
                >
                  {copiedColor === color ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <span 
                      className="text-xs font-medium"
                      style={{ color: getTextColor(color) }}
                    >
                      {color}
                    </span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default GradientCard