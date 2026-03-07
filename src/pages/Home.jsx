import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, TrendingUp, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                ITSFAMM
              </span>
              <br />
              <span className="text-white text-4xl md:text-6xl">Guarantee's Quality</span>
            </h1>
            <p className="mt-6 text-xl text-gray-400 mb-10 leading-relaxed">
              The premier creative hub for independent artists in North Carolina and Florida. 
              Discover the next generation of hip-hop talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Spotlight')}>
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                  Explore Rising Stars <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                Watch on YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
              <Video className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Production</h3>
            <p className="text-gray-400">High-quality music videos and visual storytelling that elevates independent artists.</p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Artist Growth</h3>
            <p className="text-gray-400">A platform dedicated to nurturing emerging talent and expanding their reach.</p>
          </div>
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-colors">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
              <Music className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Collaborative Community</h3>
            <p className="text-gray-400">Connecting artists across regions to create a powerful independent ecosystem.</p>
          </div>
        </div>
      </div>
    </div>
  );
}