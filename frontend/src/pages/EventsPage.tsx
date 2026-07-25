import Layout from '@/components/layout/Layout';
import { useEvents } from '@/hooks/useEvents';
import EventList from '@/components/events/EventList';
import { Loader2 } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { data: events, isLoading, isError, error } = useEvents();

  return (
    <Layout>
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Experience the Best at Circuit House Events
          </h1>
          <p className="text-xl text-white mt-4">
            Join us for unforgettable live music, special dining experiences, and more.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A202C] mb-8 text-center">
            Upcoming Events
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-[#D69E2E]" />
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500">
              <p>Error loading events: {error?.message}</p>
            </div>
          )}

          {events && events.length > 0 && <EventList events={events} />}

          {events && events.length === 0 && !isLoading && (
            <div className="text-center text-gray-600">
              <p>No upcoming events found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;