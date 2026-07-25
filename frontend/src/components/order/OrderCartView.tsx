import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

const OrderCartView: React.FC = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart, getCartTotal } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-[#2D3748]">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link to={ROUTES.MENU} className="text-[#D69E2E] hover:underline mt-2 inline-block">
            Start browsing the menu
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.menuItemId} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center space-x-4">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name ?? 'Menu Item'} className="w-16 h-16 object-cover rounded-md" />
                  )}
                  <div>
                    <h3 className="font-medium text-[#2D3748]">{item.name}</h3>
                    <p className="text-sm text-gray-600">${item.priceAtOrder?.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
                    onClick={() => removeItem(item.menuItemId)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#2D3748]">Total:</h3>
            <span className="text-xl font-bold text-[#D69E2E]">${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="mt-6 space-y-3">
            <Button onClick={clearCart} variant="outline" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-200">
              Clear Cart
            </Button>
            <Link to={ROUTES.ORDER_CONFIRMATION}> {/* This will be updated to point to the checkout form */}
              <Button className="w-full bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-md py-3 transition-all duration-200">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCartView;