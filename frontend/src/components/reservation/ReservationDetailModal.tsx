import { DialogHeader } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ReservationDto, ReservationStatus } from '@/types/reservation';
import { useUpdateReservationStatus } from '@/hooks/useReservations';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface ReservationDetailModalProps {
  reservation: ReservationDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationDetailModal({ reservation, isOpen, onClose }: ReservationDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState<ReservationStatus | string>(reservation?.status ?? 'PENDING');
  const updateStatusMutation = useUpdateReservationStatus();

  useEffect(() => {
    if (reservation?.status) {
      setCurrentStatus(reservation.status);
    }
  }, [reservation]);

  const handleStatusChange = (newStatus: ReservationStatus) => {
    setCurrentStatus(newStatus);
  };

  const handleUpdateStatus = async () => {
    if (reservation?.id && currentStatus && currentStatus !== reservation.status) {
      try {
        await updateStatusMutation.mutateAsync(reservation.id);
        onClose();
      } catch (error) {
        console.error("Failed to update reservation status:", error);
        // Optionally, revert status or show an error message
      }
    }
  };

  if (!reservation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Reservation Details</DialogTitle>
          <DialogDescription className="text-gray-500">View and update reservation information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Customer Name
            </Label>
            <p id="customerName" className="col-span-3">
              {reservation.customerName ?? 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">
              Email
            </Label>
            <p id="customerEmail" className="col-span-3">
              {reservation.customerEmail ?? 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right">
              Phone
            </Label>
            <p id="customerPhone" className="col-span-3">
              {reservation.customerPhone ?? 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reservationTime" className="text-right">
              Time
            </Label>
            <p id="reservationTime" className="col-span-3">
              {reservation.reservationTime ? format(new Date(reservation.reservationTime), 'PPP p') : 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="partySize" className="text-right">
              Party Size
            </Label>
            <p id="partySize" className="col-span-3">
              {reservation.partySize ?? 'N/A'}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={(value: ReservationStatus) => handleStatusChange(value)} value={currentStatus}>
              <SelectTrigger className="col-span-3 w-[180px] border border-gray-300 rounded-md px-3 py-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="NO_SHOW">No Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleUpdateStatus} disabled={updateStatusMutation.isPending || currentStatus === reservation.status}>
            {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}