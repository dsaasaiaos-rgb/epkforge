import React from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import ArtistSpotlightCard from "@/components/spotlight/ArtistSpotlightCard";
import { Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Spotlight() {
  const { data: artists, isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list(),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <Loader2 className="w-8 h-8 text-[#ff4444] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] pb-24">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#ff4444]/8 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-[#ff4444]/10 border border-[#ff4444]/30 rounded-full px-4 py-1.5 text-sm text-[#ff4444] font-medium mb-6">
              <Zap className="w-4 h-4" />
              Rising Artists Spotlight
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              The Next Wave
            </h1>
            <p className="text-[#888] max-w-2xl mx-auto text-lg">
              Emerging hip-hop and rap talent from North Carolina and Florida, featured on the ITSFAMM channel.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8"
        >
          <h3 className="text-lg font-bold text-[#ff4444] uppercase tracking-widest mb-3">Introduction</h3>
          <p className="text-[#aaa] leading-relaxed">
            The ITSFAMM YouTube channel has emerged as a dynamic platform for emerging hip-hop and rap artists, particularly from the North Carolina and Florida regions. With 543 subscribers and 141 videos, ITSFAMM serves as a creative hub where independent artists showcase their latest music videos, collaborations, and original content. This article highlights three of the most prominent artists featured on the platform, examining their artistic trajectories, recent releases, and contributions to the independent music scene.
          </p>
        </motion.div>

        {/* Artist Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Featured Artists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, i) => (
              <ArtistSpotlightCard key={artist.id} artist={artist} index={i} />
            ))}
          </div>
        </div>

        {/* Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8">The ITSFAMM Ecosystem</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">A Platform for Independent Artists</h3>
              <p className="text-[#888] leading-relaxed">
                ITSFAMM has established itself as more than a simple YouTube channel — it functions as a creative collective and production house for NC and FL-based artists. The tagline, "ITSFAMM Guarantee's Quality," reflects a commitment to production standards that elevates independent artists.
              </p>
            </div>
            <div className="space-y-5">
              <div className="border-l-2 border-[#ff4444] pl-4">
                <h4 className="font-semibold text-white mb-1">Production Quality</h4>
                <p className="text-sm text-[#888]">Consistent visual quality across productions helps artists maintain a cohesive brand identity.</p>
              </div>
              <div className="border-l-2 border-[#ff6b35] pl-4">
                <h4 className="font-semibold text-white mb-1">Community Building</h4>
                <p className="text-sm text-[#888]">Collaborative releases create a community that transcends typical competitive dynamics.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#ff4444]/10 to-transparent border border-[#ff4444]/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Conclusion</h3>
          <p className="text-[#aaa] leading-relaxed">
            The artists featured on ITSFAMM represent different stages of the independent music journey. DubbWitDaPlays exemplifies the established independent artist leveraging platform support. NGT demonstrates the power of strategic collaboration. Hopout2x shows the potential for emerging talent.
            <br /><br />
            Together, these artists and the ITSFAMM platform illustrate a broader shift in the music industry toward independent production, direct audience engagement, and community-driven growth.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { value: '543+', label: 'Subscribers' },
            { value: '141+', label: 'Videos' },
            { value: 'NC/FL', label: 'Region' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-[#141414] border border-white/5 rounded-2xl py-6">
              <div className="text-3xl font-bold text-[#ff4444]">{value}</div>
              <div className="text-sm text-[#666] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}