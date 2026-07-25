import AdminLayout from '@/components/layout/AdminLayout';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] mb-8">Admin Dashboard</h1>
          <p className="text-lg text-[#2D3748] leading-relaxed">
            Welcome to the Circuit House Admin Panel. Use the sidebar to manage menu items, reservations, orders, and events.
          </p>
          {/* Future: Add summary statistics or quick links here */}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;