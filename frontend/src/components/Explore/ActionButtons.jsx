import React from 'react';
import { Bookmark, ListVideo, Forward } from 'lucide-react';
import styles from '../../pages/Explore.module.css';

const ActionButtons = () => {
  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.actionBtn}>
        <Bookmark size={28} />
        <span>69K</span>
      </button>
      <button className={styles.actionBtn}>
        <ListVideo size={28} />
        <span>Episodes</span>
      </button>
      <button className={styles.actionBtn}>
        <Forward size={28} />
        <span>Share</span>
      </button>
    </div>
  );
};

export default ActionButtons;
