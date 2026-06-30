import React, { useRef, useEffect, useState } from 'react';
import { Play, Loader, ChevronLeft, MoreVertical, Gauge, Bookmark, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import styles from '../../pages/Explore.module.css';

const VideoCard = ({ video }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setIsPlaying(true))
              .catch(() => {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current.play().then(() => setIsPlaying(true));
              });
          }
        }
      } else {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
          videoRef.current.currentTime = 0;
          setProgress(0);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className={styles.videoCardContainer} ref={containerRef}>


      {!isLoaded && (
        <div className={styles.loaderContainer}>
          <Loader className={styles.spinner} size={40} />
        </div>
      )}

      <video
        ref={videoRef}
        src={video.videoUrl}
        className={styles.videoElement}
        loop
        playsInline
        muted={isMuted} /* Still muted by default, but relying on browser/user interaction for unmute or we can add a toggle later */
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setIsLoaded(true)}
        onClick={togglePlay}
      />

      <div className={styles.gradientOverlay}></div>

      {!isPlaying && isLoaded && (
        <div className={styles.playIconOverlay} onClick={togglePlay}>
          <Play size={64} fill="white" color="white" />
        </div>
      )}


      <div className={styles.overlayContent}>
        {/* Bottom Left Area */}
        <div className={styles.overlayLeft}>
          <div className={styles.trailerBadge}>Trailer</div>
          <h1 className={styles.overlayTitle}>{video.seriesTitle || video.title}</h1>
          <button className={styles.watchBtn} onClick={togglePlay}>
            <Play size={16} fill="currentColor" className={styles.watchBtnIcon} />
            Watch. Total {video.episodesCount || 20} Episodes
          </button>
        </div>

        {/* Bottom Right Sidebar */}
        <div className={styles.overlayRight}>
          <button className={styles.actionBtn}>
            <Bookmark size={26} />
            <span>Wishlist</span>
          </button>
          <button className={styles.actionBtn}>
            <Send size={26} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <ProgressBar progress={progress} />
    </div>
  );
};

export default VideoCard;
