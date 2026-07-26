// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface MenuItemDto {
  id: number | null;
  name: string | null;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  categoryId: number | null;
}

export interface MenuItemCategoryDto {
  id: number | null;
  name: string | null;
  description: string | null;
}

