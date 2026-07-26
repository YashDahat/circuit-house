"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { EventsTable } from "@/components/admin/events/EventsTable";
import { EventForm } from "@/components/admin/events/EventForm";
import { useEvents } from "@/hooks/useEvents";
import { createEvent, updateEvent, deleteEvent } from "@/services/eventService";
import type { EventDto } from "@/types/event";

export default function AdminEventsPage() {
  const queryClient = useQueryClient();
  const { events, isLoading, error } = useEvents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | undefined>(undefined);

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event created successfully.");
      setIsFormOpen(false);
      setSelectedEvent(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to create event: ${err.message}`);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: (data: EventDto) => updateEvent(data.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event updated successfully.");
      setIsFormOpen(false);
      setSelectedEvent(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to update event: ${err.message}`);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event deleted successfully.");
    },
    onError: (err) => {
      toast.error(`Failed to delete event: ${err.message}`);
    },
  });

  const handleCreateNewEvent = () => {
    setSelectedEvent(undefined);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: EventDto) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventMutation.mutate(id);
    }
  };

  const handleFormSubmit = (data: EventDto) => {
    if (selectedEvent?.id) {
      updateEventMutation.mutate(data);
    } else {
      createEventMutation.mutate(data);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedEvent(undefined);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Event Management</h1>
            <Skeleton className="w-full h-[400px]" />
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
            <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Event Management</h1>
            <p className="text-red-500">Error loading events: {error.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Event Management</h1>

          <div className="flex justify-end mb-6">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreateNewEvent} className="bg-[#D69E2E] hover:bg-[#B78B27] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200">
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-[#1A202C]">
                    {selectedEvent ? "Edit Event" : "Create New Event"}
                  </DialogTitle>
                </DialogHeader>
                <EventForm
                  initialData={selectedEvent}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>

          {events && events.length > 0 ? (
            <EventsTable events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
          ) : (
            <div className="text-center py-10 border rounded-md bg-white">
              <p className="text-lg text-gray-600">No events found.</p>
              <p className="text-sm text-gray-500 mt-2">Click "Add New Event" to create one.</p>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}