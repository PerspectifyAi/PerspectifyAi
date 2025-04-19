import React from 'react';
import { Sparkles, Users, BookOpen, HeartHandshake, Star, Puzzle } from 'lucide-react';

const reasons = [
  {
    icon: <Sparkles className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Mission-Driven Impact',
    desc: 'We’re not just building an app — we’re building a movement for financial empowerment.',
  },
  {
    icon: <Users className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Hyper-Engaged Gen Z Community',
    desc: 'Tap into an authentic, fast-growing community of young changemakers actively transforming their financial habits.',
  },
  {
    icon: <BookOpen className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Tech-Enabled Learning',
    desc: 'Our AI-powered mentorship and gamified education system sets a new standard for scalable, measurable impact.',
  },
  {
    icon: <HeartHandshake className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Social Good at the Core',
    desc: 'Every partner fuels free access to underserved communities, helping democratise financial knowledge.',
  },
  {
    icon: <Star className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Brand Alignment with Purpose',
    desc: 'Partnering with PerspectifyAI amplifies your reputation as a company that values financial wellbeing and inclusive innovation.',
  },
  {
    icon: <Puzzle className="text-purple-400 w-8 h-8 mb-3" />,
    title: 'Custom Campaign Integration',
    desc: 'We offer co-branded challenge campaigns, live activations, and community features tailored to your goals.',
  },
];

const WhyPartnerPage = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Why Partner With Us
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          PerspectifyAI is more than a fintech platform — it&apos;s a mission to shape a financially empowered future. Here&apos;s why partnering with us makes a difference:
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/40 hover:shadow-md transition text-left"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPartnerPage;
