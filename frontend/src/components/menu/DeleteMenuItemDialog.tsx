import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';

interface DeleteMenuItemDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteMenuItemDialog({ isOpen, onConfirm, onCancel }: DeleteMenuItemDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <AlertDialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 w-full max-w-md">
          <AlertDialogTitle className="text-xl font-semibold text-[#1A202C]">Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-[#2D3748]">
            Are you sure you want to delete this menu item? This action cannot be undone.
          </AlertDialogDescription>
          <div className="mt-6 flex justify-end space-x-3">
            <AlertDialogCancel asChild>
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all duration-200"
              >
                Delete
              </button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}