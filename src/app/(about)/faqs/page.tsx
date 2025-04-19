'use client';

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is PerspectifyAI, really?",
    answer:
      "Perspectify is not just a finance app. It’s a cognitive system designed to help you master your money, habits, and mindset — all through gamified tools and intelligent, guided growth.",
  },
  {
    question: "Who is this platform for?",
    answer:
      "Anyone who’s tired of feeling behind. Whether you're rebuilding, just starting out, or already on the path — Perspectify is designed for those who want real, lasting transformation. No jargon. No judgment. Just elevation.",
  },
  {
    question: "What makes Perspectify different?",
    answer:
      "Most apps give you tools. We give you a system.\n\n- Goal-driven habit building\n- AI-powered financial assistance\n- Community challenges\n- Reflective learning\n- Progress you can feel — not just calculate.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes — Perspectify is free to join, use, and grow with. We will introduce premium tools and exclusive experiences down the line, but the core transformation system will always remain accessible.",
  },
  {
    question: "Do I need to understand finance to use this?",
    answer:
      "No. In fact, if you've always felt lost around money — this was built for you. We’ll guide you step-by-step, and the more you use Perspectify, the more the system adapts to your rhythm.",
  },
  {
    question: "What is the PerspectiveLive Community Hub?",
    answer:
      "It’s the tribe-powered layer of Perspectify — where growth becomes shared. Join challenges, connect with mentors, climb leaderboards, and earn your Catalyst Score by helping others grow. We’re not here to “go social.” We’re here to build real transformation at scale.",
  },
  {
    question: "What’s a Catalyst Score?",
    answer:
      "It’s our value-based impact system. Instead of likes or followers, you’re rewarded for how deeply you help others change their financial life. Think of it as your digital legacy — tracked and amplified.",
  },
  {
    question: "Is this connected to crypto or blockchain?",
    answer:
      "Not yet. But in the future, we plan to introduce token-based incentives that reward users for real growth and contribution. It won’t be speculation — it’ll be systemic utility.",
  },
  {
    question: "Can I become a mentor?",
    answer:
      "Yes — but you earn that role. Mentors are promoted based on engagement, impact, and results. No shortcuts. Eventually, mentorship will unlock additional features and monetization opportunities.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simple.\n\nJoin the waitlist or support on Ko-fi to access early perks. Start building the version of yourself the system was made for.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-6">
          {faqs.map(({ question, answer }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-[#1a1a1a] border border-transparent hover:border-purple-500 rounded-2xl p-5 text-left shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger className="text-white text-lg font-semibold flex items-center justify-between gap-4 cursor-pointer">
                    <span>{question}</span>
                    <ChevronDown className="h-5 w-5 transition-transform duration-200 accordion-chevron" />
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 whitespace-pre-line pt-2">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/waitlist" passHref>
            <Button className="hover:scale-105 transition-transform duration-200 cursor-pointer">
              Join the Waitlist
            </Button>
          </Link>
          <Link
            href="https://ko-fi.com/perspectify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              Support on Ko-fi
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
