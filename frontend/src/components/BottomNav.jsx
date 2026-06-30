import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Hide bottom nav on player and auth pages
  if (
    location.pathname.startsWith('/watch') || 
    location.pathname === '/login' || 
    location.pathname === '/register' ||
    location.pathname === '/explore'
  ) {
    return null;
  }

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
      
      {/* Always show My Space instead of Login; ProtectedRoute handles the redirect */}
      <NavLink
        to="/my-space"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
      >
        <User size={22} />
        <span>My Space</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
