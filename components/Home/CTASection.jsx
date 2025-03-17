"use client"
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection({ currentTheme, isDarkMode }) {
  return (
    <section
      className={`py-24 px-4 ${isDarkMode ? "bg-indigo-900/20" : "bg-indigo-50"}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${currentTheme.headline}`}
          >
            Ready to Transform Your Color Workflow?
          </h2>
          <p className={`text-xl mb-8 ${currentTheme.paragraph}`}>
            Join thousands of designers and developers using ColorCraft to create beautiful color experiences.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/Tools"
              className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.button} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <span className="text-white">Get Started for Free</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}