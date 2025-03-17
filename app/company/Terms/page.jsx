import { FileText, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-primary-background dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <FileText className="w-10 h-10 text-red-600 dark:text-red-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Terms & Conditions
          </h1>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          By using <strong>Color Craft</strong>, you agree to the following terms. Please read them carefully before accessing or using our services.
        </p>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">📜 User Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>🚀 You may use Color Craft for personal and commercial projects.</li>
            <li>❌ Do not use the tool for illegal, harmful, or unethical activities.</li>
            <li>🔄 We may update these terms at any time without prior notice.</li>
            <li>💡 We are not responsible for how the extracted palettes are used.</li>
          </ul>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">🔐 Privacy & Security</h2>
          <p className="text-gray-700 dark:text-gray-300">
            We respect user privacy. No images are stored on our servers, and all color extraction happens client-side to ensure data security.
          </p>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-5 h-5" />
            <span>Last Updated: March 2025</span>
          </div>
          <Link href="/" className="flex items-center gap-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-all">
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
