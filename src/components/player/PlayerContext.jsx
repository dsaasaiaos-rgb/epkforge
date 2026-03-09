import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const currentTrack = queue[currentIndex];

  const playTrack = (track) => {
    // If track is not in queue, add it and play
    const newQueue = [track];
    setQueue(newQueue);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  const addToQueue = (track) => {
    if (queue.length === 0) {
      playTrack(track);
    } else {
      setQueue([...queue, track]);
    }
  };

  const nextTrack = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop or stop? Let's loop for now
      setCurrentIndex(0);
    }
  };

  const prevTrack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(queue.length - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const value = {
    queue,
    currentTrack,
    currentIndex,
    isPlaying,
    playTrack,
    addToQueue,
    nextTrack,
    prevTrack,
    togglePlay,
    isExpanded,
    setIsExpanded
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}