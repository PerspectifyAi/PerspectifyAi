'use client';

import Image from 'next/image';
import { Users, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
            Perspectify was born from lived experience — not research papers. It’s not about credentials. It’s about clarity, conviction, and the discipline to build something real.
            Built by two young visionaries who had to figure it out the hard way. Now, they&apos;re building a system to make sure others don’t have to.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Founder 1 - Christopher */}
          <div className="bg-purple-800/30 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 flex flex-col">
            <div className="relative w-full h-[400px]">
              <Image
                src="/founders/founder1.png"
                alt="Christopher Tate"
                fill
                className="object-cover hover:brightness-105 transition duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-purple-200">
                Christopher Tate – Co-Founder, Product & Vision
              </h3>
              <p className="text-gray-300 mt-2 flex-grow">
                Strategic architect. Vision-builder. Creative executioner. Chris drives the core systems behind Perspectify — combining deep thinking, structured design, and lived experience to craft a platform that feels more like a movement than an app. His mind is always five phases ahead — shaping the blueprint for what this system will become.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="https://www.linkedin.com/in/christopher-tate-367915302/" target="_blank" className="hover:text-purple-400 transition">
                  <Linkedin size={22} />
                </Link>
                <Link href="https://www.instagram.com/chris.perspectifier/" target="_blank" className="hover:text-purple-400 transition">
                  <Instagram size={22} />
                </Link>
              </div>
            </div>
          </div>

          {/* Founder 2 - Isaiah */}
          <div className="bg-purple-800/30 rounded-2xl shadow-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 flex flex-col">
            <div className="relative w-full h-[400px]">
              <Image
                src="/founders/founder2.png"
                alt="Isaiah Williams"
                fill
                className="object-cover hover:brightness-105 transition duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-purple-200">
                Isaiah Williams – Co-Founder, Community & Operations
              </h3>
              <p className="text-gray-300 mt-2 flex-grow">
                Grounded force. Community-focused. Connector of people and purpose. Isaiah brings balance to the build — helping scale partnerships, amplify growth, and keep the energy aligned. With a deep commitment to education and access, he makes sure Perspectify shows up where it matters most.
              </p>
              <div className="flex gap-4 mt-4">
                <Link href="https://www.linkedin.com/in/isaiah-williams-1443a628b/" target="_blank" className="hover:text-purple-400 transition">
                  <Linkedin size={22} />
                </Link>
                <Link href="https://www.instagram.com/isaiah_jw4/" target="_blank" className="hover:text-purple-400 transition">
                  <Instagram size={22} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-16">
          <Link href="/">
            <Button
              variant="outline"
              className="text-purple-300 border-purple-500 hover:bg-purple-800 cursor-pointer"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
