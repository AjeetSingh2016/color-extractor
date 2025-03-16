"use client";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Palette,
  Accessibility,
  Rocket,
  Code,
  Twitter,
  Github,
  Linkedin,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useLayoutEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AnimatedTrainColors from "@/components/ColorTrains";
export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  // useLayoutEffect(() => {
  //   setIsScrolled(window.scrollY > 20);

  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 20);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  // Animations
  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
    initial: {
      scale: 1,
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Color palette
  const theme = {
    light: {
      background: "bg-gradient-to-br from-gray-50 to-blue-50",
      headline: "text-slate-800",
      paragraph: "text-slate-600",
      primary: "text-indigo-600",
      secondary: "text-emerald-500",
      accent: "text-fuchsia-500",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      buttonOutline:
        "border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
      card: "bg-white",
      header: "bg-white/80 backdrop-blur-lg",
      footer: "bg-slate-900",
    },
    dark: {
      background: "bg-gradient-to-br from-slate-900 to-slate-800",
      headline: "text-white",
      paragraph: "text-slate-300",
      primary: "text-indigo-400",
      secondary: "text-emerald-400",
      accent: "text-fuchsia-400",
      button: "bg-indigo-500 hover:bg-indigo-600 text-white",
      buttonOutline:
        "border border-indigo-500 text-indigo-400 hover:bg-indigo-900/30",
      card: "bg-slate-800/80",
      header: "bg-slate-900/80 backdrop-blur-lg",
      footer: "bg-slate-950",
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div
      className={`min-h-screen ${currentTheme.background} transition-colors duration-500 font-sans`}
    >
      <Head>
        <title>ColorCraft - Ultimate Color Toolkit</title>
        <meta
          name="description"
          content="The ultimate color toolkit for designers and developers"
        />
      </Head>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`md:hidden fixed top-16 left-0 right-0 p-6 mt-2 mx-4 rounded-2xl z-40 shadow-xl ${currentTheme.card} border border-opacity-20 border-slate-300`}
        >
          <nav className="flex flex-col space-y-4">
            <a
              href="#tools"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </a>
            <a
              href="#resources"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </a>
            <a
              href="#company"
              className={`${currentTheme.paragraph} hover:${currentTheme.primary} text-lg font-medium`}
              onClick={() => setIsMenuOpen(false)}
            >
              Company
            </a>
            <button
              className={`rounded-full px-5 py-3 ${currentTheme.button} text-center mt-4`}
            >
              Sign Up
            </button>
          </nav>
        </motion.div>
      )}

      {/* Main Container */}
      <div className="relative pt-15">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pb-12 px-4 overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: {
                    duration: 100,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className={`absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 blur-3xl opacity-20`}
              />
              <motion.div
                animate={{
                  rotate: -360,
                  transition: {
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500 blur-3xl opacity-20`}
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
              Generate stunning gradients, extract palettes, check contrast, and
              find perfect colors—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <button
                className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.button} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                Get Started for Free
              </button>
              <Link
                href="/Tools"
                className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.buttonOutline} transition-all duration-300 transform hover:-translate-y-1`}
              >
                Explore Tools
              </Link>
            </motion.div>

            {/* Floating Preview */}
            {/* <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className={`p-4 md:p-6 rounded-2xl ${currentTheme.card} shadow-xl border border-opacity-10 border-slate-300`}>
                <div className="grid grid-cols-5 gap-4">
                  {[
                    'bg-gradient-to-r from-indigo-500 to-blue-500',
                    'bg-gradient-to-r from-emerald-500 to-teal-500',
                    'bg-gradient-to-r from-fuchsia-500 to-purple-500',
                    'bg-gradient-to-r from-amber-500 to-orange-500',
                    'bg-gradient-to-r from-rose-500 to-pink-500'
                  ].map((gradient, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`${gradient} h-20 rounded-xl shadow-md`}
                    />
                  ))}
                </div>
              </div>
            </motion.div> */}
            <AnimatedTrainColors />
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 px-4" id="tools">
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
                Why Choose ColorCraft?
              </motion.h2>
              <motion.div
                variants={staggerItem}
                className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mx-auto mb-6"
              />
              <motion.p
                variants={staggerItem}
                className={`text-xl max-w-2xl mx-auto ${currentTheme.paragraph}`}
              >
                {`We've built the most comprehensive color toolkit for modern designers and developers`}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Palette className="h-8 w-8" />,
                  title: "All-in-One Toolkit",
                  desc: "Everything you need for color in one place, no more switching between tools",
                },
                {
                  icon: <Accessibility className="h-8 w-8" />,
                  title: "Accessibility-Focused",
                  desc: "Built with WCAG standards to ensure your designs are accessible to everyone",
                },
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: "Instant & Free",
                  desc: "No sign-up required, just start using our powerful tools immediately",
                },
                {
                  icon: <Code className="h-8 w-8" />,
                  title: "Developer-Friendly",
                  desc: "Full API access and code snippets for easy integration into your workflow",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`p-6 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300`}
                >
                  <div
                    className={`mb-5 ${currentTheme.primary} bg-opacity-10 rounded-xl p-3 inline-block`}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-3 ${currentTheme.headline}`}
                  >
                    {benefit.title}
                  </h3>
                  <p className={`${currentTheme.paragraph}`}>{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Showcase Section */}
        <section
          className={`py-24 px-4 ${
            isDarkMode ? "bg-slate-800/50" : "bg-indigo-50/50"
          }`}
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
              {[
                {
                  icon: (
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-500 p-3 rounded-xl">
                      <Palette className="h-8 w-8 text-white" />
                    </div>
                  ),
                  name: "Gradient Generator",
                  desc: "Create beautiful gradients with our intuitive tool. Perfect for backgrounds, buttons, and UI elements.",
                  color: "from-indigo-500 to-blue-500",
                },
                {
                  icon: (
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                      <Accessibility className="h-8 w-8 text-white" />
                    </div>
                  ),
                  name: "Contrast Checker",
                  desc: "Ensure your color combinations meet WCAG accessibility standards for better usability.",
                  color: "from-emerald-500 to-teal-500",
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
                },
              ].map((tool, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`p-6 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300 overflow-hidden relative`}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br opacity-5 rounded-full -mt-10 -mr-10 z-0"></div>
                  <div className="relative z-10">
                    <div className="mb-5">{tool.icon}</div>
                    <h3
                      className={`text-2xl font-semibold mb-3 ${currentTheme.headline}`}
                    >
                      {tool.name}
                    </h3>
                    <p className={`${currentTheme.paragraph} mb-6`}>
                      {tool.desc}
                    </p>
                    <div className="flex space-x-4 items-center">
                      <button
                        className={`rounded-full px-5 py-2 ${currentTheme.button} text-sm font-medium`}
                      >
                        Try Now
                      </button>
                      <a
                        href="#"
                        className={`text-sm ${currentTheme.primary} font-medium hover:underline`}
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

        {/* Testimonials Section */}
        <section className="py-24 px-4">
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
                Loved by Creators
              </motion.h2>
              <motion.div
                variants={staggerItem}
                className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mx-auto mb-6"
              />
              <motion.p
                variants={staggerItem}
                className={`text-xl max-w-2xl mx-auto ${currentTheme.paragraph}`}
              >
                See what designers and developers are saying about ColorCraft
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "ColorCraft has completely transformed how I approach color in my designs. The palette extraction tool is simply magical!",
                  author: "Alex Chen",
                  role: "UI Designer at Figma",
                },
                {
                  quote:
                    "As a developer who's color-blind, the accessibility features in ColorCraft are invaluable. It's become an essential part of my workflow.",
                  author: "Jasmine Singh",
                  role: "Senior Developer at Vercel",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300`}
                >
                  <div className={`text-3xl ${currentTheme.primary} mb-4`}>
                    {`"`}
                  </div>
                  <p className={`text-lg mb-6 ${currentTheme.paragraph}`}>
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                    <div className="ml-4">
                      <h4 className={`font-semibold ${currentTheme.headline}`}>
                        {testimonial.author}
                      </h4>
                      <p className={`text-sm ${currentTheme.paragraph}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`py-24 px-4 ${
            isDarkMode ? "bg-indigo-900/20" : "bg-indigo-50"
          }`}
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
                Join thousands of designers and developers using ColorCraft to
                create beautiful color experiences.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.button} shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Get Started for Free
                </button>
                <button
                  className={`rounded-full px-8 py-4 text-lg font-medium ${currentTheme.buttonOutline} transition-all duration-300`}
                >
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Floating CTA (Mobile) */}
      <motion.div
        className="fixed bottom-6 right-6 md:hidden"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={`rounded-full px-6 py-3 ${currentTheme.button} shadow-lg flex items-center space-x-2`}
        >
          <span>Get Started</span>
          <Rocket className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
}
