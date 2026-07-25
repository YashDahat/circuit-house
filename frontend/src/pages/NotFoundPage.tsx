import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ROUTES } from '@/routes';

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3748] mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-[#2D3748] mb-8">Oops! The page you're looking for doesn't exist.</p>
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