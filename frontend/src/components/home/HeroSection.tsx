import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

const HeroSection = () => {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Experience Culinary Excellence at Circuit House
        </h1>
        <Link
          to={ROUTES.RESERVATION}
          className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
        >
          Book a Table
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;