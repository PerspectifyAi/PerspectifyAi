/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Ayesha Sharma',
    role: 'Co-Founder & CEO',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Visionary leader with a passion for AI and personal finance.',
  },
  {
    name: 'Rohan Mehta',
    role: 'CTO',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Tech wizard focused on making finance accessible through innovation.',
  },
  {
    name: 'Neha Verma',
    role: 'Head of Design',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Crafts beautiful, intuitive interfaces with user-first thinking.',
  },
  {
    name: 'Aman Gupta',
    role: 'Lead Engineer',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Backend and AI specialist with a love for clean code.',
  },
  {
    name: 'Priya Iyer',
    role: 'Marketing Lead',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Drives growth with creativity and data-driven strategies.',
  },
]

export default function MeetOurTeam() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let animationFrame: number

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0
      } else {
        container.scrollLeft += 0.5
      }
      animationFrame = requestAnimationFrame(scroll)
    }

    // Duplicate content for infinite scroll effect
    container.scrollLeft = 0
    animationFrame = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Meet Our Team
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth whitespace-nowrap"
        >
          {[...team, ...team].map((member, index) => (
            <div
              key={index}
              className="min-w-[260px] max-w-[260px] bg-[#1a1a1a] rounded-2xl border border-purple-700/20 p-6 shadow-md hover:shadow-purple-500/20 transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-purple-500"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-purple-300 text-sm">{member.role}</p>
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
