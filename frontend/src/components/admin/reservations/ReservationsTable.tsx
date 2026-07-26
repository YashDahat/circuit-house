import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReservationDto, ReservationStatus } from '@/types/reservation';
import { format } from 'date-fns';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface ReservationsTableProps {
  reservations: ReservationDto[];
  onUpdateStatus: (reservation: ReservationDto) => void;
  onDelete: (id: string) => void;
}

export function ReservationsTable({
  reservations,
  onUpdateStatus,
  onDelete,
}: ReservationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">ID</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Time</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</TableHead>
            <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <TableCell className="py-4 px-6 text-sm font-medium text-gray-900">{reservation.id}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.customerName}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.customerEmail}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.customerPhone}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">
                  {reservation.reservationTime ? format(new Date(reservation.reservationTime), 'PPP p') : 'N/A'}
                </TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.numberOfGuests}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.status}</TableCell>
                <TableCell className="py-4 px-6 text-sm text-gray-500">{reservation.notes}</TableCell>
                <TableCell className="py-4 px-6 text-sm font-medium flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateStatus(reservation)}
                    className="flex items-center gap-1 text-[#D69E2E] border-[#D69E2E] hover:bg-[#D69E2E] hover:text-white transition-all duration-200"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Update Status
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => reservation.id && onDelete(reservation.id)}
                    className="flex items-center gap-1 transition-all duration-200"
                  >
                    <Trash2Icon className="h-4 w-4" />
                    Delete
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