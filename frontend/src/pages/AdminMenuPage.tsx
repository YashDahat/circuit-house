import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { useMenu } from '@/hooks/useMenu';
import { createMenuItem, updateMenuItem, deleteMenuItem } from '@/services/menuService';
import type { MenuItemDto } from '@/types/menu';

import { MenuTable } from '@/components/admin/menu/MenuTable';
import MenuItemForm from '@/components/admin/menu/MenuItemForm';
import { DeleteMenuItemDialog } from '@/components/admin/menu/DeleteMenuItemDialog';

const AdminMenuPage = () => {
  const { data: menuItems, isLoading, isError, error } = useMenu();
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItemDto | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [menuItemToDeleteId, setMenuItemToDeleteId] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item created successfully.');
      setIsFormOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to create menu item: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuItemDto }) => updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item updated successfully.');
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
      toast.success('Menu item deleted successfully.');
      setIsDeleteDialogOpen(false);
      setMenuItemToDeleteId(null);
    },
    onError: (err) => {
      toast.error(`Failed to delete menu item: ${err.message}`);
    },
  });

  const handleCreateMenuItem = (data: MenuItemDto) => {
    createMutation.mutate(data);
  };

  const handleEditMenuItem = (menuItem: MenuItemDto) => {
    setEditingMenuItem(menuItem);
    setIsFormOpen(true);
  };

  const handleUpdateMenuItem = (data: MenuItemDto) => {
    if (editingMenuItem?.id) {
      updateMutation.mutate({ id: editingMenuItem.id, data: { ...data, id: editingMenuItem.id } });
    }
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItemToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (menuItemToDeleteId) {
      deleteMutation.mutate(menuItemToDeleteId);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingMenuItem(undefined);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[calc(100vh-200px)] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading menu items: {error?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-[#2D3748]">Menu Management</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => { setEditingMenuItem(undefined); setIsFormOpen(true); }} className="bg-[#D69E2E] hover:bg-[#B78822] text-white font-semibold rounded-full px-6 py-3 transition-all duration-200">
                  <PlusCircleIcon className="mr-2 h-5 w-5" /> Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-6">
                <DialogHeader>
                  <DialogTitle>{editingMenuItem ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
                </DialogHeader>
                <MenuItemForm
                  initialData={editingMenuItem}
                  onSubmit={editingMenuItem ? handleUpdateMenuItem : handleCreateMenuItem}
                  onCancel={handleFormClose}
                />
              </DialogContent>
            </Dialog>
          </div>

          <MenuTable
            menuItems={menuItems ?? []}
            onEditMenuItem={handleEditMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />

          <DeleteMenuItemDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            menuItemId={menuItemToDeleteId}
            onConfirmDelete={handleConfirmDelete}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminMenuPage;