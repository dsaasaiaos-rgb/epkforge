import React from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import ArtistSpotlightCard from "@/components/spotlight/ArtistSpotlightCard";
import { Loader2, Music4 } from "lucide-react";

export default function Spotlight() {
  const { data: artists, isLoading } = useQuery({
    queryKey: ['artists'],
    queryFn: () => base44.entities.Artist.list(),
    initialData: [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4">
            <Music4 className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
            Rising Artists Spotlight
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover the emerging hip-hop and rap talent from North Carolina and Florida, featured on the ITSFAMM channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <ArtistSpotlightCard key={artist.id} artist={artist} />
          ))}
        </div>

        <div className="mt-16 bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4">About ITSFAMM</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-6">
            ITSFAMM has established itself as more than a simple YouTube channel—it functions as a creative collective and production house. 
            With over 141 videos and a growing subscriber base, it serves as a hub for independent artists to showcase their latest music videos, 
            collaborations, and original content.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white font-bold">543+</span>
              <span>Subscribers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white font-bold">141+</span>
              <span>Videos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-white font-bold">NC/FL</span>
              <span>Region</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}