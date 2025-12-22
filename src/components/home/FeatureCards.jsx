import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, FileText, Share2 } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Discover Your Presence",
    description: "We analyze your social media, streaming platforms, and press to understand your unique story.",
    color: "emerald"
  },
  {
    icon: Sparkles,
    title: "AI-Crafted Content",
    description: "Our AI generates professional bios, highlights, and style descriptions tailored to your artistry.",
    color: "purple"
  },
  {
    icon: FileText,
    title: "Press-Ready EPK",
    description: "Get a beautiful, professional Electronic Press Kit ready for labels, venues, and media.",
    color: "blue"
  },
  {
    icon: Share2,
    title: "Share & Export",
    description: "Share your public profile link or download a polished PDF for offline use.",
    color: "orange"
  }
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-500"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-500"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-500"
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-500"
  }
};

export default function FeatureCards() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            From search to share, create your professional EPK in just a few steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}