import React from 'react';
import { X } from 'lucide-react';
import styles from './LoginModal.module.css';

const LoginModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic
    alert('Logged in (Dummy Authentication)');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.header}>
          <h2>Welcome to <span className={styles.accent}>ShortFlix</span></h2>
          <p>Log in to save your progress and build your watchlist.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required placeholder="name@example.com" />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••" />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In
          </button>
        </form>
        
        <p className={styles.footerText}>
          Don't have an account? <span className={styles.accent}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
