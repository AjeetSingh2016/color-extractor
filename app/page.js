import { theme } from "@/app/theme";
import HeroSection from "@/components/Home/HeroSection";
import BenefitsSection from "@/components/Home/BenefitsSection";
import ToolsSection from "@/components/Home/ToolsSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTASection from "@/components/Home/CTASection";
import FloatingCTA from "@/components/Home/FloatingCTA";

const BASE_URL = "https://colorcraft.dev";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "ColorCraft",
  description:
    "Color Toolkit - Color Palettes · Gradient Library · Gradient Maker · Image to Colors · Color Code Convertor",
  keywords: "color toolkit, gradient generator, palette extractor, accessibility tools, design tools, developer tools",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico", // Path relative to the `app/` directory
  },
  alternates: {
    canonical: "/", // Uses relative URL (Next.js will prepend metadataBase)
  },
  openGraph: {
    title: "ColorCraft - Ultimate Color Toolkit",
    description: "Discover ColorCraft, the all-in-one solution for color management in design and development.",
    type: "website",
    url: "/", // Relative URL
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ColorCraft - The Ultimate Color Toolkit for Designers & Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorCraft - Ultimate Color Toolkit",
    description: "Discover ColorCraft, the all-in-one solution for color management in design and development.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ColorCraft - The Ultimate Color Toolkit for Designers & Developers",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ColorCraft",
      "url": "https://colorcraft.dev",
      "description": "The ultimate color toolkit for designers & developers, featuring color palette generation, gradient tools, and accessibility features.",
      "publisher": {
        "@type": "Organization",
        "name": "ColorCraft",
        "logo": {
          "@type": "ImageObject",
          "url": "https://colorcraft.dev/icon.svg",
          "width": 512,
          "height": 512
        }
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://colorcraft.dev/og-image.jpg",
        "width": 1200,
        "height": 630
      },
    }
  }
};
export default function Home() {
  const isDarkMode = false;
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} transition-colors duration-500 font-sans`}>
      <div className="relative">
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