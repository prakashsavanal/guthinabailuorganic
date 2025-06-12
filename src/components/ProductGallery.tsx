'use client';

import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const openLightbox = (index: number) => {
    if (!isClient) return;
    try {
      setSelectedImage(index);
      setIsLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Error opening lightbox:', error);
      setError('Failed to open image gallery');
    }
  };

  const closeLightbox = () => {
    if (!isClient) return;
    try {
      setIsLightboxOpen(false);
      document.body.style.overflow = 'auto';
    } catch (error) {
      console.error('Error closing lightbox:', error);
      setError('Failed to close image gallery');
    }
  };

  const nextImage = () => {
    if (!isClient) return;
    try {
      setSelectedImage((prev) => (prev + 1) % images.length);
    } catch (error) {
      console.error('Error navigating to next image:', error);
      setError('Failed to navigate to next image');
    }
  };

  const prevImage = () => {
    if (!isClient) return;
    try {
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    } catch (error) {
      console.error('Error navigating to previous image:', error);
      setError('Failed to navigate to previous image');
    }
  };

  if (!isClient) {
    return (
      <div className="grid grid-cols-4 gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className={`relative aspect-square rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
              selectedImage === index ? 'ring-2 ring-green-600' : ''
            }`}
            aria-label={`View ${productName} image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${productName} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                setError('Failed to load some images');
              }}
            />
          </button>
        ))}
      </div>

      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in"
          role="dialog"
          aria-label={`${productName} image gallery`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="relative max-w-4xl max-h-[90vh] mx-16">
            <img
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${images[selectedImage]}`);
                setError('Failed to load image');
                closeLightbox();
              }}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 