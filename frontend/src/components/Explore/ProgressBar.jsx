import React from 'react';
import styles from '../../pages/Explore.module.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div 
        className={styles.progressBarFill} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
