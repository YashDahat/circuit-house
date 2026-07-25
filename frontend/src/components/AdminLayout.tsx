import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { Home, Utensils, Calendar, ClipboardList, BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();

  const adminNavItems = [
    { name: 'Dashboard', icon: Home, path: ROUTES.ADMIN_DASHBOARD },
    { name: 'Menu Management', icon: Utensils, path: ROUTES.ADMIN_MENU },
    { name: 'Reservations', icon: Calendar, path: ROUTES.ADMIN_RESERVATIONS },
    { name: 'Orders', icon: ClipboardList, path: ROUTES.ADMIN_ORDERS },
    { name: 'Events', icon: BookOpen, path: ROUTES.ADMIN_EVENTS },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A202C] text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center p-3 rounded-md text-gray-300 hover:bg-[#D69E2E] hover:text-white transition-all duration-200"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center p-3 rounded-md bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#2D3748]">Admin Dashboard</h1>
          {/* User info or other header elements can go here */}
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;