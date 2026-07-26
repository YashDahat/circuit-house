import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrderItemDto } from '@/types/order';
import { getCartItems, saveCartItems, clearCartItems } from '@/services/local/cartService';

interface CartContextType {
  cartItems: OrderItemDto[];
  addItemToCart: (item: OrderItemDto) => void;
  removeItemFromCart: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<OrderItemDto[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const addItemToCart = (item: OrderItemDto) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.menuItemId === item.menuItemId);
      if (existingItem) {
        return prevItems.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: (i.quantity ?? 0) + (item.quantity ?? 0) }
            : i
        );
      }
      return [...prevItems, { ...item, id: item.id ?? crypto.randomUUID() }];
    });
  };

  const removeItemFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === itemId ? { ...item, quantity } : item))
        .filter((item) => (item.quantity ?? 0) > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    clearCartItems();
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        clearCart,
        cartTotal,
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