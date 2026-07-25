import { type EventDto } from '@/types/event';

interface EventCardProps {
  event: EventDto;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'N/A';

  const formattedTime = event.time ? new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.name ?? 'Event Image'}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-[#1A202C] mb-2">{event.name ?? 'Untitled Event'}</h3>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium">Date:</span> {formattedDate}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Time:</span> {formattedTime}
      </p>
      <p className="text-[#2D3748] leading-relaxed">{event.description ?? 'No description available.'}</p>
    </div>
  );
}