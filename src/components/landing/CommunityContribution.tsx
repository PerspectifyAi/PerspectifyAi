'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, HandHeart, Bell, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommunityContribution() {
  const router = useRouter();

  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent"
        >
          Join the Movement
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Whether you&apos;re just starting, rebuilding, or ready to master your flow — Perspectify meets you where you are and helps you grow from there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-[#1a1a1a] border border-purple-900 p-8 rounded-2xl shadow-md max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
            💜 Get Involved
          </h3>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            The system was built by those who figured it out — for those who are still figuring it out. 
            Whether you&apos;re testing the tools or helping others, you&apos;re part of the future we&apos;re building together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push('/waitlist')}
              className="w-full sm:w-auto border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles size={18} className="group-hover:animate-pulse" />
              Join the Waitlist
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open('https://ko-fi.com/perspectifyai', '_blank')}
              className="w-full sm:w-auto border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all flex items-center justify-center gap-2 group"
            >
              <HandHeart size={18} className="group-hover:animate-pulse" />
              Support on Ko-Fi
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push('https://t.me/perspectifybot?start=1727792237265')}
              className="w-full sm:w-auto border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all flex items-center justify-center gap-2 group"
            >
              <Bell size={18} className="group-hover:animate-pulse" />
              Join telegram
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-gray-500 italic mt-12 max-w-xl mx-auto"
        >
          We’re not here to go viral. We’re here to create value.
        </motion.p>
      </div>
    </section>
  );
}
