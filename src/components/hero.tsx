'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden flex items-center min-h-[calc(100dvh-110px)]">
      {/* Gradient Background Animation */}
      <div className="absolute inset-0 animate-gradient z-0" />

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/official_logo.png"
          alt="PerspectifyAI Logo"
          width={450}
          height={450}
          className="opacity-25 object-contain"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 py-8 sm:py-12">
        <span className="mb-2 text-sm md:text-base text-white border border-purple-500 px-4 py-1 rounded-full inline-block backdrop-blur-md">
          Master Your Money. Rewire Your Habits. Transform Your Reality.
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-purple-400 to-purple-600 text-transparent bg-clip-text">
          PERSPECTIFY<span className="text-purple-400">AI</span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-100 text-base md:text-lg">
          Set goals, track progress, learn faster, and grow — all guided by intelligent tools designed for real-world impact.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition">
              Get Started
            </Button>
          </Link>
          <Link href="https://ko-fi.com/perspectifyai" target="_blank">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition">
              Support on Ko-fi
            </Button>
          </Link>
          <Link href="/waitlist">
            <Button className="bg-transparent border border-purple-500 text-purple-300 hover:bg-purple-800/30 font-semibold px-6 py-2 rounded-lg transition">
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
