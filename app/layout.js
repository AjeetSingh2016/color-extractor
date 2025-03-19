import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const baseUrl = "https://colorcraft.dev";

export const metadata = {
  metadataBase: new URL(baseUrl), // Recommended: allows relative URLs in metadata
  title: {
    default: "ColorCraft - Ultimate Color Toolkit",
    template: "%s | ColorCraft",
  },
  description:
    "ColorCraft is the ultimate toolkit for designers & developers. Extract palettes, generate gradients, check contrast, and more.",
  keywords: "color toolkit, gradient generator, palette extractor, contrast checker, UI design tools",
  robots: "index, follow",
  alternates: {
    canonical: "/", // Using relative URL with metadataBase set
  },
  openGraph: {
    title: "ColorCraft - The Ultimate Color Toolkit",
    description:
      "All-in-one color tools for designers & developers. Generate color palettes, gradients, and check accessibility.",
    type: "website",
    url: "/", // Using relative URL, which becomes "https://colorcraft.dev/" with metadataBase
    images: [
      {
        url: "/og-image.jpg", // Relative URL is resolved automatically
        width: 1200,
        height: 630,
        alt: "ColorCraft - The Ultimate Color Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorCraft - The Ultimate Color Toolkit",
    description:
      "All-in-one color tools for designers & developers. Generate color palettes, gradients, and check accessibility.",
    images: [
      {
        url: "/og-image.jpg", // Relative URL will be prefixed automatically
        width: 1200,
        height: 630,
        alt: "ColorCraft - The Ultimate Color Toolkit",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}