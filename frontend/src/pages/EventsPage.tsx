import Layout from '@/components/Layout';
import { EventsList } from '@/components/events/EventsList';
import { useGetUpcomingEvents } from '@/hooks/useEvents';
import { Spinner } from '@/components/ui/spinner';

const EventsPage = () => {
  const { data: events, isLoading, isError, error } = useGetUpcomingEvents();

  return (
    <Layout>
      <section className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/events-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Upcoming Events at Circuit House</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Join us for special occasions, live music, and culinary experiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          )}
          {isError && (
            <div className="text-center text-red-500 py-16">
              <p className="text-xl">Error loading events: {error?.message}</p>
            </div>
          )}
          {events && <EventsList events={events} />}
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;