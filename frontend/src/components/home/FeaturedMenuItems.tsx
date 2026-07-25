import { Link } from 'react-router-dom';
import { useMenuItems } from '@/hooks/useMenu';
import { ROUTES } from '@/routes';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedMenuItems() {
  const { data: menuItems, isLoading, isError } = useMenuItems();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2D3748]">Our Featured Menu Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6">
                <Skeleton className="w-full h-48 rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-5 w-1/4" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          Failed to load menu items. Please try again later.
        </div>
      </section>
    );
  }

  const featuredItems = menuItems?.slice(0, 3) || []; // Display up to 3 featured items

  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2D3748]">Our Featured Menu Items</h2>
        {featuredItems.length === 0 ? (
          <div className="text-center text-gray-600">No featured menu items available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="flex flex-col items-center text-center p-6 transition-all duration-200 hover:shadow-lg">
                <img
                  src={item.imageUrl ?? 'https://via.placeholder.com/150'}
                  alt={item.name ?? 'Menu item'}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-[#2D3748]">{item.name}</h3>
                <p className="text-[#2D3748] mb-4 flex-grow">{item.description}</p>
                <p className="text-lg font-bold text-[#D69E2E]">
                  ${item.price?.toFixed(2) ?? 'N/A'}
                </p>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link
            to={ROUTES.MENU}
            className="inline-block bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}