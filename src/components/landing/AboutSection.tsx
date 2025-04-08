'use client';

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import { Sparkles, Users, Globe2, Star } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          About Perspectify<span className="text-purple-500">AI</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Mission & Vision */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Sparkles className="text-purple-300 mb-4 h-6 w-6" />
            <h3 className="text-xl font-semibold mb-2">Our Mission & Vision</h3>
            <p className="text-gray-300 mb-4">
              Empower everyone to take control of their finances with AI-driven insights.
            </p>
            <Link href="/about">
              <Button
                variant="outline"
                className="text-purple-300 border-purple-500 hover:bg-purple-800 hover:text-white transition cursor-pointer"
              >
                Read More
              </Button>
            </Link>
          </div>

          {/* Founder */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Users className="text-purple-300 mb-4 h-6 w-6" />
            <h3 className="text-xl font-semibold mb-2">Founder&apos;s Story</h3>
            <p className="text-gray-300 mb-4">
              Inspired by real financial struggles, our founder built PerspectifyAI to simplify finance.
            </p>
            <Link href="/founder">
              <Button
                variant="outline"
                className="text-purple-300 border-purple-500 hover:bg-purple-800 hover:text-white transition cursor-pointer"
              >
                Read More
              </Button>
            </Link>
          </div>

          {/* Core Values */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Star className="text-purple-300 mb-4 h-6 w-6" />
            <h3 className="text-xl font-semibold mb-4">Core Values</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="text-purple-300 h-5 w-5 mt-1" />
                <div>
                  <p className="text-white font-medium">Transparency</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="text-purple-300 h-5 w-5 mt-1" />
                <div>
                  <p className="text-white font-medium">Simplicity</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-purple-300 h-5 w-5 mt-1" />
                <div>
                  <p className="text-white font-medium">Empowerment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe2 className="text-purple-300 h-5 w-5 mt-1" />
                <div>
                  <p className="text-white font-medium">Innovation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Impact */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Globe2 className="text-purple-300 mb-4 h-6 w-6" />
            <h3 className="text-xl font-semibold mb-4">Social Impact</h3>
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="text-purple-400 text-lg font-bold">
                  <CountUp end={100000} duration={3} separator="," />+
                </span>{" "}
                Users Helped
              </li>
              <li>
                <span className="text-purple-400 text-lg font-bold">
                  <CountUp end={89} duration={2.5} />%
                </span>{" "}
                Success Rate
              </li>
              <li>
                <span className="text-purple-400 text-lg font-bold">
                  <CountUp end={50} duration={2} />
                </span>{" "}
                Countries
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
