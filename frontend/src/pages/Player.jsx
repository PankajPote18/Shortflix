import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Heart, Star, Share, Lock, BarChart2, SkipForward, Volume2, VolumeX, Maximize } from 'lucide-react';
import { getSeriesById, getEpisodesBySeriesId } from '../services/api';
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
        const [seriesRes, episodesRes] = await Promise.all([
          getSeriesById(seriesId),
          getEpisodesBySeriesId(seriesId)
        ]);
        setSeries(seriesRes.data);
        setEpisodes(episodesRes.data);
        
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
      setIsPlaying(false);
      setCurrentTime(0);
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

  if (loading || !currentEpisode) return <div className="container" style={{paddingTop: '100px'}}>Loading video...</div>;

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.playerPage}>
      <div className={styles.topBar}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={24} />
        </button>
        <span className={styles.topBarTitle}>
          {series?.title?.length > 25 ? series?.title?.substring(0, 25) + '...' : series?.title}
        </span>
      </div>

      <div className={styles.layout}>
        {/* Left: Video Player */}
        <div className={styles.leftColumn}>
          <div className={styles.videoContainer} onClick={togglePlay} ref={containerRef}>
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
            
            {/* Custom Controls */}
            <div className={styles.customControls} onClick={(e) => e.stopPropagation()}>
              <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className={styles.controlsRow}>
                <div className={styles.controlsLeft}>
                  <button className={styles.controlBtn} onClick={togglePlay}>
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                  </button>
                  <button className={styles.controlBtn} onClick={handleNext}>
                    <SkipForward size={20} fill="currentColor" />
                  </button>
                  <span className={styles.timeDisplay}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className={styles.controlsRight}>
                  <span className={styles.resolution}>1080P</span>
                  <button className={styles.controlBtn} onClick={toggleMute}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button className={styles.controlBtn} onClick={toggleFullscreen}>
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className={styles.rightColumn}>
          <h1 className={styles.episodeTitle}>
            Episode {currentEpisode.episode_number} - {series?.title} Full Movie
          </h1>
          
          <div className={styles.episodesSection}>
            <div className={styles.episodeTabs}>
              <div className={styles.tabGroup}>
                <span className={styles.activeTab}>0-49</span>
                <span className={styles.inactiveTab}>50-66</span>
              </div>
              <span className={styles.allEpisodes}>All Episodes &gt;</span>
            </div>
            
            <div className={styles.episodeGridWrapper}>
              <div className={styles.episodeGrid}>
                <div className={styles.trailerBtn}>Trailer</div>
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

          <div className={styles.divider}></div>
          
          <div className={styles.actionRow}>
            <div className={styles.actionItem}>
              <Heart size={22} fill="white" />
              <span>3.7k</span>
            </div>
            <div className={styles.actionItem}>
              <Star size={22} fill="white" />
              <span>49.4k</span>
            </div>
            <div className={styles.actionItem}>
              <Share size={22} fill="white" />
              <span>Share</span>
            </div>
          </div>
          
          <div className={styles.divider}></div>

          <div className={styles.plotSection}>
            <h3>Plot of Episode {currentEpisode.episode_number}</h3>
            <p>
              {currentEpisode.description?.length > 100 
                ? `${currentEpisode.description.substring(0, 100)}... ` 
                : currentEpisode.description}
              <span className={styles.moreText}>More</span>
            </p>
          </div>
          
          <div className={styles.tagsRow}>
            {['Emotional', 'Exciting', 'USA', 'Banquet', 'Mansion', 'Contemporary'].map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          
          <div className={styles.recommendationSection}>
            <h3 className={styles.recTitle}>Recommendation for you</h3>
            <div className={styles.recGrid}>
              {/* Dummy recommendations for now, will map actual data if needed, but styling is key */}
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.recCard}>
                  <img src={`https://picsum.photos/300/400?random=${i + 50}`} alt="Rec" className={styles.recImg} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Player;
