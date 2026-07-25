import { Link } from 'react-router-dom';
import { ROUTES, routeTable } from '@/routes';
import { Button } from '@/components/ui/button';

const Header = () => {
  const publicNavRoutes = routeTable.filter(route => route.nav && !route.admin);

  return (
    <header className="bg-[#1A202C] text-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-[#D69E2E]">
          Circuit House
        </Link>
        <nav className="hidden md:flex space-x-6">
          {publicNavRoutes.map((route) => (
            <Link key={route.path} to={route.path} className="hover:text-[#D69E2E] transition-colors duration-200">
              {route.nav}
            </Link>
          ))}
        </nav>
        <Link to={ROUTES.RESERVATION}>
          <Button className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            Book a Table
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;