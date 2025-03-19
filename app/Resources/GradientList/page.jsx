import GradientsClient from "./components/GradientsClient";

const BASE_URL = "https://colorcraft.dev";

// Metadata for SEO (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Gradient Collection - ColorCraft | Explore Stunning Pre-made Gradients",
  description:
    "Explore a stunning collection of pre-made gradient combinations for your next design project. Filter by type, color scheme, and more.",
  keywords: "gradient collection, pre-made gradients, color gradients, design inspiration, ColorCraft",
  robots: "index, follow",
  alternates: {
    canonical: "/Resources/GradientList",
  },
  openGraph: {
    title: "Gradient Collection - ColorCraft",
    description:
      "Browse stunning pre-made gradient combinations, filterable by type, color scheme, and color count.",
    url: "/Resources/GradientList",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient Collection - ColorCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Collection - ColorCraft",
    description:
      "Browse stunning pre-made gradient combinations, filterable by type, color scheme, and color count.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gradient Collection - ColorCraft",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Gradient Collection",
      "description":
        "A stunning collection of pre-made gradient combinations, filterable by type, color scheme, and color count.",
      "url": `${BASE_URL}/Resources/GradientList`,
    },
  },
};

export default function GradientsPage() {
  return <GradientsClient />;
}