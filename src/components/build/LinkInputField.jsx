import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Music, Youtube, Globe } from 'lucide-react';

const platformIcons = {
  instagram: Instagram,
  tiktok: Music,
  youtube: Youtube,
  spotify: Music,
  appleMusic: Music,
  soundcloud: Music,
  website: Globe
};

const platformLabels = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  soundcloud: 'SoundCloud',
  website: 'Website'
};

export default function LinkInputField({ platform, value, onChange }) {
  const Icon = platformIcons[platform] || Globe;
  const label = platformLabels[platform] || platform;

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`https://...`}
        className="bg-zinc-900/80 border-zinc-700 rounded-xl"
      />
    </div>
  );
}