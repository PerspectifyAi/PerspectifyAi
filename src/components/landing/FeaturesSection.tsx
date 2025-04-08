'use client';

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  BarChart,
  Zap,
  Settings,
  Star,
} from "lucide-react";

const features = [
  {
    icon: <Sparkles className="text-purple-400 w-6 h-6" />,
    title: "Smart Insights",
    description: "AI-powered recommendations tailored to your spending patterns.",
    extra: "Understand where your money goes and how to improve.",
  },
  {
    icon: <ShieldCheck className="text-purple-400 w-6 h-6" />,
    title: "Secure Data",
    description: "End-to-end encryption ensures complete privacy.",
    extra: "Your financial data is safe, always encrypted and protected.",
  },
  {
    icon: <BarChart className="text-purple-400 w-6 h-6" />,
    title: "Real-Time Tracking",
    description: "Get instant updates on transactions and balances.",
    extra: "Never miss a beat with live financial insights.",
  },
  {
    icon: <Zap className="text-purple-400 w-6 h-6" />,
    title: "AI Receipt Scanner",
    description: "Automatically extract data from your receipts.",
    extra: "Let AI handle the boring parts — no typing required.",
  },
  {
    icon: <Settings className="text-purple-400 w-6 h-6" />,
    title: "Custom Categories",
    description: "Organize spending your way with flexible tagging.",
    extra: "Create rules that suit your unique lifestyle.",
  },
  {
    icon: <Star className="text-purple-400 w-6 h-6" />,
    title: "Recurring Insights",
    description: "Detect and forecast recurring transactions.",
    extra: "Stay on top of subscriptions, bills, and habits.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Powerful Features at Your Fingertips
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-purple-500/40 hover:scale-[1.03] transition-all duration-300 border border-transparent hover:border-purple-500"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
              <p className="text-gray-400 text-xs">{feature.extra}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
