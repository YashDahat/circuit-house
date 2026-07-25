import { Link } from 'react-router-dom';
import { useMenu } from '@/hooks/useMenu';
import { ROUTES } from '@/routes';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export const FeaturedDishes = () => {
  const { data: menuItems, isLoading, isError } = useMenu();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    if (item.id && item.name && item.price) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      toast.success(`${item.name} added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2D3748]">Our Signature Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !menuItems) {
    return (
      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto text-center text-[#2D3748]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Failed to load featured dishes.</h2>
          <p>Please try again later.</p>
        </div>
      </section>
    );
  }

  const featuredDishes = menuItems.slice(0, 3); // Display a maximum of 3 dishes

  return (
    <section className="py-16 px-4 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#2D3748]">Our Signature Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col">
              <img
                src={dish.imageUrl ?? 'https://via.placeholder.com/400x300'}
                alt={dish.name ?? 'Dish image'}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-[#2D3748]">{dish.name}</h3>
              <p className="text-[#2D3748] leading-relaxed mb-4 flex-grow">{dish.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-[#D69E2E]">${dish.price?.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(dish)}
                  className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-6 py-2 transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to={ROUTES.MENU}
            className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 inline-block"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};