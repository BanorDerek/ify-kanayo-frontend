import React, { useState, useEffect } from 'react';
import styles from './WeddingMemories.module.css';
import { FaHeart, FaComment, FaUpload, FaQrcode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WeddingMemories = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState('all');

  // Sample photos (replace with real API calls)
  useEffect(() => {
    setTimeout(() => {
      setPhotos([
        {
          id: 1,
          url: "https://placehold.co/600x400/F7EFE5/D8A7A0?text=Wedding+Photo+1",
          title: "First Dance",
          uploadedBy: "Guest",
          category: "wedding",
          likes: 24,
          comments: 5,
          date: "2026-09-12"
        },
        {
          id: 2,
          url: "https://placehold.co/600x400/F7EFE5/D8A7A0?text=Wedding+Photo+2",
          title: "Cutting the Cake",
          uploadedBy: "Guest",
          category: "wedding",
          likes: 42,
          comments: 12,
          date: "2026-09-12"
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (photoId) => {
    setPhotos(photos.map(photo =>
      photo.id === photoId
        ? { ...photo, likes: photo.likes + 1 }
        : photo
    ));
  };

  const filteredPhotos = filter === 'all'
    ? photos
    : photos.filter(photo => photo.category === filter);

  return (
    <div className={styles.memories}>
      {/* Hero Section with QR Code Upload */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Wedding Memories</h1>
          <p>Share and relive the beautiful moments from our special day</p>
          <div className={styles.uploadOptions}>
            <Link to="/upload" className={`btn btn-primary ${styles.uploadBtn}`}>
              <FaQrcode /> Scan QR to Upload
            </Link>
            <Link to="/upload" className={`btn btn-secondary ${styles.uploadBtnAlt}`}>
              <FaUpload /> Upload Now
            </Link>
          </div>
          <div className={styles.qrHint}>
            <p>📱 Find QR codes around the venue to upload your photos instantly!</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterWrapper}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              All Photos
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'wedding' ? styles.active : ''}`}
              onClick={() => setFilter('wedding')}
            >
              Ceremony
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'reception' ? styles.active : ''}`}
              onClick={() => setFilter('reception')}
            >
              Reception
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'candid' ? styles.active : ''}`}
              onClick={() => setFilter('candid')}
            >
              Candid Moments
            </button>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className={styles.gallerySection}>
        <div className="container">
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading memories...</p>
            </div>
          ) : (
            <>
              <div className={styles.stats}>
                <p>{filteredPhotos.length} beautiful memories shared</p>
              </div>
              <div className={styles.photoGrid}>
                {filteredPhotos.map((photo) => (
                  <div key={photo.id} className={styles.photoCard}>
                    <div
                      className={styles.photoWrapper}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img src={photo.url} alt={photo.title} className={styles.photo} />
                      <div className={styles.photoOverlay}>
                        <span>View Details</span>
                      </div>
                    </div>
                    <div className={styles.photoInfo}>
                      <h3>{photo.title}</h3>
                      <p className={styles.uploader}>
                        📸 Shared by {photo.uploadedBy}
                      </p>
                      <p className={styles.date}>{photo.date}</p>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleLike(photo.id)}
                        >
                          <FaHeart /> {photo.likes}
                        </button>
                        <button className={styles.actionBtn}>
                          <FaComment /> {photo.comments}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedPhoto(null)}>×</button>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} className={styles.modalImage} />
            <div className={styles.modalInfo}>
              <h2>{selectedPhoto.title}</h2>
              <p>Shared by {selectedPhoto.uploadedBy} on {selectedPhoto.date}</p>
              <div className={styles.modalActions}>
                <button onClick={() => handleLike(selectedPhoto.id)}>
                  <FaHeart /> {selectedPhoto.likes} Likes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingMemories;
