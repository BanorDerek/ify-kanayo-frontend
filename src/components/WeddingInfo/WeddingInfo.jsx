import React from 'react';
import styles from './WeddingInfo.module.css';

const WeddingInfo = () => {
  const weddingDetails = {
    date: "September 12, 2026",
    time: "4:00 PM",
    venue: "Brick and Ivey",
    address: "123 Main Street, Marietta, GA 30060",
    dressCode: "Black Tie Optional",
    guests: "150"
  };

  return (
    <div className={styles.weddingInfo}>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Date:</div>
        <div className={styles.infoValue}>{weddingDetails.date}</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Time:</div>
        <div className={styles.infoValue}>{weddingDetails.time}</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Venue:</div>
        <div className={styles.infoValue}>{weddingDetails.venue}</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Address:</div>
        <div className={styles.infoValue}>{weddingDetails.address}</div>
      </div>
      <div className={styles.infoRow}>
        <div className={styles.infoLabel}>Dress Code:</div>
        <div className={styles.infoValue}>{weddingDetails.dressCode}</div>
      </div>
    </div>
  );
};

export default WeddingInfo;
