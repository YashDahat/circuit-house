import { EventDto } from '@/types/event';

interface EventCardProps {
  event: EventDto;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatEventTime = (isoString: string | null) => {
    if (!isoString) return 'TBD';
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(date);
    } catch (e) {
      console.error('Failed to parse event time:', isoString, e);
      return 'Invalid Date';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col h-full transition-all duration-200 hover:shadow-lg">
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
        <img
          src={event.imageUrl ?? 'https://via.placeholder.com/400x300?text=Event+Image'}
          alt={event.name ?? 'Event image'}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-[#2D3748] mb-2">{event.name ?? 'Untitled Event'}</h3>
      <p className="text-sm text-gray-600 mb-3">
        <span className="font-medium text-[#D69E2E]">When:</span> {formatEventTime(event.eventTime)}
      </p>
      <p className="text-[#2D3748] leading-relaxed flex-grow">{event.description ?? 'No description provided.'}</p>
    </div>
  );
};

export default EventCard;