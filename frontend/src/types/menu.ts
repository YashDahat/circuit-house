// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuItemDto {
  id: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  category: MenuItemCategory | null;
  imageUrl: string | null;
}

export type MenuItemCategory = 'APPETIZER' | 'MAIN_COURSE' | 'DESSERT' | 'BEVERAGE' | 'SALAD' | 'SIDE' | 'DRINK';

