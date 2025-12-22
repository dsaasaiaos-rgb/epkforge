import React from 'react';
import HeroSearch from '@/components/home/HeroSearch';
import FeatureCards from '@/components/home/FeatureCards';
import DemoProfiles from '@/components/home/DemoProfiles';

export default function Home() {
  return (
    <div>
      <HeroSearch />
      <FeatureCards />
      <DemoProfiles />
    </div>
  );
}