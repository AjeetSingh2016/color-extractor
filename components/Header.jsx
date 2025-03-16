"use client";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 
        bg-white/90 dark:bg-slate-900/90 
        ${isScrolled ? "shadow-lg py-2" : "py-4"} backdrop-blur-md`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-3 transition-all">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="p-2 rounded-full bg-indigo-50 dark:bg-slate-800"
          >
            <Palette className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <span className="text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            ColorCraft
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {["/Tools/CodeConvertor", "/Tools/ColorList", "/Tools/ImageToColors", "/Tools"].map(
              (link, index) => (
                <Link key={index} href={link}>
                  <motion.span
                    className="text-base font-medium transition-all duration-300 relative px-1 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.split("/").pop().replace(/([A-Z])/g, " $1")}
                    {pathname === link && (
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
              )
            )}
          </div>

          {/* Theme Toggle Button */}
          {/* <motion.button
            onClick={toggleTheme}
            className="rounded-full p-2.5 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button> */}

          {/* <span className="text-blue-800  p-2 rounded-full bg-indigo-100 cursor-pointer">SignUp</span> */}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="rounded-full p-2 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

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
      </div>
    </motion.header>
  );
};

export default Header;
