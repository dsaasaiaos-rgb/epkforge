import React, { useState } from 'react';
import TikTokFeed from '@/components/tiktok/TikTokFeed';
import { Button } from "@/components/ui/button";
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const popularGenres = [
  'Hip-Hop', 'R&B', 'Pop', 'Rock', 'Electronic', 'Jazz', 'Latin', 'Indie'
];

export default function ExplorePage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filters, setFilters] = useState({});

  const toggleGenre = (genre) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newGenres);
    
    if (newGenres.length > 0) {
      setFilters({ genres: { $in: newGenres } });
    } else {
      setFilters({});
    }
  };

  return (
    <div className="relative">
      <TikTokFeed filters={filters} />

      {/* Filter Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowFilters(!showFilters)}
        className="fixed top-20 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
      >
        {showFilters ? <X className="w-6 h-6 text-white" /> : <Filter className="w-6 h-6 text-white" />}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-16 right-0 bottom-0 w-72 bg-black/95 backdrop-blur-xl border-l border-white/10 z-40 p-6 overflow-y-auto"
          >
            <h3 className="text-white font-bold text-lg mb-4">Filter by Genre</h3>
            <div className="space-y-2">
              {popularGenres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                    selectedGenres.includes(genre)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            {selectedGenres.length > 0 && (
              <Button
                onClick={() => {
                  setSelectedGenres([]);
                  setFilters({});
                }}
                variant="outline"
                className="w-full mt-4 border-white/20 text-white"
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}