import GradientGeneratorClient from "./GradientGeneratorClient";

const BASE_URL = "https://colorcraft.dev";

// Metadata for SEO (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Gradient Generator - Create Beautiful CSS Gradients | ColorCraft",
  description:
    "Create and preview stunning CSS gradients in real-time with our free gradient generator tool. Customize linear & radial gradients easily.",
  keywords:
    "gradient generator, CSS gradients, linear gradient, radial gradient, color transitions, gradient preview, UI design",
  robots: "index, follow",
  alternates: {
    canonical: "/Tools/GradientGenerator",
  },
  openGraph: {
    title: "Gradient Generator - Create Beautiful CSS Gradients",
    description:
      "Design and preview smooth gradients for your website with our CSS gradient generator. Supports linear & radial gradients.",
    url: "/Tools/GradientGenerator",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient Generator - Create Beautiful CSS Gradients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Generator - Create Beautiful CSS Gradients",
    description:
      "Easily create and preview linear & radial gradients with our CSS gradient generator. Perfect for UI/UX designers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient Generator - Create Beautiful CSS Gradients",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Gradient Generator",
      "description":
        "A free tool to create and preview CSS gradients in real-time. Supports linear and radial gradients for web design.",
      "url": `${BASE_URL}/Tools/GradientGenerator`,
    },
  },
};

export default function GradientGeneratorPage() {
  return <GradientGeneratorClient />;
}