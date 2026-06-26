import React from 'react';
import { Heart, Bookmark } from 'lucide-react';
import styles from '../../pages/Explore.module.css';

const ActionButtons = () => {
  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.actionBtn}>
        <Heart size={28} />
        <span>1.2M</span>
      </button>
      <button className={styles.actionBtn}>
        <Bookmark size={28} />
        <span>Save</span>
      </button>
    </div>
  );
};

export default ActionButtons;
