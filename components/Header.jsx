"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Centralized tools object with descriptions and emojis
const Tools = {
  "/Tools/CodeConvertor": {
    name: "Code Convertor",
    emoji: "💻",
    description: "Convert color codes effortlessly.",
  },
  "/Tools/ImageToColors": {
    name: "Image To Colors",
    emoji: "🎨",
    description: "Extract colors from any image.",
  },
  "/Tools/GradientGenerator": {
    name: "Gradient Generator",
    emoji: "🌈",
    description: "Create stunning gradients with ease.",
  },
};

// Centralized resources object
const Resources = {
  "/Resources/ColorList": "Colors",
  "/Resources/GradientList": "Gradients",
  "/Resources/PaletteList": "Palettes",
};

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDrawerOpen, setIsToolsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.header
      suppressHydrationWarning={true}
      className={`fixed w-full top-0 z-50 transition-all duration-300
        bg-white/90 dark:bg-slate-900/90
        ${isScrolled ? "shadow-lg py-2" : "py-4"} backdrop-blur-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-1 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-3 transition-all"
        >
          <motion.div
            whileHover={{ rotate: 270, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full bg-indigo-50 dark:bg-slate-800"
          >
            <Image
              src="/icon.svg"
              alt="Icon"
              width={22}
              height={22}
              // className="w-6 h-6"
            />
          </motion.div>
          <span className="text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            ColorCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {Object.entries(Resources).map(([path, name], index) => (
              <Link key={index} href={path}>
                <motion.span
                  className="text-base font-medium transition-all duration-300 relative px-1 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {name}
                  {pathname === path && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                      layoutId="navIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Unique Tools Button with Drawer */}
          <div className="relative">
            <motion.button
              onMouseEnter={() => setIsToolsDrawerOpen(true)}
              onMouseLeave={() => setIsToolsDrawerOpen(false)}
              className="rounded-full px-4 py-2 bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tools
            </motion.button>
            <AnimatePresence>
              {isToolsDrawerOpen && (
                <motion.div
                  onMouseEnter={() => setIsToolsDrawerOpen(true)}
                  onMouseLeave={() => setIsToolsDrawerOpen(false)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 right-0 w-72 bg-white dark:bg-slate-800 shadow-xl rounded-lg p-4 z-50" // Increased width from w-64 to w-72
                >
                  {Object.entries(Tools).map(
                    ([path, { name, emoji, description }], index) => (
                      <Link key={index} href={path}>
                        <motion.div
                          className="flex items-start space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          <span>{emoji}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Menu Toggle Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "open" : "closed"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: isMenuOpen ? 90 : 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Menu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 p-4 md:hidden rounded-l-lg"
            >
              <div className="flex justify-between items-center mb-4 pl-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white ">
                  Resources
                </h3>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </motion.button>
              </div>
              <div className="space-y-6 bg-white">
                {/* Resources Section */}
                <div>
                  {Object.entries(Resources).map(([path, name], index) => (
                    <Link
                      key={index}
                      href={path}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className="p-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {name}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <hr className="border-gray-300 dark:border-gray-700" />

                {/* Tools Section */}
                <div className="bg-white">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 pl-3">
                    Tools
                  </h3>
                  {Object.entries(Tools).map(
                    ([path, { name, emoji, description }], index) => (
                      <Link
                        key={index}
                        href={path}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <motion.div
                          className="flex items-start space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span>{emoji}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {description}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
