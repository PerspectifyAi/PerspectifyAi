'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What types of partners are you looking for?',
    answer:
      'We welcome partnerships from fintech companies, AI innovators, educators, content creators, and impact-driven organizations.',
  },
  {
    question: 'Is there a cost involved in partnering?',
    answer:
      'Not at all. We’re open to mutually beneficial collaborations that grow both sides. We value impact over fees.',
  },
  {
    question: 'How soon can we get started?',
    answer:
      'Once we align on goals, we can get started within 1–2 weeks. We believe in moving fast with purpose.',
  },
];

export default function FAQAndContactSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#0f0f0f] text-white py-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* FAQs Accordion */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
        </div>

        {/* Contact Form */}
        <motion.div
          className="bg-[#1a1a1a] p-8 rounded-2xl border border-purple-700/20 space-y-6 shadow-xl"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Message submitted!');
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Your Name"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
            />
            <Input
              placeholder="Your Email"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
            />
            <Textarea
              rows={4}
              placeholder="Your Message"
              className="bg-[#0f0f0f] border border-purple-500/20 text-white placeholder-gray-500 rounded-xl"
            />
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
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
