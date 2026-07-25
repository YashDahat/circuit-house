import { EventDto } from '@/types/event';
import EventCard from './EventCard';

interface EventsListProps {
  events: EventDto[];
}

export const EventsList = ({ events }: EventsListProps) => {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No upcoming events scheduled at the moment. Please check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};