import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '@/services/eventService';
import type { EventDto } from '@/types/event';

const EVENT_QUERY_KEY = 'events';

export const useGetAllEvents = () => {
  return useQuery<EventDto[], Error>({
    queryKey: [EVENT_QUERY_KEY],
    queryFn: getAllEvents,
  });
};

export const useGetUpcomingEvents = () => {
  return useQuery<EventDto[], Error>({
    queryKey: [EVENT_QUERY_KEY, 'upcoming'],
    queryFn: getUpcomingEvents,
  });
};

export const useGetEventById = (id: string) => {
  return useQuery<EventDto, Error>({
    queryKey: [EVENT_QUERY_KEY, id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<EventDto, Error, EventDto>({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEY] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<EventDto, Error, { id: string; event: EventDto }>({
    mutationFn: ({ id, event }) => updateEvent(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEY] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENT_QUERY_KEY] });
    },
  });
};