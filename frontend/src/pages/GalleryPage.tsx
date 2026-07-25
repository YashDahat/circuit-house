import React from 'react';
import Layout from '@/components/Layout';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80', alt: 'Restaurant Interior' },
  { src: 'https://images.unsplash.com/photo-1565299624942-4c3d61612fef?w=1920&q=80', alt: 'Delicious Pizza' },
  { src: 'https://images.unsplash.com/photo-1546069901-dcd472935566?w=1920&q=80', alt: 'Gourmet Salad' },
  { src: 'https://images.unsplash.com/photo-1550547660-d941130a44f5?w=1920&q=80', alt: 'Exquisite Dessert' },
  { src: 'https://images.unsplash.com/photo-1504674900247-087700f9cc28?w=1920&q=80', alt: 'Chef Preparing Food' },
  { src: 'https://images.unsplash.com/photo-1551218808-93e6a18036fd?w=1920&q=80', alt: 'Fine Dining Experience' },
  { src: 'https://images.unsplash.com/photo-1514933651105-0646ef3153cd?w=1920&q=80', alt: 'Bar Area' },
  { src: 'https://images.unsplash.com/photo-1540189549336-d1389279978b?w=1920&q=80', alt: 'Fresh Ingredients' },
];

const GalleryPage: React.FC = () => {
  return (
    <Layout>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Gallery</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            A visual journey through our culinary creations and inviting ambiance.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#2D3748]">
            Feast Your Eyes
          </h2>
          <PhotoGrid images={galleryImages} />
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3748] mb-6">
            Ready to Experience Circuit House?
          </h2>
          <p className="text-lg text-[#2D3748] mb-8 leading-relaxed">
            Explore our exquisite menu or book a table for an unforgettable dining experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={ROUTES.MENU}
              className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              View Our Menu
            </Link>
            <Link
              to={ROUTES.RESERVATION}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;