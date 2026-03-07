import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Play, TrendingUp, Video, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5]">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff4444]/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ff4444]/10 border border-[#ff4444]/30 rounded-full px-4 py-1.5 text-sm text-[#ff4444] font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-[#ff4444] animate-pulse" />
              NC &amp; FL Independent Music Hub
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-none">
              <span className="text-white">ITS</span>
              <span className="text-[#ff4444]">FAMM</span>
              <br />
              <span className="text-3xl md:text-5xl text-[#aaa] font-semibold">Guarantee's Quality</span>
            </h1>

            <p className="mt-6 text-lg text-[#888] mb-10 leading-relaxed max-w-2xl mx-auto">
              The premier creative hub for independent artists in North Carolina and Florida.
              Discover the next generation of hip-hop talent before they blow up.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Spotlight')}>
                <button className="btn-primary flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold w-full sm:w-auto justify-center">
                  Explore Rising Stars <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a
                href="https://www.youtube.com/@ITSFAMM"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold border border-white/10 text-[#aaa] hover:text-white hover:border-white/30 transition-all w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5 fill-current" />
                Watch on YouTube
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-white/5 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {[
              { value: '543+', label: 'Subscribers' },
              { value: '141+', label: 'Videos' },
              { value: '3+', label: 'Featured Artists' },
              { value: 'NC/FL', label: 'Region' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#ff4444]">{value}</div>
                <div className="text-sm text-[#666] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why ITSFAMM?</h2>
          <p className="text-[#888] max-w-xl mx-auto">A platform built to elevate independent artists from the ground up.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Video className="w-6 h-6 text-[#ff4444]" />,
              title: 'Professional Production',
              desc: 'High-quality music videos and visual storytelling that elevates independent artists to major-label standards.',
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-[#ff6b35]" />,
              title: 'Artist Growth',
              desc: 'A platform dedicated to nurturing emerging talent and expanding their reach across digital channels.',
            },
            {
              icon: <Music className="w-6 h-6 text-[#ff4444]" />,
              title: 'Collaborative Community',
              desc: 'Connecting artists across NC and FL to create a powerful independent ecosystem that benefits everyone.',
            },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card-hover bg-[#141414] border border-white/5 rounded-2xl p-8 group"
            >
              <div className="w-12 h-12 bg-[#ff4444]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#ff4444]/20 transition-colors">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
              <p className="text-[#888] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative bg-gradient-to-r from-[#ff4444]/20 to-[#ff6b35]/10 border border-[#ff4444]/20 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4444]/10 rounded-full blur-[80px]" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 relative z-10">Ready to Discover?</h2>
          <p className="text-[#aaa] mb-8 relative z-10 max-w-lg mx-auto">
            Explore the rising stars of NC and FL hip-hop before they hit the mainstream.
          </p>
          <Link to={createPageUrl('Spotlight')} className="relative z-10">
            <button className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-bold">
              View the Spotlight <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}