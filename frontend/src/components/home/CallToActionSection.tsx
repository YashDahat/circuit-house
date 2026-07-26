import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8">
          Ready to Experience Circuit House?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
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
};

export default CallToActionSection;