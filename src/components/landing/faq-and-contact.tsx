'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is PerspectifyAI, really?',
    answer:
      'Perspectify is not just a finance app. It’s a cognitive system designed to help you master your money, habits, and mindset — all through gamified tools and intelligent, guided growth.',
  },
  {
    question: 'Who is this platform for?',
    answer:
      'Anyone who’s tired of feeling behind. Whether you\'re rebuilding, just starting out, or already on the path — Perspectify is designed for those who want real, lasting transformation.',
  },
  {
    question: 'What makes Perspectify different?',
    answer:
      'Most apps give you tools. We give you a system: goal-driven habit building, AI-powered financial assistance, community challenges, reflective learning, and progress you can feel.',
  },
  {
    question: 'Is this free to use?',
    answer:
      'Yes — Perspectify is free to join, use, and grow with. Premium tools and exclusive experiences will be added later, but the core transformation system remains free.',
  },
  {
    question: 'Do I need to understand finance to use this?',
    answer:
      'No. In fact, if you’ve always felt lost around money — this was built for you. The system guides you step-by-step and adapts to your rhythm.',
  },
  {
    question: 'How does the AI help me?',
    answer:
      'It learns your habits and spending style to guide, suggest, and reflect — without judgment — helping you make wiser decisions, faster.',
  },
];

export default function FAQAndContactSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const email = form.get('email');
    const message = form.get('message');

    const res = await fetch('https://sheetdb.io/api/v1/angnxf0zh3xas', {
      method: 'POST',
      body: JSON.stringify({ data: [{ name, email, message }] }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      alert('Message submitted!');
      e.currentTarget.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* FAQs Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-purple-300 mb-6">Real questions. Real clarity. No fluff.</p>
          <div className="space-y-4">
            {faqs.slice(0, 4).map((faq, i) => (
              <motion.div
                key={i}
                className="border border-purple-700/30 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full flex justify-between items-center p-4 font-medium text-left hover:bg-purple-900/10 transition rounded-xl cursor-pointer"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-purple-300" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      className="px-4 pb-4 text-sm text-purple-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* More FAQ Button */}
          <div className="mt-6">
            <Link href="/faqs">
              <Button
                variant="ghost"
                className="text-purple-400 hover:text-purple-100 inline-flex items-center gap-2 group"
              >
                View all FAQs
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-[#1a1a1a] p-8 rounded-2xl border border-purple-700/20 space-y-6 shadow-xl mt-8 md:mt-0"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
              required
            />
            <Textarea
              name="message"
              rows={4}
              placeholder="Your Message"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
              required
            />
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 transition font-medium py-3 rounded-xl cursor-pointer"
              >
                Send Message
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
