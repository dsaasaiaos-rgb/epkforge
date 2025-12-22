import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Heart, Share2, Music, MapPin, Verified, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TagBadge from '@/components/ui/TagBadge';

export default function TikTokFeedCard({ artist, isActive }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  const handleShare = async () => {
    const url = `${window.location.origin}${createPageUrl('ArtistProfile')}?slug=${artist.slug}`;
    if (navigator.share) {
      await navigator.share({
        title: artist.stageName,
        text: artist.tagline || `Check out ${artist.stageName}`,
        url
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const goToProfile = () => {
    navigate(createPageUrl('ArtistProfile') + `?slug=${artist.slug}`);
  };

  return (
    <div className="relative w-full h-screen snap-start snap-always">
      {/* Background Media */}
      <div className="absolute inset-0 bg-black">
        {artist.bannerUrl ? (
          <img 
            src={artist.bannerUrl} 
            alt={artist.stageName}
            className="w-full h-full object-cover"
          />
        ) : artist.profilePhotoUrl ? (
          <img 
            src={artist.profilePhotoUrl} 
            alt={artist.stageName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-6 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </div>
          <span className="text-xs text-white font-semibold">Like</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-white font-semibold">Share</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={goToProfile}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-white font-semibold">View</span>
        </motion.button>
      </div>

      {/* Bottom Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-10">
        <div className="flex items-end gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-white cursor-pointer flex-shrink-0"
            onClick={goToProfile}
          >
            {artist.profilePhotoUrl ? (
              <img src={artist.profilePhotoUrl} alt={artist.stageName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 
                className="text-white font-bold text-lg truncate cursor-pointer"
                onClick={goToProfile}
              >
                {artist.stageName}
              </h3>
              {artist.claimStatus === 'verified' && (
                <Verified className="w-5 h-5 text-blue-500 fill-blue-500 flex-shrink-0" />
              )}
            </div>
            {artist.primaryLocation && (
              <p className="text-white/80 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {artist.primaryLocation}
              </p>
            )}
          </div>
        </div>

        {artist.tagline && (
          <p className="text-white text-sm mb-3 line-clamp-2">
            {artist.tagline}
          </p>
        )}

        {artist.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {artist.genres.slice(0, 3).map(genre => (
              <span key={genre} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
                #{genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}