import { MenuItemDto } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEdit: (item: MenuItemDto) => void;
  onDelete: (id: string) => void;
}

export function MenuTable({ menuItems, onEdit, onDelete }: MenuTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name ?? 'Menu Item'} className="w-16 h-16 object-cover rounded" />
                )}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>${item.price?.toFixed(2)}</TableCell>
              <TableCell>{item.active ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(item.id ?? '')}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}