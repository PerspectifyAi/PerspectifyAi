'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  params: {
    referralId: string;
  };
}

export default function ReferralWaitlistPage({ params }: Props) {
  const router = useRouter();
  const referralId = params.referralId;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert('Please enter both name and email.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, referredBy: referralId }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/thank-you?ref=${data.referralId}`);
      } else {
        alert(data.error || data.message || 'Failed to join waitlist.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">🚀 Join the Waitlist</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-gray-900 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Join Waitlist'}
        </button>
      </form>
    </div>
  );
}
