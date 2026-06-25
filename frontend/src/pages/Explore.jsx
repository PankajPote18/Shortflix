import React from 'react';
import { exploreDemoData } from '../data/exploreDemoData';
import VideoCard from '../components/Explore/VideoCard';
import styles from './Explore.module.css';

const Explore = () => {
  return (
    <div className={styles.explorePage}>
      <div className={styles.feedContainer}>
        {exploreDemoData.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
          />
        ))}
      </div>
    </div>
  );
};

export default Explore;
