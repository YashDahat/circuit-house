import Layout from '@/components/Layout';
import { ReservationForm } from '@/components/reservation/ReservationForm';

export default function ReservationPage() {
  return (
    <Layout>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/reservation-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Make a Reservation</h1>
          <p className="text-lg md:text-xl">Book your table at Circuit House for an unforgettable dining experience.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Book Your Table</h2>
          <p className="text-center text-[#2D3748] leading-relaxed mb-12">
            Please fill out the form below to request a reservation. We will confirm your booking via email or phone.
          </p>
          <ReservationForm />
        </div>
      </section>
    </Layout>
  );
}