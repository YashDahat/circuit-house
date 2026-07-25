import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { MenuItemDto } from '@/types/menu';
import {
  CartItem,
  getCartItems,
  addItem as serviceAddItem,
  updateItemQuantity as serviceUpdateItemQuantity,
  removeItem as serviceRemoveItem,
  clearCart as serviceClearCart,
  getCartTotal as serviceGetCartTotal,
} from '@/services/local/cartService';

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: MenuItemDto, quantity: number) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  removeItem: (menuItemId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const addItem = (item: MenuItemDto, quantity: number) => {
    const updatedItems = serviceAddItem(item, quantity);
    setCartItems(updatedItems);
  };

  const updateItemQuantity = (menuItemId: string, quantity: number) => {
    const updatedItems = serviceUpdateItemQuantity(menuItemId, quantity);
    setCartItems(updatedItems);
  };

  const removeItem = (menuItemId: string) => {
    const updatedItems = serviceRemoveItem(menuItemId);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    const updatedItems = serviceClearCart();
    setCartItems(updatedItems);
  };

  const getCartTotal = () => {
    return serviceGetCartTotal();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        getCartTotal,
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