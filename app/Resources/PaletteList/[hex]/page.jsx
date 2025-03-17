"use client";

import { useParams, useRouter } from "next/navigation";

export default function PalettePage() {
  const params = useParams(); // Get dynamic route params
  const { hex } = params; // e.g., "FF5733-FF8D1A-FFC300-DAF7A6"
  const router = useRouter();

  // Split the hex string back into individual HEX codes and add "#"
  const hexCodes = hex.split("-").map(code => `#${code}`);

  const handleBack = () => {
    router.push("/"); // Navigate back to home
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-headline">Palette Details</h1>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-primary-button text-primary-button-text rounded-lg shadow-md hover:bg-primary-highlight transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
      <div className="mt-4 flex gap-4">
        {hexCodes.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-24 h-24" style={{ backgroundColor: color }}></div>
            <p className="mt-2 text-primary-paragraph">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}