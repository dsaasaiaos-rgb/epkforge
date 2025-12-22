import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(createPageUrl('Search') + `?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCreateManually = () => {
    navigate(createPageUrl('Build') + '?manual=true');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI-Powered Press Kits
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Your Music.</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Your Story.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
            Generate a professional Electronic Press Kit in minutes. 
            Let AI craft your narrative from your digital presence.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search your artist name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-36 text-lg bg-zinc-900/80 border-zinc-700 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500/20 placeholder:text-zinc-500"
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium"
              >
                Search
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          {/* Or divider */}
          <div className="flex items-center gap-4 max-w-md mx-auto mb-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-500 text-sm">or</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Manual Entry Button */}
          <Button
            onClick={handleCreateManually}
            variant="outline"
            className="h-12 px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
          >
            Create Profile Manually
          </Button>
        </motion.div>
      </div>
    </div>
  );
}