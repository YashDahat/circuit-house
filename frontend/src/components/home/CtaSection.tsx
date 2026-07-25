import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export function CtaSection() {
  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-4">Experience Culinary Excellence</h2>
        <p className="text-lg text-[#2D3748] mb-8 leading-relaxed">
          Book your table today or explore our exquisite menu.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={ROUTES.RESERVATION}
            className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            Reserve Your Table
          </Link>
          <Link
            to={ROUTES.MENU}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            Explore Our Menu
          </Link>
        </div>
      </div>
    </section>
  );
}