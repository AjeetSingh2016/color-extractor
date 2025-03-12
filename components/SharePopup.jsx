"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Copy, Mail, MessageCircle, X } from "lucide-react";

export default function SharePopup({ shareUrl, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the user is on a mobile device
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices = ["android", "iphone", "ipad", "ipod"];
    setIsMobile(mobileDevices.some((device) => userAgent.includes(device)));

    // On desktop, trigger share automatically
    if (!mobileDevices.some((device) => userAgent.includes(device))) {
      shareViaNative();
    }
  }, []);

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
        onClose(); // Close the popup after sharing
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <X size={20} className="text-gray-800 dark:text-gray-300" />
        </button>

        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5 text-center">
          Sharing...
        </h3>

        {/* Mobile Only: Custom Share UI */}
        {isMobile && (
          <>
            {/* Copy Link */}
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 outline-none"
              />
              <button
                onClick={copyLink}
                className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all"
              >
                {copied ? "Copied!" : <Copy size={20} />}
              </button>
            </div>

            {/* Share Options */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <Mail size={20} /> Email
              </button>
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center justify-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <MessageCircle size={20} /> WhatsApp
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
