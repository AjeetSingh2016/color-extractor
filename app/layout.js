import ThemeWrapper from "../components/ThemeWrapper";
import "./globals.css";

export const metadata = {
  title: "PaletteCraft",
  description: "Extract and share color palettes from images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}