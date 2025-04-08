'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
  const { user, isLoaded } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Auto-scroll to top when on homepage
  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black via-[#1c0032] to-black/90 backdrop-blur-md border-b border-purple-800 shadow-md">
      <nav className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PerspectifyAI Logo"
            width={130}
            height={40}
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/#home"
            className="text-white text-sm hover:text-purple-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/#features"
            className="text-white text-sm hover:text-purple-400 transition duration-300"
          >
            Features
          </Link>
          <Link
            href="/#about-us"
            className="text-white text-sm hover:text-purple-400 transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            className="text-white text-sm hover:text-purple-400 transition duration-300"
          >
            Contact
          </Link>

          {isLoaded && user && (
            <span className="text-sm text-white">Hi, {user.firstName} 👋</span>
          )}

          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-white hover:text-purple-400 hover:bg-transparent transition"
              >
                <LayoutDashboard size={16} className="mr-1" />
                Dashboard
              </Button>
            </Link>
            <Link href="/transaction/create">
              <Button className="bg-white text-purple-800 hover:bg-purple-100 transition">
                <PenBox size={16} className="mr-1" />
                Add
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8 border border-white shadow-sm',
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button className="group bg-white text-purple-800 transition hover:bg-purple-100 relative overflow-hidden cursor-pointer shadow hover:shadow-purple-500/30">
                <span className="relative z-10">Login</span>
                <span className="absolute inset-0 bg-purple-300 opacity-0 group-hover:opacity-20 transition duration-500 rounded-lg" />
              </Button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'md:hidden bg-black/90 border-t border-purple-800 transition-all duration-300 overflow-hidden backdrop-blur-sm',
          menuOpen ? 'max-h-64 py-3 px-4' : 'max-h-0'
        )}
      >
        <div className="flex flex-col gap-3 text-white text-sm">
          <Link
            href="/#home"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-300 transition"
          >
            Home
          </Link>
          <Link
            href="/#features"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-300 transition"
          >
            Features
          </Link>
          <Link
            href="/#about-us"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-300 transition"
          >
            About Us
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-purple-300 transition"
          >
            Contact
          </Link>

          <SignedIn>
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-300 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/transaction/create"
              onClick={() => setMenuOpen(false)}
              className="hover:text-purple-300 transition"
            >
              Add Transaction
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-7 h-7 border border-white',
                  },
                }}
              />
              {isLoaded && user?.firstName && <span>{user.firstName}</span>}
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <div className="mt-2 text-purple-300 hover:text-white transition cursor-pointer">
                Login
              </div>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header
