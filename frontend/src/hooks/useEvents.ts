import { useQuery } from '@tanstack/react-query';
import { getAllEvents } from '@/services/eventService';
import type { EventDto } from '@/types/event';

export const useEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<EventDto[], Error>({
    queryKey: ['events'],
    queryFn: getAllEvents,
  });

  return {
    events,
    isLoading,
    error,
  };
};