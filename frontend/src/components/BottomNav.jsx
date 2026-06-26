import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
      
      {isAuthenticated ? (
        <NavLink
          to="/my-space"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <User size={22} />
          <span>My Space</span>
        </NavLink>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <LogIn size={22} />
          <span>Login</span>
        </NavLink>
      )}
    </nav>
  );
};

export default BottomNav;
