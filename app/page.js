import Head from "next/head";
import { theme } from "@/app/theme";
// import HeroSection from "@/components/Home/HeroSection";
import HeroSection from "../components/Home/HeroSection.jsx";
import BenefitsSection from "@/components/Home/BenefitsSection";
import ToolsSection from "@/components/Home/ToolsSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTASection from "@/components/Home/CTASection";
import MobileMenu from "@/components/Home/MobileMenu";
import FloatingCTA from "@/components/Home/FloatingCTA";

export default function Home() {

  const isDarkMode = false;
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

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div className={`min-h-screen ${currentTheme.background} transition-colors duration-500 font-sans`}>
      <Head>
        <title>ColorCraft - Ultimate Color Toolkit for Designers & Developers</title>
        <meta
          name="description"
          content="ColorCraft is the ultimate color toolkit for designers and developers. Generate gradients, extract palettes, check contrast, and more—all in one place."
        />
        <meta name="keywords" content="color toolkit, gradient generator, palette extractor, accessibility tools, design tools, developer tools" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="ColorCraft - Ultimate Color Toolkit" />
        <meta
          property="og:description"
          content="Discover ColorCraft, the all-in-one solution for color management in design and development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://yourwebsite.com" />
      </Head>

      <MobileMenu currentTheme={currentTheme} />
      <div className="relative pt-15">
        <HeroSection currentTheme={currentTheme} />
        <BenefitsSection
          currentTheme={currentTheme}
          staggerContainer={staggerContainer}
          staggerItem={staggerItem}
        />
        <ToolsSection
          currentTheme={currentTheme}
          staggerContainer={staggerContainer}
          staggerItem={staggerItem}
          isDarkMode={isDarkMode}
        />
        <TestimonialsSection
          currentTheme={currentTheme}
          staggerContainer={staggerContainer}
          staggerItem={staggerItem}
        />
        <CTASection currentTheme={currentTheme} isDarkMode={isDarkMode} />
      </div>
      <FloatingCTA currentTheme={currentTheme} />
    </div>
  );
}