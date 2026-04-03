import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.css';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={styles.countdown}>
      <div className={styles.countdownItem}>
        <div className={styles.countdownNumber}>{timeLeft.days}</div>
        <div className={styles.countdownLabel}>Days</div>
      </div>
      <div className={styles.countdownSeparator}>:</div>
      <div className={styles.countdownItem}>
        <div className={styles.countdownNumber}>{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className={styles.countdownLabel}>Hours</div>
      </div>
      <div className={styles.countdownSeparator}>:</div>
      <div className={styles.countdownItem}>
        <div className={styles.countdownNumber}>{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className={styles.countdownLabel}>Minutes</div>
      </div>
      <div className={styles.countdownSeparator}>:</div>
      <div className={styles.countdownItem}>
        <div className={styles.countdownNumber}>{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className={styles.countdownLabel}>Seconds</div>
      </div>
    </div>
  );
};

export default CountdownTimer;//
//  countdownTimer.swift
//  
//
//  Created by MacBook on 01/04/2026.
//

