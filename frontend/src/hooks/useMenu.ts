import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMenuItems, getAllMenuItemCategories } from '@/services/menuService';
import type { MenuItemDto, MenuItemCategoryDto } from '@/types/menu';

export const useMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: menuItemsData, isLoading: isLoadingItems, error: errorItems } = useQuery({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });

  const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories } = useQuery({
    queryKey: ['menuCategories'],
    queryFn: getAllMenuItemCategories,
  });

  const filteredMenuItems = selectedCategory
    ? menuItemsData?.filter(item => item.categoryId === selectedCategory)
    : menuItemsData;

  const isLoading = isLoadingItems || isLoadingCategories;
  const error = errorItems || errorCategories;

  return {
    menuItems: filteredMenuItems as MenuItemDto[] | undefined,
    categories: categoriesData as MenuItemCategoryDto[] | undefined,
    isLoading,
    error,
    setSelectedCategory,
    selectedCategory,
  };
};