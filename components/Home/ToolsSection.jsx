"use client"
import { motion } from "framer-motion";
import { Palette, ChevronsLeftRightEllipsis, Rocket } from "lucide-react";
import { cardVariants } from "@/app/theme";
import Link from "next/link";

export default function ToolsSection({ currentTheme, staggerContainer, staggerItem, isDarkMode }) {
  const tools = [
    {
      icon: (
        <div className="bg-gradient-to-br from-indigo-500 to-blue-500 p-3 rounded-xl">
          <Palette className="h-8 w-8 text-white" />
        </div>
      ),
      name: "Gradient Generator",
      desc: "Create beautiful gradients with our intuitive tool. Perfect for UI elements.",
      color: "from-indigo-500 to-blue-500",
      tryNow: "/Tools/GradientGenerator",
      learnMore: "/Tools",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
          <ChevronsLeftRightEllipsis className="h-8 w-8 text-white" />
        </div>
      ),
      name: "Code Converter",
      desc: "Easily convert between HEX, RGB, and HSL formats for seamless color management.",
      color: "from-emerald-500 to-teal-500",
      tryNow: "/Tools/CodeConverter",
      learnMore: "/Tools",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-fuchsia-500 to-purple-500 p-3 rounded-xl">
          <Rocket className="h-8 w-8 text-white" />
        </div>
      ),
      name: "Palette Extractor",
      desc: "Extract beautiful color palettes from any image with our AI-powered tool.",
      color: "from-fuchsia-500 to-purple-500",
      tryNow: "/Tools/ImageToColors",
      learnMore: "/Tools",
    },
  ];

  return (
    <section
      className={`py-24 px-4 ${isDarkMode ? "bg-slate-800/50" : "bg-indigo-50/50"}`}
      id="resources"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className={`text-4xl font-bold mb-3 ${currentTheme.headline}`}
          >
            Our Most Popular Tools
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            variants={staggerItem}
            className={`text-xl max-w-2xl mx-auto ${currentTheme.paragraph}`}
          >
            Trusted by thousands of designers and developers worldwide
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className={`p-4 sm:p-6 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300 overflow-hidden relative w-full max-w-sm sm:max-w-md mx-auto transition-all duration-300`}
            >
              <div className="absolute top-0 right-0 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br opacity-5 rounded-full -mt-6 sm:-mt-10 -mr-6 sm:-mr-10 z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-5 text-3xl sm:text-4xl">{tool.icon}</div>
                <h3
                  className={`text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 ${currentTheme.headline} truncate`}
                >
                  {tool.name}
                </h3>
                <p className={`text-sm sm:text-base ${currentTheme.paragraph} mb-4 sm:mb-6 line-clamp-3`}>
                  {tool.desc}
                </p>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-start sm:items-center">
                  <Link
                    href={tool.tryNow}
                    className={`rounded-full px-4 sm:px-5 py-2 ${currentTheme.button} text-sm sm:text-base font-medium text-white w-full sm:w-auto text-center`}
                  >
                    <span className="text-white">Try Now</span>
                  </Link>
                  <a
                    href="/Tools"
                    className={`text-sm sm:text-base ${currentTheme.primary} font-medium hover:underline`}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color}`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}