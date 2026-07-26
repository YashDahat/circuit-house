import React from 'react';
import Layout from '@/components/Layout';
import { useEvents } from '@/hooks/useEvents';
import EventCard from '@/components/events/EventCard';
import { Skeleton } from '@/components/ui/skeleton';

const EventsPage: React.FC = () => {
  const { events, isLoading, error } = useEvents();

  return (
    <Layout>
      <section className="relative h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/events-hero.webp)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Upcoming Events at Circuit House</h1>
          <p className="text-lg md:text-xl">Experience unforgettable moments with our special live music nights and culinary events.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[350px] w-full rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 text-lg">
              Failed to load events: {error.message}
            </div>
          )}

          {!isLoading && !error && events && events.length === 0 && (
            <div className="text-center text-gray-600 text-lg">
              No upcoming events found. Please check back later!
            </div>
          )}

          {!isLoading && !error && events && events.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;