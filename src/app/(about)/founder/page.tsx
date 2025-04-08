'use client';

import Image from "next/image";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FounderPage() {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Users className="mx-auto text-purple-400 h-10 w-10" />
          <h1 className="text-4xl font-bold mt-4 text-purple-100">
            Meet Our Founders
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Driven by personal struggles and inspired to bring change, our founders created PerspectifyAI to make financial clarity accessible to all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {/* Founder 1 */}
          <div className="bg-purple-800/30 rounded-2xl p-6 shadow-lg">
            <Image
            src="/founders/founder1.jpg"
              alt="Founder 1"
              width={400}
              height={400}
              className="rounded-xl w-full object-cover"
            />
            <h3 className="text-2xl font-semibold text-purple-200 mt-6">Aman Raj</h3>
            <p className="text-gray-300 mt-2">
              Coming from a small-town background, Aman faced financial confusion and limited access to advice. That challenge became his drive to innovate a smarter way to handle money.
            </p>
          </div>

          {/* Founder 2 */}
          <div className="bg-purple-800/30 rounded-2xl p-6 shadow-lg">
            <Image
              src="/founders/founder2.jpg"
              alt="Founder 2"
              width={400}
              height={400}
              className="rounded-xl w-full object-cover"
            />
            <h3 className="text-2xl font-semibold text-purple-200 mt-6">Ankit Sharma</h3>
            <p className="text-gray-300 mt-2">
              Ankit, a tech enthusiast and finance nerd, wanted to combine machine learning and empathy to build a product that understands real-world money pain—and solves it.
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
