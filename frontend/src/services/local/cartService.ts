import { OrderItemDto } from '@/types/order';

const CART_STORAGE_KEY = 'cartItems';

export const getCartItems = (): OrderItemDto[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const items = localStorage.getItem(CART_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

export const saveCartItems = (cartItems: OrderItemDto[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
};

export const clearCartItems = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
};