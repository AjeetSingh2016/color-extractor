import { FileText, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-primary-background dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6">
      <div className="py-15">

      </div>
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 sm:p-8 transition-all duration-300">
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          By using <strong>Color Craft</strong>, you agree to the following terms. Please read them carefully before accessing or using our services.
        </p>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">📜 User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <li>🚀 You may use Color Craft for personal and commercial projects.</li>
            <li>❌ Do not use the tool for illegal, harmful, or unethical activities.</li>
            <li>🔄 We may update these terms at any time without prior notice.</li>
            <li>💡 We are not responsible for how the extracted palettes are used.</li>
          </ul>
        </div>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">🔐 Privacy & Security</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            We respect user privacy. No images are stored on our servers, and all color extraction happens client-side to ensure data security.
          </p>
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Last Updated: March 2025</span>
          </div>
          <Link
            href="/"
            className="mt-3 sm:mt-0 flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
