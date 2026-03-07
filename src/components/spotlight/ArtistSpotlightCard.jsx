import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Music2, Users, Play, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArtistSpotlightCard({ artist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-hover group bg-[#141414] border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={artist.image_url}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/30 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 bg-[#ff4444] rounded-full flex items-center justify-center shadow-lg shadow-[#ff4444]/40">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Subscriber badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 text-xs text-[#f5f5f5]">
          <Users className="w-3 h-3 text-[#ff4444]" />
          {artist.subscribers}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{artist.name}</h3>
          <p className="text-sm text-[#888] leading-relaxed line-clamp-2">{artist.bio}</p>
        </div>

        {/* Latest release */}
        {artist.latest_release_title && (
          <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-[#ff4444] font-semibold">Latest Release</span>
              <span className="text-[11px] text-[#555]">{artist.latest_release_date}</span>
            </div>
            <p className="text-sm font-semibold text-white truncate">{artist.latest_release_title}</p>
            <div className="flex items-center gap-2 text-xs text-[#666]">
              <Music2 className="w-3 h-3" />
              <span>{artist.latest_release_type}</span>
              <span>·</span>
              <span>{artist.latest_release_views} views</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Link to={createPageUrl('ArtistProfile') + `?id=${artist.id}`} className="block">
            <button className="w-full flex items-center justify-center gap-2 bg-[#ff4444] hover:bg-[#ff6b35] text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
              View Profile <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <div className="flex gap-2">
            {artist.youtube_url && (
              <button
                onClick={() => window.open(artist.youtube_url, '_blank')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 text-[#888] hover:text-white hover:border-white/30 transition-all text-xs font-medium"
              >
                <Youtube className="w-3.5 h-3.5" /> YouTube
              </button>
            )}
            {artist.instagram_url && (
              <button
                onClick={() => window.open(artist.instagram_url, '_blank')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 text-[#888] hover:text-white hover:border-white/30 transition-all text-xs font-medium"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}