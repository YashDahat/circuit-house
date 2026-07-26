import { EventDto } from '@/types/event';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventCardProps {
  event: EventDto;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date TBD';

  return (
    <Card className="h-full flex flex-col">
      {event.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={event.imageUrl}
            alt={event.name ?? 'Event Image'}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-[#2D3748] leading-relaxed">{event.description}</p>
      </CardContent>
    </Card>
  );
};

export default EventCard;