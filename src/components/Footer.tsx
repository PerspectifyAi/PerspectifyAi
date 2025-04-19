'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition-all duration-200">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-all duration-200">About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-all duration-200">Services</Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-white transition-all duration-200">Reports</Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="https://www.linkedin.com/company/perspectifyai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-200">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/perspectifyai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-200">Instagram</a>
            </li>
            <li>
              <a href="https://x.com/perspectifyai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-200">Twitter (X)</a>
            </li>
            <li>
              <a href="https://ko-fi.com/perspectifyai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-200">Support or Join Us on Ko-Fi</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-sm p-2 rounded focus:outline-none"
            />
            <button className="bg-purple-600 hover:bg-purple-700 transition text-sm px-4 py-2 rounded w-fit">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>📍 123 Innovation Street</li>
            <li>📞 1-800-PERSPECTIFY</li>
            <li>📧 Support@perspectifyai.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-gray-400 space-y-2 md:space-y-0">
        <p>© 2025 PerspectifyAI. All rights reserved.</p>
        <div className="space-x-4">
          <a href="/terms" className="hover:text-white cursor-pointer transition">Terms of Service</a>
          <a href="/privacy" className="hover:text-white cursor-pointer transition">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}
