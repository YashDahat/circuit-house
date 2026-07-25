import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EventForm } from '@/components/admin/events/EventForm';
import { EventsTable } from '@/components/admin/events/EventsTable';
import DeleteEventDialog from '@/components/admin/events/DeleteEventDialog';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '@/services/eventService';
import type { EventDto } from '@/types/event';
import { toast } from 'sonner';

const AdminEventsPage = () => {
  const queryClient = useQueryClient();
  const { data: events, isLoading, isError } = useQuery<EventDto[], Error>({
    queryKey: ['adminEvents'],
    queryFn: getAllEvents,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
  const [eventIdToDelete, setEventIdToDelete] = useState<string | null>(null);

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
      toast.success('Event created successfully!');
      setIsFormOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to create event: ${error.message}`);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EventDto }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
      toast.success('Event updated successfully!');
      setIsFormOpen(false);
      setSelectedEvent(null);
    },
    onError: (error) => {
      toast.error(`Failed to update event: ${error.message}`);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEvents'] });
      toast.success('Event deleted successfully!');
      setIsDeleteDialogOpen(false);
      setEventIdToDelete(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    },
  });

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: EventDto) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEventIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (eventIdToDelete) {
      deleteEventMutation.mutate(eventIdToDelete);
    }
  };

  const handleFormSubmit = (data: EventDto) => {
    if (selectedEvent?.id) {
      updateEventMutation.mutate({ id: selectedEvent.id, data: { ...data, id: selectedEvent.id } });
    } else {
      createEventMutation.mutate(data);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full">
          <p>Loading events...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-full text-red-500">
          <p>Error loading events.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Event Management</h1>
            <Button onClick={handleAddEvent} className="bg-[#D69E2E] hover:bg-[#B78822] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
              Add New Event
            </Button>
          </div>

          <EventsTable
            events={events ?? []}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{selectedEvent ? 'Edit Event' : 'Create Event'}</DialogTitle>
              </DialogHeader>
              <EventForm
                initialData={selectedEvent ?? undefined}
                onSubmit={handleFormSubmit}
                isSubmitting={createEventMutation.isPending || updateEventMutation.isPending}
              />
            </DialogContent>
          </Dialog>

          <DeleteEventDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirmDelete={handleConfirmDelete}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminEventsPage;