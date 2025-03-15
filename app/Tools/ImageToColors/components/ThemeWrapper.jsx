"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

export default function ThemeWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a static fallback during server-side rendering
    return (
      <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-red-500">
        {children}
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}