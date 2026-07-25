import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import { FeaturedDishes } from '@/components/home/FeaturedDishes';
import AmbianceGallery from '@/components/home/AmbianceGallery';
import { CtaSection } from '@/components/home/CtaSection';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#2D3748] mb-12">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#2D3748] leading-relaxed mb-4">
              "Circuit House consistently delivers an exceptional dining experience. The ambiance is perfect for any occasion, and the food is simply divine. A must-visit!"
            </p>
            <p className="font-semibold text-[#D69E2E]">- Jane Doe</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#2D3748] leading-relaxed mb-4">
              "From the moment we walked in, we felt welcomed. The staff were attentive, and every dish was a masterpiece. Circuit House truly sets the standard for fine dining."
            </p>
            <p className="font-semibold text-[#D69E2E]">- John Smith</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#2D3748] leading-relaxed mb-4">
              "I've celebrated many special occasions here, and Circuit House never disappoints. The flavors are incredible, and the presentation is always stunning. Highly recommend!"
            </p>
            <p className="font-semibold text-[#D69E2E]">- Emily White</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection
        headline="Welcome to Circuit House"
        subheadline="Experience exquisite dining in a vibrant atmosphere."
      />
      <FeaturedDishes />
      <TestimonialsSection />
      <AmbianceGallery />
      <CtaSection />
    </Layout>
  );
};

export default HomePage;