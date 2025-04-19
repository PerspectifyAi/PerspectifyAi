// app/privacy/page.tsx

import React from "react";

export default function PrivacyPage() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-16 bg-black text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
        <p className="mb-6 text-sm text-gray-400">
          (for Website, Ko-Fi, Chatbot, App)
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">1. Data We Collect</h2>
        <p className="mb-4">We collect the following data:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Name (if provided)</li>
          <li>Email address (for waitlist or updates)</li>
          <li>Ko-fi donation/member status</li>
          <li>Chatbot interaction data (used to improve responses)</li>
          <li>Optional community engagement data (Telegram, etc.)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">2. How We Use Your Data</h2>
        <p className="mb-4">Your data is used to:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Deliver chatbot guidance</li>
          <li>Offer personalised prompts</li>
          <li>Track engagement for waitlist features</li>
          <li>Email updates (if opted in)</li>
          <li>Assign access to features, roles, or community tiers</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">3. Data Protection</h2>
        <p className="mb-4">We respect your privacy. All data is:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Stored securely</li>
          <li>Never sold or shared with third-party marketers</li>
          <li>Used only within the scope of Perspectify’s operations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">4. Cookies & Tracking</h2>
        <p className="mb-4">
          We may use basic cookies or analytics (e.g., Google Analytics) to improve site experience. You may choose to disable cookies in your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">5. Third-Party Tools</h2>
        <p className="mb-4">
          We may use third-party services (e.g., Ko-fi, Telegram, Bizichat) to deliver parts of the experience. These services have their own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">6. Opt-Out</h2>
        <p className="mb-4">
          You can opt out of email updates at any time. If you want your data deleted, contact:{" "}
          <a
            href="mailto:support@perspectifyai.com"
            className="text-indigo-400 hover:text-indigo-300 underline hover:underline-offset-2 transition-all duration-200"
          >
            support@perspectifyai.com
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2 text-white">7. Changes to Policy</h2>
        <p className="mb-4">
          We may revise this policy. You’ll be notified of major changes via email or platform updates.
        </p>
      </div>
    </section>
  );
}
