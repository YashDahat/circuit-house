import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedMenuItems } from '@/components/home/FeaturedMenuItems';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import CallToActionSection from '@/components/home/CallToActionSection';
import Layout from '@/components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedMenuItems />
      <TestimonialsCarousel />
      <CallToActionSection />
    </Layout>
  );
}