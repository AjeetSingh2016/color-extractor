"use client";
import { motion } from "framer-motion";
import { Palette, Twitter, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import { theme } from "../app/theme";
import Link from "next/link";

// Centralized footer data
const footerData = {
  brand: {
    name: "ColorCraft",
    description:
      "The ultimate color toolkit for designers and developers. Create, extract, and analyze colors with ease. Built with passion for the design community.",
    socialLinks: [
      {
        href: "https://x.com/AjeetSingh76422",
        icon: <Twitter className="h-6 w-6" />,
      },
      { href: "https://www.linkedin.com/in/ajeet-singh-063978177/", icon: <Linkedin className="h-6 w-6" /> },
    ],
  },
  sections: [
    {
      title: "Tools",
      items: [
        { href: "/Tools/GradientGenerator", text: "Gradient Generator" },
        { href: "/Tools/ImageToColors", text: "Image To Colors" },
        { href: "/Tools/CodeConvertor", text: "Code Convertor" },
      ],
    },
    {
      title: "Resources",
      items: [
        { href: "/Resources/ColorList", text: "Colors List" },
        { href: "/Resources/GradientList", text: "Gradient List" },
        { href: "/Resources/PaletteList", text: "Palette List" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/company/About", text: "About" },
        { href: "/company/Terms", text: "Terms" },
        { href: "mailto:2016appsingh@gmail.com", text: "Contact" },
      ],
    },
  ],
  copyright: "© 2025 ColorCraft. All rights reserved.",
};

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <footer className={`${currentTheme.footer} py-12 px-4`} id="company">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:flex-wrap gap-8">
        {/* Brand Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="flex items-center space-x-2 mb-4">
            <Palette
              className={`h-6 w-6 ${
                isDarkMode ? "text-indigo-400" : "text-indigo-300"
              }`}
            />
            <span className="text-xl font-bold text-white">
              {footerData.brand.name}
            </span>
          </div>
          <p className="text-slate-400 mb-6 text-base leading-relaxed">
            {footerData.brand.description}
          </p>
          <div className="flex space-x-6">
          <div className="flex space-x-6">
  {footerData.brand.socialLinks.map((link, index) => (
    <a
      key={index}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-white transition-colors duration-300"
    >
      {link.icon}
    </a>
  ))}
</div>
          </div>
        </div>

        {/* Sections (Tools, Resources, Company) */}
        {footerData.sections.map((section, index) => (
          <div key={index} className="w-full md:w-1/6 sm:w-1/3 flex-shrink-0">
            <h4 className="font-semibold mb-4 text-white text-lg">
              {section.title}
            </h4>
            <ul className="space-y-4">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center">
        <p className="text-slate-400">{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
