import { MenuItemDto } from '@/types/menu';
import { OrderItemRequest } from '@/types/order';

const CART_STORAGE_KEY = 'cartItems';

export interface CartItem extends OrderItemRequest {
  menuItemName: string;
  price: number;
}

export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  const items = localStorage.getItem(CART_STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const addItem = (item: MenuItemDto, quantity: number): CartItem[] => {
  if (!item.id || !item.name || item.price === null) {
    console.error("Invalid MenuItemDto for adding to cart", item);
    return getCartItems();
  }

  const currentItems = getCartItems();
  const existingItemIndex = currentItems.findIndex(
    (cartItem) => cartItem.menuItemId === item.id
  );

  if (existingItemIndex > -1) {
    const updatedItems = [...currentItems];
    updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity ?? 0) + quantity;
    saveCartItems(updatedItems);
    return updatedItems;
  } else {
    const newItem: CartItem = {
      menuItemId: item.id,
      menuItemName: item.name,
      quantity: quantity,
      price: item.price,
    };
    const updatedItems = [...currentItems, newItem];
    saveCartItems(updatedItems);
    return updatedItems;
  }
};

export const updateItemQuantity = (menuItemId: string, quantity: number): CartItem[] => {
  const currentItems = getCartItems();
  const updatedItems = currentItems
    .map((item) =>
      item.menuItemId === menuItemId ? { ...item, quantity: quantity } : item
    )
    .filter((item) => item.quantity && item.quantity > 0);
  saveCartItems(updatedItems);
  return updatedItems;
};

export const removeItem = (menuItemId: string): CartItem[] => {
  const currentItems = getCartItems();
  const updatedItems = currentItems.filter((item) => item.menuItemId !== menuItemId);
  saveCartItems(updatedItems);
  return updatedItems;
};

export const clearCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
};

export const getCartTotal = (): number => {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0);
};