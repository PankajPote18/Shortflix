import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { getHomeData } from '../services/api';
import Row from '../components/Row';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import styles from './Home.module.css';

const Home = () => {
  const [data, setData] = useState({
    featured: [],
    trending: [],
    new_releases: [],
    most_watched: [],
    categories: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHomeData();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {loading ? (
          <div className={`skeleton ${styles.heroSkeleton}`}></div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: `.${styles.customPagination}` }}
            navigation={{
              nextEl: `.${styles.swiperButtonNext}`,
              prevEl: `.${styles.swiperButtonPrev}`,
            }}
            className={styles.heroSwiper}
          >
            {data.featured.map((item) => (
              <SwiperSlide key={item.id}>
                <div className={styles.heroSlide}>
                  <div className={styles.heroImageWrapper}>
                    <img src={item.banner} alt={item.title} className={styles.heroImage} />
                    <div className={styles.heroGradient}></div>
                  </div>
                  <div className={`container ${styles.heroContent}`}>
                    <h1 className={styles.heroTitle}>{item.title}</h1>
                    <div className={styles.heroActions}>
                      <Link to={`/watch/${item.id}`} className={styles.playBtn}>
                        <Play size={20} fill="currentColor" /> Watch Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            {/* Custom Navigation and Pagination */}
            <div className={styles.swiperButtonPrev}><ChevronLeft size={28} /></div>
            <div className={styles.swiperButtonNext}><ChevronRight size={28} /></div>
            <div className={styles.customPagination}></div>
          </Swiper>
        )}
      </section>

      {/* Content Rows */}
      <section className={`container ${styles.contentSection}`}>
        <Row title="Trending Now" data={data.trending} loading={loading} />
        <Row title="New Releases" data={data.new_releases} loading={loading} />
        <Row title="Most Watched" data={data.most_watched} loading={loading} />

        {Object.entries(data.categories).map(([categoryName, seriesList]) => (
          <Row key={categoryName} title={categoryName} data={seriesList} loading={loading} />
        ))}
      </section>
    </div>
  );
};

export default Home;
