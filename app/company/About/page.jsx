import { Info, Home } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-primary-background dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <Info className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Color Craft
          </h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>Color Craft</strong> is a smart color toolkit designed for designers, developers, and artists. It helps you
          extract, generate, and manage color palettes effortlessly. Whether you're designing a website, UI, branding, or
          just looking for inspiration, Color Craft provides an intuitive experience.
        </p>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">✨ Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>🎨 Extract color palettes from images.</li>
            <li>📌 Copy HEX, RGB, and HSL codes with one click.</li>
            <li>📂 Download palettes as PNG, JSON, or CSS files.</li>
            <li>🌙 Light & Dark mode support for better UI experience.</li>
            <li>🔗 Share palettes with a unique link.</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Designed for creatives, built for efficiency.</p>
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all">
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
