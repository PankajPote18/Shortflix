import React from 'react';
import styles from '../../pages/Explore.module.css';

const VideoOverlay = ({ seriesTitle, episodeTitle, description, genre }) => {
  return (
    <div className={styles.overlayContainer}>
      <h2 className={styles.seriesTitle}>{seriesTitle}</h2>
      <h3 className={styles.episodeTitle}>{episodeTitle}</h3>
      <p className={styles.genre}>{genre}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default VideoOverlay;
