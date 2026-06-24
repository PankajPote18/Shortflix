import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, Settings } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();

  // Hide bottom nav on player pages
  if (location.pathname.startsWith('/watch')) return null;

  return (
    <nav className={styles.bottomNav}>
      <NavLink
        to="/"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        end
      >
        <Home size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <Compass size={22} />
        <span>Explore</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <Settings size={22} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
