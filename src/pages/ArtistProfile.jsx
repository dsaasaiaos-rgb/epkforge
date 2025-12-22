import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, ExternalLink, Copy, Check, ChevronDown, ChevronUp, 
  Shield, User, Loader2, Music, Star, Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import TagBadge from '@/components/ui/TagBadge';
import SocialLinksRow from '@/components/ui/SocialLinksRow';
import ClaimModal from '@/components/profile/ClaimModal';

export default function ArtistProfile() {
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadArtist = async () => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('slug');
      
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const artists = await base44.entities.Artist.filter({ slug });
        if (artists.length > 0) {
          setArtist(artists[0]);
        }

        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading artist:', error);
      }
      setIsLoading(false);
    };
    loadArtist();
  }, []);

  const copyProfileLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-zinc-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Artist Not Found</h1>
          <p className="text-zinc-400 mb-6">The artist profile you're looking for doesn't exist.</p>
          <Button onClick={() => navigate(createPageUrl('Home'))} className="bg-emerald-600 hover:bg-emerald-500">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const bioLong = artist.bioLong || '';
  const shouldTruncateBio = bioLong.length > 500;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-64 sm:h-80 bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
          {artist.bannerUrl ? (
            <img 
              src={artist.bannerUrl} 
              alt="Banner" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            {/* Profile Photo */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-zinc-950 bg-zinc-800 flex-shrink-0">
              {artist.profilePhotoUrl ? (
                <img 
                  src={artist.profilePhotoUrl} 
                  alt={artist.stageName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Music className="w-16 h-16 text-zinc-600" />
                </div>
              )}
            </div>

            <div className="flex-1 pt-2">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">
                      {artist.stageName}
                    </h1>
                    {artist.claimStatus === 'verified' && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center" title="Verified Artist">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  {artist.tagline && (
                    <p className="text-lg text-zinc-400 mb-3 max-w-2xl">
                      {artist.tagline}
                    </p>
                  )}
                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    {artist.primaryLocation && (
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        {artist.primaryLocation}
                        {artist.secondaryLocation && ` / ${artist.secondaryLocation}`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyProfileLink}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="ml-2">{copied ? 'Copied!' : 'Share'}</span>
                  </Button>
                  {user && artist.claimStatus === 'unclaimed' && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-500"
                      onClick={() => setShowClaimModal(true)}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Claim Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {artist.verifiedLinks && (
                <div className="mt-4">
                  <SocialLinksRow links={artist.verifiedLinks} size="default" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            {artist.bioLong && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Quote className="w-5 h-5 text-emerald-500" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                      {shouldTruncateBio && !showFullBio 
                        ? bioLong.slice(0, 500) + '...'
                        : bioLong
                      }
                    </p>
                    {shouldTruncateBio && (
                      <button
                        onClick={() => setShowFullBio(!showFullBio)}
                        className="flex items-center gap-1 text-emerald-500 hover:text-emerald-400 mt-4 text-sm font-medium"
                      >
                        {showFullBio ? (
                          <>Read Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Read More <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Highlights */}
            {artist.highlights?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {artist.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-zinc-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Press Photos */}
            {artist.pressPhotos?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Press Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {artist.pressPhotos.map((photo, index) => (
                        <a
                          key={index}
                          href={photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-800 hover:opacity-90 transition-opacity"
                        >
                          <img 
                            src={photo} 
                            alt={`Press photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Musical Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Musical Style</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {artist.genres?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-500 mb-2">Genres</h4>
                      <div className="flex flex-wrap gap-2">
                        {artist.genres.map(genre => (
                          <TagBadge key={genre} variant="genre">{genre}</TagBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {artist.vibes?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-zinc-500 mb-2">Vibes</h4>
                      <div className="flex flex-wrap gap-2">
                        {artist.vibes.map(vibe => (
                          <TagBadge key={vibe} variant="vibe">{vibe}</TagBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {artist.styleThemes && (
                    <>
                      {artist.styleThemes.mood && (
                        <div>
                          <h4 className="text-sm font-medium text-zinc-500 mb-1">Mood</h4>
                          <p className="text-zinc-300 text-sm">{artist.styleThemes.mood}</p>
                        </div>
                      )}
                      {artist.styleThemes.style && (
                        <div>
                          <h4 className="text-sm font-medium text-zinc-500 mb-1">Style</h4>
                          <p className="text-zinc-300 text-sm">{artist.styleThemes.style}</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Press Links */}
            {artist.verifiedLinks?.press?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Press & Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {artist.verifiedLinks.press.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-xl text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{new URL(link).hostname}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Short Bio */}
            {artist.bioShort && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card className="bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border-emerald-500/20 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Quick Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 text-sm leading-relaxed italic">
                      "{artist.bioShort}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
        artist={artist}
        user={user}
      />
    </div>
  );
}