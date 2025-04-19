'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden flex items-center min-h-[calc(100dvh-110px)]">
      {/* Gradient Background Animation */}
      <div className="absolute inset-0 animate-gradient z-0" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 py-8 sm:py-12">
        <span className="mb-2 text-sm md:text-base text-purple-400 border border-purple-500 px-4 py-1 rounded-full inline-block">
        Master Your Money. Rewire Your Habits. Transform Your Reality.
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-purple-400 to-purple-600 text-transparent bg-clip-text">
          PERSPECTIFY<span className="text-purple-500">AI</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-300 text-base md:text-lg">
        Set goals, track progress, learn faster, and grow — all guided by intelligent tools designed for real-world impact.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-purple-600 text-white hover:bg-purple-700 transition cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href="/waitlist">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-900/30 transition cursor-pointer"
            >
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-[-1px] left-0 w-full z-0 pointer-events-none">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[100px] sm:h-[120px]"
        >
          <path
            d="M-0.84,87.54 C150.00,150.00 349.83,13.65 500.84,87.54 L500.00,150.00 L0.00,150.00 Z"
            className="fill-purple-700 opacity-20"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
