// app/terms/page.tsx

import React from "react";

export default function TermsPage() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-16 bg-black text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Terms & Conditions (T&amp;Cs)</h1>

        <p className="mb-6 text-sm text-gray-400">Updated: April 19, 2025</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. Use of Platform</h2>
        <p className="mb-4">
          PerspectifyAI is a financial knowledge and self-development platform. By using the website, chatbot, or affiliated tools, you agree to use them lawfully and respectfully, without infringing on the rights or experience of others.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. Waitlist & Rewards</h2>
        <p className="mb-4">
          Waitlist-based offers (including early access, leaderboard rewards, or promotional perks) are optional, limited-time, and subject to change or cancellation at any time without prior notice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. Subscriptions & Memberships</h2>
        <p className="mb-4">
          Both free and paid subscriptions may be provided through leaderboard ranks, donations, or promotions. All benefits are non-transferable and subject to review.
        </p>
        <p className="mb-4">
          Paid tiers are managed via Ko-fi:{" "}
          <a
            href="https://ko-fi.com/perspectifyai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline hover:underline-offset-2 transition-all duration-200"
          >
            ko-fi.com/perspectifyai
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Educational Content Disclaimer</h2>
        <p className="mb-4">
          All information and tools provided through PerspectifyAI are for general educational purposes only. We do not provide licensed financial, legal, or investment advice. You should consult a qualified professional before making any financial decisions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Intellectual Property</h2>
        <p className="mb-4">
          All platform content, tools, brand assets, and visuals are the intellectual property of Perspectify Ltd. No part of this platform may be copied, modified, or redistributed without express permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">6. Changes to Terms</h2>
        <p className="mb-4">
          We may revise these Terms at any time. Continued use of the platform signifies acceptance of any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">7. Contact Us</h2>
        <p className="mb-4">
          For questions or support:{" "}
          <a
            href="mailto:support@perspectifyai.com"
            className="text-indigo-400 hover:text-indigo-300 underline hover:underline-offset-2 transition-all duration-200"
          >
            support@perspectifyai.com
          </a>
        </p>
      </div>
    </section>
  );
}
