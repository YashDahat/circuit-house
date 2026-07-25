import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllReservations, updateReservationStatus } from '@/services/reservationService';
import type { ReservationResponse, ReservationStatus } from '@/types/reservation';
import AdminLayout from '@/components/layout/AdminLayout';
import ReservationsTable from '@/components/admin/reservations/ReservationsTable';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UpdateReservationStatusForm from '@/components/admin/reservations/UpdateReservationStatusForm';

const AdminReservationsPage = () => {
  const queryClient = useQueryClient();
  const { data: reservations, isLoading, error } = useQuery<ReservationResponse[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });

  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [currentReservationStatus, setCurrentReservationStatus] = useState<ReservationStatus | null>(null);

  const handleUpdateStatusClick = (reservationId: string, currentStatus: ReservationStatus) => {
    setSelectedReservationId(reservationId);
    setCurrentReservationStatus(currentStatus);
    setIsUpdateStatusDialogOpen(true);
  };

  const handleStatusUpdateClose = () => {
    setIsUpdateStatusDialogOpen(false);
    setSelectedReservationId(null);
    setCurrentReservationStatus(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-8">Loading reservations...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-center py-8 text-red-500">Error loading reservations: {error.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2D3748] mb-6">Manage Reservations</h1>
          <ReservationsTable
            reservations={reservations ?? []}
            onUpdateStatus={handleUpdateStatusClick}
          />

          <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Reservation Status</DialogTitle>
              </DialogHeader>
              {selectedReservationId && currentReservationStatus && (
                <UpdateReservationStatusForm
                  reservationId={selectedReservationId}
                  currentStatus={currentReservationStatus}
                  onStatusUpdate={handleStatusUpdateClose}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminReservationsPage;