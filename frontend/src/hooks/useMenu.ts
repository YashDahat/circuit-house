import { useQuery } from '@tanstack/react-query';
import { getAllMenuItems, getMenuItemsByCategory } from '@/services/menuService';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const useMenu = (category?: MenuItemCategory) => {
  const { data, isLoading, isError, error } = useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems', category],
    queryFn: () => (category ? getMenuItemsByCategory(category) : getAllMenuItems()),
  });

  return { data, isLoading, isError, error };
};