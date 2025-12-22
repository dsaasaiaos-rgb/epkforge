import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Youtube, Globe, Music2, AlertCircle, CheckCircle2 } from 'lucide-react';

const platformConfig = {
  instagram: {
    icon: Instagram,
    label: 'Instagram',
    placeholder: 'https://instagram.com/yourhandle',
    color: 'text-pink-500'
  },
  tiktok: {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@yourhandle',
    color: 'text-white'
  },
  youtube: {
    icon: Youtube,
    label: 'YouTube',
    placeholder: 'https://youtube.com/@yourchannel',
    color: 'text-red-500'
  },
  spotify: {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    label: 'Spotify',
    placeholder: 'https://open.spotify.com/artist/...',
    color: 'text-green-500'
  },
  appleMusic: {
    icon: Music2,
    label: 'Apple Music',
    placeholder: 'https://music.apple.com/artist/...',
    color: 'text-pink-400'
  },
  soundcloud: {
    icon: ({ className }) => (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899 1.125c-.051 0-.089.038-.104.091l-.159 1.138.159 1.088c.015.052.053.091.104.091.05 0 .09-.039.097-.091l.185-1.088-.185-1.138c-.007-.053-.047-.091-.097-.091zm1.795-1.658c-.055 0-.104.048-.109.108l-.2 2.487.2 2.392c.005.064.054.108.109.108.054 0 .102-.044.109-.108l.224-2.392-.224-2.487c-.007-.064-.055-.108-.109-.108zm18.41 1.377c-.305 0-.601.055-.878.159-.18-2.003-1.881-3.578-3.945-3.578-.517 0-1.024.1-1.494.291-.176.072-.223.144-.224.287v7.079c.001.148.12.27.263.285.01.001 5.272.002 6.278.002 1.381 0 2.5-1.121 2.5-2.512s-1.119-2.513-2.5-2.513z"/>
      </svg>
    ),
    label: 'SoundCloud',
    placeholder: 'https://soundcloud.com/yourprofile',
    color: 'text-orange-500'
  },
  website: {
    icon: Globe,
    label: 'Website',
    placeholder: 'https://yourwebsite.com',
    color: 'text-blue-500'
  }
};

export default function LinkInputField({ 
  platform, 
  value, 
  onChange, 
  isValid,
  error 
}) {
  const config = platformConfig[platform];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-zinc-300">
        <Icon className={`w-4 h-4 ${config.color}`} />
        {config.label}
      </Label>
      <div className="relative">
        <Input
          type="url"
          placeholder={config.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`bg-zinc-900/80 border-zinc-700 rounded-xl pr-10 ${
            error ? 'border-red-500/50' : isValid ? 'border-emerald-500/50' : ''
          }`}
        />
        {value && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : error ? (
              <AlertCircle className="w-4 h-4 text-red-500" />
            ) : null}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}