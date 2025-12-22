import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Youtube, Music, Globe } from "lucide-react";

const icons = {
  instagram: Instagram,
  tiktok: Music, // Using Music as TikTok icon placeholder
  youtube: Youtube,
  spotify: Music,
  appleMusic: Music,
  soundcloud: Music,
  website: Globe
};

const labels = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  spotify: "Spotify",
  appleMusic: "Apple Music",
  soundcloud: "SoundCloud",
  website: "Website"
};

export default function LinkInputField({ platform, value, onChange }) {
  const Icon = icons[platform] || Globe;
  
  return (
    <div className="space-y-2">
      <Label className="text-zinc-400 text-xs uppercase tracking-wider">{labels[platform]}</Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">
          <Icon className="w-4 h-4" />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`https://${platform}.com/...`}
          className="pl-10 bg-zinc-900/50 border-zinc-700 focus:border-emerald-500 transition-colors"
        />
      </div>
    </div>
  );
}