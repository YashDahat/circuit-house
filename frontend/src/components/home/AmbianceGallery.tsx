import React from 'react';

const AmbianceGallery: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    'https://images.unsplash.com/photo-1594007654729-407edc19256f?w=1920&q=80',
    'https://images.unsplash.com/photo-1550963001-9a9c513e9a1a?w=1920&q=80',
    'https://images.unsplash.com/photo-1552508744-1681722421d7?w=1920&q=80',
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2D3748]">Our Ambiance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-md transition-all duration-200 hover:scale-105">
              <img
                src={src}
                alt={`Restaurant Ambiance ${index + 1}`}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbianceGallery;