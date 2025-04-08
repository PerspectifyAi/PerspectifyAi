'use client';

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MissionPage() {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles className="mx-auto text-purple-400 h-10 w-10" />
          <h1 className="text-4xl font-bold mt-4 text-purple-100">
            Our Mission & Vision
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            At PerspectifyAI, we aim to empower individuals with financial intelligence using AI-powered insights. We believe in a world where everyone—regardless of income or education—has the tools to take control of their finances.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-purple-300">Our Mission</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              To make personal finance transparent, approachable, and smart through innovative AI tools that guide, suggest, and empower users to achieve financial freedom.
            </p>
          </div>

          <div className="bg-purple-800/30 p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-purple-300">Our Vision</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              A future where AI democratizes financial literacy and decision-making—helping billions create smarter money habits, investments, and savings.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
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
