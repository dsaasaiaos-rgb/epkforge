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

        {/* Introduction Section */}
        <div className="max-w-4xl mx-auto bg-gray-900/30 p-8 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-4 text-indigo-400">Introduction</h3>
          <p className="text-gray-300 leading-relaxed">
            The ITSFAMM YouTube channel has emerged as a dynamic platform for emerging hip-hop and rap artists, particularly from the North Carolina and Florida regions. With 543 subscribers and 141 videos, ITSFAMM serves as a creative hub where independent artists showcase their latest music videos, collaborations, and original content. This article highlights three of the most prominent artists featured on the platform, examining their artistic trajectories, recent releases, and contributions to the independent music scene.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <ArtistSpotlightCard key={artist.id} artist={artist} />
          ))}
        </div>

        {/* Ecosystem Section */}
        <div className="mt-16 space-y-8">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              The ITSFAMM Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">A Platform for Independent Artists</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  ITSFAMM has established itself as more than a simple YouTube channel—it functions as a creative collective and production house for North Carolina and Florida-based artists. The platform's tagline, "ITSFAMM Guarantee's Quality," reflects a commitment to production standards that elevates the work of independent artists.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-indigo-400">Production Quality</h4>
                  <p className="text-sm text-gray-400">Consistent visual quality across productions demonstrates professional standards, helping artists maintain a cohesive brand identity.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400">Community Building</h4>
                  <p className="text-sm text-gray-400">The collaborative nature of releases creates a community that transcends typical competitive dynamics, benefiting all participants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gray-900/30 p-8 rounded-2xl border border-gray-800/50">
            <h3 className="text-2xl font-bold mb-4 text-white">Conclusion</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The artists featured on ITSFAMM represent different stages of the independent music journey. DubbWitDaPlays exemplifies the established independent artist leveraging platform support. NGT demonstrates the power of strategic collaboration. Hopout2x shows the potential for emerging talent.
              <br /><br />
              Together, these artists and the ITSFAMM platform illustrate a broader shift in the music industry toward independent production, direct audience engagement, and community-driven growth.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gray-900 rounded-2xl p-8 border border-gray-800 text-center">
          <h2 className="text-2xl font-bold mb-4">Platform Stats</h2>
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