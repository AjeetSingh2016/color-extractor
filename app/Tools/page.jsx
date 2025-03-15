// pages/explore-tools.js
"use client"
import { motion } from 'framer-motion'
import { useState } from 'react'
import Head from 'next/head'
import { 
  Palette, Image, Shuffle, Check, Layout, 
  Bookmark, Layers, ArrowRight, ChevronLeft, Moon, Sun,
} from 'lucide-react'
import Link from 'next/link'

export default function ExploreTools() {

  const [isDarkMode, setIsDarkMode] = useState(false)

  // Centralized tools data
  const toolsData = [
    {
      id: "palettes",
      icon: <Palette />,
      title: "🎨 Curated Color Palettes",
      shortDescription: "Handpicked color schemes for UI/UX inspiration.",
      fullDescription:
        "Access a curated collection of professionally designed color palettes perfect for any project. Each palette comes with HEX, RGB, and HSL values, ready to use in your designs. Filter by mood, style, or color to find the perfect match for your brand or project. Save your favorites for quick access later.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "gradient-generator",
      icon: <Layers />,
      title: "🌈 Live Gradient Generator",
      shortDescription: "Create and preview beautiful gradients in real-time.",
      fullDescription:
        "Design stunning gradients with our interactive tool. Adjust colors, direction, and opacity with real-time previews. Choose from linear, radial, or conic gradients and fine-tune with precise control. Copy CSS code with one click to use in your projects. Preview your gradient on various UI elements to see how it looks in context.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "ImageToColors",
      icon: <Image />,
      title: "📷 Extract Palette from Images",
      shortDescription: "Upload an image and extract its dominant colors.",
      fullDescription:
        "Our AI-powered tool analyzes any image to extract its key colors. Simply upload an image, and we will identify the dominant colors, creating a harmonious palette based on your image. Adjust the number of colors extracted and fine-tune the palette to your liking. Perfect for creating designs that match your photography or inspiration images.",
      color: "from-emerald-500 to-green-500",
    },
    {
      id: "color-converter",
      icon: <Shuffle />,
      title: "🔄 Color Models Converter",
      shortDescription: "Convert between HEX, RGB, HSL, and CMYK formats.",
      fullDescription:
        "Seamlessly convert colors between different color models with our intuitive converter. Input any color value in HEX, RGB, HSL, CMYK, or even by name, and get instant conversions to all other formats. Perfect for designers and developers who need to work across different platforms and applications that require specific color formats.",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "contrast-checker",
      icon: <Check />,
      title: "🖍️ Contrast Checker",
      shortDescription: "Ensure text and background color accessibility.",
      fullDescription:
        "Make your designs accessible to everyone with our contrast checker. Test foreground and background color combinations against WCAG 2.1 guidelines. Get immediate feedback on accessibility compliance levels (AA and AAA) for normal and large text. Receive suggestions for similar colors that meet accessibility standards if your current selection does not pass.",
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "ui-preview",
      icon: <Layout />,
      title: "🎭 UI Color Preview",
      shortDescription:
        "See how colors look in headers, buttons, and UI components.",
      shortDescription:
        "See how colors look in headers, buttons, and UI components.",
      fullDescription:
        "Test your color palette on real UI components before implementation. Visualize how your colors work together in context with headers, buttons, cards, and other common UI elements. This tool helps you avoid surprises in the development phase by seeing exactly how your colors will appear in a finished product.",
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "color-library",
      icon: <Bookmark />,
      title: "📚 Color Library",
      shortDescription: "Browse a list of named colors with HEX codes.",
      fullDescription:
        "Explore our comprehensive library of named colors. Browse through thousands of named colors with their corresponding HEX codes, RGB values, and HSL coordinates. Search by color name or filter by hue, saturation, or lightness to find exactly what you are looking for. A perfect reference for designers and developers.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "gradient-collection",
      icon: <Layers />,
      title: "🌟 Gradient Collection",
      shortDescription: "Explore stunning pre-made gradient combinations.",
      fullDescription:
        "Discover a vast collection of beautiful, ready-to-use gradients. Browse through hundreds of handcrafted gradient combinations organized by style and color. Preview each gradient in context and copy the CSS code with one click. An essential resource for adding depth and visual interest to your designs with minimal effort.",
      color: "from-fuchsia-500 to-pink-500",
    },
  ];

  // Theme colors
  const theme = {
    light: {
      background: "bg-gray-50",
      headline: "text-slate-800",
      paragraph: "text-slate-600",
      primary: "text-indigo-600",
      card: "bg-white",
      header: "bg-white/80"
    },
    dark: {
      background: "bg-slate-900",
      headline: "text-white",
      paragraph: "text-slate-300",
      primary: "text-indigo-400",
      card: "bg-slate-800",
      header: "bg-slate-800/80"
    }
  }

  const currentTheme = isDarkMode ? theme.dark : theme.light

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
      transition: { type: "spring", stiffness: 300 }
    },
    initial: { 
      y: 0,
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      transition: { type: "spring", stiffness: 300 }
    }
  }

  return (
    <div className={`min-h-screen ${currentTheme.background} transition-colors duration-500 font-sans pb-20`}>
      <Head>
        <title>Explore Tools - ColorCraft</title>
        <meta name="description" content="Explore all ColorCraft tools for color design" />
      </Head>

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${currentTheme.card} shadow-lg rounded-full p-3 flex items-center justify-center transition-all duration-300 hover:scale-110`}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-indigo-600" />
          )}
        </button>
      </div>

      {/* Header with Back Button */}
      <header className={`${currentTheme.header} backdrop-blur-xl sticky top-0 z-40 py-4 px-6 border-b border-slate-200/20`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 group">
            <span className={`${currentTheme.card} shadow-md rounded-full p-2 group-hover:-translate-x-1 transition-all duration-300`}>
              <ChevronLeft className={`h-4 w-4 ${currentTheme.primary}`} />
            </span>
            <span className={`${currentTheme.paragraph} font-medium`}>Back to Home</span>
          </a>
          <div className="hidden md:block">
            <span className={`${currentTheme.primary} font-semibold text-lg`}>ColorCraft</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-16">
        {/* Page Title */}
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={`text-4xl md:text-5xl font-bold mb-5 ${currentTheme.headline} tracking-tight`}
          >
            Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Color Tools</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl ${currentTheme.paragraph} max-w-2xl mx-auto leading-relaxed`}
          >
            Discover our powerful collection of color tools designed to elevate your creative workflow
          </motion.p>
        </div>

        {/* Tools List - Alternating Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-28"
        >
          {toolsData.map((tool, index) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
            >
              {/* Tool Card */}
              <div className="w-full md:w-2/5">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  initial="initial"
                  className={`${currentTheme.card} rounded-2xl overflow-hidden border border-slate-200/20 h-full shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {/* Card Header with Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
                  
                  <div className="p-8">
                    {/* Icon and Emoji */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} shadow-md text-white`}>
                        {tool.icon}
                      </div>
                      <span className="text-3xl select-none">{tool.title.split(' ')[0]}</span>
                    </div>
                    
                    {/* Content */}
                    <h3 className={`text-2xl font-bold mb-3 ${currentTheme.headline}`}>
                      {tool.title}
                    </h3>
                    <p className={`${currentTheme.paragraph} mb-8 leading-relaxed`}>
                      {tool.shortDescription}
                    </p>
                    
                    {/* Action Button */}
                    <div>
                      <Link 
                        href={`/Tools/${tool.id}`}
                        className="inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                      >
                        <span>Try Now</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Full Description */}
              <div className="w-full md:w-3/5">
                <h3 className={`text-2xl font-bold mb-4 ${currentTheme.headline}`}>
                  {tool.title.split(' ').slice(1).join(' ')} {/* Remove emoji from title */}
                </h3>
                <div className={`h-1 w-20 bg-gradient-to-r ${tool.color} rounded-full mb-6`}></div>
                <p className={`${currentTheme.paragraph} text-lg leading-relaxed mb-8`}>
                  {tool.fullDescription}
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {index % 2 === 0 ? (
                    <>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${currentTheme.card} border border-slate-200/20 shadow-sm`}>
                        ✓ Easy to use
                      </span>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${currentTheme.card} border border-slate-200/20 shadow-sm`}>
                        ✓ No sign-up required
                      </span>
                    </>
                  ) : (
                    <>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${currentTheme.card} border border-slate-200/20 shadow-sm`}>
                        ✓ Export options
                      </span>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${currentTheme.card} border border-slate-200/20 shadow-sm`}>
                        ✓ API available
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 mt-32">
        <div className={`rounded-2xl ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'} p-8 md:p-12 shadow-lg border border-slate-200/10`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className={`text-3xl font-bold mb-4 ${currentTheme.headline}`}>
                Ready to transform your design workflow?
              </h2>
              <p className={`mb-6 ${currentTheme.paragraph} text-lg`}>
                Start using our professional color tools today and take your designs to the next level.
              </p>
              <a 
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 transition-all duration-300 font-medium shadow-md hover:shadow-lg group"
              >
                <span>Create Free Account</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Palette className="h-14 w-14 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}