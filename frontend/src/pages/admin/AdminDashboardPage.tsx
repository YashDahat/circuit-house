import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1A202C] mb-8 md:text-4xl">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#1A202C]">Menu Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3748] leading-relaxed mb-4">Manage menu items and categories.</p>
                <Link to={ROUTES.ADMIN_MENU}>
                  <Button className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                    Go to Menu
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#1A202C]">Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3748] leading-relaxed mb-4">View and manage customer reservations.</p>
                <Link to={ROUTES.ADMIN_RESERVATIONS}>
                  <Button className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                    Go to Reservations
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#1A202C]">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3748] leading-relaxed mb-4">Track and manage online orders.</p>
                <Link to={ROUTES.ADMIN_ORDERS}>
                  <Button className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                    Go to Orders
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#1A202C]">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3748] leading-relaxed mb-4">Manage restaurant events and promotions.</p>
                <Link to={ROUTES.ADMIN_EVENTS}>
                  <Button className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                    Go to Events
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#1A202C]">Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#2D3748] leading-relaxed mb-4">Review and approve customer testimonials.</p>
                <Link to={ROUTES.ADMIN_TESTIMONIALS}>
                  <Button className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                    Go to Testimonials
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;