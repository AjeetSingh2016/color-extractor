"use client"
import { motion } from "framer-motion";
import { cardVariants } from "@/app/theme";

export default function TestimonialsSection({ currentTheme, staggerContainer, staggerItem }) {
  const testimonials = [
    {
      quote: "ColorCraft has completely transformed how I approach color in my designs. The palette extraction tool is simply magical!",
      author: "Alex Chen",
      role: "UI Designer",
    },
    {
      quote: "As a developer who's color-blind, the accessibility features in ColorCraft are invaluable. It's become an essential part of my workflow.",
      author: "Jasmine Singh",
      role: "Senior Developer",
    },
  ];

  return (
    <section className="py-24 px-4">
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
            Loved by Creators
          </motion.h2>
          <motion.div
            variants={staggerItem}
            className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            variants={staggerItem}
            className={`text-xl max-w-2xl mx-auto ${currentTheme.paragraph}`}
          >
            See what designers and developers are saying about ColorCraft
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className={`p-8 rounded-2xl ${currentTheme.card} shadow-lg border border-opacity-10 border-slate-300`}
            >
              <div className={`text-3xl ${currentTheme.primary} mb-4`}>“</div>
              <p className={`text-lg mb-6 ${currentTheme.paragraph}`}>
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                <div className="ml-4">
                  <h4 className={`font-semibold ${currentTheme.headline}`}>
                    {testimonial.author}
                  </h4>
                  <p className={`text-sm ${currentTheme.paragraph}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}