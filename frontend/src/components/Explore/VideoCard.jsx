import React, { useRef, useEffect, useState } from 'react';
import { Play, Volume2, VolumeX, Loader } from 'lucide-react';
import VideoOverlay from './VideoOverlay';
import ActionButtons from './ActionButtons';
import ProgressBar from './ProgressBar';
import styles from '../../pages/Explore.module.css';

const VideoCard = ({ video }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
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
        // Video came into view, play it
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
        // Video went out of view, pause it
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

  const toggleMute = (e) => {
    e.stopPropagation();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setIsLoaded(true)}
        onClick={togglePlay}
      />
      
      {/* Dark gradient overlay at bottom for text readability */}
      <div className={styles.gradientOverlay}></div>

      {!isPlaying && isLoaded && (
        <div className={styles.playIconOverlay} onClick={togglePlay}>
          <Play size={64} fill="white" color="white" />
        </div>
      )}

      <button className={styles.muteBtn} onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <VideoOverlay 
        seriesTitle={video.seriesTitle}
        episodeTitle={video.episodeTitle}
        description={video.description}
        genre={video.genre}
      />
      
      <ActionButtons />
      
      <ProgressBar progress={progress} />
    </div>
  );
};

export default VideoCard;
