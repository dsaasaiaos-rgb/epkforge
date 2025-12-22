import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import TikTokFeedCard from './TikTokFeedCard';
import { Loader2 } from 'lucide-react';

export default function TikTokFeed({ filters = {} }) {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    loadArtists();
  }, [filters]);

  const loadArtists = async () => {
    setIsLoading(true);
    try {
      const filterQuery = { isPublic: true, ...filters };
      const data = await base44.entities.Artist.filter(filterQuery, '-created_date', 50);
      setArtists(data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = window.innerHeight;
      const index = Math.round(scrollTop / height);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">No Artists Found</h2>
          <p className="text-white/60">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {artists.map((artist, index) => (
        <TikTokFeedCard 
          key={artist.id} 
          artist={artist} 
          isActive={index === currentIndex}
        />
      ))}
    </div>
  );
}