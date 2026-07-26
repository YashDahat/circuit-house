import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { ROUTES } from '@/routes';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-[#D69E2E] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3748] mb-6">Page Not Found</h2>
          <p className="text-lg text-[#2D3748] leading-relaxed mb-8">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button asChild className="bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            <Link to={ROUTES.HOME}>Go to Homepage</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;