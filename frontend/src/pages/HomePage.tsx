import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import { FeaturedMenuItems } from '@/components/home/FeaturedMenuItems';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LocationMap from '@/components/home/LocationMap';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedMenuItems />
      <TestimonialsSection />
      <LocationMap />
    </Layout>
  );
};

export default HomePage;