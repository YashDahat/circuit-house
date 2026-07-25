import React, { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import {
  useAllReservations,
  useDeleteReservation,
  useUpdateReservationStatus,
} from '@/hooks/useReservations';
import { ReservationDto, ReservationStatus } from '@/types/reservation';
import ReservationsTable from '@/components/reservation/ReservationsTable';
import { ReservationDetailModal } from '@/components/reservation/ReservationDetailModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Loader2, CalendarOff } from 'lucide-react';

const AdminReservationsPage: React.FC = () => {
  const { data: allReservations, isLoading, isError } = useAllReservations();
  const deleteReservationMutation = useDeleteReservation();
  const updateReservationStatusMutation = useUpdateReservationStatus();

  const [selectedReservation, setSelectedReservation] = useState<ReservationDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ReservationStatus | 'ALL'>('ALL');

  const handleViewDetails = (reservation: ReservationDto) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setIsModalOpen(false);
  };

  const handleDeleteReservation = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      await deleteReservationMutation.mutateAsync(id);
    }
  };

  const handleUpdateStatus = async (id: string, status: ReservationStatus) => {
    await updateReservationStatusMutation.mutateAsync(id);
  };

  const filteredReservations = allReservations?.filter((reservation) => {
    if (activeTab === 'ALL') return true;
    return reservation.status === activeTab;
  }) || [];

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-semibold">Manage Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ReservationStatus | 'ALL')} className="mb-6">
                <TabsList className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-md">
                  <TabsTrigger value="ALL" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md data-[state=active]:bg-[#D69E2E] data-[state=active]:text-white transition-all duration-200">
                    All
                  </TabsTrigger>
                  {['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'].map((status) => (
                    <TabsTrigger
                      key={status}
                      value={status}
                      className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md data-[state=active]:bg-[#D69E2E] data-[state=active]:text-white transition-all duration-200 capitalize"
                    >
                      {status.replace('_', ' ').toLowerCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value={activeTab} className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin text-[#D69E2E]" />
                    </div>
                  ) : isError ? (
                    <div className="text-center text-red-500 py-8">
                      Failed to load reservations.
                    </div>
                  ) : filteredReservations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                      <CalendarOff className="h-12 w-12 mb-4" />
                      <p className="text-lg">No reservations found for this status.</p>
                    </div>
                  ) : (
                    <ReservationsTable
                      reservations={filteredReservations}
                      onViewDetails={handleViewDetails}
                      onDeleteReservation={handleDeleteReservation}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <ReservationDetailModal
        reservation={selectedReservation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </AdminLayout>
  );
};

export default AdminReservationsPage;