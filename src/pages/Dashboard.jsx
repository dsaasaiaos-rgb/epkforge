import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, Eye, Edit, RefreshCw, FileDown, MapPin, User, 
  Loader2, ArrowRight, Zap, Calendar, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import TagBadge from '@/components/ui/TagBadge';
import { format } from 'date-fns';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingPublic, setTogglingPublic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      const userData = await base44.auth.me();
      setUser(userData);

      // Load artists owned by this user
      const userArtists = await base44.entities.Artist.filter({ ownerUserId: userData.id });
      setArtists(userArtists);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const togglePublic = async (artist) => {
    setTogglingPublic(artist.id);
    try {
      await base44.entities.Artist.update(artist.id, { isPublic: !artist.isPublic });
      setArtists(prev => prev.map(a => 
        a.id === artist.id ? { ...a, isPublic: !a.isPublic } : a
      ));
    } catch (error) {
      console.error('Error updating artist:', error);
    }
    setTogglingPublic(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">
              Welcome back, {user?.full_name || user?.email}
            </p>
          </div>
          <Link to={createPageUrl('Build') + '?manual=true'}>
            <Button className="bg-emerald-600 hover:bg-emerald-500">
              <Plus className="w-4 h-4 mr-2" />
              Create New EPK
            </Button>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{artists.length}</p>
                  <p className="text-sm text-zinc-500">Total Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {artists.filter(a => a.isPublic).length}
                  </p>
                  <p className="text-sm text-zinc-500">Public Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {artists.filter(a => a.claimStatus === 'verified').length}
                  </p>
                  <p className="text-sm text-zinc-500">Verified Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Artist Cards */}
        {artists.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Your Profiles</h2>
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Artist Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
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
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xl font-semibold text-white">
                              {artist.stageName}
                            </h3>
                            {artist.claimStatus === 'verified' && (
                              <TagBadge variant="genre">Verified</TagBadge>
                            )}
                            {artist.claimStatus === 'pending' && (
                              <TagBadge variant="vibe">Pending</TagBadge>
                            )}
                          </div>
                          {artist.primaryLocation && (
                            <div className="flex items-center gap-1 text-zinc-400 text-sm mt-1">
                              <MapPin className="w-3 h-3" />
                              {artist.primaryLocation}
                            </div>
                          )}
                          {artist.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {artist.genres.slice(0, 3).map(genre => (
                                <span key={genre} className="text-xs text-zinc-500">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          )}
                          {artist.lastGeneratedAt && (
                            <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Last generated {format(new Date(artist.lastGeneratedAt), 'MMM d, yyyy')}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4">
                        {/* Public Toggle */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-zinc-400">
                            {artist.isPublic ? 'Public' : 'Private'}
                          </span>
                          <Switch
                            checked={artist.isPublic}
                            onCheckedChange={() => togglePublic(artist)}
                            disabled={togglingPublic === artist.id}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          <Link to={createPageUrl('ArtistProfile') + `?slug=${artist.slug}`}>
                            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Link to={createPageUrl('DashboardEdit') + `?id=${artist.id}`}>
                            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Link to={createPageUrl('DashboardExports') + `?artistId=${artist.id}`}>
                            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                              <FileDown className="w-4 h-4 mr-1" />
                              Export
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Profiles Yet
                </h3>
                <p className="text-zinc-400 max-w-md mx-auto mb-6">
                  Create your first Electronic Press Kit and start sharing your music story.
                </p>
                <Link to={createPageUrl('Build') + '?manual=true'}>
                  <Button className="bg-emerald-600 hover:bg-emerald-500">
                    Create Your First EPK
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}