import ColorConverterClient from "./components/ColorConverterClient";

const BASE_URL = "https://colorcraft.dev";

// Metadata for SEO (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Color Models Converter - ColorCraft | HEX, RGB, HSL, CMYK Conversion",
  description:
    "Convert colors between HEX, RGB, HSL, and CMYK formats instantly with our free online tool. Perfect for designers and developers.",
  keywords:
    "color converter, HEX to RGB, RGB to HSL, CMYK converter, color models, ColorCraft",
  robots: "index, follow",
  alternates: {
    canonical: "/Tools/ColorConverter",
  },
  openGraph: {
    title: "Color Models Converter - ColorCraft",
    description:
      "Instantly convert between HEX, RGB, HSL, and CMYK color formats with this free tool.",
    url: "/Tools/ColorConverter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Color Models Converter - ColorCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Models Converter - ColorCraft",
    description:
      "Instantly convert between HEX, RGB, HSL, and CMYK color formats with this free tool.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Color Models Converter - ColorCraft",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Color Models Converter",
      "description":
        "A free tool to convert colors between HEX, RGB, HSL, and CMYK formats instantly.",
      "url": `${BASE_URL}/Tools/ColorConverter`,
    },
  },
};

export default function ColorConverterPage() {
  return <ColorConverterClient />;
}