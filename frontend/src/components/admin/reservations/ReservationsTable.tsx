import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReservationResponse, ReservationStatus } from '@/types/reservation';
import { format } from 'date-fns';

interface ReservationsTableProps {
  reservations: ReservationResponse[];
  onUpdateStatus: (reservationId: string, currentStatus: ReservationStatus) => void;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({ reservations, onUpdateStatus }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.customerName ?? 'N/A'}</TableCell>
                <TableCell>{reservation.customerEmail ?? 'N/A'}</TableCell>
                <TableCell>{reservation.customerPhone ?? 'N/A'}</TableCell>
                <TableCell>
                  {reservation.reservationTime
                    ? format(new Date(reservation.reservationTime), 'MMM dd, yyyy HH:mm')
                    : 'N/A'}
                </TableCell>
                <TableCell>{reservation.numberOfGuests ?? 'N/A'}</TableCell>
                <TableCell>{reservation.status ?? 'N/A'}</TableCell>
                <TableCell>{reservation.notes ?? 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      reservation.id && reservation.status && onUpdateStatus(reservation.id, reservation.status)
                    }
                    className="transition-all duration-200 hover:bg-gray-100"
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No reservations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationsTable;