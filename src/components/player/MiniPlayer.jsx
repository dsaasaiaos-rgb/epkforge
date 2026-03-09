import React from 'react';
import { usePlayer } from './PlayerContext';
import { 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, 
  Heart, Mic, ListMusic, Volume2, Maximize2, ChevronDown 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, isExpanded, setIsExpanded } = usePlayer();

  if (!currentTrack) return null;

  return (
    <>
      {/* Expanded Player Overlay (Mobile/Full View) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-0 bg-[#0f0f0f] z-50 flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <button onClick={() => setIsExpanded(false)}>
                <ChevronDown className="w-6 h-6 text-white" />
              </button>
              <span className="text-sm font-medium text-white/70">Now Playing</span>
              <button>
                <ListMusic className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center mb-8">
              <img 
                src={currentTrack.image} 
                alt={currentTrack.title} 
                className="w-full aspect-square object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h2>
                <p className="text-lg text-white/60">{currentTrack.artist}</p>
              </div>

              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div className="bg-white w-1/3 h-full rounded-full" />
              </div>

              <div className="flex justify-between items-center">
                <button onClick={prevTrack}><SkipBack className="w-8 h-8 text-white" /></button>
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                <button onClick={nextTrack}><SkipForward className="w-8 h-8 text-white" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Player Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 h-24 bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-white/5 px-6 flex items-center justify-between z-40"
      >
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3 cursor-pointer" onClick={() => setIsExpanded(true)}>
          <div className="size-14 rounded-lg overflow-hidden shrink-0 relative group">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Maximize2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-white text-sm line-clamp-1">{currentTrack.title}</p>
            <p className="text-[#aaa] text-xs line-clamp-1">{currentTrack.artist}</p>
          </div>
          <button className="text-[#aaa] hover:text-[#ff4444] ml-2 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 w-1/3">
          <div className="flex items-center gap-6">
            <button className="text-[#aaa] hover:text-white transition-colors hidden sm:block">
              <Shuffle className="w-5 h-5" />
            </button>
            <button onClick={prevTrack} className="text-white hover:text-[#ff4444] transition-colors">
              <SkipBack className="w-6 h-6 fill-current" />
            </button>
            <button 
              onClick={togglePlay}
              className="size-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={nextTrack} className="text-white hover:text-[#ff4444] transition-colors">
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
            <button className="text-[#aaa] hover:text-white transition-colors hidden sm:block">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full max-w-md flex items-center gap-3 hidden sm:flex">
            <span className="text-[10px] text-[#666] font-medium">1:24</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
              <div className="w-1/3 h-full bg-white group-hover:bg-[#ff4444] transition-colors"></div>
            </div>
            <span className="text-[10px] text-[#666] font-medium">4:12</span>
          </div>
        </div>

        {/* Volume / Extra */}
        <div className="flex items-center justify-end gap-4 w-1/3">
          <button className="text-[#aaa] hover:text-white hidden sm:block">
            <Mic className="w-5 h-5" />
          </button>
          <button className="text-[#aaa] hover:text-white">
            <ListMusic className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 w-24 hidden sm:flex">
            <Volume2 className="w-5 h-5 text-[#aaa]" />
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-[#aaa]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}