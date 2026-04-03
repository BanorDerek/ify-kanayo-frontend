import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GiftRegistryPromo.module.css';
import { FaGift, FaHeart, FaCreditCard } from 'react-icons/fa';

const GiftRegistryPromo = () => {
  return (
    <div className={styles.promo}>
      <div className={styles.promoContent}>
        <div className={styles.iconWrapper}>
          <FaGift className={styles.icon} />
          <FaHeart className={`${styles.icon} ${styles.heartIcon}`} />
        </div>
        <h3>Celebrate with a Gift</h3>
        <p>Your presence means the world to us, but if you wish to celebrate with a gift, we've made it easy!</p>
        <div className={styles.options}>
          <span>🎁 Physical Gifts</span>
          <span>💰 Cash Donations</span>
        </div>
        <Link to="/gift-registry" className={styles.promoBtn}>
          View Gift Registry
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default GiftRegistryPromo;
