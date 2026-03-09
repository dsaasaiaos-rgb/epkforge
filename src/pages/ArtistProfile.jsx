import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowLeft, Youtube, Instagram, Users, Video, Music2, Calendar, Play } from "lucide-react";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function ArtistProfile() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: artist, isLoading } = useQuery({
    queryKey: ['artist', id],
    queryFn: async () => {
      if (!id) return null;
      const results = await base44.entities.Artist.filter({ id });
      return results[0];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <Loader2 className="w-8 h-8 text-[#ff4444] animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-white gap-4">
        <h1 className="text-2xl font-bold">Artist not found</h1>
        <Link to={createPageUrl('Spotlight')}>
          <button className="px-6 py-2 border border-white/20 rounded-xl text-[#aaa] hover:text-white hover:border-white/40 transition-all">
            Back to Spotlight
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] pb-24">
      <SEO 
        title={artist.name} 
        description={artist.bio}
        image={artist.image_url}
      />
      {/* Hero */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={artist.image_url}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link to={createPageUrl('Spotlight')}>
            <button className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-sm text-[#aaa] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Spotlight
            </button>
          </Link>
        </div>

        {/* Artist name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">{artist.name}</h1>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="flex items-center gap-1.5 bg-[#ff4444]/20 border border-[#ff4444]/40 text-[#ff4444] text-sm font-semibold px-3 py-1 rounded-full">
                <Users className="w-3.5 h-3.5" /> {artist.subscribers} Subscribers
              </span>
              {artist.video_count && (
                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-[#aaa] text-sm px-3 py-1 rounded-full">
                  <Video className="w-3.5 h-3.5" /> {artist.video_count} Videos
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">

        {/* Bio */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8"
        >
          <h2 className="text-lg font-bold text-[#ff4444] uppercase tracking-widest mb-4">Artist Profile</h2>
          <p className="text-[#aaa] leading-relaxed text-lg whitespace-pre-line">
            {artist.full_bio || artist.bio}
          </p>
        </motion.section>

        {/* Latest Release */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#141414] border border-white/5 rounded-2xl p-8"
        >
          <h2 className="text-lg font-bold text-[#ff4444] uppercase tracking-widest mb-6">Latest Release</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{artist.latest_release_title}</h3>
              <div className="space-y-2 text-[#888]">
                <div className="flex items-center gap-2">
                  <Music2 className="w-4 h-4 text-[#ff4444]" />
                  <span>{artist.latest_release_type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ff4444]" />
                  <span>{artist.latest_release_views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#ff4444]" />
                  <span>Released {artist.latest_release_date}</span>
                </div>
              </div>
            </div>
            {artist.youtube_url && (
              <button
                onClick={() => window.open(artist.youtube_url, '_blank')}
                className="flex items-center justify-center gap-3 bg-[#ff4444] hover:bg-[#ff6b35] text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
              >
                <Play className="w-6 h-6 fill-white" />
                Watch on YouTube
              </button>
            )}
          </div>
        </motion.section>

        {/* Artistic Direction */}
        {artist.artistic_direction && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#141414] border border-white/5 rounded-2xl p-8"
          >
            <h2 className="text-lg font-bold text-[#ff4444] uppercase tracking-widest mb-4">Artistic Direction</h2>
            <p className="text-[#aaa] leading-relaxed text-lg">{artist.artistic_direction}</p>
          </motion.section>
        )}

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          {artist.youtube_url && (
            <button
              onClick={() => window.open(artist.youtube_url, '_blank')}
              className="flex items-center gap-2 bg-[#ff4444] hover:bg-[#ff6b35] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <Youtube className="w-5 h-5" /> Subscribe on YouTube
            </button>
          )}
          {artist.instagram_url && (
            <button
              onClick={() => window.open(artist.instagram_url, '_blank')}
              className="flex items-center gap-2 border border-white/10 text-[#aaa] hover:text-white hover:border-white/30 font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <Instagram className="w-5 h-5" /> Follow on Instagram
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}