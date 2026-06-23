import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchContext = createContext();

export const useWatchContext = () => useContext(WatchContext);

export const WatchProvider = ({ children }) => {
  const [continueWatching, setContinueWatching] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedProgress = localStorage.getItem('shortflix_progress');
    const savedWatchlist = localStorage.getItem('shortflix_watchlist');
    
    if (savedProgress) setContinueWatching(JSON.parse(savedProgress));
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
  }, []);

  const saveProgress = (series, episode, progress) => {
    const updated = [...continueWatching];
    const existingIndex = updated.findIndex((item) => item.series.id === series.id);
    
    const record = {
      series,
      episode,
      progress, // percentage or seconds
      timestamp: Date.now()
    };

    if (existingIndex >= 0) {
      updated[existingIndex] = record;
    } else {
      updated.unshift(record);
    }
    
    // Keep only last 20
    const limited = updated.slice(0, 20);
    setContinueWatching(limited);
    localStorage.setItem('shortflix_progress', JSON.stringify(limited));
  };

  const toggleWatchlist = (series) => {
    const isAdded = watchlist.some(item => item.id === series.id);
    let updated;
    
    if (isAdded) {
      updated = watchlist.filter(item => item.id !== series.id);
    } else {
      updated = [series, ...watchlist];
    }
    
    setWatchlist(updated);
    localStorage.setItem('shortflix_watchlist', JSON.stringify(updated));
  };

  const isInWatchlist = (seriesId) => {
    return watchlist.some(item => item.id === seriesId);
  };

  return (
    <WatchContext.Provider value={{ continueWatching, saveProgress, watchlist, toggleWatchlist, isInWatchlist }}>
      {children}
    </WatchContext.Provider>
  );
};
