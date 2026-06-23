import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Video, Camera } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        {/* Left Section - Brand & Social */}
        <div className={styles.brandSection}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoAccent}>Short</span>Flix
          </Link>
          <p className={styles.copyright}>© 2026 ShortFlix Studio, Inc. All Rights Reserved.</p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.iconLink}><Globe size={18} /></a>
            <a href="#" className={styles.iconLink}><Video size={18} /></a>
            <a href="#" className={styles.iconLink}><Camera size={18} /></a>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className={styles.linksContainer}>
          <div className={styles.linkColumn}>
            <h4>ABOUT</h4>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact Us</Link>
            <span className={styles.serviceHours}>Service Hours: Mon-Sun, 24/7</span>
          </div>
          <div className={styles.linkColumn}>
            <h4>SUPPORT</h4>
            <Link to="/feedback">Feedback</Link>
            <Link to="/pr">Media & Public Relations</Link>
          </div>
        </div>

        {/* Right Section - Download App */}
        <div className={styles.downloadSection}>
          <h4>Download App</h4>
          <div className={styles.qrCodeWrapper}>
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://shortflix.com" 
              alt="Download App QR Code" 
              className={styles.qrCode}
              loading="lazy"
            />
          </div>
          <p className={styles.downloadText}>Unlock Premium Episodes in APP</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
