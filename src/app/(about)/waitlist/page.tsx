'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface LeaderboardEntry {
  name: string;
  referrals: number;
  rank: number;
}

export default function WaitlistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referredBy, setReferredBy] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [referralId, setReferralId] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lbLoading, setLbLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [updatesError, setUpdatesError] = useState(false);

  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

  useEffect(() => {
    const r = searchParams.get('ref');
    if (r) sessionStorage.setItem('referredBy', r);
  }, [searchParams]);

  useEffect(() => {
    const storedRef = sessionStorage.getItem('referredBy');
    if (storedRef) setReferredBy(storedRef);
  }, []);

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

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, [EMAILJS_PUBLIC_KEY]);

  // Send a confirmation email using the variable names that your EmailJS template expects.
  // Here we assume your template uses `user_name`, `user_email`, and `referral_link`
  const sendConfirmationEmail = async (
    userName: string,
    userEmail: string,
    userReferralId: string
  ) => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: userName,                        
          email: userEmail,                      
          referral_link: `${window.location.origin}/waitlist?ref=${userReferralId}`, 
        },
        EMAILJS_PUBLIC_KEY                             // fourth argument is required
      );
      console.log('✅ Confirmation email sent');
    } catch (err) {
      console.error('❌ Failed to send confirmation email:', err);
    }
  };

  const handleSubmit = async () => {
    setNameError(false);
    setEmailError(false);
    setTermsError(false);
    setUpdatesError(false);

    if (!name.trim()) {
      setNameError(true);
      return alert('Please enter your name.');
    }

    if (!email.trim()) {
      setEmailError(true);
      return alert('Please enter your email.');
    }
    if (!validateEmail(email.trim())) {
      setEmailError(true);
      return alert('Please enter a valid email address.');
    }

    if (!agreedToTerms) {
      setTermsError(true);
      return alert('You must agree to the Terms of Service and Privacy Policy.');
    }

    if (!wantsUpdates) {
      setUpdatesError(true);
      return alert('You must agree to receive updates, newsletters, and promotional emails.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          referredBy: referredBy || undefined,
          wantsUpdates,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setReferralId(data.referralId);
        setAlreadyJoined(true);

        // Now we send the email to `email.trim()`, using the variable names above.
        await sendConfirmationEmail(name.trim(), email.trim(), data.referralId);

        router.push(`/thank-you?ref=${data.referralId}`);
      } else {
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

  const handleTermsCheckboxChange = () => {
    if (agreedToTerms) {
      setAgreedToTerms(false);
      setTermsError(false);
    } else {
      setShowPolicyModal(true);
    }
  };

  const handlePolicyAccept = () => {
    setAgreedToTerms(true);
    setTermsError(false);
    setShowPolicyModal(false);
  };

  const spotsLeft = 200 - leaderboard.length;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 mt-10 relative">
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
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className={`block mb-2 font-semibold ${nameError ? 'text-red-500' : 'text-gray-100'}`}
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                className={`w-full px-4 py-2 bg-black border ${
                  nameError ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-purple-400`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError(false);
                }}
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className={`block mb-2 font-semibold ${emailError ? 'text-red-500' : 'text-gray-100'}`}
              >
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className={`w-full px-4 py-2 bg-black border ${
                  emailError ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 ${
                  emailError ? 'focus:ring-red-400' : 'focus:ring-purple-400'
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
                placeholder="you@example.com"
              />
            </div>

            {referredBy && (
              <p className="mb-4 text-sm text-gray-400">
                Joined via referral: <code>{referredBy}</code>
              </p>
            )}

            {/* Terms & Privacy Checkbox */}
            <div className="mb-4 flex items-start">
              <input
                type="checkbox"
                id="termsPrivacy"
                checked={agreedToTerms}
                onChange={handleTermsCheckboxChange}
                className={`mt-1 h-4 w-4 ${
                  termsError
                    ? 'text-red-500 border-red-500 focus:ring-red-400'
                    : 'text-purple-500 border-gray-600 focus:ring-purple-400'
                } bg-black rounded cursor-pointer`}
              />
              <label
                htmlFor="termsPrivacy"
                className={`ml-2 text-sm ${termsError ? 'text-red-500' : 'text-gray-300'}`}
              >
                <span className="text-red-500">*</span> I agree to the{' '}
                <span
                  onClick={() => setShowPolicyModal(true)}
                  className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
                >
                  Terms of Service
                </span>{' '}
                and{' '}
                <span
                  onClick={() => setShowPolicyModal(true)}
                  className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
                >
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            {/* Updates Checkbox */}
            <div className="mb-6 flex items-start">
              <input
                type="checkbox"
                id="updates"
                checked={wantsUpdates}
                onChange={() => {
                  setWantsUpdates((prev) => !prev);
                  if (updatesError) setUpdatesError(false);
                }}
                className={`mt-1 h-4 w-4 ${
                  updatesError
                    ? 'text-red-500 border-red-500 focus:ring-red-400'
                    : 'text-green-500 border-gray-600 focus:ring-green-400'
                } bg-black rounded cursor-pointer`}
              />
              <label
                htmlFor="updates"
                className={`ml-2 text-sm ${updatesError ? 'text-red-500' : 'text-gray-400'}`}
              >
                <span className="text-red-500">*</span> I agree to receive updates,
                newsletters, and promotional emails from Perspectify.
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-800 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
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
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((e, i) => (
                <tr key={i} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="py-2 pr-4">{i + 1}</td>
                  <td className="py-2 pr-4">{e.name.split(' ')[0]}***</td>
                  <td className="py-2 pr-4">{e.referrals}</td>
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
            Share this link to climb the leaderboard!
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="mb-3 text-lg font-semibold">🔥 Join our community!</p>
        <a
          href="https://t.me/+KLl14sGMX9lmOGQ9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition cursor-pointer"
        >
          Telegram Group
        </a>
      </div>

      {/* Policy Modal */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              Privacy Policy & Terms of Service
            </h2>

            <div className="mb-6 space-y-4 text-sm text-gray-300">
              <h4 className="font-semibold">1. Data We Collect</h4>
              <ul className="list-disc list-inside">
                <li>Name (if provided)</li>
                <li>Email address (for waitlist or updates)</li>
                <li>Ko-fi donation/member status</li>
                <li>Chatbot interaction data (used to improve responses)</li>
                <li>Optional community engagement data (Telegram, etc.)</li>
              </ul>
              <h4 className="font-semibold">2. How We Use Your Data</h4>
              <ul className="list-disc list-inside">
                <li>Deliver chatbot guidance</li>
                <li>Offer personalized prompts</li>
                <li>Track engagement for waitlist features</li>
                <li>Email updates (if opted in)</li>
                <li>Assign access to features, roles, or community tiers</li>
              </ul>
              <h4 className="font-semibold">3. Data Protection</h4>
              <ul className="list-disc list-inside">
                <li>Stored securely</li>
                <li>Never sold or shared with third-party marketers</li>
                <li>Used only within Perspectify’s operations</li>
              </ul>
              <h4 className="font-semibold">4. Cookies & Tracking</h4>
              <p>
                We may use basic cookies or analytics (e.g., Google Analytics). You may disable cookies in your browser.
              </p>
              <h4 className="font-semibold">5. Third-Party Tools</h4>
              <p>
                We use third-party services (e.g., Ko-fi, Telegram, Bizichat) – see their policies.
              </p>
              <h4 className="font-semibold">6. Opt-Out</h4>
              <p>
                Opt out anytime. To delete data, email{' '}
                <a href="mailto:support@perspectifyai.com" className="underline text-blue-400">
                  support@perspectifyai.com
                </a>
                .
              </p>
              <h4 className="font-semibold">7. Changes to Policy</h4>
              <p>
                We may revise this policy and notify you via email or platform updates.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPolicyModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePolicyAccept}
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition cursor-pointer"
              >
                Accept and Continue
              </button>
            </div>

            <button
              onClick={() => setShowPolicyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
