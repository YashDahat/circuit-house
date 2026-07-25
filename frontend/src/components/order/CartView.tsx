import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { OrderSummary } from './OrderSummary';

interface CartViewProps {
  onProceedToCheckout: () => void;
}

export const CartView = ({ onProceedToCheckout }: CartViewProps) => {
  const { cartItems, updateItemQuantity, removeItemFromCart, cartTotal } = useCart();

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3748] mb-8">Your Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">Your cart is empty.</p>
            <Link to={ROUTES.MENU}>
              <Button className="bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
                Browse Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
              {cartItems.map((item) => (
                <div key={item.menuItemId} className="flex items-center justify-between py-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.menuItem.imageUrl ?? '/placeholder-image.jpg'}
                      alt={item.menuItem.name ?? 'Menu Item'}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.menuItem.name}</h3>
                      <p className="text-gray-600">${(item.menuItem.price ?? 0).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(item.menuItemId, parseInt(e.target.value))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItemFromCart(item.menuItemId)}
                      className="text-red-500 hover:text-red-700 transition-all duration-200"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <OrderSummary />
              <Button
                onClick={onProceedToCheckout}
                className="w-full mt-6 bg-[#D69E2E] hover:bg-[#c28b29] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};