import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ isAdmin = false, onToggleAdmin = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAdminToggle = () => {
    onToggleAdmin();
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.icon}>💼</span>
          <span className={styles.text}>Job Portal</span>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <Link to="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Browse Jobs
          </Link>

          {isAdmin && (
            <>
              <Link to="/create-job" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                Post Job
              </Link>
              <Link to="/manage-jobs" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                Manage Jobs
              </Link>
            </>
          )}

          <button
            onClick={handleAdminToggle}
            className={`${styles.navLink} ${styles.adminToggle}`}
            style={{ background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer', font: 'inherit' }}
          >
            {isAdmin ? '👤 User View' : '⚙️ Admin'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
