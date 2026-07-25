import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';

export function AdminSidebar() {
  const { logout } = useAuth();

  const adminRoutes = [
    { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD },
    { name: 'Menu Management', path: ROUTES.ADMIN_MENU },
    { name: 'Reservations', path: ROUTES.ADMIN_RESERVATIONS },
    { name: 'Orders', path: ROUTES.ADMIN_ORDERS },
    { name: 'Event Management', path: ROUTES.ADMIN_EVENTS },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      <div className="text-2xl font-bold mb-8 text-[#D69E2E]">Admin Panel</div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {adminRoutes.map((route) => (
            <li key={route.name}>
              <Link
                to={route.path}
                className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-200"
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}