import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logo}>
            ShortFlix
          </Link>
          <p className={styles.copyright}>© 2026 ShortFlix Studio, Inc. All Rights Reserved.</p>
        </div>

        <div className={styles.linksContainer}>
          <Link to="/">Home</Link>
          <Link to="/my-space">My Space</Link>
          <Link to="/explore">Explore</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
