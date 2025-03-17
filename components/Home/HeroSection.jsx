"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedTrainColors from "./AnimatedTrainColors";

export default function HeroSection({ currentTheme }) {
  return (
    <section className="min-h-screen flex items-center justify-center pb-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              transition: { duration: 100, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 blur-3xl opacity-20"
          />
          <motion.div
            animate={{
              rotate: -360,
              transition: { duration: 80, repeat: Infinity, ease: "linear" },
            }}
            className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 blur-3xl opacity-20"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-7xl font-bold mb-6 ${currentTheme.headline} tracking-tight`}
        >
          <span className="inline-block">The Ultimate</span>{" "}
          <span className="inline-block relative">
            Color Toolkit
            <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full opacity-70"></span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${currentTheme.paragraph}`}
        >
          Generate stunning gradients, extract palettes, check contrast, and find perfect colors—all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link
            href="/Resources/PaletteList"
            className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.button} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <span className="text-white">Get Started for Free</span>
          </Link>
          <Link
            href="/Tools"
            className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.buttonOutline} transition-all duration-300 transform hover:-translate-y-1`}
          >
            Explore Tools
          </Link>
        </motion.div>
        <AnimatedTrainColors />
      </div>
    </section>
  );
}