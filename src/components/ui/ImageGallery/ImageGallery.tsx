'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  altPrefix: string;
}

export default function ImageGallery({ images, altPrefix }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, goToPrevious, goToNext]);

  if (!images || images.length === 0) {
    return (
      <div className={styles.noImages}>
        <span className={styles.noImagesIcon} />
        <p>There are currently no pictures for this launch.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.gallery}>
        {images.map((url, idx) => (
          <button
            key={idx}
            className={styles.thumbnailButton}
            onClick={() => openLightbox(idx)}
            aria-label={`View ${altPrefix} - Image ${idx + 1}`}
          >
            <Image
              src={url}
              alt={`${altPrefix} - Image ${idx + 1}`}
              width={400}
              height={300}
              className={styles.thumbnail}
              loading="lazy"
            />
            <div className={styles.thumbnailOverlay}>
              <span className={styles.zoomIcon} />
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button
            className={styles.closeButton}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${altPrefix} - Image ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className={styles.lightboxImage}
              priority
            />
            <div className={styles.imageCounter}>
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
