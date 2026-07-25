import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { ROUTES } from '@/routes';

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3748] mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Menu Management Card */}
            <Link to={ROUTES.ADMIN_MENU} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
                <h2 className="text-xl font-semibold text-[#2D3748] mb-2">Menu Management</h2>
                <p className="text-[#2D3748] leading-relaxed">Manage menu items, categories, and pricing.</p>
                <button className="mt-4 bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                  Go to Menu
                </button>
              </div>
            </Link>

            {/* Reservations Card */}
            <Link to={ROUTES.ADMIN_RESERVATIONS} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
                <h2 className="text-xl font-semibold text-[#2D3748] mb-2">Reservations</h2>
                <p className="text-[#2D3748] leading-relaxed">View and manage customer reservations.</p>
                <button className="mt-4 bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                  Go to Reservations
                </button>
              </div>
            </Link>

            {/* Orders Card */}
            <Link to={ROUTES.ADMIN_ORDERS} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
                <h2 className="text-xl font-semibold text-[#2D3748] mb-2">Orders</h2>
                <p className="text-[#2D3748] leading-relaxed">Track and process customer orders.</p>
                <button className="mt-4 bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                  Go to Orders
                </button>
              </div>
            </Link>

            {/* Events Card */}
            <Link to={ROUTES.ADMIN_EVENTS} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md">
                <h2 className="text-xl font-semibold text-[#2D3748] mb-2">Events</h2>
                <p className="text-[#2D3748] leading-relaxed">Manage upcoming and past events.</p>
                <button className="mt-4 bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                  Go to Events
                </button>
              </div>
            </Link>
          </div>

          {/* Placeholder for future data summaries */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-[#2D3748] mb-4">Overview</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <p className="text-[#2D3748] leading-relaxed">
                Welcome to the Circuit House Admin Portal. Use the navigation links above to manage various aspects of your restaurant operations.
                This section will display key metrics and recent activities in future updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;