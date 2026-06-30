import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Heart, Star, Share, Lock, BarChart2, SkipForward, SkipBack, Volume2, VolumeX, Maximize, Bookmark, Send, ChevronLeft, Gauge, MoreVertical, MonitorPlay, ChevronRight, ListVideo, Forward } from 'lucide-react';
import { getSeriesById, getEpisodesBySeriesId, getHomeData } from '../services/api';
import Row from '../components/Row';
import { useWatchContext } from '../context/WatchContext';
import styles from './Player.module.css';

const Player = () => {
  const { seriesId, episodeId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [series, setSeries] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const { saveProgress } = useWatchContext();

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const [seriesRes, episodesRes, homeRes] = await Promise.all([
          getSeriesById(seriesId),
          getEpisodesBySeriesId(seriesId),
          getHomeData()
        ]);
        setSeries(seriesRes.data);
        setEpisodes(episodesRes.data);
        setRecommendations(homeRes.data.trending || []);

        const targetEpisodeId = episodeId ? parseInt(episodeId) : null;
        const ep = targetEpisodeId
          ? episodesRes.data.find(e => e.id === targetEpisodeId)
          : episodesRes.data[0];

        if (ep) {
          setCurrentEpisode(ep);
          if (!episodeId) {
            navigate(`/watch/${seriesId}/${ep.id}`, { replace: true });
          }
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoData();
  }, [seriesId, episodeId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.currentTime = 0;
      setCurrentTime(0);

      // Attempt autoplay
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay with sound was blocked, fallback to muted autoplay
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch((err) => {
                  console.error('Autoplay completely blocked:', err);
                  setIsPlaying(false);
                });
            }
          });
      }
    }
  }, [currentEpisode]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);

      // Save progress every 5 seconds
      if (Math.floor(videoRef.current.currentTime) % 5 === 0 && series && currentEpisode && videoRef.current.duration) {
        const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        saveProgress(series, currentEpisode, percentage);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const currentIndex = episodes.findIndex(e => e.id === currentEpisode.id);
    if (currentIndex < episodes.length - 1) {
      navigate(`/watch/${seriesId}/${episodes[currentIndex + 1].id}`);
    }
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const currentIndex = episodes.findIndex(e => e.id === currentEpisode.id);
    if (currentIndex > 0) {
      navigate(`/watch/${seriesId}/${episodes[currentIndex - 1].id}`);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const m = Math.floor(time / 60).toString().padStart(2, '0');
    const s = Math.floor(time % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (loading || !currentEpisode) return <div className="container" style={{ paddingTop: '100px' }}>Loading video...</div>;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.playerPage}>
      {/* Top Nav moved inside videoContainer for mobile */}

      <div className={styles.layout}>
        {/* Left: Video Player */}
        <div className={styles.leftColumn}>
          <button onClick={() => navigate(-1)} className={`${styles.floatingBackBtn} ${styles.desktopOnly}`}>
            <ArrowLeft size={24} />
          </button>

          <div className={styles.videoContainer} onClick={togglePlay} ref={containerRef}>
            {/* Top Navigation Overlay (Mobile) */}
            {!isPlaying && (
              <div className={`${styles.topNav} ${styles.mobileOnly}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.topLeft}>
                  <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} strokeWidth={2.5} />
                  </button>
                  <span className={styles.epIndicator}>EP.{currentEpisode.episode_number}</span>
                </div>
                <div className={styles.topRight}>
                  <button className={styles.speedBtn}>
                    <Gauge size={18} /> Speed
                  </button>
                  <button className={styles.moreBtn}>
                    <MoreVertical size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              src={currentEpisode.video_url}
              className={styles.videoElement}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleNext}
              playsInline
            />
            {!isPlaying && (
              <div className={styles.playOverlay}>
                <div className={styles.largePlayBtn}>
                  <Play size={36} fill="currentColor" className={styles.playIcon} />
                </div>
              </div>
            )}

            {/* Custom Controls (Mobile-style overlay) */}
            {!isPlaying && (
              <div className={styles.customControls} onClick={(e) => e.stopPropagation()}>
                <div className={styles.bottomOverlay}>
                  <div className={styles.overlayLeft}>
                    <MonitorPlay size={16} className={styles.miniIcon} />
                    <h2 className={styles.overlayTitleSmall}>
                      {series?.title} <ChevronRight size={16} strokeWidth={3} />
                    </h2>
                    <p className={styles.overlayDescription}>
                      {currentEpisode?.description?.length > 40
                        ? `${currentEpisode.description.substring(0, 40)}...`
                        : currentEpisode?.description}
                    </p>
                  </div>
                  <div className={styles.overlayRight}>
                    <button className={styles.actionBtn}>
                      <Bookmark size={26} />
                      <span>69K</span>
                    </button>
                    <button className={styles.actionBtn}>
                      <ListVideo size={26} />
                      <span>Episodes</span>
                    </button>
                    <button className={styles.actionBtn}>
                      <Forward size={26} />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Extra Controls Row */}
                <div className={styles.extraControls}>
                  <span className={styles.timeDisplay}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <div className={styles.extraControlsIcons}>
                    <button className={styles.utilBtn} onClick={handlePrev}>
                      <SkipBack size={18} />
                    </button>
                    <button className={styles.utilBtn} onClick={handleNext}>
                      <SkipForward size={18} />
                    </button>
                    <button className={styles.utilBtn} onClick={toggleMute}>
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <button className={styles.utilBtn} onClick={toggleFullscreen}>
                      <Maximize size={18} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className={styles.rightColumn}>
          {/* Top block: title + plot + episodes (compact on desktop) */}
          <div className={styles.rightTop}>
            <div className={styles.desktopTitleGroup}>
              <h1 className={styles.seriesTitle}>
                Episode {currentEpisode.episode_number} - {series?.title} Full Movie
              </h1>
              {series && (
                <p className={styles.dramaAlias}>
                  Drama Alias: {series.genre || 'My mate betrayed me'}...
                </p>
              )}
            </div>
            <div className={styles.mobileTitleGroup}>
              <h1 className={styles.seriesTitle}>{series?.title}</h1>
              <h2 className={styles.episodeTitle}>
                Episode {currentEpisode.episode_number} - Full Movie
              </h2>
            </div>

            <div className={`${styles.plotSection} ${styles.desktopPlot}`}>
              <h3>Plot of Episode {currentEpisode.episode_number}</h3>
              <p>
                {currentEpisode.description?.length > 100
                  ? `${currentEpisode.description.substring(0, 100)}... `
                  : currentEpisode.description}
                <span className={styles.moreText}>More</span>
              </p>
            </div>

            <div className={`${styles.divider} ${styles.desktopOnly}`}></div>

            <div className={styles.episodesSection}>
              <div className={styles.episodeTabs}>
                <div className={styles.tabGroup}>
                  <span className={styles.activeTab}>0-49</span>
                  <span className={styles.inactiveTab}>50-57</span>
                </div>
                <span className={styles.allEpisodes}>All Episodes &gt;</span>
              </div>

              <div className={styles.episodeGridWrapper}>
                <div className={styles.episodeGrid}>
                  {episodes.map((ep) => {
                    const isActive = currentEpisode.id === ep.id;
                    return (
                      <Link
                        key={ep.id}
                        to={`/watch/${seriesId}/${ep.id}`}
                        className={`${styles.gridItem} ${isActive ? styles.activeGridItem : ''}`}
                      >
                        {ep.episode_number}
                        {isActive && <div className={styles.equalizer}><BarChart2 size={12} color="white" /></div>}
                        {ep.is_premium && <Lock size={10} className={styles.lockIcon} fill="red" color="red" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile plot falls below episodes */}
          <div className={`${styles.plotSection} ${styles.mobilePlot}`}>
            <h3>Plot of Episode {currentEpisode.episode_number}</h3>
            <p>
              {currentEpisode.description?.length > 100
                ? `${currentEpisode.description.substring(0, 100)}... `
                : currentEpisode.description}
              <span className={styles.moreText}>More</span>
            </p>
          </div>

          {/* Recommendations at bottom of right column */}
          <div className={styles.recommendationSection}>
            <Row title="Recommendation for you" data={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
