import React from 'react';
import { MonitorPlay, ChevronRight } from 'lucide-react';
import styles from '../../pages/Explore.module.css';

const VideoOverlay = ({ seriesTitle, description }) => {
  return (
    <div className={styles.overlayContainer}>
      <MonitorPlay size={16} className={styles.miniIcon} />
      <h2 className={styles.seriesTitle}>
        {seriesTitle} <ChevronRight size={16} strokeWidth={3} />
      </h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default VideoOverlay;
