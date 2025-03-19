import ColorLibrary from "./Components/ColorLibrary";

const BASE_URL = "https://colorcraft.dev";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Color Library - ColorCraft | Browse Named Colors with HEX Codes",
  description:
    "Explore a comprehensive library of named colors with HEX codes. Filter by hue, lightness, and saturation to find the perfect shade for your project.",
  keywords: "color library, named colors, HEX codes, color palette, ColorCraft",
  robots: "index, follow",
  alternates: {
    canonical: "/Resources/ColorList",
  },
  openGraph: {
    title: "Color Library - ColorCraft",
    description: "Browse a list of named colors with HEX codes, filterable by hue, lightness, and saturation.",
    url: "/Resources/ColorList",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Color Library - ColorCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Library - ColorCraft",
    description: "Browse a list of named colors with HEX codes, filterable by hue, lightness, and saturation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Color Library - ColorCraft",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Color Library",
      "description": "A library of named colors with HEX codes, filterable by hue, lightness, and saturation.",
      "url": `${BASE_URL}/Resources/ColorList`,
    },
  },
};

export default function ColorLibraryPage() {
  return <ColorLibrary />;
}