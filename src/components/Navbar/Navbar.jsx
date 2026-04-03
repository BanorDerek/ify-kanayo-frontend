// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGift, FaCamera, FaQrcode, FaHeart, FaHome, FaInfoCircle, FaBed, FaCalendarCheck, FaChevronDown } from 'react-icons/fa';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/wedding-details', label: 'Details', icon: <FaInfoCircle /> },
    { path: '/rsvp', label: 'RSVP', icon: <FaCalendarCheck /> },
   
    { path: '/hotels', label: 'Hotels', icon: <FaBed /> },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoText}>
              Ifeoma <span className={styles.amp}>&</span> Kanayo
            </span>
            <FaHeart className={styles.logoHeart} />
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navMenu}>
            {navLinks.map((link) => (
              <li key={link.path} className={styles.navItem}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                >
                  <span className={styles.linkIcon}>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Action Buttons */}
          <div className={styles.actionButtons}>
            <Link to="/gift-registry" className={styles.giftBtn}>
              <FaGift />
              <span>Gift Registry</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.menuButton} ${isOpen ? styles.active : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span className={styles.menuIcon}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${isOpen ? styles.open : ''}`} onClick={() => setIsOpen(false)}>
        <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
          <div className={styles.mobileHeader}>
            <div className={styles.mobileLogo}>
              Ifeoma <span>&</span> Kanayo
            </div>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          
          <div className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.mobileLinkIcon}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileActions}>
            <Link to="/gift-registry" className={styles.mobileGiftBtn} onClick={() => setIsOpen(false)}>
              <FaGift />
              Gift Registry
            </Link>
            <Link to="/upload" className={styles.mobileUploadBtn} onClick={() => setIsOpen(false)}>
              <FaQrcode />
              Upload Photos
            </Link>
          </div>

          <div className={styles.mobileFooter}>
            <p>September 12, 2026</p>
            <p>Brick and Ivey | Marietta, GA</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
