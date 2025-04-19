'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { Copy, Check } from 'lucide-react';

interface LeaderboardEntry {
  name: string;
  coins: number;
  referrals: number;
  rank: number;
}

export default function WaitlistPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [referredBy, setReferredBy] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [referralId, setReferralId] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lbLoading, setLbLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Capture ?ref=xyz into sessionStorage
  useEffect(() => {
    const r = searchParams.get('ref');
    if (r) sessionStorage.setItem('referredBy', r);
  }, [searchParams]);

  // If not signed in, redirect to sign-in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in?redirect_url=/waitlist');
    }
  }, [isLoaded, isSignedIn, router]);

  // Prefill name & referral
  useEffect(() => {
    if (!isLoaded || !user) return;
    setName(user.fullName || '');
    setReferredBy(sessionStorage.getItem('referredBy') || '');
  }, [isLoaded, user]);

  // Fetch leaderboard
  useEffect(() => {
    async function fetchLb() {
      try {
        const res = await fetch('/api/waitlist/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setLeaderboard(data.leaderboard || data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLbLoading(false);
      }
    }
    fetchLb();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) return alert('Please enter your name');
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, referredBy: referredBy || undefined }),
      });

      const data = await res.json();

      if (res.ok) {
        // New joiner
        setReferralId(data.referralId);
        router.push(`/thank-you?ref=${data.referralId}`);
      } else {
        // Already on waitlist
        setAlreadyJoined(true);
        if (data.referralId) {
          setReferralId(data.referralId);
        } else if (data.message?.includes('already')) {
          setReferralId(referredBy || null);
        } else {
          alert(data.error || data.message);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!referralId) return;
    const link = `${window.location.origin}/waitlist?ref=${referralId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoaded || !isSignedIn) return null;

  const spotsLeft = 500 - leaderboard.length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 mt-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-purple-400">🚀 Join the Waitlist</h1>
        <p className="mt-2 text-gray-300">
          Only <span className="text-yellow-300 font-bold">{spotsLeft}</span> spots left!
        </p>
      </div>

      {/* Form */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl mb-10">
        {alreadyJoined ? (
          <>
            <p className="mb-4 text-red-400 font-semibold text-center">
              ⚠️ You’re already on the waitlist.
            </p>
            {referralId && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleCopy}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-700 px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-800 transition cursor-pointer"
                >
                  {copied ? <Check size={18} /> : '🎉 My Referral Link'}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            {referredBy && (
              <p className="mb-4 text-sm text-gray-400">
                Joined via referral: <code>{referredBy}</code>
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            {/* Additional Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push(`/thank-you?ref=${referralId}`)}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
              >
                My Referral Code
              </button>
              <button
                onClick={() => router.push('/why-waitlist')}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
              >
                Why Join?
              </button>
            </div>
          </>
        )}
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">🏆 Referral Leaderboard</h2>
        {lbLoading ? (
          <p className="text-center text-gray-400">Loading leaderboard...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-center text-gray-400">No entries yet.</p>
        ) : (
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-purple-300 border-b border-gray-700">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Referrals</th>
                <th className="py-2 pr-4">Coins</th>
                <th className="py-2 pr-4">Rewards</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((e, i) => (
                <tr key={i} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="py-2 pr-4">{i + 1}</td>
                  <td className="py-2 pr-4">{e.name.split(' ')[0]}***</td>
                  <td className="py-2 pr-4">{e.referrals}</td>
                  <td className="py-2 pr-4">{e.coins}</td>
                  <td className="py-2 pr-4">
                    {e.rank === 1 && <span className="text-yellow-300">6 Months Premium</span>}
                    {e.rank === 2 && <span className="text-green-300">3 Months Premium</span>}
                    {e.rank === 3 && <span className="text-blue-300">1 Month Premium</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* My Referral Section */}
      {referralId && (
        <div className="bg-gray-900 p-6 mt-10 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-bold text-purple-300 mb-3">🎉 My Referral ID</h3>
          <div className="flex items-center justify-center gap-2">
            <code className="bg-gray-800 px-3 py-1 rounded text-sm text-green-300">
              {`${window.location.origin}/waitlist?ref=${referralId}`}
            </code>
            <button
              onClick={handleCopy}
              className="hover:text-yellow-400 transition cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Share this link to earn coins and climb the leaderboard!
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="mb-3 text-lg font-semibold">🔥 Join our community!</p>
        <a
          href="https://t.me/perspectifybot?start=1727792237265"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Telegram Group
        </a>
      </div>
    </div>
  );
}