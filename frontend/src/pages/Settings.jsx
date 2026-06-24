import React from 'react';
import { 
  Zap, 
  Bookmark, 
  Info, 
  Shield, 
  Receipt, 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  ChevronRight 
} from 'lucide-react';
import styles from './Settings.module.css';

const settingsLinks = [
  { id: 'plans', icon: Zap, label: 'Explore Plans', highlight: true },
  { id: 'list', icon: Bookmark, label: 'My List' },
  { id: 'about', icon: Info, label: 'About' },
  { id: 'privacy', icon: Shield, label: 'Privacy Policy' },
  { id: 'refund', icon: Receipt, label: 'Refund Policy' },
  { id: 'terms', icon: FileText, label: 'Terms and Conditions' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'logout', icon: LogOut, label: 'Logout' },
];

const Settings = () => {
  return (
    <div className={styles.settingsPage}>
      <div className={styles.container}>
        <div className={styles.list}>
          {settingsLinks.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className={`${styles.item} ${item.highlight ? styles.highlight : ''}`}
              >
                <div className={styles.iconWrapper}>
                  <Icon size={20} className={styles.icon} />
                </div>
                <span className={styles.label}>{item.label}</span>
                <ChevronRight size={20} className={styles.chevron} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Settings;
