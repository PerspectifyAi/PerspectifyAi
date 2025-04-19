'use client';

import React from 'react';

export default function CoreValuesSection() {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          At Perspectify, It’s Bigger Than Code
        </h2>

        <p className="text-lg text-gray-300 text-center mb-10">
          Everything we build is guided by values that go beyond code, content, or tools. These values are the foundation of our culture, our product, and our movement:
        </p>

        <div className="space-y-6 text-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-purple-400">📚 Education</h3>
            <p>
              We believe knowledge is the gateway to freedom. Our systems are designed to teach, challenge, and transform — not just inform.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400">💪 Empowerment</h3>
            <p>
              We’re not here to give handouts. We’re here to help people build systems that give them control over their future.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400">🧱 Integrity</h3>
            <p>
              We don’t do gimmicks. What we offer is real, grounded, and built with honesty at every layer.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400">🚀 Innovation</h3>
            <p>
              We use AI, automation, and gamification not to impress — but to improve lives in ways that actually matter.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400">🌐 Community</h3>
            <p>
              We move together. Growth happens faster when it’s shared. That’s why our tribe is the heartbeat of the platform.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-purple-700 pt-10 text-center">
          <h3 className="text-2xl font-semibold text-purple-300 mb-4">🌍 Our Impact (So Far)</h3>
          <p className="text-gray-300">
            <strong>410 lives reached</strong> — Real people who’ve tested and benefitted from the early version of Perspectify.
          </p>
          <p className="text-gray-300 mt-2">
            <strong>2 countries touched</strong> — Our movement has already crossed borders — and this is just the beginning.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">🌟 The Vision</h3>
          <p className="text-gray-300 text-lg">
            <strong>40 million lives. 195 countries.</strong> <br />
            This is bigger than an app. It’s a global blueprint for transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
