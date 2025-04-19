'use client';

import { Mail, Rocket, Handshake, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const confirmedPartners = [
  {
    name: 'Migrant Leaders',
    label: 'Charity Partner',
    link: 'https://www.migrantleaders.org.uk',
  },
  {
    name: 'Bizichat.AI',
    label: 'Technology Partner',
    link: 'https://www.bizichat.dev',
  },
  {
    name: 'SCANA (Scanabot)',
    label: 'AI Partner',
    link: 'https://www.scanabot.com',
  },
];

export default function PartnershipSection() {
  const router = useRouter();

  return (
    <section className="bg-[#0f0f0f] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
            Join Our Growing Network
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Trusted by top fintechs and innovators. Partner with PerspectifyAI to shape the future of finance.
          </p>
        </div>

        {/* Why Partner Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <Rocket className="text-purple-400 h-8 w-8 mb-3" />, title: 'Innovate Faster', desc: 'Collaborate with AI pioneers in personal finance.' },
            { icon: <Handshake className="text-purple-400 h-8 w-8 mb-3" />, title: 'Strong Collaboration', desc: 'Win‑win strategies with aligned visions.' },
            { icon: <Mail className="text-purple-400 h-8 w-8 mb-3" />, title: 'Instant Support', desc: 'Our team is just one email away—always available.' },
            { icon: <ShieldCheck className="text-purple-400 h-8 w-8 mb-3" />, title: 'Data‑Safe', desc: 'Built on privacy‑first principles and compliance.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/40 hover:shadow-md transition"
            >
              {item.icon}
              <h4 className="text-xl font-semibold text-white mb-1 text-center">{item.title}</h4>
              <p className="text-sm text-gray-400 text-center">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Partners */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-4 border-b border-purple-500/30 inline-block pb-2">
            Our Partners
          </h3>
          {/* Enlarged Logo Strip */}
          <div className="max-w-lg mx-auto flex justify-center items-center gap-12 mb-8">
            <Image
              src="/Partner/bizichat.jpg"
              alt="Bizichat"
              width={150}
              height={75}
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
            <Image
              src="/Partner/scanaa.jpg"
              alt="SCANA"
              width={200}
              height={80}
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {confirmedPartners.map((partner, idx) => (
              <motion.a
                key={idx}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="block bg-[#1a1a1a] p-5 rounded-xl border border-purple-500/20 hover:border-purple-500 transition cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-white">{partner.name}</p>
                    <p className="text-sm text-purple-300">{partner.label}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-400" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            onClick={() => router.push('/partner')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition duration-300"
          >
            Partner With Us
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/why-partner')}
            className="border border-purple-500 text-purple-300 hover:text-white hover:border-purple-700 hover:bg-purple-800 transition px-6 py-3 rounded-full text-lg"
          >
            Why Become Our Partner?
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
