'use client'

import Link from 'next/link'
import { Sparkles} from 'lucide-react'

const WaitlistBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 text-white py-3 px-4 flex items-center justify-between w-full shadow-md z-40">
      <div className="flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-yellow-300 animate-bounce" />
        <span className="text-sm md:text-base font-medium">
          🚀 Early Access: Join our waitlist & earn rewards!
        </span>
      </div>
      <Link
        href="/waitlist"
        className="bg-white text-purple-800 text-xs md:text-sm px-4 py-2 rounded-lg hover:bg-purple-100 transition font-semibold shadow"
      >
        Join Waitlist
      </Link>
    </div>
  )
}

export default WaitlistBanner
