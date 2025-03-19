import PalettesClient from "./components/PalettesClient";

const BASE_URL = "https://colorcraft.dev";

// Metadata for SEO (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Curated Color Palettes - ColorCraft | Handpicked UI/UX Inspiration",
  description:
    "Discover handpicked color schemes curated for UI/UX inspiration. Explore vibrant, pastel, neon, and more palettes for your next design project.",
  keywords: "color palettes, curated palettes, UI/UX design, color schemes, design inspiration, ColorCraft",
  robots: "index, follow",
  alternates: {
    canonical: "/Resources/PaletteList",
  },
  openGraph: {
    title: "Curated Color Palettes - ColorCraft",
    description:
      "Explore handpicked color palettes for UI/UX inspiration, filterable by type and usage.",
    url: "/Resources/PaletteList",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Curated Color Palettes - ColorCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Color Palettes - ColorCraft",
    description:
      "Explore handpicked color palettes for UI/UX inspiration, filterable by type and usage.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Curated Color Palettes - ColorCraft",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Curated Color Palettes",
      "description":
        "A collection of handpicked color schemes curated for UI/UX inspiration, filterable by type and usage.",
      "url": `${BASE_URL}/Resources/PaletteList`,
    },
  },
};

export default function PalettesPage() {
  return <PalettesClient />;
}