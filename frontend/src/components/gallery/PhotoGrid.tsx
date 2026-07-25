import React from 'react';
import clsx from 'clsx';

interface PhotoGridProps {
  images: { src: string; alt: string }[];
  className?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ images, className }) => {
  return (
    <div className={clsx("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-md">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;