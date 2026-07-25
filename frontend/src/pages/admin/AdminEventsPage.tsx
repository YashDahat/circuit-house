import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { EventForm } from '@/components/events/EventForm';
import { EventsTable } from '@/components/events/EventsTable';
import {
  useGetAllEvents,
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
} from '@/hooks/useEvents';
import type { EventDto } from '@/types/event';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog';
import { PlusCircle } from 'lucide-react';

export default function AdminEventsPage() {
  const { data: events, isLoading, isError, error } = useGetAllEvents();
  const createMutation = useCreateEvent();
  const updateMutation = useUpdateEvent();
  const deleteMutation = useDeleteEvent();

  const [editingEvent, setEditingEvent] = useState<EventDto | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleCreateNewEvent = () => {
    setEditingEvent(undefined);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: EventDto) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    setEventToDelete(id);
  };

  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      deleteMutation.mutate(eventToDelete);
      setEventToDelete(null);
    }
  };

  const handleFormSubmit = (event: EventDto) => {
    if (event.id) {
      updateMutation.mutate({ id: event.id, event });
    } else {
      createMutation.mutate(event);
    }
    setIsFormOpen(false);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingEvent(undefined);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Events</h1>
            <div className="text-center text-gray-600">Loading events...</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Events</h1>
            <div className="text-center text-red-500">Error: {error?.message}</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Events</h1>

          <div className="flex justify-end mb-6">
            <Button
              onClick={handleCreateNewEvent}
              className="bg-[#D69E2E] hover:bg-[#c28b2a] text-white font-semibold"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
            </Button>
          </div>

          {isFormOpen && (
            <div className="mb-8">
              <EventForm
                initialData={editingEvent}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
              />
            </div>
          )}

          <EventsTable
            events={events || []}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />

          <AlertDialog open={!!eventToDelete} onOpenChange={(open) => !open && setEventToDelete(null)}>
            <AlertDialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg p-6 shadow-lg z-50 w-full max-w-md">
              <div>
                <AlertDialogTitle className="text-lg font-semibold">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-500 mt-2">
                  This action cannot be undone. This will permanently delete the event.
                </AlertDialogDescription>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialogCancel asChild>
                  <Button variant="outline" onClick={() => setEventToDelete(null)}>Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={confirmDeleteEvent}>Delete</Button>
                </AlertDialogAction>
            </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </AdminLayout>
  );
}