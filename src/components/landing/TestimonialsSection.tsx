'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Freelancer",
    // image: "/images/users/arjun.jpg",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "PerspectifyAI completely changed how I manage my finances. It's like having a personal finance coach 24/7.",
  },
  {
    name: "Riya Sharma",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/75.jpg", 
    quote:
      "The AI insights and receipt scanner saved me hours every month. It's a must-have for any business owner.",
  },
  {
    name: "Daniel Lee",
    role: "Product Designer",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "The UI is so clean and intuitive. Budgeting feels effortless for the first time in years.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative bg-[#0f0f0f] text-white py-32 px-4 overflow-hidden">
      {/* Curved SVG wave left to right */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg
          viewBox="0 0 1440 150"
          className="w-full h-32 rotate-0 text-[#1a1a1a]"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className={clsx(
                "bg-[#1a1a1a] p-6 rounded-2xl border border-transparent hover:border-purple-500",
                "shadow-md hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer hover:scale-105"
              )}
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.image || "/images/users/default-avatar.png"}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover border-2 border-purple-500"
                />
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-purple-400">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
