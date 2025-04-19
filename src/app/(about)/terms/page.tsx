// app/terms/page.tsx

import React from "react";

export default function TermsPage() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-16 bg-black text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Terms & Conditions</h1>

        <p className="mb-6 text-sm text-gray-400">Last updated: April 19, 2025</p>

        <p className="mb-4">
          Welcome to PerspectifyAI. By accessing our website or using our services, you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. Use of Platform</h2>
        <p className="mb-4">
          PerspectifyAI is a financial knowledge platform. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. Waitlist & Rewards</h2>
        <p className="mb-4">
          Waitlist offers (e.g. early bird access, leaderboard prizes) are promotional and subject to availability. We reserve the right to modify or cancel these offers at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. Subscriptions</h2>
        <p className="mb-4">
          Free and paid subscription access may be offered as part of promotions or leaderboard rankings. Subscription benefits are non-transferable and subject to fair use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Content & Accuracy</h2>
        <p className="mb-4">
          Information provided on PerspectifyAI is for general educational purposes. We do not provide personalized financial advice. Always consult a professional before making financial decisions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Intellectual Property</h2>
        <p className="mb-4">
          All content, logos, and intellectual property on this site are owned by PerspectifyAI and may not be reproduced without permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">6. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the platform means you accept any revised terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">7. Contact Us</h2>
        <p className="mb-4">
          For any questions regarding these Terms, please reach out to us at:{" "}
          <a
            href="mailto:Support@perspectifyai.com"
            className="text-indigo-400 hover:text-indigo-300 underline hover:underline-offset-2 transition-all duration-200"
          >
            Support@perspectifyai.com
          </a>
        </p>
      </div>
    </section>
  );
}
