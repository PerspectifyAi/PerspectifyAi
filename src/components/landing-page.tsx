'use client'

import React, { useEffect } from 'react'
import HeroSection from '@/components/hero'
import AboutSection from '@/components/landing/AboutSection'
import FeaturesSection from './landing/FeaturesSection'
import TestimonialsSection from './landing/TestimonialsSection'
import Footer from '@/components/Footer'
import PartnershipSection from './landing/PartnershipSection'
import FAQAndContactSection from './landing/faq-and-contact'
import TeamSection from './landing/TeamSection'

const LandingPage: React.FC = () => {
  // Fix: Scroll to section if URL contains a hash (e.g. /#features)
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section id="home">
      <HeroSection />
      </section>
      

      {/* About Section */}
      <section  id="about-us">
      <AboutSection />
      </section>
      

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* How it Works Section */}
      <section>
        <PartnershipSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <FAQAndContactSection />
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
