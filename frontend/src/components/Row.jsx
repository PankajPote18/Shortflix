import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SeriesCard from './SeriesCard';
import SkeletonCard from './SkeletonCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import styles from './Row.module.css';

const Row = ({ title, data, loading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!loading && (!data || data.length === 0)) return null;

  return (
    <div className={styles.rowContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <a href="#" className={styles.viewAll}>View all <ChevronRight size={16} /></a>
      </div>

      {loading ? (
        <div className={styles.skeletonGrid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonSlide}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, FreeMode]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          freeMode={true}
          spaceBetween={12}
          slidesPerView="auto"
          className={styles.swiper}
        >
          {data.map((series) => (
            <SwiperSlide key={series.id} className={styles.slide}>
              <SeriesCard series={series} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Row;
