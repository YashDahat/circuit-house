import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Circuit House</h1>
        <p className="text-xl md:text-2xl mb-8">Experience Culinary Excellence in Pune</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            <Link to={ROUTES.RESERVATION}>Reserve Your Table</Link>
          </Button>
          <Button asChild className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            <Link to={ROUTES.ORDER}>Order Online</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}