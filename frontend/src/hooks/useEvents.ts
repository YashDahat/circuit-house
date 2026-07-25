import { useQuery } from '@tanstack/react-query';
import { getAllUpcomingEvents } from '@/services/eventService';
import type { EventDto } from '@/types/event';

export const useEvents = () => {
  return useQuery<EventDto[], Error>({
    queryKey: ['events', 'upcoming'],
    queryFn: getAllUpcomingEvents,
  });
};