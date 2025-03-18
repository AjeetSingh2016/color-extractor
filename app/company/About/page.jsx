import { Info, Home } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-primary-background dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Info className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            About Color Craft
          </h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          <strong>Color Craft</strong> is a smart color toolkit designed for designers, developers, and artists. It helps you
          extract, generate, and manage color palettes effortlessly. Whether you're designing a website, UI, branding, or
          just looking for inspiration, Color Craft provides an intuitive experience.
        </p>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">✨ Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>🎨 Extract color palettes from images.</li>
            <li>📌 Copy HEX, RGB, and HSL codes with one click.</li>
            <li>📂 Download palettes as PNG, JSON, or CSS files.</li>
            <li>🌙 Light & Dark mode support for better UI experience.</li>
            <li>🔗 Share palettes with a unique link.</li>
          </ul>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Designed for creatives, built for efficiency.
          </p>
          <Link
            href="/"
            className="mt-3 sm:mt-0 flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
