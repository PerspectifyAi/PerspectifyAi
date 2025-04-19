// src/app/waitlist/thank-you/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams }      from 'next/navigation'
import { Copy, Share2, Twitter, Facebook, Mail } from 'lucide-react'

export default function ThankYouPage() {
  const params     = useSearchParams()
  const referralId = params.get('ref')

  const [referralCount, setReferralCount]   = useState<number | null>(null)
  const [referralsToTop, setReferralsToTop] = useState<number | null>(null)
  const [copied, setCopied]                 = useState(false)
  const [referralLink, setReferralLink]     = useState('')
  const [hasError, setHasError]             = useState(false)

  // Build the referral link
  useEffect(() => {
    if (referralId && typeof window !== 'undefined') {
      setReferralLink(`${window.location.origin}/waitlist?ref=${referralId}`)
    }
  }, [referralId])

  // Fetch referral stats
  useEffect(() => {
    async function fetchData() {
      try {
        const res  = await fetch(`/api/waitlist/referral-count?ref=${referralId}`)
        const data = await res.json()
        if (res.ok) {
          setReferralCount(data.referralCount)
          setReferralsToTop(data.referralsToTopThree)
        } else {
          setHasError(true)
        }
      } catch (err) {
        console.error('Error fetching referral data:', err)
        setHasError(true)
      }
    }
    if (referralId) fetchData()
  }, [referralId])

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!referralId) {
    return (
      <div className="text-center py-16 text-white">
        <h2 className="text-2xl font-bold text-red-500">❌ Referral code not found.</h2>
        <p className="text-gray-400 mt-2">Please join the waitlist first.</p>
      </div>
    )
  }

  // Pre-build share URLs
  const encodedMessage = encodeURIComponent(`Join PerspectifyAI early! ${referralLink}`)
  const whatsappUrl    = `https://api.whatsapp.com/send?text=${encodedMessage}`
  const twitterUrl     = `https://twitter.com/intent/tweet?text=${encodedMessage}`
  const facebookUrl    = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
  const mailUrl        = `mailto:?subject=Join%20PerspectifyAI&body=${encodedMessage}`

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white text-center space-y-8">
      <h1 className="text-4xl font-bold text-green-400">🎉 You’re on the Waitlist!</h1>
      <p className="text-lg text-gray-300">
        Welcome to <span className="text-purple-400 font-semibold">PerspectifyAI</span> – you’re officially in line.
      </p>

      {/* Referral Stats */}
      {!hasError && referralCount !== null && referralsToTop !== null && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
          <p className="text-xl text-yellow-400 mb-2">
            🔥 You’ve referred <span className="font-bold">{referralCount}</span> people!
          </p>
          {referralsToTop! > 0 ? (
            <>
              <p className="text-gray-400">
                Share with <span className="font-semibold text-blue-400">{referralsToTop}</span> more to reach the <span className="font-bold">Top 3</span>!
              </p>
              <div className="w-full bg-gray-800 rounded-full h-2.5 mt-4">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((3 - referralsToTop!) / 3) * 100)}%` }}
                />
              </div>
            </>
          ) : (
            <p className="text-green-500 font-semibold">🚀 You’re in the Top 3! Keep sharing!</p>
          )}
        </div>
      )}
      {hasError && <p className="text-red-400">⚠️ Failed to load stats. Try again later.</p>}

      {/* Share Input + Copy */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-4">
        <p className="text-xl font-semibold text-purple-300 mb-3">💌 Your Referral Link</p>
        <div className="flex items-center justify-center space-x-2">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-black text-white px-4 py-2 rounded-l-lg border border-gray-600"
          />
          <button onClick={handleCopy} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition">
            {copied ? '✅' : <Copy size={18} />}
          </button>
        </div>
        <p className="text-sm text-gray-400">Copy & share to earn coins and climb the leaderboard!</p>

        {/* Social Share */}
        <div className="flex justify-center space-x-4">
          <button onClick={() => window.open(whatsappUrl, '_blank')} className="bg-green-500 hover:bg-green-600 p-3 rounded-full">
            <Share2 size={24} />
          </button>
          <button onClick={() => window.open(twitterUrl, '_blank')} className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full">
            <Twitter size={24} />
          </button>
          <button onClick={() => window.open(facebookUrl, '_blank')} className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full">
            <Facebook size={24} />
          </button>
          <button onClick={() => window.open(mailUrl, '_blank')} className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full">
            <Mail size={24} />
          </button>
        </div>
      </div>

      {/* Telegram CTA */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">🔔 Stay in the Loop!</h2>
        <p className="text-gray-200 mb-4">
          Get sneak peeks, updates, and exclusive content. Join us on Telegram.
        </p>
        <a
          href="https://t.me/perspectifybot?start=1727792237265"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          🔗 Join Telegram
        </a>
      </div>
    </div>
  )
}


