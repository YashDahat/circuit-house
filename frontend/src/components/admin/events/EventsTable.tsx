import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EventDto } from '@/types/event';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface EventsTableProps {
  events: EventDto[];
  onEditEvent: (event: EventDto) => void;
  onDeleteEvent: (id: string) => void;
}

export function EventsTable({ events, onEditEvent, onDeleteEvent }: EventsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No events found.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>
                  <a href={event.imageUrl ?? '#'} target="_blank" rel="noopener noreferrer" className="text-[#D69E2E] hover:underline">
                    {event.imageUrl ? 'View Image' : 'N/A'}
                  </a>
                </TableCell>
                <TableCell>{event.active ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditEvent(event)}
                    className="mr-2"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => event.id && onDeleteEvent(event.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}