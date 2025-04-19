'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Brain,
  PieChart,
  BookOpen,
  Coins,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="text-purple-400 w-6 h-6" />,
    title: '🎯 Goal-Driven Financial Habits',
    description:
      'Create real goals. Build habits that stick. Track your transformation.',
  },
  {
    icon: <Brain className="text-purple-400 w-6 h-6" />,
    title: '🧠 AI Guidance That Adapts',
    description:
      'Your personal assistant for money, mindset, and mastery — always evolving with you.',
  },
  {
    icon: <PieChart className="text-purple-400 w-6 h-6" />,
    title: '📊 Real-Time Budget & Expense Tracking',
    description: 'Stay sharp. Stay clear. No confusion, just clarity.',
  },
  {
    icon: <BookOpen className="text-purple-400 w-6 h-6" />,
    title: '📚 Interactive Lessons + Quizzes (Coming Soon)',
    description:
      'Learn what school never taught you. Designed for how you live and grow.',
  },
  {
    icon: <Coins className="text-purple-400 w-6 h-6" />,
    title: '🪙 Token-Enabled Growth (Coming Soon)',
    description:
      'Engage, learn, grow — and earn. Our reward system is designed to give back to those who build forward.',
  },
  {
    icon: <Users className="text-purple-400 w-6 h-6" />,
    title: '🌐 PerspectiveLive Community Hub',
    description:
      'Not just a feature. A movement. Rise through challenges. Earn your Catalyst Score. PerspectiveLive is where growth becomes legacy — and community becomes currency.',
  },
];

export default function CoreFeaturesSection() {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Your Growth. Gamified. Guided. Grounded.
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 hover:scale-[1.03] transition-all duration-300 border border-transparent hover:border-purple-500"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
