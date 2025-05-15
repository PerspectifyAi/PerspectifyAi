'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReferralLookupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `/api/waitlist/lookup?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (res.ok && data.referralId) {
        router.push(`/thank-you?ref=${data.referralId}`);
      } else {
        setError(data.error || 'Referral ID not found');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-purple-400 text-center">
          🔍 Find My Referral Code
        </h1>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 mb-4 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 transition"
        />

        <button
          onClick={handleLookup}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 focus:bg-green-700 py-2 rounded-lg font-semibold transition-colors disabled:opacity-60 cursor-pointer"
        >
          {loading ? 'Looking up…' : 'Get My Referral Code'}
        </button>

        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-400 mb-2">{error}</p>
            {error === 'Referral ID not found' && (
              <button
                onClick={() => router.push('/waitlist')}
                className="bg-red-600 hover:bg-red-500 focus:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Join the Waitlist
              </button>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="font-semibold mb-2">Join our community!</p>
          <button
            onClick={() => router.push('https://t.me/+KLl14sGMX9lmOGQ9')}
            className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            🔗 Join Telegram
          </button>
        </div>
      </div>
    </div>
  );
}
