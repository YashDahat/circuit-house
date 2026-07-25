import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMenuItem,
  createMenuItemCategory,
  deleteMenuItem,
  deleteMenuItemCategory,
  getAllMenuItemCategories,
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  updateMenuItem,
  updateMenuItemCategory,
} from '@/services/menuService';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const useMenuItems = (categoryName?: string) => {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems', categoryName],
    queryFn: () => (categoryName ? getMenuItemsByCategory(categoryName) : getAllMenuItems()),
  });
};

export const useMenuItem = (id: string) => {
  return useQuery<MenuItemDto, Error>({
    queryKey: ['menuItem', id],
    queryFn: () => getMenuItemById(id),
    enabled: !!id,
  });
};

export const useMenuItemCategories = () => {
  return useQuery<MenuItemCategory[], Error>({
    queryKey: ['menuCategories'],
    queryFn: getAllMenuItemCategories,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemDto, Error, MenuItemDto>({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemDto, Error, { id: string; item: MenuItemDto }>({
    mutationFn: ({ id, item }) => updateMenuItem(id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuItem'] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useCreateMenuItemCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemCategory, Error, MenuItemCategory>({
    mutationFn: createMenuItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });
};

export const useUpdateMenuItemCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemCategory, Error, { id: string; category: MenuItemCategory }>({
    mutationFn: ({ id, category }) => updateMenuItemCategory(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });
};

export const useDeleteMenuItemCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteMenuItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
    },
  });
};