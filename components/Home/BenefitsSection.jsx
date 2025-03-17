"use client"
import { motion } from "framer-motion";
import { Palette, Accessibility, Rocket, Code } from "lucide-react";
import { cardVariants } from "@/app/theme";

export default function BenefitsSection({
  currentTheme,
  staggerContainer,
  staggerItem,
}) {
  const benefits = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "All-in-One Toolkit",
      desc: "Everything you need for color in one place, no more switching between tools",
    },
    {
      icon: <Accessibility className="h-8 w-8" />,
      title: "Accessibility-Focused",
      desc: "Built with WCAG standards to ensure your designs are accessible to everyone",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Instant & Free",
      desc: "No sign-up required, just start using our powerful tools immediately",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Lightning-Fast",
      desc: "Built with optimized algorithms and a lightweight framework",
    },
  ];

  return (
    <section className="py-20 px-4" id="tools">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2
            variants={staggerItem}
            className={`text-4xl font-bold mb-3 ${currentTheme.headline}`}
          >
            Why Choose ColorCraft?
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            variants={staggerItem}
            className={`text-xl max-w-2xl mx-auto ${currentTheme.paragraph}`}
          >
            We&apos;ve built the most comprehensive color toolkit for modern designers and developers
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className={`p-6 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300`}
            >
              <div
                className={`mb-5 ${currentTheme.primary} bg-opacity-10 rounded-xl p-3 inline-block`}
              >
                {benefit.icon}
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${currentTheme.headline}`}
              >
                {benefit.title}
              </h3>
              <p className={`${currentTheme.paragraph}`}>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}