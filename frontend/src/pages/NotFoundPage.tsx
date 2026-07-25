import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ROUTES } from '@/routes';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3748] mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-[#2D3748] mb-8">
            Oops! The page you are looking for does not exist.
          </p>
          <Link
            to={ROUTES.HOME}
            className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;