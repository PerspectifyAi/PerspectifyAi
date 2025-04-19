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
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          About Perspectify<span className="text-purple-500">AI</span>
        </h2>

        {/* New Intro Content */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-4">
            We’re not another finance app. We’re a framework for transformation.
          </h3>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/** Reusable Card Styles */}
          {[
            {
              icon: <Sparkles className="text-purple-300 mb-4 h-6 w-6" />,
              title: "Our Mission & Vision",
              content:
                "Perspectify was born from one truth: Most people weren’t taught how to master their money — or themselves.",
              link: "/about",
            },
            {
              icon: <Users className="text-purple-300 mb-4 h-6 w-6" />,
              title: "Founder’s Story",
              content:
                "Co-founded by Isaiah Williams and Christopher Tate, PerspectifyAI was born from lived experience — not just research.",
              link: "/founder",
            },
            {
              icon: <Star className="text-purple-300 mb-4 h-6 w-6" />,
              title: "Core Values",
              content: (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-purple-300 h-5 w-5 mt-1" />
                    <p className="text-white font-medium">Financial Habits</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="text-purple-300 h-5 w-5 mt-1" />
                    <p className="text-white font-medium">Simplicity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="text-purple-300 h-5 w-5 mt-1" />
                    <p className="text-white font-medium mb-3.5">Empowerment</p>
                  </div>
                </div>
              ),
              link: "/corefeatures",
            },
            {
              icon: <Globe2 className="text-purple-300 mb-4 h-6 w-6" />,
              title: "Social Impact",
              content: (
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
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-2xl shadow-xl hover:shadow-purple-500/70 transform hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glow Border Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 rounded-2xl pointer-events-none" />

              <div className="relative z-10">
                {item.icon}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {item.content}
                </div>
                {item.link && (
                  <Link href={item.link}>
                    <Button
                      variant="outline"
                      className="relative overflow-hidden text-purple-300 border-purple-500 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all duration-300 backdrop-blur-sm hover:shadow-lg group"
                    >
                      <span className="z-10 relative">Read More</span>
                      <span className="absolute inset-0 bg-purple-500 opacity-10 group-hover:opacity-20 transition-all rounded-md" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
