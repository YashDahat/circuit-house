import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/services/reservationService';
import type { ReservationStatus } from '@/types/reservation';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface UpdateReservationStatusFormProps {
  reservationId: string;
  currentStatus: ReservationStatus;
  onStatusUpdate?: () => void;
}

const UpdateReservationStatusForm: React.FC<UpdateReservationStatusFormProps> = ({
  reservationId,
  currentStatus,
  onStatusUpdate,
}) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus>(currentStatus);

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: ReservationStatus) => updateReservationStatus(reservationId, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully.');
      onStatusUpdate?.();
    },
    onError: (error) => {
      toast.error(`Failed to update reservation status: ${error.message}`);
    },
  });

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as ReservationStatus);
  };

  const handleSubmit = () => {
    if (selectedStatus && selectedStatus !== currentStatus) {
      updateStatusMutation.mutate(selectedStatus);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].map((status) => (
            <SelectItem key={status} value={status}>
              {status.replace('_', ' ')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={handleSubmit}
        disabled={selectedStatus === currentStatus || updateStatusMutation.isPending}
        className="bg-[#D69E2E] hover:bg-[#B78822] text-white font-semibold transition-all duration-200"
      >
        {updateStatusMutation.isPending ? 'Updating...' : 'Update'}
      </Button>
    </div>
  );
};

export default UpdateReservationStatusForm;