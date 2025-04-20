'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const team = [
  {
    name: 'Christopher Tate',
    role: 'Co-Founder | Strategy & Creative Executioner',
    image: '/founders/founder1.png',
  },
  {
    name: 'Isaiah',
    role: 'Co-Founder | Operations & Community Growth',
    image: '/founders/founder2.png',
  },
  {
    name: 'Charan Puttala',
    role: 'Systems & Ops Manager',
    image: '/Teams/Charan.jpeg',
  },
  {
    name: 'Ratikanta Behera',
    role: 'Web Lead & Backend Engineer',
    image: '/Teams/Ratikanta.png',
  },
  {
    name: 'Abhisek Samantaray',
    role: 'Frontend Developer',
    image: '/Teams/Abhisek.jpg',
  },
  {
    name: 'Rohan Kumar Muduli',
    role: 'UX/UI Designer',
    image: '/Teams/Rohan.png',
  },
  {
    name: 'Piyush Oram',
    role: 'Core Team',
    image: '/Teams/Piyush.jpg',
  },
  {
    name: 'Nithiesh Naik',
    role: 'Core Team',
    image: '/Teams/Nithiesh.jpg',
  },
];

export default function MeetOurTeam() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isHovering.current) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.5;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    container.scrollLeft = 0;
    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-4 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Meet Our Team
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          We’re builders, creators, visionaries — designing the future of financial empowerment.
        </h3>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar scroll-smooth whitespace-nowrap"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
          onTouchStart={() => (isHovering.current = true)}
          onTouchEnd={() => (isHovering.current = false)}
        >
          {[...team, ...team].map((member, index) => (
            <div
              key={index}
              className="min-w-[260px] max-w-[260px] bg-[#1a1a1a] rounded-2xl border border-purple-700/20 p-6 shadow-md hover:shadow-purple-500/20 transition-transform hover:scale-105 cursor-pointer"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="rounded-full object-cover mx-auto mb-4 border-2 border-purple-500"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-purple-300 text-sm break-words">
                {member.role.split('|').map((text, idx) => (
                  <span key={idx}>
                    {text}
                    {idx === 0 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

