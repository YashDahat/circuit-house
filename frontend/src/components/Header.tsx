import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES, routeTable } from '@/routes';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const publicRoutes = routeTable.filter(route => route.nav && !route.admin);

  return (
    <header className="bg-[#1A202C] text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-[#D69E2E]">
          Circuit House
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {publicRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `hover:text-[#D69E2E] transition-colors duration-200 ${
                  isActive ? 'text-[#D69E2E]' : ''
                }`
              }
            >
              {route.nav}
            </NavLink>
          ))}
          <Button asChild className="bg-[#D69E2E] hover:bg-[#C28B2A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
            <Link to={ROUTES.ORDER}>Order Online</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1A202C] text-white">
              <nav className="flex flex-col space-y-4 pt-8">
                {publicRoutes.map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `text-lg hover:text-[#D69E2E] transition-colors duration-200 ${
                        isActive ? 'text-[#D69E2E]' : ''
                      }`
                    }
                  >
                    {route.nav}
                  </NavLink>
                ))}
                <Button asChild className="bg-[#D69E2E] hover:bg-[#C28B2A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
                  <Link to={ROUTES.ORDER}>Order Online</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;