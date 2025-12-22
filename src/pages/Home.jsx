import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import HeroSearch from '@/components/home/HeroSearch';
import SpotlightExpandOnHover from '@/components/spotlight/SpotlightExpandOnHover';
import { ProgressiveBlurCard } from '@/components/ui/ProgressiveBlurCard';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSearch />
      
      {/* Spotlight Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">Spotlight</h2>
        <SpotlightExpandOnHover />
      </div>

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressiveBlurCard
            title="Build Your EPK"
            subtitle="Create a professional press kit in minutes"
            onClick={() => navigate(createPageUrl('Build'))}
          />
          <ProgressiveBlurCard
            title="Claim & Verify"
            subtitle="Get verified with Pro ($5/month)"
            onClick={() => navigate(createPageUrl('Pricing'))}
          />
          <ProgressiveBlurCard
            title="Get Discovered"
            subtitle="Appear in Spotlight rotation"
            onClick={() => navigate(createPageUrl('Explore'))}
          />
        </div>
      </div>
    </div>
  );
}