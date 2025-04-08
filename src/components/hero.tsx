'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden min-h-screen flex items-center pt-[64px] md:pt-[72px]">
      {/* Animated background */}
      <div className="absolute inset-0 animate-gradient z-0" />

      {/* Hero Content */}
      <div className="relative z-10 w-full text-center px-4 pb-8">
        <span className="mb-3 text-sm md:text-base text-purple-400 border border-purple-500 px-4 py-1 rounded-full inline-block">
          AI-Powered Finance Assistant
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-white via-purple-400 to-purple-600 text-transparent bg-clip-text">
          PERSPECTIFY<span className="text-purple-500">AI</span>
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-300 text-base md:text-lg">
          Manage expenses, scan receipts, and gain AI-driven insights — all in one powerful dashboard.
          
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/dashboard">
            <Button className="bg-purple-600 text-white hover:bg-purple-700 transition cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-900/30 transition cursor-pointer"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      {/* Wave Background - Fixed gap */}
      <div className="absolute bottom-[-2px] left-0 w-full z-0">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[120px] block"
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
