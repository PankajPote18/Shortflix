import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, LogOut } from 'lucide-react';
import styles from './MySpace.module.css';

const MySpace = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className={styles.mySpacePage}>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <img src={user.avatar} alt={user.full_name} className={styles.avatar} />
          <div className={styles.userInfo}>
            <h2>{user.full_name}</h2>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.joined}>Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>
          <button className={styles.settingsBtn} onClick={() => navigate('/settings')}>
            <Settings size={24} />
          </button>
        </div>


        {/* Logout Button */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default MySpace;
