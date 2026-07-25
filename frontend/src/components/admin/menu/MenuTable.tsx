import { MenuItemDto } from '@/types/menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEditMenuItem: (menuItem: MenuItemDto) => void;
  onDeleteMenuItem: (id: string) => void;
}

export function MenuTable({ menuItems, onEditMenuItem, onDeleteMenuItem }: MenuTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>${item.price?.toFixed(2)}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.imageUrl ? (
                    <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-[#D69E2E] hover:underline">
                      View Image
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditMenuItem(item)}
                    className="mr-2 transition-all duration-200 hover:bg-gray-100"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => item.id && onDeleteMenuItem(item.id)}
                    className="transition-all duration-200 hover:bg-red-100 text-red-600"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No menu items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}