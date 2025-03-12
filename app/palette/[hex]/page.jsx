"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SharedPalette() {
  const { hex } = useParams();
  const [palette, setPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState(null);

  useEffect(() => {
    if (hex) {
      const colors = hex.split("-").map((h) => {
        const rgb = hexToRgb(h);
        return {
          hex: `#${h}`,
          rgb,
          hsl: rgbToHsl(rgb),
        };
      });
      setPalette(colors);
    }
  }, [hex]);

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function rgbToHsl(rgb) {
    const [r, g, b] = rgb
      .match(/\d+/g)
      .map(Number)
      .map((v) => v / 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }
    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(index);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <main className="w-screen h-screen flex flex-col sm:flex-row">
      {palette.map((color, index) => (
        <div
          key={index}
          className="relative flex-1 flex sm:h-full h-[150px] transition-all duration-300 hover:flex-[1.2] justify-center items-center"
          style={{ backgroundColor: color.hex }}
        >
          {/* Color Details */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-white/20 text-white text-sm p-4 rounded-lg flex flex-wrap gap-2 justify-center w-[90%] sm:w-[70%] max-w-[350px]">
            {["hex", "rgb", "hsl"].map((format) => (
              <div
                key={format}
                onClick={() => copyToClipboard(color[format], index)}
                className="flex items-center gap-2 px-3 py-2 bg-black/30 rounded-md cursor-pointer w-full sm:w-auto"
              >
                <span>{color[format]}</span>
              </div>
            ))}
          </div>

          {/* Copy Success Notification */}
          {copiedColor === index && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md">
              Copied!
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
