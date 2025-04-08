
'use client'

import Link from 'next/link'
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react'

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
          <div className="flex space-x-4 text-gray-300">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
              <Twitter className="h-5 w-5 hover:text-white transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              <Facebook className="h-5 w-5 hover:text-white transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin className="h-5 w-5 hover:text-white transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
              <Instagram className="h-5 w-5 hover:text-white transition" />
            </a>
          </div>
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
            <li>📧 contact@perspectify.com</li>
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
