import React, { useState } from 'react';
import styles from './UploadModal.module.css';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';

const UploadModal = ({ onClose, onUpload }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('wedding');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) return;

    setUploading(true);
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image);
    
    // Simulate upload (will connect to API later)
    setTimeout(() => {
      onUpload({
        title,
        category,
        url: preview,
        uploadedBy: 'Current User'
      });
      setUploading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Share Your Memory</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Photo Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., First Dance, Beautiful Moment..."
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="wedding">Ceremony</option>
              <option value="reception">Reception</option>
              <option value="candid">Candid Moments</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label>Upload Photo *</label>
            <div
              className={styles.uploadArea}
              onClick={() => document.getElementById('imageInput').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className={styles.preview} />
              ) : (
                <>
                  <FaCloudUploadAlt className={styles.uploadIcon} />
                  <p>Click to upload your photo</p>
                  <span>JPG, PNG, GIF up to 10MB</span>
                </>
              )}
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Share Memory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
