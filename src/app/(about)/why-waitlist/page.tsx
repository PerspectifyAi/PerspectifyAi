// app/why-waitlist/page.tsx

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const incentives = [
  {
    title: "Early Bird Offer",
    icon: <Clock className="w-6 h-6 text-yellow-400" />,
    description: "First 100 users get exclusive access and perks!",
    badge: "Limited 🎁",
  },
  {
    title: "Leaderboard Rewards",
    icon: <Trophy className="w-6 h-6 text-orange-400" />,
    description:
      "Top referrers will win exciting prizes including free subscriptions.",
    badge: "Top 10 🔥",
  },
  {
    title: "Subscription Prizes",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    description:
      "Win 6-month, 3-month, or 1-month free subscriptions based on your rank!",
    badge: "Win Big ✨",
  },
];

export default function WhyWaitlistPage() {
  return (
    <section className="bg-black min-h-screen py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-10 shadow-xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            🎉 Why Join the Waitlist?
          </h2>
          <p className="text-lg text-gray-300">
            Get rewarded for joining early. Invite friends, climb the leaderboard,
            and unlock premium features!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {incentives.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 border border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300 text-white">
                <CardContent className="flex flex-col items-center text-center gap-4 py-6 px-4">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                  <span className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-full">
                    {item.badge}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/waitlist">
            <Button
              className="text-lg px-6 py-3 rounded-2xl shadow-lg bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
            >
              🚀 Join the Waitlist
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
