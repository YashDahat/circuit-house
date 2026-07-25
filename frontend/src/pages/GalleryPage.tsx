import Layout from '@/components/layout/Layout';

const galleryImages = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
  'https://images.unsplash.com/photo-1551632436-cbf8dd35ba34?w=1920&q=80',
  'https://images.unsplash.com/photo-1504754524776-8f4f696becb7?w=1920&q=80',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&q=80',
  'https://images.unsplash.com/photo-1506354666786-959d6d497f07?w=1920&q=80',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1920&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&q=80',
  'https://images.unsplash.com/photo-1552504865-b77002715758?w=1920&q=80',
];

const GalleryPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#2D3748]">Our Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((src, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;