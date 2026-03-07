import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Youtube, Instagram, Users, Video, Music2, Calendar } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function ArtistProfile() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { data: artist, isLoading } = useQuery({
    queryKey: ['artist', id],
    queryFn: async () => {
      if (!id) return null;
      // Since get is not directly exposed in the simple sdk sometimes, we can filter by id
      const results = await base44.entities.Artist.filter({ id });
      return results[0];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
        <h1 className="text-2xl font-bold">Artist not found</h1>
        <Link to={createPageUrl('Spotlight')}>
          <Button variant="outline">Back to Spotlight</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img 
          src={artist.image_url} 
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute top-6 left-6 z-10">
          <Link to={createPageUrl('Spotlight')}>
            <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Spotlight
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{artist.name}</h1>
          <div className="flex flex-wrap gap-4 items-center text-gray-300">
            <Badge className="bg-indigo-600 hover:bg-indigo-700 text-lg py-1 px-4">
              {artist.subscribers} Subscribers
            </Badge>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              <span>{artist.video_count} Videos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Profile & Bio */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-l-4 border-indigo-500 pl-4">Artist Profile</h2>
          <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {artist.full_bio || artist.bio}
          </p>
        </section>

        {/* Latest Release */}
        <section className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Music2 className="w-6 h-6 text-purple-500" />
            Latest Release
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-400">{artist.latest_release_title}</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-gray-600">{artist.latest_release_type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{artist.latest_release_views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Released {artist.latest_release_date}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {artist.youtube_url && (
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white gap-2"
                  onClick={() => window.open(artist.youtube_url, '_blank')}
                >
                  <Youtube className="w-5 h-5" />
                  Watch on YouTube
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Artistic Direction */}
        {artist.artistic_direction && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold border-l-4 border-pink-500 pl-4">Artistic Direction</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {artist.artistic_direction}
            </p>
          </section>
        )}

        {/* Socials */}
        <section className="flex flex-wrap gap-4 pt-8 border-t border-gray-800">
          {artist.instagram_url && (
            <Button 
              variant="outline" 
              className="border-pink-600 text-pink-500 hover:bg-pink-600 hover:text-white gap-2"
              onClick={() => window.open(artist.instagram_url, '_blank')}
            >
              <Instagram className="w-5 h-5" />
              Follow on Instagram
            </Button>
          )}
          {artist.youtube_url && (
            <Button 
              variant="outline" 
              className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white gap-2"
              onClick={() => window.open(artist.youtube_url, '_blank')}
            >
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}