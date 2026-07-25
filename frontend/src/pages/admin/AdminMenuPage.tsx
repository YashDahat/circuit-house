import { DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useMenuItemCategories,
  useMenuItems,
  useUpdateMenuItem,
} from '@/hooks/useMenu';
import { MenuItemForm } from '@/components/menu/MenuItemForm';
import { MenuTable } from '@/components/menu/MenuTable';
import { DeleteMenuItemDialog } from '@/components/menu/DeleteMenuItemDialog';
import type { MenuItemDto } from '@/types/menu';
import { Loader2 } from 'lucide-react';

export default function AdminMenuPage() {
  const { data: menuItems, isLoading: isLoadingItems, isError: isErrorItems } = useMenuItems();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useMenuItemCategories();
  const createMutation = useCreateMenuItem();
  const updateMutation = useUpdateMenuItem();
  const deleteMutation = useDeleteMenuItem();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItemDto | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingMenuItemId, setDeletingMenuItemId] = useState<string | null>(null);

  const handleAddMenuItem = () => {
    setEditingMenuItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditMenuItem = (item: MenuItemDto) => {
    setEditingMenuItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteMenuItem = (id: string) => {
    setDeletingMenuItemId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingMenuItemId) {
      deleteMutation.mutate(deletingMenuItemId, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeletingMenuItemId(null);
        },
      });
    }
  };

  const handleFormSubmit = (item: MenuItemDto) => {
    if (editingMenuItem?.id) {
      updateMutation.mutate(
        { id: editingMenuItem.id, item },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingMenuItem(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(item, {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      });
    }
  };

  if (isLoadingItems || isLoadingCategories) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-[#D69E2E]" />
        </div>
      </AdminLayout>
    );
  }

  if (isErrorItems || isErrorCategories) {
    return (
      <AdminLayout>
        <div className="text-center text-red-500">Failed to load menu data.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-[#1A202C]">Menu Management</h1>
            <div className="flex space-x-4">
              <Button onClick={handleAddMenuItem} className="bg-[#D69E2E] hover:bg-[#B78727] text-white">
                Add New Menu Item
              </Button>
              <Button variant="outline">
                Manage Categories
              </Button>
            </div>
          </div>

          {menuItems && menuItems.length > 0 ? (
            <MenuTable menuItems={menuItems} onEdit={handleEditMenuItem} onDelete={handleDeleteMenuItem} />
          ) : (
            <div className="text-center py-10 text-gray-500">No menu items found.</div>
          )}

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-[#1A202C]">
                  {editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </DialogTitle>
              </DialogHeader>
              {categories && (
                <MenuItemForm
                  initialData={editingMenuItem}
                  categories={categories}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsFormOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>

          <DeleteMenuItemDialog
            isOpen={isDeleteDialogOpen}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteDialogOpen(false)}
          />
        </div>
      </section>
    </AdminLayout>
  );
}