import ColorThief from "colorthief";

export async function extractColors(file) {
  const img = new Image();
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5); // First color is dominant
      const rgbPalette = palette.map(([r, g, b]) => ({
        rgb: `rgb(${r}, ${g}, ${b})`,
        hex: rgbToHex(r, g, b),
        hsl: rgbToHsl(r, g, b),
      }));
      URL.revokeObjectURL(url);
      resolve(rgbPalette);
    };
    img.src = url;
  });
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r, g, b) {
  // Placeholder; implement or use a library like 'color-convert'
  return "hsl(0, 0%, 0%)";
}