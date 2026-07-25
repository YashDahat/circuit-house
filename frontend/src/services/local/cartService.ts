import { MenuItemDto } from '@/types/menu';
import { OrderItemRequest } from '@/types/order';

export interface CartItem extends OrderItemRequest {
  menuItem: MenuItemDto;
}

const CART_STORAGE_KEY = 'cartItems';

export const getCartItems = (): CartItem[] => {
  try {
    const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  } catch (error) {
    console.error("Failed to parse cart items from localStorage", error);
    return [];
  }
};

export const addCartItem = (item: CartItem): void => {
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.menuItemId === item.menuItemId
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += item.quantity;
  } else {
    cartItems.push(item);
  }
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const updateCartItemQuantity = (menuItemId: string, quantity: number): void => {
  let cartItems = getCartItems();
  const itemIndex = cartItems.findIndex((item) => item.menuItemId === menuItemId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cartItems.splice(itemIndex, 1); // Remove item if quantity is 0 or less
    } else {
      cartItems[itemIndex].quantity = quantity;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }
};

export const removeCartItem = (menuItemId: string): void => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter((item) => item.menuItemId !== menuItemId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};