import React, { useState } from 'react';
import styles from './Gallery.module.css';

// Import local images
import loveStory1 from '../../assets/images/gallery/love-story-1.png';
import loveStory2 from '../../assets/images/gallery/love-story-2.png';
import loveStory3 from '../../assets/images/gallery/love-story-3.png';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { id: 1, url: loveStory1, title: "First Date" },
    { id: 2, url: loveStory2, title: "The Proposal" },
    { id: 3, url: loveStory3, title: "Engagement" },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={styles.gallery}>
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className={styles.galleryItem}
            onClick={() => openModal(image)}
          >
            <div className={styles.imageWrapper}>
              <img src={image.url} alt={image.title} className={styles.image} />
              <div className={styles.overlay}>
                <span className={styles.viewText}>View</span>
              </div>
            </div>
           
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <img src={selectedImage.url} alt={selectedImage.title} className={styles.modalImage} />
            <p className={styles.modalTitle}>{selectedImage.title}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
