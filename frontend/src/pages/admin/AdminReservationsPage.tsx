import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} from '@/services/reservationService';
import { ReservationDto, UpdateReservationStatusRequest } from '@/types/reservation';
import { ReservationsTable } from '@/components/admin/reservations/ReservationsTable';
import UpdateReservationStatusForm from '@/components/admin/reservations/UpdateReservationStatusForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminReservationsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery<ReservationDto[], Error>({
    queryKey: ['adminReservations'],
    queryFn: getAllReservations,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationDto | null>(null);

  const updateStatusMutation = useMutation<
    ReservationDto,
    Error,
    { id: string; request: UpdateReservationStatusRequest }
  >({
    mutationFn: ({ id, request }) => updateReservationStatus(id, request),
    onSuccess: () => {
      toast.success('Reservation status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['adminReservations'] });
      setIsUpdateModalOpen(false);
      setSelectedReservation(null);
    },
    onError: (err) => {
      toast.error(`Failed to update reservation status: ${err.message}`);
    },
  });

  const deleteReservationMutation = useMutation<void, Error, string>({
    mutationFn: (id) => deleteReservation(id),
    onSuccess: () => {
      toast.success('Reservation deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['adminReservations'] });
    },
    onError: (err) => {
      toast.error(`Failed to delete reservation: ${err.message}`);
    },
  });

  const handleUpdateStatusClick = (reservation: ReservationDto) => {
    setSelectedReservation(reservation);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatusSubmit = (data: UpdateReservationStatusRequest) => {
    if (selectedReservation?.id) {
      updateStatusMutation.mutate({ id: selectedReservation.id, request: data });
    }
  };

  const handleDeleteReservation = (id: string) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      deleteReservationMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1A202C] mb-6">Reservations Management</h1>
            <Skeleton className="h-10 w-48 mb-4" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1A202C] mb-6">Reservations Management</h1>
            <p className="text-red-500">Error loading reservations: {error.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1A202C] mb-6">Reservations Management</h1>

          <div className="mb-6 flex justify-end">
            {/* No direct 'add reservation' button as reservations are typically made by customers */}
            {/* This space is reserved for potential future admin-initiated reservation creation */}
          </div>

          <ReservationsTable
            reservations={reservations || []}
            onUpdateStatus={handleUpdateStatusClick}
            onDelete={handleDeleteReservation}
          />

          <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogContent className="sm:max-w-[425px] p-6 bg-white rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-[#1A202C]">
                  Update Reservation Status
                </DialogTitle>
              </DialogHeader>
              {selectedReservation && (
                <UpdateReservationStatusForm
                  reservationId={selectedReservation.id || ''}
                  initialStatus={selectedReservation.status}
                  initialNotes={selectedReservation.notes}
                  onSubmit={handleUpdateStatusSubmit}
                  onCancel={() => setIsUpdateModalOpen(false)}
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