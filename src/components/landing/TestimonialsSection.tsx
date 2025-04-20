'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

const testimonials = [
  {
    name: "Malcolm Hodnyl",
    role: "Fashion Designer",
    quote:
      "Perspectify has been incredibly useful in transforming how I feel and manage my business. I’ve gained a lot of insight into financial acumen and how my habits and mentality can significantly impact my finances.",
  },
  {
    name: "Michael Gyasi",
    role: "MMA Fighter",
    quote:
      "Perspectify’s personalisation is amazing. It doesn’t feel like I’m talking to an AI — it’s like having a friend who’s also a financial genie. Perspectify has helped me map out my MMA career, keeping me on track and managing my finances effectively, all while staying cost-efficient. It’s been a game-changer for me.",
  },
  {
    name: "Amira Johnson",
    role: "Startup Founder",
    quote:
      "Perspectify showed me what school never did — how to think strategically about money. The AI gave me personalised insights that actually stuck.",
  },
  {
    name: "Ravi Patel",
    role: "Freelance Creative",
    quote:
      "Before Perspectify, I was surviving. Now I’m building. It’s more than budgeting — it’s mindset training disguised as money coaching.",
  },
  {
    name: "Danielle Mbaye",
    role: "Graduate & Aspiring Investor",
    quote:
      "Perspectify helped me understand how to start investing with confidence, even on a student income. It made me believe financial freedom was possible.",
  },
  {
    name: "Elham Fardad",
    role: "Founder & CEO, Migrant Leaders",
    image: "/Teams/elham_farad.jpg",
    quote:
      "I have thoroughly enjoyed mentoring Christopher and his PerspectifyAi team on this venture. It is so motivating for me to work with young professionals and help them set up their careers for lifelong success.",
  },
];

export default function TestimonialsSection() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    controls.start({ x: '-100%' });
  }, [controls]);

  const stopAnimation = () => controls.stop();
  const startAnimation = () => controls.start({ x: '-100%' });

  // Ensure containerRef.current is defined and scrollWidth can be safely accessed
  const dragConstraints = containerRef.current
    ? { left: -containerRef.current.scrollWidth, right: 0 }
    : { left: -2000, right: 0 };

  return (
    <section className="relative bg-[#0f0f0f] text-white py-32 px-4 overflow-hidden">
      {/* Curved SVG wave */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg
          viewBox="0 0 1440 150"
          className="w-full h-32 text-[#1a1a1a]"
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

        <motion.div
          ref={containerRef}
          initial={{ x: '0%' }}
          animate={controls}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          onMouseEnter={stopAnimation}
          onMouseLeave={startAnimation}
          onTouchStart={stopAnimation}
          onTouchEnd={startAnimation}
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          dragMomentum={false}
          className="flex gap-8 w-max mx-auto cursor-grab active:cursor-grabbing"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="min-w-[300px] max-w-sm bg-[#1a1a1a] p-6 rounded-2xl border border-transparent hover:border-purple-500 shadow-md hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              {t.image && (
                <div className="flex justify-center mb-4">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-purple-500"
                  />
                </div>
              )}

              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-white">{t.name}</h4>
                <p className="text-sm text-purple-400">{t.role}</p>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed text-center">“{t.quote}”</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
