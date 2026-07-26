import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, LayoutDashboard, Utensils, Calendar, ScrollText, MessageSquareText, BookUser } from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner, or a redirect message
  }

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const adminNavLinks = [
    { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Menu Management', path: ROUTES.ADMIN_MENU, icon: <Utensils className="h-5 w-5" /> },
    { name: 'Reservations', path: ROUTES.ADMIN_RESERVATIONS, icon: <BookUser className="h-5 w-5" /> },
    { name: 'Orders', path: ROUTES.ADMIN_ORDERS, icon: <ScrollText className="h-5 w-5" /> },
    { name: 'Events', path: ROUTES.ADMIN_EVENTS, icon: <Calendar className="h-5 w-5" /> },
    { name: 'Testimonials', path: ROUTES.ADMIN_TESTIMONIALS, icon: <MessageSquareText className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A202C] text-white flex flex-col p-4 shadow-lg">
        <div className="flex items-center justify-center h-16 mb-6">
          <h1 className="text-2xl font-bold text-[#D69E2E]">Admin Portal</h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {adminNavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="flex items-center space-x-3 p-3 rounded-md text-gray-300 hover:bg-[#D69E2E] hover:text-white transition-all duration-200 group"
                >
                  {link.icon}
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <Separator className="bg-gray-700 my-4" />
          <Button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-md bg-transparent text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 group"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#1A202C]">Welcome, Admin!</h2>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;