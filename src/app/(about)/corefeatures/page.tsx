'use client';

import React from 'react';
import {
  CheckCircle,
  Brain,
  PieChart,
  BookOpen,
  Sparkles,
  Coins,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-purple-400" />,
    title: '🎯 Goal-Driven Financial Habits',
    description:
      'Create real goals. Build habits that stick. Track your transformation.',
  },
  {
    icon: <Brain className="h-6 w-6 text-purple-400" />,
    title: '🧠 AI Guidance That Adapts',
    description:
      'Your personal assistant for money, mindset, and mastery — always evolving with you.',
  },
  {
    icon: <PieChart className="h-6 w-6 text-purple-400" />,
    title: '📊 Real-Time Budget & Expense Tracking',
    description: 'Stay sharp. Stay clear. No confusion, just clarity.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-purple-400" />,
    title: '📚 Interactive Lessons + Quizzes (Coming Soon)',
    description:
      'Learn what school never taught you. Designed for how you live and grow.',
  },
  {
    icon: <Sparkles className="h-6 w-6 text-purple-400" />,
    title: '💡 Self-Reflection + Weekly Check-ins',
    description:
      'It’s not just what you spend — it’s how you think. Get insights that move you forward.',
  },
  {
    icon: <Coins className="h-6 w-6 text-purple-400" />,
    title: '🪙 Token-Enabled Growth (Coming Soon)',
    description:
      'Engage, learn, grow — and earn. Our reward system is designed to give back to those who build forward.',
  },
  {
    icon: <Users className="h-6 w-6 text-purple-400" />,
    title: '🌐 PerspectiveLive Community Hub',
    description:
      'Not just a feature. A movement. Rise through challenges. Earn your Catalyst Score. PerspectiveLive is where growth becomes legacy — and community becomes currency.',
  },
];

export default function CoreFeaturesPage() {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
            Your Growth. Gamified. Guided. Grounded.
          </h1>
        </div>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
