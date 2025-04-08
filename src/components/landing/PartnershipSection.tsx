'use client';

import { Mail, Rocket, Handshake, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
];

const PartnershipSection = () => {
  const router = useRouter();

  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Join Our Growing Network
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12">
          Trusted by top fintechs and innovators. Partner with PerspectifyAI to shape the future of finance.
        </p>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white rounded-xl p-4 w-32 h-20 flex items-center justify-center shadow-md hover:shadow-purple-500/40 transition-all"
            >
              <Image
                src={logo}
                alt="Partner Logo"
                width={100}
                height={50}
                className="object-contain max-h-[40px]"
              />
            </motion.div>
          ))}
        </div>

        {/* Why Partner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <Rocket className="text-purple-400 h-8 w-8 mb-3" />,
              title: "Innovate Faster",
              desc: "Collaborate with AI pioneers in personal finance.",
            },
            {
              icon: <Handshake className="text-purple-400 h-8 w-8 mb-3" />,
              title: "Strong Collaboration",
              desc: "Win-win strategies with aligned visions.",
            },
            {
              icon: <Mail className="text-purple-400 h-8 w-8 mb-3" />,
              title: "Instant Support",
              desc: "Our team is just one email away—always available.",
            },
            {
              icon: <ShieldCheck className="text-purple-400 h-8 w-8 mb-3" />,
              title: "Data-Safe",
              desc: "Built on privacy-first principles and compliance.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/40 hover:shadow-md transition"
            >
              {item.icon}
              <h4 className="text-xl font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => router.push("/partner")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg transition duration-300 cursor-pointer"
          >
            Partner With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;
