import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Always show the header, but maybe with a dark background if not on home
  const isHome = location.pathname === '/';

  return (
    <header className={`${styles.header} ${isScrolled || !isHome ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoAccent}>Short</span>Flix
          </Link>
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            {isAuthenticated && <Link to="/my-space">My Space</Link>}
          </nav>
        </div>
        <div className={styles.right}>
          {/* Login button removed completely */}
        </div>
      </div>
    </header>
  );
};

export default Header;
