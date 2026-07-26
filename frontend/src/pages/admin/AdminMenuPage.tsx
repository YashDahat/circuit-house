'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { useMenu } from '@/hooks/useMenu';
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '@/services/menuService';
import type { MenuItemDto } from '@/types/menu';

import MenuTable from '@/components/admin/menu/MenuTable';
import { MenuItemForm } from '@/components/admin/menu/MenuItemForm';
import { DeleteMenuItemDialog } from '@/components/admin/menu/DeleteMenuItemDialog';

const AdminMenuPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { menuItems, categories, isLoading, error } = useMenu();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItemDto | undefined>(
    undefined
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemDto | null>(null);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item created successfully!');
      setIsFormOpen(false);
      setEditingMenuItem(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to create menu item: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: number; item: MenuItemDto }) =>
      updateMenuItem(data.id, data.item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item updated successfully!');
      setIsFormOpen(false);
      setEditingMenuItem(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to update menu item: ${err.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item deleted successfully!');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    },
    onError: (err) => {
      toast.error(`Failed to delete menu item: ${err.message}`);
    },
  });

  const handleCreateMenuItem = (item: MenuItemDto) => {
    createMutation.mutate(item);
  };

  const handleUpdateMenuItem = (item: MenuItemDto) => {
    if (item.id) {
      updateMutation.mutate({ id: item.id, item });
    }
  };

  const handleDeleteMenuItem = () => {
    if (itemToDelete?.id) {
      deleteMutation.mutate(itemToDelete.id);
    }
  };

  const onEdit = (item: MenuItemDto) => {
    setEditingMenuItem(item);
    setIsFormOpen(true);
  };

  const onDelete = (id: number) => {
    const item = menuItems?.find((i) => i.id === id);
    if (item) {
      setItemToDelete(item);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingMenuItem(undefined);
  };

  if (error) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold text-[#1A202C]">
                  Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">Failed to load menu items: {error.message}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl md:text-3xl font-semibold text-[#1A202C]">
                Menu Management
              </CardTitle>
              <Button
                onClick={() => {
                  setEditingMenuItem(undefined);
                  setIsFormOpen(true);
                }}
                className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
              >
                Add New Item
              </Button>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-[300px] w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ) : (
                <>
                  {isFormOpen && categories && categories.length > 0 ? (
                    <MenuItemForm
                      initialData={editingMenuItem}
                      categories={categories}
                      onSubmit={editingMenuItem ? handleUpdateMenuItem : handleCreateMenuItem}
                      onCancel={handleCancelForm}
                    />
                  ) : (
                    <MenuTable
                      menuItems={menuItems || []}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <DeleteMenuItemDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteMenuItem}
        itemName={itemToDelete?.name ?? 'this item'}
      />
    </AdminLayout>
  );
};

export default AdminMenuPage;