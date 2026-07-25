// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/menu/items');
  return response.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/v1/menu/items/${id}`);
  return response.data;
};

export const getMenuItemsByCategory = async (categoryName: string): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>(`/api/v1/menu/items/category/${categoryName}`);
  return response.data;
};

export const getAllMenuItemCategories = async (): Promise<MenuItemCategory[]> => {
  const response = await apiClient.get<MenuItemCategory[]>('/api/v1/menu/categories');
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/v1/admin/menu/items', request);
  return response.data;
};

export const updateMenuItem = async (id: string, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/v1/admin/menu/items/${id}`, request);
  return response.data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menu/items/${id}`);
};

export const createMenuItemCategory = async (request: MenuItemCategory): Promise<MenuItemCategory> => {
  const response = await apiClient.post<MenuItemCategory>('/api/v1/admin/menu/categories', request);
  return response.data;
};

export const updateMenuItemCategory = async (id: string, request: MenuItemCategory): Promise<MenuItemCategory> => {
  const response = await apiClient.put<MenuItemCategory>(`/api/v1/admin/menu/categories/${id}`, request);
  return response.data;
};

export const deleteMenuItemCategory = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menu/categories/${id}`);
};

