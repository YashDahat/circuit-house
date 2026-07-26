import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EventDto } from '@/types/event';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface EventsTableProps {
  events: EventDto[];
  onEdit: (event: EventDto) => void;
  onDelete: (id: string) => void;
}

export function EventsTable({ events, onEdit, onDelete }: EventsTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Image URL</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
              <TableCell className="py-3 px-4 text-sm text-[#2D3748]">{event.id}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748]">{event.name}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748]">{event.description}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748]">{event.eventDate}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748] truncate max-w-xs">{event.imageUrl}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748]">{event.active ? 'Yes' : 'No'}</TableCell>
              <TableCell className="py-3 px-4 text-sm text-[#2D3748] text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(event)}
                  className="text-[#D69E2E] hover:bg-gray-100 transition-all duration-200"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => event.id && onDelete(event.id)}
                  className="text-red-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}