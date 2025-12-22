import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Music, MapPin } from 'lucide-react';
import TagBadge from '@/components/ui/TagBadge';

const demoArtists = [
  {
    slug: "demo-kai-rivers",
    name: "Kai Rivers",
    location: "Atlanta, GA",
    genres: ["Hip-Hop", "Trap", "R&B"],
    tagline: "Atlanta's rising voice blending trap beats with melodic introspection",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    slug: "demo-luna-sky",
    name: "Luna Sky",
    location: "Los Angeles, CA",
    genres: ["Pop", "Indie Pop", "Electronic"],
    tagline: "Crafting dreamy pop soundscapes from the heart of LA",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop"
  },
  {
    slug: "demo-the-echoes",
    name: "The Echoes",
    location: "Brooklyn, NY",
    genres: ["Alternative Rock", "Indie Rock"],
    tagline: "Brooklyn's garage rock revival with a modern edge",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=400&fit=crop"
  }
];

export default function DemoProfiles() {
  return (
    <section className="py-24 px-4 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Explore demo artist profiles to see what an EPKForge profile looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoArtists.map((artist, index) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={createPageUrl('ArtistProfile') + `?slug=${artist.slug}`}>
                <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {artist.name}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {artist.location}
                    </div>
                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                      {artist.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {artist.genres.slice(0, 2).map(genre => (
                        <TagBadge key={genre} variant="genre">{genre}</TagBadge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      View Profile
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}