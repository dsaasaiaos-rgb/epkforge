import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, Plus, User, Loader2, MapPin } from 'lucide-react';
import TagBadge from '@/components/ui/TagBadge';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      searchArtists(q);
    }
  }, []);

  const searchArtists = async (searchQuery) => {
    setIsSearching(true);
    try {
      const artists = await base44.entities.Artist.filter({
        isPublic: true
      });
      
      const filtered = artists.filter(artist => 
        artist.stageName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
    setIsSearching(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(createPageUrl('Search') + `?q=${encodeURIComponent(query)}`);
      searchArtists(query);
    }
  };

  const handleSelectArtist = (artist) => {
    navigate(createPageUrl('ArtistProfile') + `?slug=${artist.slug}`);
  };

  const handleCreateManually = () => {
    navigate(createPageUrl('Build') + `?manual=true&name=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Find Your Artist
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search artist name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-32 text-lg bg-zinc-900/80 border-zinc-700 rounded-xl focus:border-emerald-500"
            />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-lg"
            >
              Search
            </Button>
          </form>
        </motion.div>

        {/* Manual Entry Card - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border-emerald-500/20 rounded-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Plus className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Don't see your artist?
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      Create your profile manually by entering your social links and details.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleCreateManually}
                  className="bg-emerald-600 hover:bg-emerald-500 rounded-xl w-full sm:w-auto"
                >
                  Create Profile Manually
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        {isSearching && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
        )}

        {/* Results */}
        {!isSearching && query && (
          <div>
            <h2 className="text-lg font-medium text-zinc-400 mb-4">
              {results.length > 0 
                ? `Found ${results.length} artist${results.length === 1 ? '' : 's'}`
                : 'No existing profiles found'
              }
            </h2>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-zinc-900/50 border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all cursor-pointer group"
                      onClick={() => handleSelectArtist(artist)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                            {artist.profilePhotoUrl ? (
                              <img 
                                src={artist.profilePhotoUrl} 
                                alt={artist.stageName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 text-zinc-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                              {artist.stageName}
                            </h3>
                            {artist.primaryLocation && (
                              <div className="flex items-center gap-1 text-zinc-400 text-sm mt-1">
                                <MapPin className="w-3 h-3" />
                                {artist.primaryLocation}
                              </div>
                            )}
                            {artist.genres?.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {artist.genres.slice(0, 3).map(genre => (
                                  <TagBadge key={genre} variant="genre">{genre}</TagBadge>
                                ))}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No profiles found for "{query}"
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    Be the first to create this artist profile!
                  </p>
                  <Button 
                    onClick={handleCreateManually}
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    Create Profile for {query}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}