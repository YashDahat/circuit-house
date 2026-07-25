import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItemDto } from '@/types/menu';
import {
  CartItem,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart as clearCartService,
} from '@/services/local/cartService';

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  itemCount: number;
  addItemToCart: (item: MenuItemDto, quantity: number) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  removeItemFromCart: (menuItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const calculateCartTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.menuItem.price ?? 0) * item.quantity, 0);
  };

  const calculateItemCount = (items: CartItem[]) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const cartTotal = calculateCartTotal(cartItems);
  const itemCount = calculateItemCount(cartItems);

  const addItemToCart = (menuItem: MenuItemDto, quantity: number) => {
    const newItem: CartItem = {
      menuItemId: menuItem.id ?? '',
      quantity,
      menuItem,
    };
    addCartItem(newItem);
    setCartItems(getCartItems());
  };

  const updateItemQuantity = (menuItemId: string, quantity: number) => {
    updateCartItemQuantity(menuItemId, quantity);
    setCartItems(getCartItems());
  };

  const removeItemFromCart = (menuItemId: string) => {
    removeCartItem(menuItemId);
    setCartItems(getCartItems());
  };

  const clearCart = () => {
    clearCartService();
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        itemCount,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};