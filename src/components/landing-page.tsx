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
import WaitlistBanner from './landing/WaitlistBanner' // ✅ Import Waitlist Banner
import CommunityContribution from './landing/CommunityContribution'

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
    <div className="min-h-screen bg-white scroll-smooth pt-8"> {/* Added pt-8 to the top padding of the entire page */}

      {/* Waitlist Banner just below header */}
      <section id="home" className="pt-0">
      </section>
      <WaitlistBanner />

      {/* Hero Section */}
      <section id="home" className="pt-0"> {/* Added pt-12 for padding-top */}
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about-us" className="pt-0"> {/* Added pt-12 for padding-top */}
        <AboutSection />
      </section>

      {/* Features Section */}
      <section id="features" className="pt-0"> {/* Added pt-12 for padding-top */}
        <FeaturesSection />
      </section>


      {/* CommunityContribution seaction */}
      <CommunityContribution/>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* How it Works Section */}
      <section>
        <PartnershipSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-0"> {/* Added pt-12 for padding-top */}
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
