"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Mail, MessageCircle } from "lucide-react"; // Icons from lucide-react

export default function SharePopup({ shareUrl, onClose }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Check out this color palette!");
    const body = encodeURIComponent(`Here's a cool palette I created: ${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`Check out this color palette: ${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Color Palette",
          text: "Check out this cool palette I created!",
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Share Your Palette
        </h3>
        <div className="space-y-4">
          {/* Copy Link */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none"
            />
            <button
              onClick={copyLink}
              className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
            >
              {copied ? "Copied!" : <Copy size={20} />}
            </button>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shareViaEmail}
              className="flex items-center justify-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <Mail size={20} /> Email
            </button>
            <button
              onClick={shareViaWhatsApp}
              className="flex items-center justify-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              <MessageCircle size={20} /> WhatsApp
            </button>
            {navigator.share && (
              <button
                onClick={shareViaNative}
                className="flex items-center justify-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all col-span-2"
              >
                <span>Share via...</span>
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}