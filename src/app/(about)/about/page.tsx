'use client';

import { Sparkles, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MissionPage() {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Sparkles className="mx-auto text-purple-400 h-10 w-10" />
          <h1 className="text-4xl font-bold mt-4 text-purple-100">
            Our Mission & Vision
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Perspectify was born from one truth: <br />
            Most people weren’t taught how to master their money — or themselves.
            <br />
            So we built a system for it. <br />
            A place to reprogram your habits, grow your knowledge, and move with clarity. <br />
            Not motivation. Not fluff. Just real tools, smart AI, and habit-driven execution.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-purple-300">Our Mission</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              To make financial empowerment practical, engaging, and transformative — for anyone ready to break cycles and build their own system for success.
            </p>
          </div>

          <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-purple-300">Our Vision</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              To become the most trusted and transformative system for financial education, habit-building, and self-evolution.
            </p>
          </div>
        </div>

        {/* Our Reach Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <Globe2 className="mx-auto text-purple-400 h-10 w-10" />
            <h2 className="text-3xl font-bold mt-4 text-purple-100">
              Our Reach
            </h2>
            <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
              <span className="text-purple-300 font-semibold">Early Proof. Growing Momentum.</span> <br />
              We’ve already tested the platform with over 410 users, received powerful feedback, and supported our first charity initiative serving 12 underrepresented individuals. <br />
              This is just the beginning — but it’s already creating ripples. <br />
              We’re not broadcasting numbers. <br />
              We’re building momentum.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-purple-300">Beta Testers</h3>
              <p className="mt-2 text-gray-300">
                350+ users actively tested the platform and shared valuable feedback that shaped the future roadmap.
              </p>
            </div>

            <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-purple-300">Charity Initiative</h3>
              <p className="mt-2 text-gray-300">
                We helped 12 underrepresented individuals take their first steps toward financial clarity — our first step in many to come.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link href="/">
            <Button variant="outline" className="text-purple-300 border-purple-500 hover:bg-purple-800 cursor-pointer">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
