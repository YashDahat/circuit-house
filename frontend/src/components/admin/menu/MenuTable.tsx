'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MenuItemDto } from '@/types/menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MenuTableProps {
  menuItems: MenuItemDto[];
  onEdit: (item: MenuItemDto) => void;
  onDelete: (id: number) => void;
}

type SortKey = keyof MenuItemDto;
type SortDirection = 'asc' | 'desc';

const MenuTable: React.FC<MenuTableProps> = ({ menuItems, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const filteredItems = menuItems.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    // Fallback for null or other types, treat as equal for sorting purposes
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortKey === key) {
      return sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Button variant="ghost" onClick={() => handleSort('id')} className="flex items-center">
                  ID {getSortIcon('id')}
                </Button>
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Button variant="ghost" onClick={() => handleSort('name')} className="flex items-center">
                  Name {getSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Button variant="ghost" onClick={() => handleSort('description')} className="flex items-center">
                  Description {getSortIcon('description')}
                </Button>
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Button variant="ghost" onClick={() => handleSort('price')} className="flex items-center">
                  Price {getSortIcon('price')}
                </Button>
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image URL
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Button variant="ghost" onClick={() => handleSort('categoryId')} className="flex items-center">
                  Category ID {getSortIcon('categoryId')}
                </Button>
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <TableRow key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.price?.toFixed(2)}</TableCell>
                  <TableCell className="truncate max-w-[150px]">{item.imageUrl}</TableCell>
                  <TableCell>{item.categoryId}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => item.id && onDelete(item.id)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No menu items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {sortedItems.length} items.
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Items per page</p>
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuTable;