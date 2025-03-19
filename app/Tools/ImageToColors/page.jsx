import ImageToColorsClient from './components/ImageToColorsClient';

const BASE_URL = "https://colorcraft.dev";

// Metadata for SEO (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Image to Colors - Extract Palettes from Images | ColorCraft",
  description:
    "Upload an image and extract its dominant colors and palettes. Free online tool for color analysis and palette creation.",
  keywords:
    "image to colors, extract colors from image, color palette, dominant colors, color analysis, image palette, color scheme",
  robots: "index, follow",
  alternates: {
    canonical: "/Tools/ImageToColors",
  },
  openGraph: {
    title: "Image to Colors - Extract Palettes from Images",
    description:
      "Upload any image and extract its dominant colors to create beautiful palettes. Perfect for designers and artists.",
    url: "/Tools/ImageToColors",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image to Colors - Extract Palettes from Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Colors - Extract Palettes from Images",
    description:
      "Analyze any image and extract its key colors to create harmonious palettes. Essential tool for digital designers.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image to Colors - Extract Palettes from Images",
      },
    ],
  },
  other: {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Image to Colors",
      "description":
        "A free tool to extract color palettes from any image. Analyze images and discover their dominant colors for design projects.",
      "url": `${BASE_URL}/Tools/ImageToColors`,
    },
  },
};

const page = () => {
  return (
    <>
      <ImageToColorsClient />
    </>
  );
};

export default page;