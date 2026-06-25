import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import styles from '../../pages/Explore.module.css';

const ActionButtons = () => {
  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.actionBtn}>
        <Heart size={28} />
        <span>1.2M</span>
      </button>
      <button className={styles.actionBtn}>
        <MessageCircle size={28} />
        <span>45K</span>
      </button>
      <button className={styles.actionBtn}>
        <Bookmark size={28} />
        <span>Save</span>
      </button>
      <button className={styles.actionBtn}>
        <Share2 size={28} />
        <span>Share</span>
      </button>
      <button className={styles.actionBtn}>
        <MoreHorizontal size={28} />
      </button>
    </div>
  );
};

export default ActionButtons;
