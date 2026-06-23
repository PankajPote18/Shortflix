import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Eye } from 'lucide-react';
import styles from './SeriesCard.module.css';

const SeriesCard = ({ series }) => {
  return (
    <Link to={`/watch/${series.id}`} className={styles.card}>
      <div className={styles.posterContainer}>
        <img src={series.poster} alt={series.title} className={styles.poster} loading="lazy" />
      </div>
      
      <div className={styles.info}>
        <h3 className={`text-truncate-2 ${styles.title}`} title={series.title}>
          {series.title}
        </h3>
      </div>
    </Link>
  );
};

export default SeriesCard;
