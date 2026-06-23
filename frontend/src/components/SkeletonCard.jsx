import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={`skeleton ${styles.poster}`}></div>
      <div className={styles.info}>
        <div className={`skeleton ${styles.title}`}></div>
        <div className={`skeleton ${styles.meta}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
