import React, { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const Loader = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can replace with actual data fetching)
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.ringWrapper}>
        <div className={styles.ring}>
          <div className={styles.ringInner}></div>
          <div className={styles.diamond}></div>
        </div>
        <div className={styles.sparkles}>
          <div className={styles.sparkle1}>✨</div>
          <div className={styles.sparkle2}>✨</div>
          <div className={styles.sparkle3}>✨</div>
        </div>
        <p className={styles.loadingText}>Loading your love story...</p>
        <p className={styles.coupleName}>Ifeoma & Kanayo</p>
      </div>
    </div>
  );
};

export default Loader;
