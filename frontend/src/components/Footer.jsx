import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <a href="#" className={styles.footerLink}>Terms and Privacy Notice</a>
        <a href="#" className={styles.footerLink}>Send us feedback</a>
        <a href="#" className={styles.footerLink}>Help</a>
        <p className={styles.copyright}>© 2026, ShortFlix, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
