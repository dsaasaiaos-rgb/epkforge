import React from 'react';
import { usePlayer } from '@/components/player/PlayerContext';
import { Play, Plus, ArrowRight, Heart, Share2 } from 'lucide-react';
import SEO from '@/components/SEO';

const TRENDING_ARTISTS = [
  {
    id: 1,
    name: "Miles Echo",
    genre: "Contemporary Jazz",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1jxJNWSSvlPobB9ybmfuvfUDPakM1I3cbfl1wCcyarqzuFwmL5dTOJXIe7CrYkPF794Pzsm9BUIuRD7xJaeVvLKIA0_z-7yUXaCxCUEFM9MmbJ74GNzfER8suNvNGJxZWKncIOSEMByo1EQknZXGitVDXRAEi1rvu6yXpAy4h80pkU6Vv1J9vmEAfsVdxg2Q33h4JNV9AWE5LO3-BPVV2szOtH1vRsW-PPbM7Hlc8IWV7kgYMjyrXqd7nrEce9Kbp2JU0_Gn7eGNs",
    title: "Midnight Blue"
  },
  {
    id: 2,
    name: "Sienna Blue",
    genre: "Indie Pop",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCulFtlPKisHHCqrpChnrLYM1R5919BFyQCjZkZIXCeGruxbQTSLi6qXhztoYaGpGl0C3Al9PXyd3R84ZCttAGQCypcKg10bsE3Ur7Py4pA2BV2TW96bGXlHNSkefsJtUKADZ_A-MNUARKvHTwhXjKatONDl_UamY6-EDMDMkpA14csa4Taw60FsbvlWtPDOkMP0EE_kmhjSG84wOaYLanxZZxY8tZwB9a1AO215Sha45Dv-Pu-fsg1VjE4LSqY_qW-Be70lVqgqhpC",
    title: "Summer Haze"
  },
  {
    id: 3,
    name: "Vector Pulse",
    genre: "Electronic",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs9Jf84kdvXN70eEQHbU5SrmRrB8tKNMrFteGahVAwD1i3PUzIBwOvFBhkkiIcgANZZJHDO9cnP-81ICEjaw5hpXzhNk2-VwQeHq8xPhHRaG6vtqN-PfAklr6oraJLmnAcZsE1A63GHG7NoNwQ_kouSYGzZrUKE1oEMibgvgW0KQtcDQXwIxPricdM4Oqi8l9fPoALiatu4Plv-TOHPkip_yr8Koupqv2ClPvb1bFZhVRPfWhzu9UqM2avsX5k9O7hMoXPagekEqLS",
    title: "Neon City"
  },
  {
    id: 4,
    name: "Kira Night",
    genre: "Alternative R&B",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-qux23GD3a0tcJ26draHFEmEIUWLd-2jL6tI7a-i3aEy41UY6XwJenR-Mb8h4YgX67ZgWplqPv5bAGDLrCFyC8wrp8ifoCR6fC1BvoY63rQv1rpgEprzAejsCAeAVAUYOxJy06KVf0LmQyWGZqv5yf_4IWtCV1TELDfMuzdpcmh9FRuu3GOGbXxeNjr025ViwlzuGw9SxQtd-xqQBZqrwQj6PcLL7vHL4n1ldhfMApnegR8MTuEBzS6e2lnCnYH-ZdUsB67pGlA5d",
    title: "Velvet Touch"
  },
  {
    id: 5,
    name: "The Void",
    genre: "Post-Rock",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHh_bOI5LPRX12nW9yUpuG77YEEx83B5QgzZyJtTYmmVBqSy4ccygXSsSU9U7o4gEEOvZxA_zT6ib0A83OO4Riw1uZKGSIbH_GjCkV5e1X2yFxpDD0CchOrmFU2YNxQce7rbG1Kyf_rrWqhtQoNThDcDY89wv-QBRFjCLOthJGJUSbLA9Ig1yt_yFapIZQe4N3yjyxcxoU-A1SpJQnvWLo199hoH9Sdrcmr9Bvcyf5ktD-3NsZ73PUFOc2uV19cW3FpKzO-7RFsN9Q",
    title: "Echoes"
  }
];

const GENRES = [
  { name: "Hip Hop", color: "from-purple-600 to-blue-700" },
  { name: "Electronic", color: "from-rose-500 to-orange-600" },
  { name: "Indie", color: "from-emerald-500 to-teal-700" },
  { name: "Jazz", color: "from-amber-400 to-yellow-600" },
  { name: "Chill", color: "from-blue-400 to-indigo-600" }
];

export default function Discover() {
  const { playTrack, addToQueue } = usePlayer();

  const featuredTrack = {
    id: 'luna-ray',
    title: "Celestial Bloom",
    artist: "Luna Ray",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCY93d91oea6JRkebP1OuiYUieTABseybX8WIpFPc6nUCsM-DLhNTLlqGT5NdbJV-jPGJuQ6YK-gU1W73HTi1-7PbFZ4D6G8d17ER8qn4RFv5DFXDwMnkoXXWUX-2Ri3pq4YJyTraRBU-HGztks8cyrY332y5GH5NEf_q56LXpBTHxbPdjFgdIWemmaLAsMLBdo0gLYuU63C383OkCdTx0J6DateRSdqek_IQEe9B_P09R0cSp7ciTZhXuv8HgBs8_kYRt6B1wxqW_z"
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-32">
      <SEO title="Discover" description="Discover new music and artists on ITSFAMM." />
      
      <div className="max-w-[1400px] mx-auto p-6 lg:p-10 space-y-12">
        
        {/* Cinematic Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl aspect-[21/9] lg:aspect-[3/1] flex items-end group">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={featuredTrack.image}
              alt="Luna Ray" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/80 via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 lg:p-16 max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-white border border-white/20">
              Artist of the Month
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
              Luna Ray
            </h1>
            <p className="text-lg text-gray-300 font-medium">
              Experience the soul-stirring melodies of her latest visual album 'Nebula'. Out now on all platforms.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={() => playTrack(featuredTrack)}
                className="px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5 fill-black" />
                Listen Now
              </button>
              <button 
                onClick={() => addToQueue(featuredTrack)}
                className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Trending Artists Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Trending Artists</h2>
              <p className="text-gray-400 mt-1">The creators shaping the sound of tomorrow.</p>
            </div>
            <button className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {TRENDING_ARTISTS.map((artist) => (
              <div 
                key={artist.id} 
                className="group cursor-pointer"
                onClick={() => playTrack({
                  id: artist.id,
                  title: artist.title,
                  artist: artist.name,
                  image: artist.image
                })}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={artist.image} 
                    alt={artist.name} 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Play className="w-6 h-6 fill-black ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-[#ff4444] transition-colors">{artist.name}</h3>
                <p className="text-gray-500 text-sm">{artist.genre}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Genres / Categories Section */}
        <section>
          <h2 className="text-2xl font-black tracking-tight text-white mb-6">Explore Genres</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {GENRES.map((genre) => (
              <div 
                key={genre.name}
                className={`px-6 py-8 rounded-2xl bg-gradient-to-br ${genre.color} flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity hover:scale-[1.02] duration-300`}
              >
                <p className="text-xl font-black text-white">{genre.name}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}