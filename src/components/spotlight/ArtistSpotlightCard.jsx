import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Instagram, Youtube, Music2, Users, Video } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArtistSpotlightCard({ artist }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-800 bg-gray-900/50 backdrop-blur-sm text-white">
        <div className="relative h-48 overflow-hidden group">
          <img 
            src={artist.image_url} 
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-1">{artist.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users className="w-4 h-4" />
              <span>{artist.subscribers} Subscribers</span>
            </div>
          </div>
        </div>

        <CardContent className="flex-grow p-6 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {artist.bio}
          </p>

          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3 border border-gray-700">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs border-indigo-500 text-indigo-400">
                Latest Release
              </Badge>
              <span className="text-xs text-gray-500">{artist.latest_release_date}</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-white truncate">{artist.latest_release_title}</h4>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <Music2 className="w-3 h-3" />
                <span>{artist.latest_release_type}</span>
                <span>•</span>
                <span>{artist.latest_release_views} views</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex-col gap-3">
          <Link to={createPageUrl('ArtistProfile') + `?id=${artist.id}`} className="w-full">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
              View Full Profile
            </Button>
          </Link>
          <div className="flex gap-3 w-full">
            {artist.youtube_url && (
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-colors"
                onClick={() => window.open(artist.youtube_url, '_blank')}
              >
                <Youtube className="w-4 h-4 mr-2" />
                YouTube
              </Button>
            )}
            {artist.instagram_url && (
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-pink-600 text-pink-500 hover:bg-pink-600 hover:text-white transition-colors"
                onClick={() => window.open(artist.instagram_url, '_blank')}
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}