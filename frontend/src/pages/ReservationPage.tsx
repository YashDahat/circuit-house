"use client";

import Layout from '@/components/Layout';
import ReservationForm from '@/components/reservation/ReservationForm';

const ReservationPage = () => {
  return (
    <Layout>
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/images/reservation-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Book Your Table at Circuit House</h1>
          <p className="text-lg md:text-xl">Experience our graceful ambiance and exquisite dining. Reserve your spot now!</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F7FAFC]">
        <div className="max-w-3xl mx-auto">
          <ReservationForm />
        </div>
      </section>
    </Layout>
  );
};

export default ReservationPage;