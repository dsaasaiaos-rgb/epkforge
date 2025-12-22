import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, User, ArrowRight, Loader2, Music } from 'lucide-react';
import TagBadge from '@/components/ui/TagBadge';
import { motion } from 'framer-motion';

export default function Explore() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = ['all', 'Hip-Hop', 'Pop', 'Rock', 'R&B', 'Electronic', 'Alternative'];

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    setIsLoading(true);
    try {
      const data = await base44.entities.Artist.filter({ isPublic: true });
      setArtists(data);
    } catch (error) {
      console.error('Error loading artists:', error);
    }
    setIsLoading(false);
  };

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = !searchQuery || 
      artist.stageName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.primaryLocation?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || 
      artist.genres?.some(g => g.toLowerCase().includes(selectedGenre.toLowerCase()));
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Explore Artists
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Discover talented artists and explore their professional press kits.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search artists or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 bg-zinc-900/80 border-zinc-700 rounded-xl"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {genres.map(genre => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  onClick={() => setSelectedGenre(genre)}
                  className={`whitespace-nowrap rounded-xl ${
                    selectedGenre === genre 
                      ? 'bg-emerald-600 hover:bg-emerald-500' 
                      : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {genre === 'all' ? 'All Genres' : genre}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
        )}

        {/* Artists Grid */}
        {!isLoading && (
          <>
            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={createPageUrl('ArtistProfile') + `?slug=${artist.slug}`}>
                      <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group hover:-translate-y-1">
                        <div className="aspect-[4/3] relative overflow-hidden bg-zinc-800">
                          {artist.bannerUrl || artist.profilePhotoUrl ? (
                            <img 
                              src={artist.bannerUrl || artist.profilePhotoUrl}
                              alt={artist.stageName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Music className="w-16 h-16 text-zinc-700" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                          
                          {/* Profile photo overlay */}
                          {artist.profilePhotoUrl && artist.bannerUrl && (
                            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-xl overflow-hidden border-2 border-zinc-900">
                              <img 
                                src={artist.profilePhotoUrl}
                                alt={artist.stageName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                            {artist.stageName}
                          </h3>
                          {artist.primaryLocation && (
                            <div className="flex items-center gap-1 text-zinc-400 text-sm mb-3">
                              <MapPin className="w-3 h-3" />
                              {artist.primaryLocation}
                            </div>
                          )}
                          {artist.tagline && (
                            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                              {artist.tagline}
                            </p>
                          )}
                          {artist.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {artist.genres.slice(0, 3).map(genre => (
                                <TagBadge key={genre} variant="genre">{genre}</TagBadge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No artists found
                </h3>
                <p className="text-zinc-400 mb-6">
                  {searchQuery || selectedGenre !== 'all' 
                    ? 'Try adjusting your filters'
                    : 'Be the first to create an artist profile!'}
                </p>
                <Link to={createPageUrl('Build') + '?manual=true'}>
                  <Button className="bg-emerald-600 hover:bg-emerald-500">
                    Create Your Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}