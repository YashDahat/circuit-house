import React, { useState } from 'react';
import { ReservationDto, ReservationStatus } from '@/types/reservation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ArrowUpDown, Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface ReservationsTableProps {
  reservations: ReservationDto[];
  onViewDetails: (reservation: ReservationDto) => void;
  onDeleteReservation: (id: string) => void;
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
}

type SortKey = keyof ReservationDto;

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
  onViewDetails,
  onDeleteReservation,
  onUpdateStatus,
}) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedReservations = [...reservations].sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (aValue === null || bValue === null) {
      if (aValue === null && bValue === null) return 0;
      return aValue === null ? 1 : -1;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: ReservationStatus | null) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'NO_SHOW':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort('customerName')}>
              Customer Name
              <ArrowUpDown className={clsx("ml-2 h-4 w-4 inline", sortKey === 'customerName' && sortDirection === 'asc' && 'rotate-180')} />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('reservationTime')}>
              Reservation Time
              <ArrowUpDown className={clsx("ml-2 h-4 w-4 inline", sortKey === 'reservationTime' && sortDirection === 'asc' && 'rotate-180')} />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('partySize')}>
              Party Size
              <ArrowUpDown className={clsx("ml-2 h-4 w-4 inline", sortKey === 'partySize' && sortDirection === 'asc' && 'rotate-180')} />
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              Status
              <ArrowUpDown className={clsx("ml-2 h-4 w-4 inline", sortKey === 'status' && sortDirection === 'asc' && 'rotate-180')} />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            sortedReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.customerName ?? 'N/A'}</TableCell>
                <TableCell>
                  {reservation.reservationTime
                    ? format(new Date(reservation.reservationTime), 'MMM dd, yyyy hh:mm a')
                    : 'N/A'}
                </TableCell>
                <TableCell>{reservation.partySize ?? 'N/A'}</TableCell>
                <TableCell>
                  <Select
                    value={reservation.status ?? ''}
                    onValueChange={(value: ReservationStatus) =>
                      reservation.id && onUpdateStatus(reservation.id, value)
                    }
                  >
                    <SelectTrigger
                      className={clsx(
                        'w-[180px] rounded-md px-3 py-1 text-sm font-medium capitalize',
                        getStatusColor(reservation.status)
                      )}
                    >
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'].map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status.replace('_', ' ').toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(reservation)}
                    className="mr-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => reservation.id && onDeleteReservation(reservation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete reservation</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationsTable;