// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuItemCategoryDto, MenuItemDto } from '@/types/menu';

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/menus/items');
  return response.data;
};

export const getMenuItemsByCategory = async (categoryId: number): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>(`/api/v1/menus/items/category/${categoryId}`);
  return response.data;
};

export const getAllMenuItemCategories = async (): Promise<MenuItemCategoryDto[]> => {
  const response = await apiClient.get<MenuItemCategoryDto[]>('/api/v1/menus/categories');
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/v1/admin/menus/items', request);
  return response.data;
};

export const updateMenuItem = async (id: number, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/v1/admin/menus/items/${id}`, request);
  return response.data;
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menus/items/${id}`);
};

export const createMenuItemCategory = async (request: MenuItemCategoryDto): Promise<MenuItemCategoryDto> => {
  const response = await apiClient.post<MenuItemCategoryDto>('/api/v1/admin/menus/categories', request);
  return response.data;
};

export const updateMenuItemCategory = async (id: number, request: MenuItemCategoryDto): Promise<MenuItemCategoryDto> => {
  const response = await apiClient.put<MenuItemCategoryDto>(`/api/v1/admin/menus/categories/${id}`, request);
  return response.data;
};

export const deleteMenuItemCategory = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menus/categories/${id}`);
};

